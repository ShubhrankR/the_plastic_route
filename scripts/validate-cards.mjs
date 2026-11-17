import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const CARDS_JSON_PATH = path.join(ROOT_DIR, 'src', 'app', 'core', 'data', 'cards.json');
const OWNER_PORTFOLIO_PATH = path.join(
  ROOT_DIR,
  'src',
  'app',
  'core',
  'data',
  'owner_portfolio.json',
);

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

const DANGEROUS_CONTENT_REGEX = /[<>]|(?:javascript|vbscript|data):/i;
const ID_REGEX = /^[a-z0-9_]+$/;

const MINIMUM_CARD_COUNT = 180;

const CRITICAL_FILES = [
  'src/app/core/data/cards.json',
  'src/app/core/data/owner_portfolio.json',
  'src/app/core/services/card.service.ts',
  'src/app/core/services/indexed-db.service.ts',
  'scripts/validate-cards.mjs',
  'scripts/sync-cards.mjs',
  '.github/CODEOWNERS',
  '.github/workflows/ci.yml',
];

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

/**
 * Validates a string for presence of angle brackets, HTML tags, or dangerous URI schemes.
 */
function isDangerousString(str) {
  if (typeof str !== 'string') return false;
  return DANGEROUS_CONTENT_REGEX.test(str);
}

/**
 * Validates that any URL embedded in text uses HTTPS and belongs to an approved banking/regulatory domain.
 */
function validateUrlsInString(str, context) {
  if (typeof str !== 'string') return [];
  const matches = str.match(URL_REGEX);
  if (!matches) return [];

  const urlErrors = [];
  for (const urlStr of matches) {
    try {
      const parsed = new URL(urlStr);
      if (parsed.protocol !== 'https:') {
        urlErrors.push(
          `${context}: Insecure HTTP link detected ("${urlStr}"). Only HTTPS URLs are permitted.`,
        );
        continue;
      }
      const hostname = parsed.hostname.toLowerCase();
      const isAllowed = ALLOWED_DOMAIN_SUFFIXES.some(
        (domain) => hostname === domain || hostname.endsWith('.' + domain),
      );
      if (!isAllowed) {
        urlErrors.push(
          `${context}: Disallowed external link domain ("${hostname}"). Only official banking and regulatory domains are permitted.`,
        );
      }
    } catch {
      urlErrors.push(`${context}: Malformed URL ("${urlStr}").`);
    }
  }
  return urlErrors;
}

/**
 * Validates the entire cards.json catalog and owner_portfolio.json.
 * Returns an object with { valid: boolean, errors: string[], cardCount: number }.
 */
export function validateCards() {
  const errors = [];

  // 0. Guard against critical repository file deletion
  for (const relPath of CRITICAL_FILES) {
    if (!fs.existsSync(path.resolve(ROOT_DIR, relPath))) {
      errors.push(
        `CRITICAL SECURITY FAILURE: Essential repository file "${relPath}" has been deleted.`,
      );
    }
  }

  // 1. Validate master catalog (cards.json)
  if (!fs.existsSync(CARDS_JSON_PATH)) {
    return {
      valid: false,
      errors: [`Master catalog not found at: ${CARDS_JSON_PATH}`, ...errors],
      cardCount: 0,
    };
  }

  let catalog;
  try {
    const rawContent = fs.readFileSync(CARDS_JSON_PATH, 'utf8');
    catalog = JSON.parse(rawContent);
  } catch (err) {
    return {
      valid: false,
      errors: [`Failed to parse cards.json as valid JSON: ${err.message}`, ...errors],
      cardCount: 0,
    };
  }

  if (!Array.isArray(catalog)) {
    return {
      valid: false,
      errors: ['cards.json root element must be a JSON array.', ...errors],
      cardCount: 0,
    };
  }

  // Guard against catalog truncation or mass deletion
  if (catalog.length < MINIMUM_CARD_COUNT) {
    errors.push(
      `SECURITY ALERT: Master catalog size (${catalog.length}) is below safety threshold (${MINIMUM_CARD_COUNT}). Card deletion is prohibited without explicit maintainer override.`,
    );
  }

  const seenIds = new Set();

  catalog.forEach((card, index) => {
    const cardRef = card.id ? `Card "${card.id}" (index ${index})` : `Card at index ${index}`;

    // ID validation
    if (!card.id || typeof card.id !== 'string') {
      errors.push(`${cardRef}: Missing or invalid "id" field (must be non-empty string).`);
    } else if (!ID_REGEX.test(card.id)) {
      errors.push(
        `${cardRef}: "id" must match regex /^[a-z0-9_]+$/ (lowercase alphanumeric and underscores only).`,
      );
    } else if (seenIds.has(card.id)) {
      errors.push(
        `${cardRef}: Duplicate card ID found: "${card.id}". IDs must be globally unique.`,
      );
    } else {
      seenIds.add(card.id);
    }

    // Name validation
    if (!card.name || typeof card.name !== 'string' || card.name.trim().length === 0) {
      errors.push(`${cardRef}: Missing or invalid "name" field.`);
    } else if (isDangerousString(card.name)) {
      errors.push(`${cardRef}: "name" contains prohibited HTML or script content.`);
    }

    // Bank validation
    if (!card.bank || typeof card.bank !== 'string' || card.bank.trim().length === 0) {
      errors.push(`${cardRef}: Missing or invalid "bank" field.`);
    } else if (isDangerousString(card.bank)) {
      errors.push(`${cardRef}: "bank" contains prohibited HTML or script content.`);
    }

    // Network validation
    if (!card.network || typeof card.network !== 'string') {
      errors.push(`${cardRef}: Missing or invalid "network" field.`);
    } else {
      const parts = card.network.split('/').map((p) => p.trim());
      const invalidParts = parts.filter((p) => !VALID_NETWORKS.has(p));
      if (invalidParts.length > 0) {
        errors.push(
          `${cardRef}: "network" contains invalid network token(s): "${invalidParts.join(', ')}". Allowed network tokens: ${Array.from(VALID_NETWORKS).join(', ')}.`,
        );
      }
    }

    // Optimization Vector validation
    if (!card.optimizationVector || typeof card.optimizationVector !== 'string') {
      errors.push(`${cardRef}: Missing or invalid "optimizationVector" field.`);
    } else if (isDangerousString(card.optimizationVector)) {
      errors.push(`${cardRef}: "optimizationVector" contains prohibited HTML or script content.`);
    }

    // Billing Start / End validation
    if (card.defaultBillingStart !== undefined && card.defaultBillingStart !== null) {
      if (
        typeof card.defaultBillingStart !== 'number' ||
        card.defaultBillingStart < 1 ||
        card.defaultBillingStart > 31
      ) {
        errors.push(
          `${cardRef}: "defaultBillingStart" must be an integer between 1 and 31 (got ${card.defaultBillingStart}).`,
        );
      }
    }
    if (card.defaultBillingEnd !== undefined && card.defaultBillingEnd !== null) {
      if (
        typeof card.defaultBillingEnd !== 'number' ||
        card.defaultBillingEnd < 1 ||
        card.defaultBillingEnd > 31
      ) {
        errors.push(
          `${cardRef}: "defaultBillingEnd" must be an integer between 1 and 31 (got ${card.defaultBillingEnd}).`,
        );
      }
    }

    // Lounge Access validation
    if (!card.loungeAccess || typeof card.loungeAccess !== 'object') {
      errors.push(`${cardRef}: Missing or invalid "loungeAccess" object.`);
    } else {
      if (typeof card.loungeAccess.eligible !== 'boolean') {
        errors.push(`${cardRef}: "loungeAccess.eligible" must be a boolean.`);
      }
      if (
        card.loungeAccess.spendThreshold !== undefined &&
        (typeof card.loungeAccess.spendThreshold !== 'number' ||
          card.loungeAccess.spendThreshold < 0)
      ) {
        errors.push(`${cardRef}: "loungeAccess.spendThreshold" must be a non-negative number.`);
      }
      if (
        card.loungeAccess.terminals !== undefined &&
        !Array.isArray(card.loungeAccess.terminals)
      ) {
        errors.push(`${cardRef}: "loungeAccess.terminals" must be an array of strings.`);
      }
    }

    // Categories validation
    if (!card.categories || !Array.isArray(card.categories) || card.categories.length === 0) {
      errors.push(`${cardRef}: "categories" must be a non-empty array.`);
    } else {
      for (const cat of card.categories) {
        if (!VALID_CATEGORIES.has(cat)) {
          errors.push(
            `${cardRef}: Invalid category "${cat}". Allowed: ${Array.from(VALID_CATEGORIES).join(', ')}.`,
          );
        }
      }
    }

    // String fields sanitization check
    if (card.regulatoryUpdate && isDangerousString(card.regulatoryUpdate)) {
      errors.push(`${cardRef}: "regulatoryUpdate" contains prohibited HTML or script content.`);
    }
    if (card.annualFee && typeof card.annualFee === 'string' && isDangerousString(card.annualFee)) {
      errors.push(`${cardRef}: "annualFee" contains prohibited HTML or script content.`);
    }
    if (
      card.forexMarkup &&
      typeof card.forexMarkup === 'string' &&
      isDangerousString(card.forexMarkup)
    ) {
      errors.push(`${cardRef}: "forexMarkup" contains prohibited HTML or script content.`);
    }

    // Strict external link & domain whitelist validation
    ['name', 'bank', 'optimizationVector', 'regulatoryUpdate', 'annualFee', 'forexMarkup'].forEach(
      (prop) => {
        if (typeof card[prop] === 'string') {
          errors.push(...validateUrlsInString(card[prop], `${cardRef}: "${prop}"`));
        }
      },
    );
  });

  // 2. Validate owner portfolio (owner_portfolio.json) if it exists
  if (fs.existsSync(OWNER_PORTFOLIO_PATH)) {
    let ownerPortfolio;
    try {
      ownerPortfolio = JSON.parse(fs.readFileSync(OWNER_PORTFOLIO_PATH, 'utf8'));
    } catch (err) {
      errors.push(`Failed to parse owner_portfolio.json: ${err.message}`);
    }

    if (Array.isArray(ownerPortfolio)) {
      ownerPortfolio.forEach((item, idx) => {
        const itemRef = `owner_portfolio[${idx}]`;
        if (!item.id || typeof item.id !== 'string') {
          errors.push(`${itemRef}: Missing "id" field.`);
        } else if (!seenIds.has(item.id)) {
          errors.push(
            `${itemRef}: Card ID "${item.id}" does not exist in master catalog cards.json.`,
          );
        }

        if (
          typeof item.billingCycleStart !== 'number' ||
          item.billingCycleStart < 1 ||
          item.billingCycleStart > 31
        ) {
          errors.push(`${itemRef}: "billingCycleStart" must be between 1 and 31.`);
        }
        if (
          typeof item.billingCycleEnd !== 'number' ||
          item.billingCycleEnd < 1 ||
          item.billingCycleEnd > 31
        ) {
          errors.push(`${itemRef}: "billingCycleEnd" must be between 1 and 31.`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    cardCount: catalog ? catalog.length : 0,
  };
}

// CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('🔍 Validating master credit card catalog and portfolio schema...');
  const result = validateCards();

  if (result.valid) {
    console.log(
      `✅ Schema Validation Succeeded: All ${result.cardCount} cards in cards.json and owner_portfolio.json conform to strict schema requirements.`,
    );
    process.exit(0);
  } else {
    console.error(`❌ Schema Validation Failed with ${result.errors.length} error(s):\n`);
    result.errors.forEach((err, idx) => {
      console.error(`  [${idx + 1}] ${err}`);
    });
    process.exit(1);
  }
}
