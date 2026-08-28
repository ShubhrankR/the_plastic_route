export type CardNetwork = 'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Diners Club';

export interface LoungeAccess {
  eligible: boolean;
  spendThreshold?: number;
  terminals?: string[];
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
  regulatoryUpdate: string;
  categories?: SpendCategory[];
  isCustom?: boolean;
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
  regulatoryUpdate: string;
  categories: SpendCategory[];
}

export interface OptimizationResult {
  bestCard: CreditCard;
  backupCard: CreditCard;
  interestFreeDays: number;
  dueDate: Date;
  reason: string;
  estimatedSaving?: number;
}

export interface BillingCycleStatus {
  cardName: string;
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
  | 'general';

export interface CategoryOption {
  value: SpendCategory;
  label: string;
}

