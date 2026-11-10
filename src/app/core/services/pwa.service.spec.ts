import { TestBed } from '@angular/core/testing';
import { PwaService } from './pwa.service';
import { SwUpdate } from '@angular/service-worker';
import { ToastService } from './toast.service';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PwaService', () => {
  let service: PwaService;
  let mockSwUpdate: Partial<SwUpdate>;
  let mockToast: Partial<ToastService>;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    mockSwUpdate = {
      isEnabled: false,
      versionUpdates: of(),
      checkForUpdate: vi.fn().mockResolvedValue(false),
      activateUpdate: vi.fn().mockResolvedValue(true),
    };

    mockToast = {
      show: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PwaService,
        { provide: SwUpdate, useValue: mockSwUpdate },
        { provide: ToastService, useValue: mockToast },
      ],
    });

    service = TestBed.inject(PwaService);
  });

  it('should initialize and check standalone mode', () => {
    expect(service).toBeDefined();
    expect(service.canInstall()).toBe(false);
  });

  it('should capture beforeinstallprompt and set canInstall to true', () => {
    const mockPromptEvent = new Event('beforeinstallprompt');
    (mockPromptEvent as any).prompt = vi.fn().mockResolvedValue(undefined);
    (mockPromptEvent as any).userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' });

    window.dispatchEvent(mockPromptEvent);
    expect(service.canInstall()).toBe(true);
  });

  it('should handle appinstalled event and reset canInstall', () => {
    window.dispatchEvent(new Event('appinstalled'));
    expect(service.canInstall()).toBe(false);
    expect(service.isStandalone()).toBe(true);
    expect(mockToast.show).toHaveBeenCalled();
  });
});
