import { Injectable, inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollLockService {
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  private lockCount = 0;
  private previousBodyOverflow = '';
  private previousHtmlOverflow = '';
  private previousBodyPaddingRight = '';

  /**
   * Locks scroll on <html> and <body> across all viewports and compensates
   * for scrollbar width to prevent horizontal layout shift/jumping.
   */
  lock(): void {
    this.lockCount++;

    if (this.lockCount === 1) {
      const doc = this.document;
      const html = doc.documentElement;
      const body = doc.body;

      if (!html || !body) return;

      // Calculate scrollbar width before applying overflow: hidden
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      const clientWidth = html.clientWidth || 0;
      const scrollbarWidth = Math.max(0, windowWidth - clientWidth);

      // Store existing overflow and padding states
      this.previousBodyOverflow = body.style.overflow;
      this.previousHtmlOverflow = html.style.overflow;
      this.previousBodyPaddingRight = body.style.paddingRight;

      // Compensate for disappearing scrollbar on desktop to prevent horizontal layout jump
      if (scrollbarWidth > 0 && typeof window !== 'undefined') {
        const computedStyle = window.getComputedStyle(body);
        const currentPaddingRight = parseFloat(computedStyle.paddingRight || '0') || 0;
        this.renderer.setStyle(body, 'padding-right', `${currentPaddingRight + scrollbarWidth}px`);
      }

      // Completely freeze background page on all viewport sizes
      this.renderer.setStyle(body, 'overflow', 'hidden');
      this.renderer.setStyle(html, 'overflow', 'hidden');
      this.renderer.addClass(body, 'modal-open');
      this.renderer.addClass(html, 'modal-open');
    }
  }

  /**
   * Releases scroll lock and restores original body and html overflow/padding states.
   */
  unlock(): void {
    if (this.lockCount <= 0) return;

    this.lockCount--;

    if (this.lockCount === 0) {
      const doc = this.document;
      const html = doc.documentElement;
      const body = doc.body;

      if (!html || !body) return;

      // Restore scrollbar padding compensation
      if (this.previousBodyPaddingRight) {
        this.renderer.setStyle(body, 'padding-right', this.previousBodyPaddingRight);
      } else {
        this.renderer.removeStyle(body, 'padding-right');
      }

      // Restore body overflow
      if (this.previousBodyOverflow) {
        this.renderer.setStyle(body, 'overflow', this.previousBodyOverflow);
      } else {
        this.renderer.removeStyle(body, 'overflow');
      }

      // Restore html overflow
      if (this.previousHtmlOverflow) {
        this.renderer.setStyle(html, 'overflow', this.previousHtmlOverflow);
      } else {
        this.renderer.removeStyle(html, 'overflow');
      }

      // Remove modal-open classes
      this.renderer.removeClass(body, 'modal-open');
      this.renderer.removeClass(html, 'modal-open');
    }
  }

  /**
   * Returns current active lock count.
   */
  getLockCount(): number {
    return this.lockCount;
  }

  /**
   * Returns true if scroll is currently locked.
   */
  isLocked(): boolean {
    return this.lockCount > 0;
  }
}
