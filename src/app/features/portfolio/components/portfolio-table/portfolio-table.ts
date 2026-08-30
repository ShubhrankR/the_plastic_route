import { Component, inject, output } from '@angular/core';
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

  readonly cards = this.cardService.cards;
  readonly isExploreMode = this.cardService.isExploreMode;

  editCard = output<CreditCard>();
  deleteCard = output<string>();
  addCardRequested = output<void>();

  onEdit(card: CreditCard): void {
    this.editCard.emit(card);
  }

  onDelete(id: string): void {
    this.deleteCard.emit(id);
  }
}
