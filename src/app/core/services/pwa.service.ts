import { Injectable, inject, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { ToastService } from './toast.service';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly toastService = inject(ToastService);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  /** Whether the app can be installed via browser native prompt. */
  readonly canInstall = signal<boolean>(false);

  /** Whether the app is currently running in standalone (installed PWA) mode. */
  readonly isStandalone = signal<boolean>(false);

  constructor() {
    this.checkStandaloneMode();
    this.listenForInstallPrompt();
    this.checkForUpdates();
  }

  private checkStandaloneMode(): void {
    if (typeof window === 'undefined') return;

    const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone =
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    this.isStandalone.set(Boolean(isStandaloneDisplay || isIosStandalone));
  }

  private listenForInstallPrompt(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent default mini-infobar on mobile
      event.preventDefault();
      this.deferredPrompt = event as BeforeInstallPromptEvent;
      this.canInstall.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.canInstall.set(false);
      this.isStandalone.set(true);

      this.toastService.show({
        message: 'The Plastic Route was successfully installed on your device! 🎉',
        type: 'success',
        durationMs: 4000,
      });
    });
  }

  private checkForUpdates(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        this.toastService.show({
          message: 'A newer version is ready. Reload to update!',
          type: 'info',
          durationMs: 10000,
          actionLabel: '🔄 Reload',
          onAction: () => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          },
        });
      });
  }

  /**
   * Prompts the user to install the PWA.
   */
  async promptInstall(): Promise<void> {
    if (!this.deferredPrompt) return;

    await this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      this.canInstall.set(false);
    }
    this.deferredPrompt = null;
  }
}
