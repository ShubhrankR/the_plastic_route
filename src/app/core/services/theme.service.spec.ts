import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default dark theme when no storage preference exists', () => {
    expect(service.theme()).toBe('dark');
  });

  it('should toggle theme between dark and light', () => {
    expect(service.theme()).toBe('dark');

    service.toggleTheme();
    expect(service.theme()).toBe('light');

    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });
});
