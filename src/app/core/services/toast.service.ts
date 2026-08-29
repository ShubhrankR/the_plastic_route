import { Injectable, signal } from '@angular/core';

export interface ToastConfig {
  id?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void | Promise<void>;
}

export interface ActiveToast extends ToastConfig {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  durationMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly currentToast = signal<ActiveToast | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(config: ToastConfig): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const toast: ActiveToast = {
      id: config.id ?? `toast_${Date.now()}`,
      message: config.message,
      type: config.type ?? 'info',
      durationMs: config.durationMs ?? 6000,
      actionLabel: config.actionLabel,
      onAction: config.onAction,
    };

    this.currentToast.set(toast);

    if (toast.durationMs > 0) {
      this.timer = setTimeout(() => {
        this.dismiss();
      }, toast.durationMs);
    }
  }

  dismiss(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentToast.set(null);
  }

  async triggerAction(): Promise<void> {
    const toast = this.currentToast();
    if (toast?.onAction) {
      const action = toast.onAction;
      this.dismiss();
      await action();
    }
  }
}
