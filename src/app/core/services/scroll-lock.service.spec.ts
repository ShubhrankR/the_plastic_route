import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ScrollLockService } from './scroll-lock.service';

describe('ScrollLockService', () => {
  let service: ScrollLockService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollLockService],
    });
    service = TestBed.inject(ScrollLockService);
    doc = TestBed.inject(DOCUMENT);

    doc.body.style.overflow = '';
    doc.documentElement.style.overflow = '';
    doc.body.style.paddingRight = '';
    doc.body.classList.remove('modal-open');
    doc.documentElement.classList.remove('modal-open');
  });

  afterEach(() => {
    while (service.isLocked()) {
      service.unlock();
    }
    doc.body.style.overflow = '';
    doc.documentElement.style.overflow = '';
    doc.body.style.paddingRight = '';
    doc.body.classList.remove('modal-open');
    doc.documentElement.classList.remove('modal-open');
  });

  it('should be created and start unlocked', () => {
    expect(service).toBeTruthy();
    expect(service.isLocked()).toBe(false);
    expect(service.getLockCount()).toBe(0);
  });

  it('should lock both html and body overflow and add modal-open classes', () => {
    service.lock();

    expect(service.isLocked()).toBe(true);
    expect(service.getLockCount()).toBe(1);
    expect(doc.body.style.overflow).toBe('hidden');
    expect(doc.documentElement.style.overflow).toBe('hidden');
    expect(doc.body.classList.contains('modal-open')).toBe(true);
    expect(doc.documentElement.classList.contains('modal-open')).toBe(true);
  });

  it('should restore previous overflow and remove classes upon unlock', () => {
    doc.body.style.overflow = 'auto';
    doc.documentElement.style.overflow = 'auto';

    service.lock();
    expect(doc.body.style.overflow).toBe('hidden');
    expect(doc.documentElement.style.overflow).toBe('hidden');

    service.unlock();
    expect(service.isLocked()).toBe(false);
    expect(doc.body.style.overflow).toBe('auto');
    expect(doc.documentElement.style.overflow).toBe('auto');
    expect(doc.body.classList.contains('modal-open')).toBe(false);
    expect(doc.documentElement.classList.contains('modal-open')).toBe(false);
  });

  it('should support reference counting for nested/multiple modals', () => {
    service.lock();
    service.lock();
    expect(service.getLockCount()).toBe(2);
    expect(service.isLocked()).toBe(true);

    service.unlock();
    expect(service.getLockCount()).toBe(1);
    expect(service.isLocked()).toBe(true);
    expect(doc.body.style.overflow).toBe('hidden');

    service.unlock();
    expect(service.getLockCount()).toBe(0);
    expect(service.isLocked()).toBe(false);
    expect(doc.body.style.overflow).toBe('');
  });

  it('should not throw or go below 0 when calling unlock excessively', () => {
    expect(service.getLockCount()).toBe(0);
    service.unlock();
    expect(service.getLockCount()).toBe(0);
    expect(service.isLocked()).toBe(false);
  });
});
