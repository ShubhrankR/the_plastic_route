import { describe, it, expect } from 'vitest';
import cardsJson from '../data/cards.json';
import { MasterCatalogCard } from '../models/card.model';

const MINIMUM_CARD_COUNT = 180;
const DANGEROUS_CONTENT_REGEX = /[<>]|(?:javascript|vbscript|data):/i;
const ID_REGEX = /^[a-z0-9_]+$/;

const VALID_CATEGORIES = new Set([
  'amazon',
  'flipkart',
  'bpcl',
  'other_fuel',
  'upi',
  'forex',
  'dining_travel',
  'gaming_wallet',
  'general',
  'utilities',
  'rent',
  'education',
  'wallet_load',
  'government',
]);

const VALID_NETWORKS = new Set(['Visa', 'Mastercard', 'RuPay', 'Amex', 'Diners Club']);

const ALLOWED_DOMAIN_SUFFIXES = [
  'hdfcbank.com',
  'icicibank.com',
  'sbi.co.in',
  'axisbank.com',
  'rbi.org.in',
  'kotak.com',
  'indusind.com',
  'standardchartered.co.in',
  'hsbc.co.in',
  'yesbank.in',
  'idfcfirstbank.com',
  'aubank.in',
  'bankofbaroda.in',
  'pnbindia.in',
  'federalbank.co.in',
  'americanexpress.com',
];

const URL_REGEX = /https?:\/\/[^\s"'<>]+/gi;

describe('Open Source Security & Catalog Integrity Guardrails', () => {
  const catalog = cardsJson as unknown as MasterCatalogCard[];

  it('should maintain master catalog volume above safety threshold (>= 180 cards)', () => {
    expect(catalog.length).toBeGreaterThanOrEqual(MINIMUM_CARD_COUNT);
    expect(catalog.length).toBe(182);
  });

  it('should enforce unique, lowercase alphanumeric IDs with no dangerous content', () => {
    const seenIds = new Set<string>();

    for (const card of catalog) {
      expect(card.id).toBeDefined();
      expect(typeof card.id).toBe('string');
      expect(ID_REGEX.test(card.id)).toBe(true);
      expect(seenIds.has(card.id)).toBe(false);
      seenIds.add(card.id);
    }
  });

  it('should prohibit HTML, script injection, and dangerous URI schemes across all text fields', () => {
    for (const card of catalog) {
      expect(DANGEROUS_CONTENT_REGEX.test(card.name)).toBe(false);
      expect(DANGEROUS_CONTENT_REGEX.test(card.bank)).toBe(false);
      expect(DANGEROUS_CONTENT_REGEX.test(card.network)).toBe(false);
      expect(DANGEROUS_CONTENT_REGEX.test(card.optimizationVector)).toBe(false);

      if (card.regulatoryUpdate) {
        expect(DANGEROUS_CONTENT_REGEX.test(card.regulatoryUpdate)).toBe(false);
      }
      if (typeof card.annualFee === 'string') {
        expect(DANGEROUS_CONTENT_REGEX.test(card.annualFee)).toBe(false);
      }
      if (typeof card.forexMarkup === 'string') {
        expect(DANGEROUS_CONTENT_REGEX.test(card.forexMarkup)).toBe(false);
      }
    }
  });

  it('should enforce strict external domain whitelist on any embedded URLs', () => {
    for (const card of catalog) {
      const textProperties = [
        card.name,
        card.bank,
        card.optimizationVector,
        card.regulatoryUpdate ?? '',
        typeof card.annualFee === 'string' ? card.annualFee : '',
        typeof card.forexMarkup === 'string' ? card.forexMarkup : '',
      ];

      for (const text of textProperties) {
        const matches = text.match(URL_REGEX);
        if (matches) {
          for (const urlStr of matches) {
            const parsed = new URL(urlStr);
            expect(parsed.protocol).toBe('https:');
            const hostname = parsed.hostname.toLowerCase();
            const isAllowed = ALLOWED_DOMAIN_SUFFIXES.some(
              (domain) => hostname === domain || hostname.endsWith('.' + domain),
            );
            expect(isAllowed).toBe(true);
          }
        }
      }
    }
  });

  it('should validate all categories and payment networks against approved enumerations', () => {
    for (const card of catalog) {
      expect(card.categories).toBeDefined();
      expect(Array.isArray(card.categories)).toBe(true);
      expect(card.categories.length).toBeGreaterThan(0);

      for (const cat of card.categories) {
        expect(VALID_CATEGORIES.has(cat)).toBe(true);
      }

      const networkTokens = card.network.split('/').map((token) => token.trim());
      for (const token of networkTokens) {
        expect(VALID_NETWORKS.has(token)).toBe(true);
      }
    }
  });

  it('should have valid billing cycle ranges (1-31) when defined', () => {
    for (const card of catalog) {
      if (card.defaultBillingStart !== undefined && card.defaultBillingStart !== null) {
        expect(Number.isInteger(card.defaultBillingStart)).toBe(true);
        expect(card.defaultBillingStart).toBeGreaterThanOrEqual(1);
        expect(card.defaultBillingStart).toBeLessThanOrEqual(31);
      }
      if (card.defaultBillingEnd !== undefined && card.defaultBillingEnd !== null) {
        expect(Number.isInteger(card.defaultBillingEnd)).toBe(true);
        expect(card.defaultBillingEnd).toBeGreaterThanOrEqual(1);
        expect(card.defaultBillingEnd).toBeLessThanOrEqual(31);
      }
    }
  });
});
