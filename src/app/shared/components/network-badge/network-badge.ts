import { Component, input, computed } from '@angular/core';

export interface NetworkIconItem {
  name: string;
  iconPath: string;
}

@Component({
  selector: 'app-network-badge',
  standalone: true,
  templateUrl: './network-badge.html',
  styleUrl: './network-badge.css',
})
export class NetworkBadgeComponent {
  readonly network = input<string>('Visa');
  readonly size = input<'xs' | 'sm' | 'md'>('sm');
  readonly showLabel = input<boolean>(true);

  readonly networkItems = computed<NetworkIconItem[]>(() => {
    const raw = this.network() || '';
    const parts = raw
      .split('/')
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      return [{ name: 'Card', iconPath: 'icons/networks/visa.svg' }];
    }

    return parts.map((part) => {
      const lower = part.toLowerCase();
      let icon = 'icons/networks/visa.svg';

      if (lower.includes('mastercard') || lower.includes('master')) {
        icon = 'icons/networks/mastercard.svg';
      } else if (lower.includes('rupay')) {
        icon = 'icons/networks/rupay.svg';
      } else if (lower.includes('amex') || lower.includes('american express')) {
        icon = 'icons/networks/amex.svg';
      } else if (lower.includes('diners')) {
        icon = 'icons/networks/diners.svg';
      } else if (lower.includes('visa')) {
        icon = 'icons/networks/visa.svg';
      }

      return {
        name: part,
        iconPath: icon,
      };
    });
  });
}
