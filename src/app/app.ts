import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { SpendOptimizer } from './components/spend-optimizer/spend-optimizer';
import { OptimizationResults } from './components/optimization-results/optimization-results';
import { BillingCycleTracker } from './components/billing-cycle-tracker/billing-cycle-tracker';
import { PortfolioTable } from './components/portfolio-table/portfolio-table';
import { Footer } from './components/footer/footer';
import { OptimizationResult } from './models/card.model';

type ActiveTab = 'optimizer' | 'tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    SpendOptimizer,
    OptimizationResults,
    BillingCycleTracker,
    PortfolioTable,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** Currently active tab. */
  protected readonly activeTab = signal<ActiveTab>('optimizer');

  /** The latest optimization result (null before first run). */
  protected readonly optimizationResult = signal<OptimizationResult | null>(null);

  setTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  onOptimized(result: OptimizationResult): void {
    this.optimizationResult.set(result);
  }
}
