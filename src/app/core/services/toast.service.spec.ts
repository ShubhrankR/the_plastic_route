import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with null active toast', () => {
    expect(service.currentToast()).toBeNull();
  });

  it('should display a toast and update reactive signal', () => {
    service.show({
      message: 'Card added successfully',
      type: 'success',
      durationMs: 3000,
    });

    const active = service.currentToast();
    expect(active).not.toBeNull();
    expect(active?.message).toBe('Card added successfully');
    expect(active?.type).toBe('success');
  });

  it('should auto-dismiss toast after durationMs', () => {
    service.show({
      message: 'Auto dismiss me',
      type: 'info',
      durationMs: 2000,
    });

    expect(service.currentToast()).not.toBeNull();
    vi.advanceTimersByTime(2050);
    expect(service.currentToast()).toBeNull();
  });

  it('should dismiss manually when dismiss() is called', () => {
    service.show({ message: 'Close me now', type: 'warning' });
    expect(service.currentToast()).not.toBeNull();

    service.dismiss();
    expect(service.currentToast()).toBeNull();
  });

  it('should execute toast action and dismiss when triggerAction() is called', async () => {
    const actionSpy = vi.fn().mockResolvedValue(undefined);

    service.show({
      message: 'Card deleted',
      actionLabel: 'Undo',
      onAction: actionSpy,
    });

    await service.triggerAction();
    expect(actionSpy).toHaveBeenCalled();
    expect(service.currentToast()).toBeNull();
  });
});
