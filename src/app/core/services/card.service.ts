import { Injectable, inject, signal, computed } from '@angular/core';
import {
  CreditCard,
  MasterCatalogCard,
  OptimizationResult,
  BillingCycleStatus,
  SpendCategory,
  CategoryOption,
} from '../models/card.model';
import catalogData from '../data/cards.json';
import ownerSeedData from '../data/owner_portfolio.json';
import { IndexedDBService } from './indexed-db.service';

/**
 * Category-to-card ID fallback mapping for standard recommendation routes.
 */
const CATEGORY_PRIORITY_MAP: Record<SpendCategory, string[]> = {
  amazon: ['amazon_pay_icici', 'hdfc_millennia', 'sbi_cashback', 'hdfc_infinia', 'federal_one_metal'],
  flipkart: ['sbi_flipkart', 'hdfc_millennia', 'sbi_cashback', 'hdfc_infinia', 'federal_one_metal'],
  bpcl: ['sbi_bpcl_octane', 'hdfc_indian_oil', 'federal_one_metal'],
  other_fuel: ['hdfc_indian_oil', 'sbi_bpcl_octane', 'federal_one_metal'],
  upi: ['yes_bank_rupay', 'tata_neu_infinity', 'hdfc_indian_oil', 'federal_one_metal'],
  forex: ['bobcard_scapia', 'axis_atlas', 'idfc_first_wealth', 'hdfc_infinia', 'federal_one_metal'],
  dining_travel: ['idfc_first_wealth', 'hdfc_infinia', 'axis_atlas', 'icici_sapphiro', 'amex_platinum_travel', 'federal_one_metal'],
  gaming_wallet: ['federal_one_metal', 'axis_ace', 'amex_mrcc', 'idfc_first_wealth'],
  general: ['idfc_first_wealth', 'hdfc_infinia', 'sbi_cashback', 'axis_ace', 'federal_one_metal', 'federal_imperio'],
};

/** Approximate savings rate multipliers for estimation */
const CATEGORY_SAVINGS_MULTIPLIER: Record<SpendCategory, number> = {
  amazon: 0.05,
  flipkart: 0.05,
  bpcl: 0.0725,
  other_fuel: 0.05,
  upi: 0.015,
  forex: 0.035,
  dining_travel: 0.10,
  gaming_wallet: 0.02,
  general: 0.015,
};

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly indexedDB = inject(IndexedDBService);

  /** Master catalog of available credit card templates. */
  readonly masterCatalog = signal<MasterCatalogCard[]>(catalogData as MasterCatalogCard[]);

  /** Active user cards in the local wallet (or demo cards if in Explore Mode). */
  readonly cards = signal<CreditCard[]>([]);

  /** Whether the user is currently browsing the demo Master Catalog. */
  readonly isExploreMode = signal<boolean>(false);

  /** Whether initialization from IndexedDB or URL params has completed. */
  readonly isLoaded = signal<boolean>(false);

  /** Total number of cards currently in the active wallet. */
  readonly userCardCount = computed(() => this.cards().length);

  /** All available spend categories for forms and selectors. */
  readonly categories: CategoryOption[] = [
    { value: 'amazon',        label: 'Amazon Shopping & Amazon Pay' },
    { value: 'flipkart',      label: 'Flipkart / Myntra / Cleartrip' },
    { value: 'bpcl',          label: 'Fuel (BPCL Pumps in Bengaluru)' },
    { value: 'other_fuel',    label: 'Fuel (Other Pumps / IOCL)' },
    { value: 'upi',           label: 'Street Vendors / UPI QR Scans' },
    { value: 'forex',         label: 'International Travel / USD Subscriptions' },
    { value: 'dining_travel', label: 'Dining Out & Flight Bookings' },
    { value: 'gaming_wallet', label: 'Online Gaming / Wallet Reloads' },
    { value: 'general',       label: 'General Offline / Catch-All' },
  ];

  constructor() {
    this.initPortfolio();
  }

  /**
   * Initializes the card portfolio.
   * 1. Checks URL query params for `?seed=owner`
   * 2. Checks IndexedDB for existing user cards
   * 3. If neither exists, defaults to Explore Mode with Master Catalog demo entries.
   */
  async initPortfolio(): Promise<void> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = window.location.hash.includes('?')
        ? new URLSearchParams(window.location.hash.split('?')[1])
        : null;

      const hasOwnerSeed = urlParams.get('seed') === 'owner' || hashParams?.get('seed') === 'owner';

      if (hasOwnerSeed) {
        await this.loadOwnerSeed();
        this.isLoaded.set(true);
        return;
      }

      const storedCards = await this.indexedDB.getAllCards();
      if (storedCards && storedCards.length > 0) {
        this.cards.set(storedCards);
        this.isExploreMode.set(false);
      } else {
        // First visit with empty IndexedDB -> activate Explore Mode with demo cards
        this.loadExploreCatalog();
      }
    } catch (err) {
      console.warn('Portfolio initialization fallback to explore mode:', err);
      this.loadExploreCatalog();
    } finally {
      this.isLoaded.set(true);
    }
  }

  /**
   * Loads the owner's personal 10-card portfolio into IndexedDB.
   */
  async loadOwnerSeed(): Promise<void> {
    const catalog = this.masterCatalog();
    const seededCards: CreditCard[] = [];

    for (const seed of ownerSeedData) {
      const template = catalog.find(c => c.id === seed.id);
      if (template) {
        seededCards.push({
          id: template.id,
          name: template.name,
          bank: template.bank,
          network: template.network,
          optimizationVector: template.optimizationVector,
          billingCycleStart: seed.billingCycleStart,
          billingCycleEnd: seed.billingCycleEnd,
          loungeAccess: template.loungeAccess,
          regulatoryUpdate: template.regulatoryUpdate,
          categories: template.categories,
          isCustom: false,
        });
      }
    }

    await this.indexedDB.clearAllCards();
    await this.indexedDB.saveCards(seededCards);
    this.cards.set(seededCards);
    this.isExploreMode.set(false);
  }

  /**
   * Activates Explore Mode by populating the cards signal with demo catalog entries (read-only).
   */
  loadExploreCatalog(): void {
    const catalog = this.masterCatalog();
    const demoCards: CreditCard[] = catalog.slice(0, 10).map(item => ({
      id: item.id,
      name: item.name,
      bank: item.bank,
      network: item.network,
      optimizationVector: item.optimizationVector,
      billingCycleStart: item.defaultBillingStart ?? 1,
      billingCycleEnd: item.defaultBillingEnd ?? 30,
      loungeAccess: item.loungeAccess,
      regulatoryUpdate: item.regulatoryUpdate,
      categories: item.categories,
      isCustom: false,
    }));

    this.cards.set(demoCards);
    this.isExploreMode.set(true);
  }

  /**
   * Saves a new or edited card to IndexedDB and updates the reactive signal.
   */
  async addCard(card: CreditCard): Promise<void> {
    if (this.isExploreMode()) {
      // Transition out of Explore Mode: clear demo state
      await this.indexedDB.clearAllCards();
      await this.indexedDB.saveCard(card);
      this.cards.set([card]);
      this.isExploreMode.set(false);
      return;
    }

    await this.indexedDB.saveCard(card);
    this.cards.update(list => {
      const filtered = list.filter(c => c.id !== card.id);
      return [...filtered, card];
    });
    this.isExploreMode.set(false);
  }

  /**
   * Updates an existing card in IndexedDB and the reactive state.
   */
  async updateCard(card: CreditCard): Promise<void> {
    await this.indexedDB.saveCard(card);
    this.cards.update(list => list.map(c => (c.id === card.id ? card : c)));
    this.isExploreMode.set(false);
  }

  /**
   * Deletes a card from IndexedDB and updates the reactive state.
   */
  async deleteCard(id: string): Promise<void> {
    await this.indexedDB.deleteCard(id);
    this.cards.update(list => list.filter(c => c.id !== id));
  }

  /**
   * Quick-adds a card from the Master Catalog with user-provided billing dates.
   */
  async quickAddFromCatalog(catalogId: string, billingStart?: number, billingEnd?: number): Promise<void> {
    const template = this.masterCatalog().find(c => c.id === catalogId);
    if (!template) return;

    const start = billingStart ?? template.defaultBillingStart ?? 1;
    const end = billingEnd ?? template.defaultBillingEnd ?? (start > 1 ? start - 1 : 30);

    const newCard: CreditCard = {
      id: `${template.id}_${Date.now()}`,
      name: template.name,
      bank: template.bank,
      network: template.network,
      optimizationVector: template.optimizationVector,
      billingCycleStart: start,
      billingCycleEnd: end,
      loungeAccess: template.loungeAccess,
      regulatoryUpdate: template.regulatoryUpdate,
      categories: template.categories,
      isCustom: false,
    };

    await this.addCard(newCard);
  }

  /**
   * Clears the user's local wallet completely.
   */
  async clearWallet(): Promise<void> {
    await this.indexedDB.clearAllCards();
    this.cards.set([]);
    this.isExploreMode.set(false);
  }

  /** Returns all active cards in the wallet. */
  getCards(): CreditCard[] {
    return this.cards();
  }

  /** Find a card by its ID in current wallet. */
  findCard(id: string): CreditCard | undefined {
    return this.cards().find(c => c.id === id);
  }

  /**
   * Runs the spend optimization algorithm.
   * Dynamically checks the user's active wallet against the requested category.
   */
  getOptimalRoute(category: SpendCategory, amount?: number): OptimizationResult {
    const currentCards = this.cards();
    const fallbackCatalog = this.masterCatalog();

    if (currentCards.length === 0) {
      // Wallet empty: fall back to master catalog representation
      const demoCard: CreditCard = {
        id: fallbackCatalog[0].id,
        name: fallbackCatalog[0].name,
        bank: fallbackCatalog[0].bank,
        network: fallbackCatalog[0].network,
        optimizationVector: fallbackCatalog[0].optimizationVector,
        billingCycleStart: fallbackCatalog[0].defaultBillingStart ?? 1,
        billingCycleEnd: fallbackCatalog[0].defaultBillingEnd ?? 30,
        loungeAccess: fallbackCatalog[0].loungeAccess,
        regulatoryUpdate: fallbackCatalog[0].regulatoryUpdate,
      };

      return {
        bestCard: demoCard,
        backupCard: demoCard,
        interestFreeDays: 45,
        dueDate: new Date(Date.now() + 45 * 86400000),
        reason: demoCard.optimizationVector,
      };
    }

    const priorityList = CATEGORY_PRIORITY_MAP[category] ?? CATEGORY_PRIORITY_MAP['general'];

    // 1. Find cards in wallet matching category priorities
    const matchedCards: CreditCard[] = [];
    for (const priorityId of priorityList) {
      const match = currentCards.find(c => c.id === priorityId || c.id.startsWith(priorityId));
      if (match && !matchedCards.includes(match)) {
        matchedCards.push(match);
      }
    }

    // 2. Also check if user has custom cards explicitly tagged with this category
    for (const card of currentCards) {
      if (card.categories?.includes(category) && !matchedCards.includes(card)) {
        matchedCards.push(card);
      }
    }

    // 3. Fallback to any available cards
    const bestCard = matchedCards[0] ?? currentCards[0];
    const backupCard = matchedCards[1] ?? currentCards[1] ?? bestCard;

    const today = new Date();
    const currentDay = today.getDate();

    // Calculate days until next bill is generated
    let daysUntilBill = bestCard.billingCycleStart - currentDay;
    if (daysUntilBill <= 0) {
      daysUntilBill += 30; // Approximation for monthly cycle rollover
    }
    const interestFreeDays = daysUntilBill + 20; // 20-day grace period

    // Calculate estimated due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interestFreeDays);

    const reason = bestCard.optimizationVector;

    let estimatedSaving: number | undefined;
    if (amount && amount > 0) {
      const multiplier = CATEGORY_SAVINGS_MULTIPLIER[category] ?? 0.015;
      estimatedSaving = Math.round(amount * multiplier);
    }

    return {
      bestCard,
      backupCard,
      interestFreeDays,
      dueDate,
      reason,
      estimatedSaving,
    };
  }

  /**
   * Calculates billing cycle status for a specific statement day.
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
   * Returns billing cycle statuses for all cards in the active wallet.
   */
  getAllBillingCycleStatuses(): BillingCycleStatus[] {
    return this.cards().map(card =>
      this.calculateBillingCycleStatus(card.name, card.billingCycleStart)
    );
  }
}
