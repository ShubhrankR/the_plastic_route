import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { CardService } from '../../../core/services/card.service';
import { PwaService } from '../../../core/services/pwa.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly themeService = inject(ThemeService);
  private readonly cardService = inject(CardService);
  private readonly pwaService = inject(PwaService);

  protected readonly theme = this.themeService.theme;
  protected readonly isExploreMode = this.cardService.isExploreMode;
  protected readonly userCardCount = this.cardService.userCardCount;
  protected readonly hasCompletedOnboarding = this.cardService.hasCompletedOnboarding;
  protected readonly canInstall = this.pwaService.canInstall;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  installPwa(): void {
    this.pwaService.promptInstall();
  }
}
