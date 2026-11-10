import zlib, struct, math, os

def create_png(width, height, rgba_data):
    def chunk(tag, data):
        return (
            struct.pack('>I', len(data)) +
            tag +
            data +
            struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
        )
    
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    raw_lines = bytearray()
    row_bytes = width * 4
    for y in range(height):
        raw_lines.append(0) # filter byte
        raw_lines.extend(rgba_data[y * row_bytes:(y + 1) * row_bytes])
    
    idat = chunk(b'IDAT', zlib.compress(bytes(raw_lines), 9))
    iend = chunk(b'IEND', b'')
    return header + ihdr + idat + iend

def render_icon(size, is_maskable=False):
    # We use 2x supersampling for crisp anti-aliasing
    scale = 2
    W = size * scale
    H = size * scale
    
    # Pixel buffer: flat RGBA
    buf = [0] * (W * H * 4)

    def set_pixel(x, y, r, g, b, a):
        if 0 <= x < W and 0 <= y < H:
            idx = (y * W + x) * 4
            # Alpha blending
            cur_a = buf[idx + 3] / 255.0
            new_a = a / 255.0
            out_a = new_a + cur_a * (1.0 - new_a)
            if out_a > 0:
                buf[idx] = int((r * new_a + buf[idx] * cur_a * (1.0 - new_a)) / out_a)
                buf[idx+1] = int((g * new_a + buf[idx+1] * cur_a * (1.0 - new_a)) / out_a)
                buf[idx+2] = int((b * new_a + buf[idx+2] * cur_a * (1.0 - new_a)) / out_a)
                buf[idx+3] = int(out_a * 255)

    # Background
    # Background fill: Emerald dark slate #041d16 (4, 29, 22)
    bg_r, bg_g, bg_b = 4, 29, 22
    corner_radius = 0 if is_maskable else (W * 0.22)
    
    for y in range(H):
        for x in range(W):
            if is_maskable:
                set_pixel(x, y, bg_r, bg_g, bg_b, 255)
            else:
                # Rounded rect background
                dx = max(0, max(corner_radius - x, x - (W - 1 - corner_radius)))
                dy = max(0, max(corner_radius - y, y - (H - 1 - corner_radius)))
                dist = math.sqrt(dx*dx + dy*dy)
                if dist <= corner_radius:
                    # Antialiased edge
                    alpha = 1.0 if dist < corner_radius - 1 else max(0.0, corner_radius - dist)
                    set_pixel(x, y, bg_r, bg_g, bg_b, int(alpha * 255))

    # Margin inside icon: maskable has 20% safe zone margin, standard has 12%
    margin_ratio = 0.20 if is_maskable else 0.12
    draw_w = W * (1.0 - 2 * margin_ratio)
    draw_h = H * (1.0 - 2 * margin_ratio)
    offset_x = W * margin_ratio
    offset_y = H * margin_ratio

    # Transform SVG coords (0..100) to pixel buffer coords
    def tx(sx):
        return offset_x + (sx / 100.0) * draw_w
    def ty(sy):
        return offset_y + (sy / 100.0) * draw_h

    def draw_card(sx, sy, sw, sh, srx, r, g, b, stroke_r=None, stroke_g=None, stroke_b=None):
        px1 = tx(sx)
        py1 = ty(sy)
        px2 = tx(sx + sw)
        py2 = ty(sy + sh)
        prx = (srx / 100.0) * draw_w

        min_x = int(math.floor(px1 - 2))
        max_x = int(math.ceil(px2 + 2))
        min_y = int(math.floor(py1 - 2))
        max_y = int(math.ceil(py2 + 2))

        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                dx = max(0, max((px1 + prx) - x, x - (px2 - prx)))
                dy = max(0, max((py1 + prx) - y, y - (py2 - prx)))
                dist = math.sqrt(dx*dx + dy*dy)
                if dist <= prx:
                    alpha = 1.0 if dist < prx - 1 else max(0.0, prx - dist)
                    # Border glow or fill
                    set_pixel(x, y, r, g, b, int(alpha * 255))

    # Card 1: x="30" y="20" width="60" height="40" rx="5" fill="#064e3b" (6, 78, 59)
    draw_card(30, 20, 60, 40, 5, 6, 78, 59)
    # Card 2: x="20" y="30" width="60" height="40" rx="5" fill="#047857" (4, 120, 87)
    draw_card(20, 30, 60, 40, 5, 4, 120, 87)
    # Card 3: x="10" y="40" width="60" height="40" rx="5" fill="#10b981" (16, 185, 129)
    draw_card(10, 40, 60, 40, 5, 16, 185, 129)

    # Bezier curve: M 25 60 C 40 60, 50 20, 80 30, stroke #f59e0b (245, 158, 11), stroke-width 5
    # Cubic bezier formula: B(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
    p0 = (tx(25), ty(60))
    p1 = (tx(40), ty(60))
    p2 = (tx(50), ty(20))
    p3 = (tx(80), ty(30))

    stroke_r, stroke_g, stroke_b = 245, 158, 11
    radius = (2.5 / 100.0) * draw_w

    def draw_brush(cx, cy, r_rad, r, g, b):
        min_x = int(math.floor(cx - r_rad - 1))
        max_x = int(math.ceil(cx + r_rad + 1))
        min_y = int(math.floor(cy - r_rad - 1))
        max_y = int(math.ceil(cy + r_rad + 1))
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                d = math.hypot(x - cx, y - cy)
                if d <= r_rad:
                    alpha = 1.0 if d < r_rad - 1 else max(0.0, r_rad - d)
                    set_pixel(x, y, r, g, b, int(alpha * 255))

    steps = 400
    for i in range(steps + 1):
        t = i / float(steps)
        omt = 1.0 - t
        bx = omt**3 * p0[0] + 3 * omt**2 * t * p1[0] + 3 * omt * t**2 * p2[0] + t**3 * p3[0]
        by = omt**3 * p0[1] + 3 * omt**2 * t * p1[1] + 3 * omt * t**2 * p2[1] + t**3 * p3[1]
        draw_brush(bx, by, radius, stroke_r, stroke_g, stroke_b)

    # Arrowhead: M 70 23 L 82 30 L 73 39
    def draw_line(x1, y1, x2, y2):
        dist = math.hypot(x2 - x1, y2 - y1)
        lsteps = max(1, int(dist * 2))
        for i in range(lsteps + 1):
            t = i / float(lsteps)
            lx = x1 + t * (x2 - x1)
            ly = y1 + t * (y2 - y1)
            draw_brush(lx, ly, radius, stroke_r, stroke_g, stroke_b)

    draw_line(tx(70), ty(23), tx(82), ty(30))
    draw_line(tx(82), ty(30), tx(73), ty(39))

    # Downsample from scale (2x) to target size
    final_rgba = bytearray(size * size * 4)
    for y in range(size):
        for x in range(size):
            r_acc, g_acc, b_acc, a_acc = 0, 0, 0, 0
            for dy in range(scale):
                for dx in range(scale):
                    sy = y * scale + dy
                    sx = x * scale + dx
                    idx = (sy * W + sx) * 4
                    r_acc += buf[idx]
                    g_acc += buf[idx+1]
                    b_acc += buf[idx+2]
                    a_acc += buf[idx+3]
            count = scale * scale
            out_idx = (y * size + x) * 4
            final_rgba[out_idx] = r_acc // count
            final_rgba[out_idx+1] = g_acc // count
            final_rgba[out_idx+2] = b_acc // count
            final_rgba[out_idx+3] = a_acc // count

    return create_png(size, size, final_rgba)

os.makedirs('/home/shubhrank_rastogi/WORKSPACE/my_projects/the_plastic_route/public/icons', exist_ok=True)
sizes = [72, 96, 128, 144, 152, 192, 384, 512]
for s in sizes:
    png = render_icon(s, is_maskable=False)
    path = f'/home/shubhrank_rastogi/WORKSPACE/my_projects/the_plastic_route/public/icons/icon-{s}x{s}.png'
    with open(path, 'wb') as f:
        f.write(png)
    print(f"Generated {path} ({len(png)} bytes)")

maskable_png = render_icon(512, is_maskable=True)
maskable_path = '/home/shubhrank_rastogi/WORKSPACE/my_projects/the_plastic_route/public/icons/icon-maskable-512x512.png'
with open(maskable_path, 'wb') as f:
    f.write(maskable_png)
print(f"Generated {maskable_path} ({len(maskable_png)} bytes)")
