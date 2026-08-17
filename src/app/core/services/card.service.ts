import { Injectable, inject, signal } from '@angular/core';
import {
  CreditCard,
  OptimizationResult,
  BillingCycleStatus,
  SpendCategory,
  CategoryOption,
} from '../models/card.model';
import cardsData from '../data/cards.json';
import { IndexedDBService } from './indexed-db.service';

/**
 * Category-to-card mapping.
 * Each category maps to a primary and backup card ID.
 */
const CATEGORY_MAP: Record<SpendCategory, { primaryId: string; backupId: string }> = {
  amazon:        { primaryId: 'amazon_pay_icici',   backupId: 'federal_one_metal' },
  flipkart:      { primaryId: 'sbi_flipkart',       backupId: 'federal_one_metal' },
  bpcl:          { primaryId: 'sbi_bpcl_octane',     backupId: 'hdfc_indian_oil' },
  other_fuel:    { primaryId: 'hdfc_indian_oil',     backupId: 'sbi_bpcl_octane' },
  upi:           { primaryId: 'yes_bank_rupay',      backupId: 'hdfc_indian_oil' },
  forex:         { primaryId: 'bobcard_scapia',      backupId: 'federal_one_metal' },
  dining_travel: { primaryId: 'idfc_first_wealth',   backupId: 'federal_one_metal' },
  gaming_wallet: { primaryId: 'federal_one_metal',   backupId: 'idfc_first_wealth' },
  general:       { primaryId: 'idfc_first_wealth',   backupId: 'federal_one_metal' },
};

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly indexedDB = inject(IndexedDBService);
  private readonly defaultCards: CreditCard[] = cardsData as CreditCard[];

  /** Reactive signal holding the current credit card portfolio. */
  readonly cards = signal<CreditCard[]>(this.defaultCards);

  constructor() {
    this.loadCards();
  }

  /** Load cards from IndexedDB, falling back to static cards.json. */
  private async loadCards(): Promise<void> {
    try {
      await this.indexedDB.seedDefaultCards(this.defaultCards);
      const userCards = await this.indexedDB.getAllCards();
      if (userCards && userCards.length > 0) {
        this.cards.set(userCards);
      }
    } catch {
      // Fallback to static cards.json
      this.cards.set(this.defaultCards);
    }
  }

  /** All available spend categories for the dropdown. */
  readonly categories: CategoryOption[] = [
    { value: 'amazon',        label: 'Amazon Shopping & Amazon Pay' },
    { value: 'flipkart',      label: 'Flipkart / Myntra / Cleartrip' },
    { value: 'bpcl',          label: 'Fuel (BPCL Pumps in Bengaluru)' },
    { value: 'other_fuel',    label: 'Fuel (Other Pumps)' },
    { value: 'upi',           label: 'Street Vendors / UPI QR Scans' },
    { value: 'forex',         label: 'International Travel / USD Subscriptions' },
    { value: 'dining_travel', label: 'Dining Out & Flight Bookings' },
    { value: 'gaming_wallet', label: 'Online Gaming / Wallet Reloads' },
    { value: 'general',       label: 'General Offline / Catch-All' },
  ];

  /** Returns the full card portfolio. */
  getCards(): CreditCard[] {
    return this.cards();
  }

  /** Find a card by its ID. */
  findCard(id: string): CreditCard | undefined {
    return this.cards().find(c => c.id === id);
  }

  /**
   * Runs the spend optimization logic for a given category.
   * Returns the best card, backup card, interest-free days, and due date.
   */
  getOptimalRoute(category: SpendCategory): OptimizationResult {
    const currentCards = this.cards();
    const route = CATEGORY_MAP[category] ?? CATEGORY_MAP['general'];

    const bestCard = this.findCard(route.primaryId) ?? currentCards[0];
    const backupCard = this.findCard(route.backupId) ?? currentCards[1] ?? currentCards[0];

    const today = new Date();
    const currentDay = today.getDate();

    // Calculate days until next bill is generated
    let daysUntilBill = bestCard.billingCycleStart - currentDay;
    if (daysUntilBill <= 0) {
      daysUntilBill += 30; // Approximation for month rollover
    }
    const interestFreeDays = daysUntilBill + 20; // Add grace period

    // Calculate due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interestFreeDays);

    const reason = bestCard.optimizationVector;

    return {
      bestCard,
      backupCard,
      interestFreeDays,
      dueDate,
      reason,
    };
  }

  /**
   * Calculates the billing cycle status for a given statement day.
   */
  calculateBillingCycleStatus(cardName: string, statementDay: number): BillingCycleStatus {
    const today = new Date();
    const currentDay = today.getDate();

    let targetCycle: 'Current Bill' | 'Next Bill';
    let daysLeft: number;
    let severity: 'danger' | 'warning' | 'success';

    if (currentDay <= statementDay) {
      targetCycle = 'Current Bill';
      daysLeft = statementDay - currentDay;
      severity = daysLeft <= 3 ? 'danger' : 'warning';
    } else {
      targetCycle = 'Next Bill';
      const nextStmtDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        statementDay
      );
      const timeDiff = nextStmtDate.getTime() - today.getTime();
      daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      severity = 'success';
    }

    return { cardName, statementDay, targetCycle, daysLeft, severity };
  }

  /**
   * Returns billing cycle statuses for all cards in the portfolio.
   */
  getAllBillingCycleStatuses(): BillingCycleStatus[] {
    return this.cards().map(card =>
      this.calculateBillingCycleStatus(card.name, card.billingCycleStart)
    );
  }
}
