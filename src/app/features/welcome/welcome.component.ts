import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../core/services/card.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  private readonly cardService = inject(CardService);
  private readonly router = inject(Router);

  async chooseExplore(): Promise<void> {
    await this.cardService.completeOnboarding('explore');
    await this.router.navigate(['/home']);
  }

  async chooseCustom(): Promise<void> {
    await this.cardService.completeOnboarding('custom');
    await this.router.navigate(['/portfolio']);
  }
}
