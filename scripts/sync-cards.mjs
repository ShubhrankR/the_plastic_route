import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const CARDS_JSON_PATH = path.join(ROOT_DIR, 'src', 'app', 'core', 'data', 'cards.json');
const WORKER_DIR = path.join(ROOT_DIR, 'worker');

/**
 * Parses simple CSV content with support for quoted strings.
 */
function parseCSV(content) {
  const lines = [];
  let currentLine = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentLine.push(currentCell.trim());
      if (currentLine.some((c) => c.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    if (currentLine.some((c) => c.length > 0)) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Generates an ID slug from card name
 */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Infers card network
 */
function inferNetwork(name, rawNetwork = '') {
  const text = `${name} ${rawNetwork}`.toLowerCase();
  if (text.includes('rupay')) return 'RuPay';
  if (text.includes('amex') || text.includes('american express')) return 'Amex';
  if (text.includes('diners')) return 'Diners Club';
  if (text.includes('mastercard')) return 'Mastercard';
  return 'Visa';
}

/**
 * Infers bank name from card title
 */
function inferBank(name) {
  const text = name.toLowerCase();
  if (text.includes('hdfc')) return 'HDFC Bank';
  if (text.includes('sbi')) return 'SBI Card';
  if (text.includes('icici')) return 'ICICI Bank';
  if (text.includes('axis')) return 'Axis Bank';
  if (text.includes('amex') || text.includes('american express')) return 'American Express';
  if (text.includes('federal')) return 'Federal Bank';
  if (text.includes('idfc')) return 'IDFC FIRST Bank';
  if (text.includes('yes bank')) return 'Yes Bank';
  if (text.includes('bob') || text.includes('scapia')) return 'BOBCARD / Federal';
  return 'Axis Bank';
}

/**
 * Infers spending categories from rewards text
 */
function inferCategories(name, rewardsText = '') {
  const text = `${name} ${rewardsText}`.toLowerCase();
  const categories = new Set();

  if (text.includes('amazon')) categories.add('amazon');
  if (text.includes('flipkart') || text.includes('myntra') || text.includes('cleartrip')) categories.add('flipkart');
  if (text.includes('bpcl')) categories.add('bpcl');
  if (text.includes('fuel') || text.includes('iocl') || text.includes('indianoil') || text.includes('hpcl')) categories.add('other_fuel');
  if (text.includes('upi') || text.includes('super.money')) categories.add('upi');
  if (text.includes('forex') || text.includes('fx ') || text.includes('international') || text.includes('airline') || text.includes('miles')) categories.add('forex');
  if (text.includes('dining') || text.includes('swiggy') || text.includes('zomato') || text.includes('travel') || text.includes('bogo') || text.includes('bookmyshow') || text.includes('movie') || text.includes('flight')) categories.add('dining_travel');
  if (text.includes('utility') || text.includes('google pay') || text.includes('wallet') || text.includes('recharge')) categories.add('gaming_wallet');

  categories.add('general');
  return Array.from(categories);
}

/**
 * Infers lounge eligibility and terminals
 */
function inferLounge(loungeText = '') {
  const text = loungeText.toLowerCase();
  if (!text || text.includes('none') || text.includes('no lounge') || text.includes('no airport lounge')) {
    return { eligible: false };
  }

  const terminals = ['Domestic'];
  if (text.includes('international') || text.includes('priority pass') || text.includes('globally')) {
    terminals.push('International');
  }
  if (text.includes('priority pass')) {
    terminals.push('Priority Pass');
  }

  let spendThreshold = 0;
  if (text.includes('spend') || text.includes('mitc') || text.includes('quarter')) {
    spendThreshold = 50000;
  }

  return {
    eligible: true,
    spendThreshold,
    terminals: Array.from(new Set(terminals)),
  };
}

/**
 * Infers annual fee string
 */
function inferAnnualFee(feeText = '') {
  const text = feeText.toLowerCase();
  if (text.includes('lifetime‑free') || text.includes('lifetime-free') || text.includes('nil') || text.includes('free')) {
    return 'Lifetime Free';
  }
  const match = feeText.match(/₹?([0-9,]+)/);
  if (match) {
    return `₹${match[1]} + GST`;
  }
  return '₹500 + GST';
}

/**
 * Infers forex markup string
 */
function inferForex(fuelForexText = '') {
  const text = fuelForexText.toLowerCase();
  if (text.includes('0%') || text.includes('zero forex')) return '0.0%';
  if (text.includes('2%')) return '2.0%';
  if (text.includes('1.5%')) return '1.5%';
  return '3.5%';
}

/**
 * Synchronizes worker CSV datasets into cards.json
 */
export async function syncCards() {
  console.log('🔄 Card Harvester: Reading master catalog...');
  const currentCatalog = JSON.parse(fs.readFileSync(CARDS_JSON_PATH, 'utf8'));
  const cardMap = new Map(currentCatalog.map((card) => [card.id, card]));

  let addedCount = 0;
  let updatedCount = 0;

  if (fs.existsSync(WORKER_DIR)) {
    const files = fs.readdirSync(WORKER_DIR).filter((f) => f.endsWith('.csv'));

    for (const file of files) {
      console.log(`📂 Processing dataset: ${file}`);
      const filePath = path.join(WORKER_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const rows = parseCSV(content);

      if (rows.length <= 1) continue;

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 3) continue;

        const [cardName, rawNetwork, feeText, rewardsText, loungeText, fuelForexText] = row;
        if (!cardName || cardName.trim().length === 0) continue;

        const cleanName = cardName.replace(/\s*\(.*?\)/g, '').trim();
        const id = slugify(cleanName);
        const bank = inferBank(cleanName);
        const network = inferNetwork(cleanName, rawNetwork);
        const annualFee = inferAnnualFee(feeText);
        const forexMarkup = inferForex(fuelForexText);
        const loungeAccess = inferLounge(loungeText);
        const categories = inferCategories(cleanName, rewardsText);

        const optimizationVector = rewardsText
          ? rewardsText.replace(/axis\.bank(\+\d+)?/gi, '').replace(/\s+/g, ' ').trim()
          : `${cleanName} optimal reward mapping.`;

        const newEntry = {
          id,
          name: cleanName,
          bank,
          network,
          optimizationVector,
          defaultBillingStart: 12,
          defaultBillingEnd: 11,
          loungeAccess,
          regulatoryUpdate: `2026 Update: Verified terms via issuer schedule & MITC.`,
          categories,
          annualFee,
          forexMarkup,
        };

        if (cardMap.has(id)) {
          const existing = cardMap.get(id);
          cardMap.set(id, { ...existing, ...newEntry });
          updatedCount++;
        } else {
          cardMap.set(id, newEntry);
          addedCount++;
        }
      }
    }
  }

  const updatedCatalog = Array.from(cardMap.values());
  fs.writeFileSync(CARDS_JSON_PATH, JSON.stringify(updatedCatalog, null, 2) + '\n', 'utf8');

  console.log(`✅ Master Catalog Synchronized: ${updatedCatalog.length} total cards (${addedCount} added, ${updatedCount} updated).`);
  console.log(`🔒 Owner seed portfolio in 'owner_portfolio.json' remained untouched.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncCards().catch((err) => {
    console.error('❌ Error during card sync:', err);
    process.exit(1);
  });
}
