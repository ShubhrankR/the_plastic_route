import { Component, inject, signal, computed } from '@angular/core';
import { CardService } from '../../../../core/services/card.service';
import { AirportInfo } from '../../../../core/models/card.model';
import { BankBadgeComponent } from '../../../../shared/components/bank-badge/bank-badge';
import { NetworkBadgeComponent } from '../../../../shared/components/network-badge/network-badge';

@Component({
  selector: 'app-lounge-checker',
  standalone: true,
  imports: [BankBadgeComponent, NetworkBadgeComponent],
  templateUrl: './lounge-checker.html',
  styleUrl: './lounge-checker.css',
})
export class LoungeChecker {
  private readonly cardService = inject(CardService);

  readonly airports = this.cardService.airports;
  readonly userCards = this.cardService.cards;

  selectedAirportCode = signal<string>('BLR');

  readonly currentAirport = computed<AirportInfo | undefined>(() => {
    return this.airports().find((a) => a.code === this.selectedAirportCode());
  });

  readonly eligibleCards = computed(() => {
    return this.userCards().filter((c) => c.loungeAccess?.eligible);
  });

  selectAirport(code: string): void {
    this.selectedAirportCode.set(code);
  }
}
