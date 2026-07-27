import { Component, inject, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { BillingCycleStatus } from '../../models/card.model';

@Component({
  selector: 'app-billing-cycle-tracker',
  standalone: true,
  templateUrl: './billing-cycle-tracker.html',
  styleUrl: './billing-cycle-tracker.css',
})
export class BillingCycleTracker implements OnInit {
  private readonly cardService = inject(CardService);
  protected statuses: BillingCycleStatus[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.statuses = this.cardService.getAllBillingCycleStatuses();
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
