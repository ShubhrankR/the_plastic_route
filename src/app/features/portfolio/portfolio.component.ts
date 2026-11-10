import { Component, inject, signal } from '@angular/core';
import { CardService } from '../../core/services/card.service';
import { CreditCard } from '../../core/models/card.model';
import { PortfolioTable } from './components/portfolio-table/portfolio-table';
import { CardModal } from './components/card-modal/card-modal';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [PortfolioTable, CardModal],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  private readonly cardService = inject(CardService);

  readonly cards = this.cardService.cards;
  readonly masterCatalog = this.cardService.masterCatalog;
  readonly isExploreMode = this.cardService.isExploreMode;

  showModal = signal<boolean>(false);
  cardToEdit = signal<CreditCard | null>(null);

  /** Whether developer controls should be exposed (via ?seed=owner or ?dev=true). */
  readonly isDeveloperMode = signal<boolean>(
    typeof window !== 'undefined' &&
      (window.location.search.includes('seed=owner') ||
        window.location.search.includes('dev=true') ||
        window.location.hash.includes('seed=owner') ||
        window.location.hash.includes('dev=true')),
  );

  openAddModal(): void {
    this.cardToEdit.set(null);
    this.showModal.set(true);
  }

  openEditModal(card: CreditCard): void {
    this.cardToEdit.set(card);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.cardToEdit.set(null);
  }

  async handleSave(card: CreditCard): Promise<void> {
    if (this.cardToEdit()) {
      await this.cardService.updateCard(card);
    } else {
      await this.cardService.addCard(card);
    }
    this.closeModal();
  }

  async handleQuickAdd(data: {
    catalogId: string;
    billingStart: number;
    billingEnd: number;
  }): Promise<void> {
    await this.cardService.quickAddFromCatalog(data.catalogId, data.billingStart, data.billingEnd);
    this.closeModal();
  }

  async handleDelete(id: string): Promise<void> {
    await this.cardService.deleteCard(id);
  }

  async handleClearWallet(): Promise<void> {
    const confirmed = window.confirm(
      'Are you sure you want to clear your wallet? This removes all cards from your local IndexedDB storage.',
    );
    if (confirmed) {
      await this.cardService.clearWallet();
    }
  }

  handleExport(): void {
    this.cardService.exportWallet();
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    try {
      const text = await file.text();
      await this.cardService.importWallet(text);
    } catch {
      // Handled via toast in service
    } finally {
      input.value = '';
    }
  }

  async handleLoadOwnerSeed(): Promise<void> {
    await this.cardService.loadOwnerSeed();
  }

  handleLoadExplore(): void {
    this.cardService.loadExploreCatalog();
  }
}
