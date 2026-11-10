import { TestBed } from '@angular/core/testing';
import { CardService, FOREX_RATES } from './card.service';
import { IndexedDBService } from './indexed-db.service';
import { ToastService } from './toast.service';
import { MasterCatalogCard } from '../models/card.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CardService', () => {
  let service: CardService;
  let mockIndexedDB: Partial<IndexedDBService>;
  let mockToast: Partial<ToastService>;

  beforeEach(() => {
    mockIndexedDB = {
      hasUserCards: vi.fn().mockResolvedValue(false),
      getAllCards: vi.fn().mockResolvedValue([]),
      saveCards: vi.fn().mockResolvedValue(undefined),
      clearAllCards: vi.fn().mockResolvedValue(undefined),
      deleteCard: vi.fn().mockResolvedValue(undefined),
      saveCard: vi.fn().mockResolvedValue(undefined),
      getSetting: vi.fn().mockResolvedValue(null),
      saveSetting: vi.fn().mockResolvedValue(undefined),
    };

    mockToast = {
      show: vi.fn(),
      dismiss: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CardService,
        { provide: IndexedDBService, useValue: mockIndexedDB },
        { provide: ToastService, useValue: mockToast },
      ],
    });

    service = TestBed.inject(CardService);
  });

  describe('Master Catalog', () => {
    it('should initialize and load the master catalog of 182 verified cards', () => {
      const catalog = service.masterCatalog();
      expect(catalog).toBeDefined();
      expect(catalog.length).toBe(182);
    });

    it('should expose categories option list', () => {
      expect(service.categories).toBeDefined();
      expect(service.categories.length).toBeGreaterThan(5);
      const values = service.categories.map((c) => c['value']);
      expect(values).toContain('amazon');
      expect(values).toContain('flipkart');
      expect(values).toContain('forex');
      expect(values).toContain('rent');
      expect(values).toContain('wallet_load');
    });
  });

  describe('Spend Optimizer & Recommendation Engine', () => {
    it('should recommend best card for Amazon shopping', () => {
      const result = service.getOptimalRoute('amazon', 5000);
      expect(result).toBeDefined();
      expect(result.bestCard).toBeDefined();
      expect(result.interestFreeDays).toBeGreaterThan(0);
      expect(result.dueDate).toBeInstanceOf(Date);
      expect(result.reason).toBeDefined();
      expect(result.estimatedSaving).toBeGreaterThan(0);
    });

    it('should calculate forex transactions in USD with live conversion and savings', () => {
      const spendUSD = 100;
      const result = service.getOptimalRoute('forex', spendUSD, 'USD');
      expect(result).toBeDefined();
      expect(result.forexDetails).toBeDefined();

      const fx = result.forexDetails!;
      expect(fx.foreignCurrency).toBe('USD');
      expect(fx.foreignAmount).toBe(spendUSD);
      expect(fx.exchangeRateToInr).toBe(FOREX_RATES['USD'].rate);
      expect(fx.inrBaseAmount).toBe(Math.round(spendUSD * FOREX_RATES['USD'].rate));
      expect(fx.standardMarkupPercent).toBe(3.5);
      expect(fx.standardGstPercent).toBe(18);
      expect(fx.standardTotalFee).toBeGreaterThan(0);
      expect(fx.bestCardTotalFee).toBeGreaterThanOrEqual(0);
      expect(fx.netSavings).toBeGreaterThanOrEqual(0);
    });

    it('should flag excluded category warnings for Rent payments', () => {
      const result = service.getOptimalRoute('rent', 30000);
      expect(result).toBeDefined();
      expect(result.excludedCategoryWarning).toBeDefined();
      expect(result.excludedCategoryWarning).toContain('Almost all Indian issuers');
      expect(result.feeWarning).toContain('1% convenience fee');
    });

    it('should flag excluded category warnings for Wallet loads', () => {
      const result = service.getOptimalRoute('wallet_load', 2000);
      expect(result).toBeDefined();
      expect(result.excludedCategoryWarning).toBeDefined();
      expect(result.excludedCategoryWarning).toContain('Wallet reloads');
      expect(result.feeWarning).toContain('loading surcharge');
    });

    it('should flag excluded category warnings for Government tax payments', () => {
      const result = service.getOptimalRoute('government', 50000);
      expect(result).toBeDefined();
      expect(result.excludedCategoryWarning).toBeDefined();
      expect(result.excludedCategoryWarning).toContain('government taxes');
    });

    it('should flag surcharge warning for Education tuition payments', () => {
      const result = service.getOptimalRoute('education', 25000);
      expect(result).toBeDefined();
      expect(result.feeWarning).toBeDefined();
      expect(result.feeWarning).toContain('tuition fees');
    });

    it('should show fuel surcharge waiver guidelines for fuel transactions', () => {
      const result = service.getOptimalRoute('bpcl', 2500);
      expect(result).toBeDefined();
      expect(result.feeWarning).toBeDefined();
      expect(result.feeWarning).toContain('Fuel Surcharge Waiver');
    });
  });

  describe('Billing Cycle Tracker', () => {
    it('should calculate billing cycle status for a single card', () => {
      const status = service.calculateBillingCycleStatus('HDFC Infinia', 15);
      expect(status).toBeDefined();
      expect(status.cardName).toBe('HDFC Infinia');
      expect(status.statementDay).toBe(15);
      expect(['Current Bill', 'Next Bill']).toContain(status.targetCycle);
      expect(['danger', 'warning', 'success']).toContain(status.severity);
      expect(status.daysLeft).toBeGreaterThanOrEqual(0);
    });

    it('should compute billing cycle statuses for all cards in wallet', () => {
      const statuses = service.getAllBillingCycleStatuses();
      expect(statuses).toBeDefined();
      expect(Array.isArray(statuses)).toBe(true);
    });
  });

  describe('Airport Lounge Terminal Checker', () => {
    it('should return airport info and terminals for BLR Kempegowda International Airport', () => {
      const result = service.getLoungeAccessForAirport('BLR');
      expect(result).toBeDefined();
      expect(result?.airport.code).toBe('BLR');
      expect(result?.airport.terminals.length).toBeGreaterThanOrEqual(2);
      expect(result?.airport.terminals[0].lounges.length).toBeGreaterThanOrEqual(1);
    });

    it('should return airport info for major Indian hubs (DEL, BOM, HYD, MAA, CCU, GOX)', () => {
      const hubs = ['DEL', 'BOM', 'HYD', 'MAA', 'CCU', 'GOX'];
      for (const hub of hubs) {
        const result = service.getLoungeAccessForAirport(hub);
        expect(result).toBeDefined();
        expect(result?.airport.code).toBe(hub);
      }
    });

    it('should return null for unknown airport code', () => {
      const result = service.getLoungeAccessForAirport('UNKNOWN_XYZ');
      expect(result).toBeNull();
    });
  });

  describe('Milestone & Fee Waiver Tracker', () => {
    it('should calculate milestones and fee waiver targets for wallet cards', () => {
      const milestones = service.getWalletMilestones();
      expect(milestones).toBeDefined();
      expect(Array.isArray(milestones)).toBe(true);

      for (const m of milestones) {
        expect(m.card).toBeDefined();
        expect(m.quarterlyTarget).toBeGreaterThan(0);
        expect(m.annualTarget).toBeGreaterThan(0);
        expect(m.feeWaiverTarget).toBeGreaterThan(0);
        expect(m.milestoneRewards.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Wallet Import & Validation', () => {
    it('should reject invalid JSON string gracefully', async () => {
      const res = await service.importWallet('not-valid-json');
      expect(res.success).toBe(false);
      expect(res.count).toBe(0);
      expect(mockToast.show).toHaveBeenCalled();
    });

    it('should reject empty card payload gracefully', async () => {
      const res = await service.importWallet(JSON.stringify({ cards: [] }));
      expect(res.success).toBe(false);
      expect(res.count).toBe(0);
      expect(mockToast.show).toHaveBeenCalled();
    });

    it('should import valid JSON payload and update cards', async () => {
      const validPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        cards: [
          {
            id: 'test_card_1',
            name: 'Test Sapphire',
            network: 'Visa',
            optimizationVector: 'Test rewards',
            billingCycleStart: 10,
            billingCycleEnd: 9,
            loungeAccess: { eligible: true, spendThreshold: 35000 },
          },
        ],
      };

      const res = await service.importWallet(JSON.stringify(validPayload));
      expect(res.success).toBe(true);
      expect(res.count).toBe(1);
      expect(service.cards().length).toBe(1);
      expect(service.cards()[0].id).toBe('test_card_1');
      expect(mockToast.show).toHaveBeenCalled();
    });
  });

  describe('Card Management Actions', () => {
    it('should allow quick adding card from master catalog', async () => {
      const sampleCatalogCard: MasterCatalogCard = service.masterCatalog()[0];
      const initialCount = service.cards().length;

      await service.quickAddFromCatalog(sampleCatalogCard.id, 12);
      expect(service.cards().length).toBe(initialCount + 1);
      expect(service.cards().some((c) => c.name === sampleCatalogCard.name)).toBe(true);
    });

    it('should allow deleting a card and restore via restoreCard', async () => {
      const sampleCatalogCard = service.masterCatalog()[0];
      await service.quickAddFromCatalog(sampleCatalogCard.id, 15);
      const addedCard = service.cards().find((c) => c.name === sampleCatalogCard.name)!;

      const countBeforeDelete = service.cards().length;
      await service.deleteCard(addedCard.id);
      expect(service.cards().length).toBe(countBeforeDelete - 1);

      await service.restoreCard(addedCard);
      expect(service.cards().length).toBe(countBeforeDelete);
    });
  });
});
