import { Injectable, inject, signal, computed } from '@angular/core';
import {
  CreditCard,
  MasterCatalogCard,
  OptimizationResult,
  BillingCycleStatus,
  SpendCategory,
  CategoryOption,
  WalletBackupPayload,
  AirportInfo,
  ForexDetails,
} from '../models/card.model';
import catalogData from '../data/cards.json';
import ownerSeedData from '../data/owner_portfolio.json';
import airportsData from '../data/airports.json';
import { IndexedDBService } from './indexed-db.service';
import { ToastService } from './toast.service';

/** Real-time / indicative foreign currency exchange rates to INR. */
export const FOREX_RATES: Record<string, { rate: number; symbol: string; label: string }> = {
  USD: { rate: 86.5, symbol: '$', label: 'USD - US Dollar' },
  EUR: { rate: 93.2, symbol: '€', label: 'EUR - Euro' },
  GBP: { rate: 111.0, symbol: '£', label: 'GBP - British Pound' },
  AED: { rate: 23.55, symbol: 'د.إ', label: 'AED - UAE Dirham' },
  SGD: { rate: 64.5, symbol: 'S$', label: 'SGD - Singapore Dollar' },
  THB: { rate: 2.55, symbol: '฿', label: 'THB - Thai Baht' },
  JPY: { rate: 0.56, symbol: '¥', label: 'JPY - Japanese Yen' },
};

/**
 * Category-to-card ID fallback mapping for standard recommendation routes.
 */
const CATEGORY_PRIORITY_MAP: Record<SpendCategory, string[]> = {
  amazon: [
    'amazon_pay_icici',
    'hdfc_infinia',
    'hdfc_diners_black',
    'hdfc_millennia',
    'hdfc_moneyback_plus',
    'hdfc_swiggy',
    'sbi_cashback',
    'sbi_simplyclick',
    'indusind_pinnacle',
    'federal_one_metal',
  ],
  flipkart: [
    'axis_flipkart',
    'sbi_flipkart',
    'hdfc_infinia',
    'hdfc_diners_black',
    'hdfc_millennia',
    'hdfc_moneyback_plus',
    'hdfc_swiggy',
    'sbi_cashback',
    'sbi_simplyclick',
    'indusind_pinnacle',
    'federal_one_metal',
  ],
  bpcl: ['sbi_bpcl_octane', 'sbi_bpcl_standard', 'hdfc_indian_oil', 'federal_one_metal'],
  other_fuel: [
    'axis_indianoil_rupay',
    'idfc_first_power_plus_hpcl',
    'icici_hpcl_super_saver',
    'idfc_first_power_hpcl',
    'icici_hpcl_coral',
    'indusind_jio_bp_mobility',
    'kotak_indianoil_rupay',
    'hdfc_indian_oil',
    'sbi_bpcl_octane',
    'sbi_bpcl_standard',
    'federal_one_metal',
  ],
  upi: [
    'axis_supermoney_rupay',
    'tata_neu_infinity',
    'idfc_first_digital_rupay',
    'sbi_simplysave_upi_rupay',
    'indusind_cred_rupay',
    'idfc_hello_cashback',
    'hdfc_phonepe_ultimo',
    'hdfc_upi_rupay',
    'sbi_simplysave',
    'sbi_tata_neu_infinity',
    'kotak_league_platinum',
    'kotak_indianoil_rupay',
    'idfc_first_power_hpcl',
    'idfc_first_earn_rupay',
    'sbi_irctc_platinum',
    'sbi_irctc_premier',
    'indusind_platinum_aura_edge',
    'indusind_platinum',
    'indusind_samman_rupay',
    'tata_neu_plus',
    'hdfc_phonepe_uno',
    'hdfc_pixel_play',
    'icici_coral_rupay',
    'yes_bank_rupay',
    'axis_indianoil_rupay',
    'hdfc_indian_oil',
    'federal_one_metal',
  ],
  forex: [
    'idfc_first_private',
    'idfc_mayura',
    'idfc_gaj',
    'idfc_diamond_reserve',
    'indusind_indulge',
    'idfc_first_wow',
    'idfc_first_wow_black',
    'idfc_ashva',
    'kotak_white_reserve',
    'indusind_pioneer_private',
    'indusind_pioneer_heritage',
    'indusind_crest',
    'indusind_tiger',
    'indusind_legend',
    'indusind_pioneer_legacy',
    'indusind_solitaire',
    'indusind_pinnacle',
    'indusind_avios_infinite',
    'icici_times_black',
    'axis_burgundy_private',
    'icici_emeralde_private',
    'icici_emeralde',
    'sbi_aurum',
    'sbi_card_miles_elite',
    'sbi_card_miles_prime',
    'sbi_card_elite',
    'sbi_tata_neu_infinity',
    'idfc_first_wealth',
    'idfc_first_select',
    'hdfc_infinia',
    'hdfc_diners_black',
    'hdfc_diners_privilege',
    'bobcard_scapia',
    'axis_atlas',
    'axis_magnus',
    'axis_horizon',
    'icici_adani_one_signature',
    'hdfc_marriott_bonvoy',
    'federal_one_metal',
  ],
  dining_travel: [
    'idfc_first_private',
    'idfc_mayura',
    'idfc_gaj',
    'idfc_ashva',
    'kotak_white_reserve',
    'indusind_indulge',
    'indusind_pioneer_private',
    'indusind_pioneer_heritage',
    'indusind_crest',
    'indusind_eazydiner_signature',
    'sbi_aurum',
    'sbi_card_miles_elite',
    'sbi_card_miles_prime',
    'sbi_card_miles',
    'hdfc_infinia',
    'hdfc_diners_black',
    'icici_emeralde_private',
    'icici_emeralde',
    'icici_times_black',
    'indusind_avios_infinite',
    'idfc_first_wealth',
    'idfc_club_vistara',
    'idfc_first_select',
    'icici_makemytrip_signature',
    'indusind_pioneer_legacy',
    'indusind_solitaire',
    'indusind_eazydiner_platinum',
    'kotak_zen_signature',
    'kotak_white',
    'kotak_indigo_6e_rewards_xl',
    'indusind_celesta',
    'hdfc_swiggy',
    'hdfc_diners_privilege',
    'sbi_titan',
    'axis_atlas',
    'axis_magnus',
    'sbi_card_elite',
    'sbi_card_prime',
    'sbi_club_vistara_prime',
    'icici_sapphiro',
    'icici_adani_one_signature',
    'icici_adani_one_platinum',
    'hdfc_marriott_bonvoy',
    'hdfc_regalia_gold',
    'amex_platinum_travel',
    'axis_flipkart',
    'sbi_irctc_premier',
    'sbi_irctc_platinum',
    'federal_one_metal',
  ],
  gaming_wallet: [
    'federal_one_metal',
    'axis_ace',
    'amex_mrcc',
    'idfc_first_wealth',
    'indusind_epay_amex',
  ],
  general: [
    'idfc_first_private',
    'idfc_mayura',
    'kotak_white_reserve',
    'indusind_indulge',
    'indusind_pioneer_private',
    'indusind_pioneer_heritage',
    'sbi_aurum',
    'sbi_card_miles_elite',
    'hdfc_infinia',
    'hdfc_diners_black',
    'icici_emeralde_private',
    'icici_emeralde',
    'idfc_first_wealth',
    'sbi_cashback',
    'idfc_hello_cashback',
    'idfc_first_millennia',
    'kotak_mojo_platinum',
    'indusind_pinnacle',
    'sbi_card_prime',
    'sbi_card_elite',
    'axis_ace',
    'axis_magnus',
    'hdfc_regalia_gold',
    'hdfc_diners_privilege',
    'kotak_zen_signature',
    'indusind_celesta',
    'indusind_tiger',
    'sbi_simplyclick',
    'sbi_simplysave',
    'hdfc_moneyback_plus',
    'hdfc_freedom',
    'hdfc_pixel_go',
    'federal_one_metal',
    'federal_imperio',
  ],
  rent: [
    'idfc_first_private',
    'idfc_first_wealth',
    'federal_one_metal',
    'standard_chartered_ultimate',
  ],
  utilities: [
    'axis_ace',
    'airtel_axis',
    'tata_neu_infinity',
    'hdfc_millennia',
    'sbi_cashback',
    'idfc_first_wealth',
  ],
  education: [
    'idfc_first_wealth',
    'idfc_first_select',
    'hdfc_infinia',
    'sbi_card_elite',
    'federal_one_metal',
  ],
  wallet_load: ['federal_one_metal', 'idfc_first_wealth', 'amex_mrcc'],
  government: [
    'idfc_first_private',
    'idfc_first_wealth',
    'federal_one_metal',
    'indusind_pioneer_private',
  ],
};

/** Approximate savings rate multipliers for estimation */
const CATEGORY_SAVINGS_MULTIPLIER: Record<SpendCategory, number> = {
  amazon: 0.05,
  flipkart: 0.05,
  bpcl: 0.0725,
  other_fuel: 0.05,
  upi: 0.015,
  forex: 0.035,
  dining_travel: 0.1,
  gaming_wallet: 0.02,
  rent: 0,
  utilities: 0.05,
  education: 0.01,
  wallet_load: 0,
  government: 0.005,
  general: 0.015,
};

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly indexedDB = inject(IndexedDBService);
  private readonly toastService = inject(ToastService);

  /** Master catalog of available credit card templates. */
  readonly masterCatalog = signal<MasterCatalogCard[]>(catalogData as MasterCatalogCard[]);

  /** Master dataset of Indian airport terminal lounges. */
  readonly airports = signal<AirportInfo[]>(airportsData as AirportInfo[]);

  /** Active user cards in the local wallet (or demo cards if in Explore Mode). */
  readonly cards = signal<CreditCard[]>([]);

  /** Whether the user is currently browsing the demo Master Catalog. */
  readonly isExploreMode = signal<boolean>(false);

  /** Whether initialization from IndexedDB or URL params has completed. */
  readonly isLoaded = signal<boolean>(false);

  /** Total number of cards currently in the active wallet. */
  readonly userCardCount = computed(() => this.cards().length);

  /** Whether the user has completed the First-Time User Experience onboarding. */
  readonly hasCompletedOnboarding = signal<boolean>(
    typeof window !== 'undefined' ? localStorage.getItem('tpr_ftue_completed') === 'true' : false,
  );

  /** All available spend categories for forms and selectors. */
  readonly categories: CategoryOption[] = [
    { value: 'amazon', label: 'Amazon Shopping & Pay', icon: '🛒' },
    { value: 'flipkart', label: 'Flipkart / Myntra / Cleartrip', icon: '🛍️' },
    { value: 'bpcl', label: 'Fuel (BPCL Petrol Pumps)', icon: '⛽' },
    { value: 'other_fuel', label: 'Fuel (HPCL / IOCL / Shell)', icon: '⛽' },
    { value: 'upi', label: 'Street Vendors / RuPay UPI QR', icon: '📱' },
    { value: 'dining_travel', label: 'Dining, Flights & Hotels', icon: '✈️' },
    { value: 'forex', label: 'International Spend (USD / EUR / GBP / AED)', icon: '🌐' },
    { value: 'utilities', label: 'Electricity, Water & Gas Bills', icon: '💡' },
    { value: 'rent', label: 'Rent Payments / Housing Fees', icon: '🏠' },
    { value: 'education', label: 'School & College Tuition Fees', icon: '🎓' },
    { value: 'wallet_load', label: 'Wallet Reload (Paytm, Mobikwik, Amazon)', icon: '👛' },
    { value: 'government', label: 'Government Taxes & Challans', icon: '🏛️' },
    { value: 'gaming_wallet', label: 'Online Gaming / Entertainment', icon: '🎮' },
    { value: 'general', label: 'General Offline / Catch-All', icon: '💳' },
  ];

  constructor() {
    this.initPortfolio();
  }

  /**
   * Initializes the card portfolio.
   * 1. Checks URL query params for `?seed=owner`
   * 2. Checks IndexedDB for existing user cards
   * 3. Syncs FTUE state with local storage
   */
  async initPortfolio(): Promise<void> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = window.location.hash.includes('?')
        ? new URLSearchParams(window.location.hash.split('?')[1])
        : null;

      const hasOwnerSeed =
        urlParams.get('seed') === 'owner' ||
        hashParams?.get('seed') === 'owner' ||
        urlParams.get('dev') === 'true' ||
        hashParams?.get('dev') === 'true';

      if (hasOwnerSeed) {
        await this.loadOwnerSeed();
        await this.completeOnboarding('custom');
        this.isLoaded.set(true);
        return;
      }

      const storedCards = await this.indexedDB.getAllCards();
      if (storedCards && storedCards.length > 0) {
        this.cards.set(storedCards);
        this.isExploreMode.set(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('tpr_ftue_completed', 'true');
        }
        this.hasCompletedOnboarding.set(true);
      } else {
        const mode =
          typeof window !== 'undefined' ? localStorage.getItem('tpr_onboarding_mode') : null;
        if (mode === 'custom') {
          this.cards.set([]);
          this.isExploreMode.set(false);
        } else {
          this.loadExploreCatalog();
        }
      }
    } catch (err) {
      console.warn('Portfolio initialization fallback:', err);
      this.loadExploreCatalog();
    } finally {
      this.isLoaded.set(true);
    }
  }

  /**
   * Completes the FTUE onboarding flow and persists the selected mode.
   */
  async completeOnboarding(mode: 'explore' | 'custom'): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tpr_ftue_completed', 'true');
      localStorage.setItem('tpr_onboarding_mode', mode);
    }
    this.hasCompletedOnboarding.set(true);

    if (mode === 'explore') {
      this.loadExploreCatalog();
    } else {
      const stored = await this.indexedDB.getAllCards();
      if (stored && stored.length > 0) {
        this.cards.set(stored);
        this.isExploreMode.set(false);
      } else {
        this.cards.set([]);
        this.isExploreMode.set(false);
      }
    }
  }

  /**
   * Resets the FTUE onboarding state to allow re-visiting the welcome screen.
   */
  async resetOnboarding(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tpr_ftue_completed');
      localStorage.removeItem('tpr_onboarding_mode');
    }
    this.hasCompletedOnboarding.set(false);
  }

  /**
   * Loads the owner's personal 10-card portfolio into IndexedDB.
   */
  async loadOwnerSeed(): Promise<void> {
    const catalog = this.masterCatalog();
    const seededCards: CreditCard[] = [];

    for (const seed of ownerSeedData) {
      const template = catalog.find((c) => c.id === seed.id);
      if (template) {
        seededCards.push({
          ...template,
          billingCycleStart: seed.billingCycleStart,
          billingCycleEnd: seed.billingCycleEnd,
          isCustom: false,
        });
      }
    }

    await this.indexedDB.clearAllCards();
    await this.indexedDB.saveCards(seededCards);
    this.cards.set(seededCards);
    this.isExploreMode.set(false);

    this.toastService.show({
      message: `Loaded developer seed portfolio (${seededCards.length} cards).`,
      type: 'success',
      durationMs: 3500,
    });
  }

  /**
   * Activates Explore Mode by populating the cards signal with demo catalog entries (read-only).
   */
  loadExploreCatalog(): void {
    const catalog = this.masterCatalog();
    const demoCards: CreditCard[] = catalog.slice(0, 10).map((item) => ({
      ...item,
      billingCycleStart: item.defaultBillingStart ?? 1,
      billingCycleEnd: item.defaultBillingEnd ?? 30,
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
    this.cards.update((list) => {
      const filtered = list.filter((c) => c.id !== card.id);
      return [...filtered, card];
    });
    this.isExploreMode.set(false);
  }

  /**
   * Updates an existing card in IndexedDB and the reactive state.
   */
  async updateCard(card: CreditCard): Promise<void> {
    await this.indexedDB.saveCard(card);
    this.cards.update((list) => list.map((c) => (c.id === card.id ? card : c)));
    this.isExploreMode.set(false);
  }

  /**
   * Deletes a card from IndexedDB and updates the reactive state with an undo option.
   */
  async deleteCard(id: string): Promise<void> {
    const cardToDelete = this.cards().find((c) => c.id === id);
    await this.indexedDB.deleteCard(id);
    this.cards.update((list) => list.filter((c) => c.id !== id));

    if (cardToDelete) {
      this.toastService.show({
        message: `Removed "${cardToDelete.name}" from your portfolio.`,
        type: 'warning',
        actionLabel: '↩️ Undo',
        durationMs: 6000,
        onAction: async () => {
          await this.restoreCard(cardToDelete);
        },
      });
    }
  }

  /**
   * Restores a deleted card back to IndexedDB and the reactive state.
   */
  async restoreCard(card: CreditCard): Promise<void> {
    await this.indexedDB.saveCard(card);
    this.cards.update((list) => {
      if (list.some((c) => c.id === card.id)) return list;
      return [...list, card];
    });
    this.isExploreMode.set(false);
    this.toastService.show({
      message: `Restored "${card.name}" to your portfolio.`,
      type: 'success',
      durationMs: 3000,
    });
  }

  /**
   * Quick-adds a card from the Master Catalog with user-provided billing dates.
   */
  async quickAddFromCatalog(
    catalogId: string,
    billingStart?: number,
    billingEnd?: number,
  ): Promise<void> {
    const template = this.masterCatalog().find((c) => c.id === catalogId);
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
   * Clears the user's local wallet completely with undo protection.
   */
  async clearWallet(): Promise<void> {
    const previousCards = [...this.cards()];
    await this.indexedDB.clearAllCards();
    this.cards.set([]);
    this.isExploreMode.set(false);

    if (previousCards.length > 0) {
      this.toastService.show({
        message: `Cleared ${previousCards.length} card${previousCards.length > 1 ? 's' : ''} from your wallet.`,
        type: 'warning',
        actionLabel: '↩️ Undo',
        durationMs: 7000,
        onAction: async () => {
          await this.indexedDB.saveCards(previousCards);
          this.cards.set(previousCards);
          this.toastService.show({
            message: `Restored ${previousCards.length} card${previousCards.length > 1 ? 's' : ''}.`,
            type: 'success',
            durationMs: 3000,
          });
        },
      });
    }
  }

  /**
   * Generates and downloads a JSON backup file of the user's active wallet.
   */
  exportWallet(): void {
    const cardsToExport = this.cards();
    if (cardsToExport.length === 0) {
      this.toastService.show({
        message: 'Your wallet is empty. Add cards before exporting a backup.',
        type: 'warning',
      });
      return;
    }

    const payload: WalletBackupPayload = {
      version: 1,
      appName: 'The Plastic Route',
      exportedAt: new Date().toISOString(),
      cards: cardsToExport,
    };

    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `the-plastic-route-wallet-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.toastService.show({
        message: `Exported ${cardsToExport.length} card${cardsToExport.length > 1 ? 's' : ''} to backup file.`,
        type: 'success',
        durationMs: 3500,
      });
    } catch (err: any) {
      this.toastService.show({
        message: `Failed to export wallet: ${err?.message || 'Unknown error'}`,
        type: 'danger',
      });
    }
  }

  /**
   * Validates and imports cards from a JSON backup string into IndexedDB.
   */
  async importWallet(
    jsonText: string,
  ): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      const parsed = JSON.parse(jsonText);
      let rawCards: any[] = [];

      if (Array.isArray(parsed)) {
        rawCards = parsed;
      } else if (parsed && typeof parsed === 'object') {
        if (Array.isArray(parsed.cards)) {
          rawCards = parsed.cards;
        } else if (Array.isArray(parsed.user_cards)) {
          rawCards = parsed.user_cards;
        }
      }

      if (rawCards.length === 0) {
        const errorMsg = 'No cards found in the uploaded JSON file.';
        this.toastService.show({ message: errorMsg, type: 'danger' });
        return { success: false, count: 0, error: errorMsg };
      }

      // Sanitize and validate cards
      const validCards: CreditCard[] = [];
      for (const c of rawCards) {
        if (!c || typeof c !== 'object') continue;
        const name = typeof c.name === 'string' ? c.name.trim() : '';
        if (!name) continue;

        const start = Number(c.billingCycleStart);
        const end = Number(c.billingCycleEnd);

        const card: CreditCard = {
          ...c,
          id:
            typeof c.id === 'string' && c.id.trim()
              ? c.id
              : `imported_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          name,
          bank: typeof c.bank === 'string' ? c.bank : undefined,
          network: c.network || 'Visa',
          optimizationVector: c.optimizationVector || 'General spend',
          billingCycleStart: !isNaN(start) && start >= 1 && start <= 31 ? start : 1,
          billingCycleEnd: !isNaN(end) && end >= 1 && end <= 31 ? end : 30,
          loungeAccess:
            c.loungeAccess && typeof c.loungeAccess === 'object'
              ? c.loungeAccess
              : { eligible: false },
          isCustom: c.isCustom ?? true,
        };
        validCards.push(card);
      }

      if (validCards.length === 0) {
        const errorMsg = 'Could not parse any valid cards matching the required schema.';
        this.toastService.show({ message: errorMsg, type: 'danger' });
        return { success: false, count: 0, error: errorMsg };
      }

      // Preserve previous cards for undo action
      const previousCards = [...this.cards()];

      // Overwrite IndexedDB and reactive state
      await this.indexedDB.clearAllCards();
      await this.indexedDB.saveCards(validCards);
      this.cards.set(validCards);
      this.isExploreMode.set(false);

      if (typeof window !== 'undefined') {
        localStorage.setItem('tpr_ftue_completed', 'true');
        localStorage.setItem('tpr_onboarding_mode', 'custom');
      }
      this.hasCompletedOnboarding.set(true);

      this.toastService.show({
        message: `Successfully imported ${validCards.length} card${validCards.length > 1 ? 's' : ''} to your wallet!`,
        type: 'success',
        durationMs: 7000,
        actionLabel: previousCards.length > 0 ? '↩️ Undo' : undefined,
        onAction:
          previousCards.length > 0
            ? async () => {
                await this.indexedDB.clearAllCards();
                await this.indexedDB.saveCards(previousCards);
                this.cards.set(previousCards);
                this.toastService.show({
                  message: 'Import undone. Previous cards restored.',
                  type: 'info',
                  durationMs: 3000,
                });
              }
            : undefined,
      });

      return { success: true, count: validCards.length };
    } catch (err: any) {
      const errorMsg = `Invalid JSON file: ${err?.message || 'Syntax error'}`;
      this.toastService.show({ message: errorMsg, type: 'danger' });
      return { success: false, count: 0, error: errorMsg };
    }
  }

  /** Returns all active cards in the wallet. */
  getCards(): CreditCard[] {
    return this.cards();
  }

  /** Find a card by its ID in current wallet. */
  findCard(id: string): CreditCard | undefined {
    return this.cards().find((c) => c.id === id);
  }

  /**
   * Runs the spend optimization algorithm.
   * Dynamically checks the user's active wallet against the requested category and currency.
   */
  getOptimalRoute(
    category: SpendCategory,
    amount?: number,
    currency: string = 'INR',
  ): OptimizationResult {
    const currentCards = this.cards();
    const fallbackCatalog = this.masterCatalog();

    // Warnings and category rule detections
    let excludedCategoryWarning: string | undefined;
    let feeWarning: string | undefined;
    let forexDetails: ForexDetails | undefined;

    if (category === 'rent') {
      excludedCategoryWarning =
        'Excluded Category: Almost all Indian issuers (HDFC, ICICI, SBI, Axis, Kotak) exclude rent from earning reward points.';
      feeWarning =
        '1% convenience fee + 18% GST applies to rent payments on credit cards across all major issuers.';
    } else if (category === 'wallet_load') {
      excludedCategoryWarning =
        'Excluded Category: Wallet reloads (Paytm, Mobikwik, Amazon Wallet) earn 0 reward points on almost all cards.';
      feeWarning =
        'Third-party wallet applications generally charge an additional 1.5% to 2.5% loading surcharge.';
    } else if (category === 'government') {
      excludedCategoryWarning =
        'Excluded Category: Most banks have excluded government taxes, stamp duties, and challans from reward point accrual.';
    } else if (category === 'education') {
      feeWarning =
        'Surcharge Notice: Several issuers levy a 1% surcharge when paying school or college tuition fees via third-party platforms.';
    } else if (category === 'other_fuel' || category === 'bpcl') {
      feeWarning =
        'Fuel Surcharge Waiver: Standard 1% surcharge waived for transaction amounts between ₹400 and ₹4,000 (monthly caps apply).';
    }

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
        excludedCategoryWarning,
        feeWarning,
      };
    }

    const priorityList = CATEGORY_PRIORITY_MAP[category] ?? CATEGORY_PRIORITY_MAP['general'];

    // 1. Find cards in wallet matching category priorities
    const matchedCards: CreditCard[] = [];
    for (const priorityId of priorityList) {
      const match = currentCards.find((c) => c.id === priorityId || c.id.startsWith(priorityId));
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

    // Currency conversion & Forex Savings Breakdown
    if (currency !== 'INR' && amount && amount > 0) {
      const fxInfo = FOREX_RATES[currency] ?? { rate: 86.5, symbol: '$', label: currency };
      const inrBaseAmount = Math.round(amount * fxInfo.rate);

      // Standard bank: 3.5% markup + 18% GST on markup (4.13%)
      const standardMarkupPercent = 3.5;
      const standardGstPercent = 18;
      const standardTotalFee = Math.round(inrBaseAmount * (0.035 * 1.18));

      // Best card forex markup (zero forex if card has 0 markup or zero_forex tag)
      let bestCardMarkupPercent = 2.0;
      if (typeof bestCard.forexMarkup === 'number') {
        bestCardMarkupPercent = bestCard.forexMarkup;
      } else if (
        typeof bestCard.forexMarkup === 'string' &&
        !isNaN(parseFloat(bestCard.forexMarkup))
      ) {
        bestCardMarkupPercent = parseFloat(bestCard.forexMarkup);
      } else if (
        bestCard.tags?.includes('zero_forex') ||
        bestCard.id.includes('scapia') ||
        bestCard.id.includes('wow')
      ) {
        bestCardMarkupPercent = 0.0;
      }

      const bestCardTotalFee = Math.round(inrBaseAmount * (bestCardMarkupPercent / 100) * 1.18);
      const netSavings = Math.max(0, standardTotalFee - bestCardTotalFee);

      forexDetails = {
        foreignCurrency: currency,
        foreignAmount: amount,
        exchangeRateToInr: fxInfo.rate,
        inrBaseAmount,
        standardMarkupPercent,
        standardGstPercent,
        standardTotalFee,
        bestCardMarkupPercent,
        bestCardTotalFee,
        netSavings,
      };

      estimatedSaving = netSavings;
    } else if (amount && amount > 0) {
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
      excludedCategoryWarning,
      feeWarning,
      forexDetails,
    };
  }

  /**
   * Evaluates user's cards against a specific airport lounge.
   */
  getLoungeAccessForAirport(airportCode: string) {
    const airport = this.airports().find((a) => a.code.toUpperCase() === airportCode.toUpperCase());
    if (!airport) return null;

    const userCards = this.cards();
    const eligibleCards = userCards.filter((c) => c.loungeAccess?.eligible);

    return {
      airport,
      eligibleCards,
    };
  }

  /**
   * Returns milestone tracking details for active cards in wallet.
   */
  getWalletMilestones() {
    return this.cards().map((card) => {
      const isSuperPremium =
        card.id.includes('infinia') ||
        card.id.includes('magnus') ||
        card.id.includes('emeralde') ||
        card.id.includes('diners_black');
      const isPremium =
        card.id.includes('regalia') ||
        card.id.includes('sapphiro') ||
        card.id.includes('atlas') ||
        card.id.includes('vistara');

      const quarterlyTarget = isSuperPremium ? 150000 : isPremium ? 50000 : 30000;
      const annualTarget = isSuperPremium ? 1000000 : isPremium ? 400000 : 150000;
      const feeWaiverTarget =
        card.feeWaiverSpend ?? (isSuperPremium ? 1000000 : isPremium ? 300000 : 100000);

      const milestoneRewards: string[] = [];
      if (card.loungeAccess?.eligible) {
        milestoneRewards.push(
          `Spend ₹${(quarterlyTarget / 1000).toFixed(0)}k/quarter to unlock next quarter lounge quota`,
        );
      }
      milestoneRewards.push(
        `Spend ₹${(feeWaiverTarget / 100000).toFixed(1)}L/year for Annual Fee Waiver`,
      );
      if (isSuperPremium) {
        milestoneRewards.push('Reach ₹10L annual spend to earn bonus reward multipliers');
      }

      return {
        card,
        quarterlyTarget,
        annualTarget,
        feeWaiverTarget,
        milestoneRewards,
      };
    });
  }

  /**
   * Calculates billing cycle status for a specific statement day.
   */
  calculateBillingCycleStatus(
    cardName: string,
    statementDay: number,
    card?: CreditCard,
  ): BillingCycleStatus {
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
      const nextStmtDate = new Date(today.getFullYear(), today.getMonth() + 1, statementDay);
      const timeDiff = nextStmtDate.getTime() - today.getTime();
      daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      severity = 'success';
    }

    return { cardName, statementDay, targetCycle, daysLeft, severity, card };
  }

  /**
   * Returns billing cycle statuses for all cards in the active wallet.
   */
  getAllBillingCycleStatuses(): BillingCycleStatus[] {
    return this.cards().map((card) =>
      this.calculateBillingCycleStatus(card.name, card.billingCycleStart, card),
    );
  }
}
