export interface LoungeAccess {
  eligible: boolean;
  spendThreshold?: number;
  terminals?: string[];
}

export interface CreditCard {
  id: string;
  name: string;
  network: 'Visa' | 'Mastercard' | 'RuPay';
  optimizationVector: string;
  billingCycleStart: number;
  billingCycleEnd: number;
  loungeAccess: LoungeAccess;
  regulatoryUpdate: string;
}

export interface OptimizationResult {
  bestCard: CreditCard;
  backupCard: CreditCard;
  interestFreeDays: number;
  dueDate: Date;
  reason: string;
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
