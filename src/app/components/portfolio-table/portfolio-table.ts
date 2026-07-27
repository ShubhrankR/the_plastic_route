import { Component, inject } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CreditCard } from '../../models/card.model';

@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  templateUrl: './portfolio-table.html',
  styleUrl: './portfolio-table.css',
})
export class PortfolioTable {
  private readonly cardService = inject(CardService);
  protected readonly cards: CreditCard[] = this.cardService.getCards();
}
