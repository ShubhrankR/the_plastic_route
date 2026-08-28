import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { CardService } from '../../../core/services/card.service';

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

  protected readonly theme = this.themeService.theme;
  protected readonly isExploreMode = this.cardService.isExploreMode;
  protected readonly userCardCount = this.cardService.userCardCount;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
