import { Component, input } from '@angular/core';
import { OptimizationResult } from '../../../../core/models/card.model';

@Component({
  selector: 'app-optimization-results',
  standalone: true,
  templateUrl: './optimization-results.html',
  styleUrl: './optimization-results.css',
})
export class OptimizationResults {
  /** The optimization result to display. Null when no optimization has been run yet. */
  result = input<OptimizationResult | null>(null);

  /** Format a date for display in Indian locale. */
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  /** Format the lounge threshold for display. */
  getLoungeLabel(result: OptimizationResult): string {
    const lounge = result.bestCard.loungeAccess;
    if (!lounge.eligible) return '';
    return lounge.spendThreshold && lounge.spendThreshold > 0
      ? `(Spend Req: ₹${lounge.spendThreshold.toLocaleString('en-IN')})`
      : '(No Spend Req)';
  }
}
