import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { describe, it, expect, beforeEach } from 'vitest';
import { CardModal } from './card-modal';

describe('CardModal Component', () => {
  let component: CardModal;
  let fixture: ComponentFixture<CardModal>;
  let doc: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CardModal);
    component = fixture.componentInstance;
    doc = TestBed.inject(DOCUMENT);
  });

  it('should create the CardModal component', () => {
    expect(component).toBeTruthy();
  });

  it('should lock body scroll when initialized', () => {
    doc.body.style.overflow = '';
    doc.documentElement.style.overflow = '';
    fixture.detectChanges();

    expect(doc.body.style.overflow).toBe('hidden');
    expect(doc.documentElement.style.overflow).toBe('hidden');
    expect(doc.body.classList.contains('modal-open')).toBe(true);
    expect(doc.documentElement.classList.contains('modal-open')).toBe(true);
  });

  it('should restore body scroll when component is destroyed', () => {
    doc.body.style.overflow = '';
    doc.documentElement.style.overflow = '';
    fixture.detectChanges();

    expect(doc.body.style.overflow).toBe('hidden');
    expect(doc.documentElement.style.overflow).toBe('hidden');
    expect(doc.body.classList.contains('modal-open')).toBe(true);
    expect(doc.documentElement.classList.contains('modal-open')).toBe(true);

    fixture.destroy();

    expect(doc.body.style.overflow).toBe('');
    expect(doc.documentElement.style.overflow).toBe('');
    expect(doc.body.classList.contains('modal-open')).toBe(false);
    expect(doc.documentElement.classList.contains('modal-open')).toBe(false);
  });

  it('should emit close on Escape key press', () => {
    let closed = false;
    component.close.subscribe(() => {
      closed = true;
    });

    component.onEscape();
    expect(closed).toBe(true);
  });
});
