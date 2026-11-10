import { Component, signal } from '@angular/core';
import { BillingCycleTracker } from './components/billing-cycle-tracker/billing-cycle-tracker';
import { LoungeChecker } from './components/lounge-checker/lounge-checker';
import { MilestoneTracker } from './components/milestone-tracker/milestone-tracker';

export type TrackerTab = 'billing' | 'lounge' | 'milestones';

@Component({
  selector: 'app-tracker-page',
  standalone: true,
  imports: [BillingCycleTracker, LoungeChecker, MilestoneTracker],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {
  activeTab = signal<TrackerTab>('billing');

  setTab(tab: TrackerTab): void {
    this.activeTab.set(tab);
  }
}
