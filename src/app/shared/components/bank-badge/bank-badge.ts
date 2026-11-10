import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-bank-badge',
  standalone: true,
  templateUrl: './bank-badge.html',
  styleUrl: './bank-badge.css',
})
export class BankBadgeComponent {
  readonly bank = input<string | undefined>('');
  readonly size = input<'xs' | 'sm' | 'md'>('sm');
  readonly showLabel = input<boolean>(true);

  readonly bankDetails = computed<{ name: string; iconPath: string }>(() => {
    const raw = this.bank() || '';
    const lower = raw.toLowerCase().trim();

    let icon = 'icons/banks/generic.svg';
    let name = raw || 'Bank';

    if (lower.includes('hdfc')) {
      icon = 'icons/banks/hdfc.svg';
      name = 'HDFC Bank';
    } else if (lower.includes('sbi')) {
      icon = 'icons/banks/sbi.svg';
      name = 'SBI Card';
    } else if (lower.includes('icici')) {
      icon = 'icons/banks/icici.svg';
      name = 'ICICI Bank';
    } else if (lower.includes('axis')) {
      icon = 'icons/banks/axis.svg';
      name = 'Axis Bank';
    } else if (lower.includes('idfc')) {
      icon = 'icons/banks/idfc.svg';
      name = 'IDFC FIRST';
    } else if (lower.includes('indusind')) {
      icon = 'icons/banks/indusind.svg';
      name = 'IndusInd Bank';
    } else if (lower.includes('kotak')) {
      icon = 'icons/banks/kotak.svg';
      name = 'Kotak Bank';
    } else if (lower.includes('federal')) {
      icon = 'icons/banks/federal.svg';
      name = raw.includes('BOB') ? 'BOBCARD / Federal' : 'Federal Bank';
    } else if (lower.includes('bob') || lower.includes('baroda')) {
      icon = 'icons/banks/bob.svg';
      name = 'BOBCARD';
    } else if (lower.includes('yes')) {
      icon = 'icons/banks/yesbank.svg';
      name = 'Yes Bank';
    } else if (lower.includes('amex') || lower.includes('american express')) {
      icon = 'icons/banks/amex.svg';
      name = 'American Express';
    }

    return { name, iconPath: icon };
  });
}
