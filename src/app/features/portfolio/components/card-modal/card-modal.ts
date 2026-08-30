import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CreditCard,
  MasterCatalogCard,
  CardNetwork,
  SpendCategory,
} from '../../../../core/models/card.model';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-modal.html',
  styleUrl: './card-modal.css',
})
export class CardModal implements OnInit {
  cardToEdit = input<CreditCard | null>(null);
  masterCatalog = input<MasterCatalogCard[]>([]);

  close = output<void>();
  save = output<CreditCard>();
  quickAdd = output<{ catalogId: string; billingStart: number; billingEnd: number }>();

  // Mode: 'quick' or 'custom'
  activeTab = signal<'quick' | 'custom'>('quick');

  // Quick-Add fields
  selectedCatalogId = signal<string>('');
  quickBillingStart = signal<number>(1);
  quickBillingEnd = signal<number>(30);

  // Custom / Edit Form Fields
  id = signal<string>('');
  name = signal<string>('');
  bank = signal<string>('');
  network = signal<CardNetwork>('Visa');
  billingCycleStart = signal<number>(1);
  billingCycleEnd = signal<number>(30);
  optimizationVector = signal<string>('');
  regulatoryUpdate = signal<string>('');
  loungeEligible = signal<boolean>(false);
  loungeSpendThreshold = signal<number>(0);
  loungeTerminals = signal<string>('Domestic');

  readonly networks: CardNetwork[] = ['Visa', 'Mastercard', 'RuPay', 'Amex', 'Diners Club'];

  ngOnInit(): void {
    const editData = this.cardToEdit();
    if (editData) {
      this.activeTab.set('custom');
      this.id.set(editData.id);
      this.name.set(editData.name);
      this.bank.set(editData.bank ?? '');
      this.network.set(editData.network);
      this.billingCycleStart.set(editData.billingCycleStart);
      this.billingCycleEnd.set(editData.billingCycleEnd);
      this.optimizationVector.set(editData.optimizationVector);
      this.regulatoryUpdate.set(editData.regulatoryUpdate ?? '');
      this.loungeEligible.set(editData.loungeAccess?.eligible ?? false);
      this.loungeSpendThreshold.set(editData.loungeAccess?.spendThreshold ?? 0);
      this.loungeTerminals.set(editData.loungeAccess?.terminals?.join(', ') ?? 'Domestic');
    } else if (this.masterCatalog().length > 0) {
      const first = this.masterCatalog()[0];
      this.selectedCatalogId.set(first.id);
      this.quickBillingStart.set(first.defaultBillingStart ?? 1);
      this.quickBillingEnd.set(first.defaultBillingEnd ?? 30);
    }
  }

  onCatalogSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const catId = target.value;
    this.selectedCatalogId.set(catId);
    const found = this.masterCatalog().find((c) => c.id === catId);
    if (found) {
      this.quickBillingStart.set(found.defaultBillingStart ?? 1);
      this.quickBillingEnd.set(found.defaultBillingEnd ?? 30);
    }
  }

  getSelectedCatalogCard(): MasterCatalogCard | undefined {
    return this.masterCatalog().find((c) => c.id === this.selectedCatalogId());
  }

  onQuickAddSubmit(): void {
    if (!this.selectedCatalogId()) return;
    this.quickAdd.emit({
      catalogId: this.selectedCatalogId(),
      billingStart: Number(this.quickBillingStart()),
      billingEnd: Number(this.quickBillingEnd()),
    });
    this.close.emit();
  }

  onCustomSave(): void {
    if (!this.name() || !this.billingCycleStart()) return;

    const terminals = this.loungeTerminals()
      ? this.loungeTerminals()
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : ['Domestic'];

    const card: CreditCard = {
      id: this.id() || `custom_${Date.now()}`,
      name: this.name().trim(),
      bank: this.bank().trim() || undefined,
      network: this.network(),
      billingCycleStart: Math.min(31, Math.max(1, Number(this.billingCycleStart()))),
      billingCycleEnd: Math.min(31, Math.max(1, Number(this.billingCycleEnd()))),
      optimizationVector: this.optimizationVector().trim() || 'Custom optimization rules.',
      regulatoryUpdate: this.regulatoryUpdate().trim(),
      loungeAccess: {
        eligible: this.loungeEligible(),
        spendThreshold: this.loungeEligible() ? Number(this.loungeSpendThreshold()) : undefined,
        terminals: this.loungeEligible() ? terminals : undefined,
      },
      isCustom: true,
    };

    this.save.emit(card);
    this.close.emit();
  }
}
