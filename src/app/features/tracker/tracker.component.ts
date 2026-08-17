import { Component } from '@angular/core';
import { BillingCycleTracker } from './components/billing-cycle-tracker/billing-cycle-tracker';

@Component({
  selector: 'app-tracker-page',
  standalone: true,
  imports: [BillingCycleTracker],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {}
