import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() revealClass = 'is-revealed';
  @Input() delay = '';
  @Input() threshold = 0.12;

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const nativeEl = this.el.nativeElement as HTMLElement;

    // Check for prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      nativeEl.classList.add(this.revealClass);
      return;
    }

    nativeEl.classList.add('reveal-on-scroll');
    if (this.delay) {
      nativeEl.style.transitionDelay = this.delay;
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              nativeEl.classList.add(this.revealClass);
              // One-shot unobserve to save CPU and battery in PWA / mobile mode
              this.observer?.unobserve(nativeEl);
              this.observer?.disconnect();
              this.observer = null;
            }
          }
        },
        {
          threshold: this.threshold,
          rootMargin: '0px 0px -40px 0px',
        },
      );

      this.observer.observe(nativeEl);
    } else {
      nativeEl.classList.add(this.revealClass);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
