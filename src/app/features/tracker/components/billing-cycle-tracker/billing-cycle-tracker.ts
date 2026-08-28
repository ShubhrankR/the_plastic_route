import { Component, inject, computed } from '@angular/core';
import { CardService } from '../../../../core/services/card.service';
import { BillingCycleStatus } from '../../../../core/models/card.model';

@Component({
  selector: 'app-billing-cycle-tracker',
  standalone: true,
  templateUrl: './billing-cycle-tracker.html',
  styleUrl: './billing-cycle-tracker.css',
})
export class BillingCycleTracker {
  private readonly cardService = inject(CardService);

  readonly statuses = computed<BillingCycleStatus[]>(() =>
    this.cardService.getAllBillingCycleStatuses()
  );

  refresh(): void {
    // Computed automatically tracks signal changes
  }

  getBadgeClass(severity: string): string {
    switch (severity) {
      case 'danger': return 'badge-danger';
      case 'warning': return 'badge-warning';
      case 'success': return 'badge-success';
      default: return 'badge-network';
    }
  }
}
