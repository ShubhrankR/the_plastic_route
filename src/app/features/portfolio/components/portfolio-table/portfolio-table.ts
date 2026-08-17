import { Component, inject } from '@angular/core';
import { CardService } from '../../../../core/services/card.service';
import { CreditCard } from '../../../../core/models/card.model';

@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  templateUrl: './portfolio-table.html',
  styleUrl: './portfolio-table.css',
})
export class PortfolioTable {
  private readonly cardService = inject(CardService);
  protected readonly cards = this.cardService.cards;
}
