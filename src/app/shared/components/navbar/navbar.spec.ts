import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Navbar } from './navbar';

describe('Navbar Component', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let doc: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        {
          provide: SwUpdate,
          useValue: { isEnabled: false, versionUpdates: of() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    doc = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component) {
      component.closeMobileMenu();
    }
    if (doc?.body) {
      doc.body.classList.remove('modal-open');
      doc.body.style.overflow = '';
      doc.body.style.paddingRight = '';
    }
    if (doc?.documentElement) {
      doc.documentElement.classList.remove('modal-open');
      doc.documentElement.style.overflow = '';
    }
  });

  it('should create the Navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobile menu closed by default', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should toggle mobile menu open and closed', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);
    expect(doc.body.classList.contains('modal-open')).toBe(true);
    expect(doc.body.style.overflow).toBe('hidden');
    expect(doc.documentElement.style.overflow).toBe('hidden');

    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
    expect(doc.body.classList.contains('modal-open')).toBe(false);
    expect(doc.body.style.overflow).toBe('');
    expect(doc.documentElement.style.overflow).toBe('');
  });

  it('should close mobile menu on escape key', () => {
    component.openMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);

    component.onEscape();
    expect(component.isMobileMenuOpen()).toBe(false);
    expect(doc.body.classList.contains('modal-open')).toBe(false);
  });

  it('should close mobile menu on window resize above 768px', () => {
    component.openMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);

    // Mock window innerWidth > 768
    const originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });

    component.onResize();
    expect(component.isMobileMenuOpen()).toBe(false);

    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true });
  });
});
