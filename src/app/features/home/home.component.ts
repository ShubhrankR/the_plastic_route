import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly cardService = inject(CardService);

  readonly isExploreMode = this.cardService.isExploreMode;
  readonly userCardCount = this.cardService.userCardCount;
  readonly isLoaded = this.cardService.isLoaded;
}
