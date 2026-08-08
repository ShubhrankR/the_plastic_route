import { Component, signal } from '@angular/core';
import { SpendOptimizerForm } from './components/spend-optimizer-form/spend-optimizer-form';
import { OptimizationResults } from './components/optimization-results/optimization-results';
import { PortfolioTable } from '../portfolio/components/portfolio-table/portfolio-table';
import { OptimizationResult } from '../../core/models/card.model';

@Component({
  selector: 'app-optimizer-page',
  standalone: true,
  imports: [SpendOptimizerForm, OptimizationResults, PortfolioTable],
  templateUrl: './optimizer.component.html',
  styleUrl: './optimizer.component.css',
})
export class OptimizerComponent {
  /** The latest optimization result (null before first run). */
  protected readonly optimizationResult = signal<OptimizationResult | null>(null);

  onOptimized(result: OptimizationResult): void {
    this.optimizationResult.set(result);
  }
}
