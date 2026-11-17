import { Component, inject, signal, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../core/services/theme.service';
import { CardService } from '../../../core/services/card.service';
import { PwaService } from '../../../core/services/pwa.service';
import { ScrollLockService } from '../../../core/services/scroll-lock.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly cardService = inject(CardService);
  private readonly pwaService = inject(PwaService);
  private readonly router = inject(Router);
  private readonly scrollLock = inject(ScrollLockService);

  protected readonly theme = this.themeService.theme;
  protected readonly isExploreMode = this.cardService.isExploreMode;
  protected readonly userCardCount = this.cardService.userCardCount;
  protected readonly hasCompletedOnboarding = this.cardService.hasCompletedOnboarding;
  protected readonly canInstall = this.pwaService.canInstall;

  // Mobile navigation state
  readonly isMobileMenuOpen = signal<boolean>(false);

  constructor() {
    // Automatically close mobile menu on route change
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.closeMobileMenu();
      });
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
    this.scrollLock.lock();
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      this.scrollLock.unlock();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Cleanly close mobile menu and reset toggle state when expanding past mobile/tablet breakpoint
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  installPwa(): void {
    this.pwaService.promptInstall();
  }

  ngOnDestroy(): void {
    this.closeMobileMenu();
  }
}
