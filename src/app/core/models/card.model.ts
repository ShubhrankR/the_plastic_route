export type CardNetwork = 'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Diners Club' | (string & {});

export interface LoungeAccess {
  eligible: boolean;
  spendThreshold?: number;
  terminals?: string[];
  notes?: string;
  [key: string]: any;
}

export interface CardMilestone {
  id: string;
  title: string;
  spendTarget: number;
  period: 'Quarterly' | 'Annual';
  reward: string;
  currentSpend?: number;
}

export interface CreditCard {
  id: string;
  name: string;
  bank?: string;
  network: CardNetwork;
  optimizationVector: string;
  billingCycleStart: number;
  billingCycleEnd: number;
  loungeAccess: LoungeAccess;
  regulatoryUpdate?: string;
  categories?: SpendCategory[];
  isCustom?: boolean;
  annualFee?: string | number;
  forexMarkup?: string | number;
  rewardRate?: string;
  tags?: string[];
  milestones?: CardMilestone[];
  customNotes?: string;
  feeWaiverSpend?: number;
  [key: string]: any;
}

export interface MasterCatalogCard {
  id: string;
  name: string;
  bank: string;
  network: CardNetwork;
  optimizationVector: string;
  defaultBillingStart?: number;
  defaultBillingEnd?: number;
  loungeAccess: LoungeAccess;
  regulatoryUpdate?: string;
  categories: SpendCategory[];
  annualFee?: string | number;
  forexMarkup?: string | number;
  rewardRate?: string;
  tags?: string[];
  milestones?: CardMilestone[];
  [key: string]: any;
}

export interface ForexDetails {
  foreignCurrency: string;
  foreignAmount: number;
  exchangeRateToInr: number;
  inrBaseAmount: number;
  standardMarkupPercent: number; // typically 3.5%
  standardGstPercent: number; // 18% on markup
  standardTotalFee: number;
  bestCardMarkupPercent: number; // 0% to 2%
  bestCardTotalFee: number;
  netSavings: number;
}

export interface OptimizationResult {
  bestCard: CreditCard;
  backupCard: CreditCard;
  interestFreeDays: number;
  dueDate: Date;
  reason: string;
  estimatedSaving?: number;
  excludedCategoryWarning?: string;
  feeWarning?: string;
  forexDetails?: ForexDetails;
}

export interface BillingCycleStatus {
  cardName: string;
  card?: CreditCard;
  statementDay: number;
  targetCycle: 'Current Bill' | 'Next Bill';
  daysLeft: number;
  severity: 'danger' | 'warning' | 'success';
}

export type SpendCategory =
  | 'amazon'
  | 'flipkart'
  | 'bpcl'
  | 'other_fuel'
  | 'upi'
  | 'forex'
  | 'dining_travel'
  | 'gaming_wallet'
  | 'rent'
  | 'utilities'
  | 'education'
  | 'wallet_load'
  | 'government'
  | 'general'
  | (string & {});

export interface CategoryOption {
  value: SpendCategory;
  label: string;
  icon?: string;
  warningNote?: string;
  [key: string]: any;
}

export interface WalletBackupPayload {
  version: number;
  appName: string;
  exportedAt: string;
  cards: CreditCard[];
  [key: string]: any;
}

export interface AirportTerminal {
  terminalName: string;
  lounges: {
    name: string;
    location: string;
    type: 'Domestic' | 'International';
    eligibleNetworks: string[];
    spendRequirement?: string;
    operator: string;
  }[];
}

export interface AirportInfo {
  code: string;
  city: string;
  name: string;
  terminals: AirportTerminal[];
}
