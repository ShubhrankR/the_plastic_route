import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardService, FOREX_RATES } from '../../../../core/services/card.service';
import { OptimizationResult, SpendCategory } from '../../../../core/models/card.model';

@Component({
  selector: 'app-spend-optimizer-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './spend-optimizer-form.html',
  styleUrl: './spend-optimizer-form.css',
})
export class SpendOptimizerForm {
  private readonly cardService = inject(CardService);

  /** Emits the optimization result to the parent. */
  optimized = output<OptimizationResult>();

  protected readonly categories = this.cardService.categories;
  protected readonly forexCurrencies = Object.entries(FOREX_RATES).map(([code, data]) => ({
    code,
    label: data.label,
    symbol: data.symbol,
    rate: data.rate,
  }));

  protected amount = '';
  protected category: SpendCategory | '' = '';
  protected currency = 'INR';

  onCategoryChange(): void {
    if (this.category === 'forex' && this.currency === 'INR') {
      this.currency = 'USD';
    } else if (this.category !== 'forex') {
      this.currency = 'INR';
    }

    if (this.category) {
      this.calculate();
    }
  }

  onCurrencyChange(): void {
    if (this.category) {
      this.calculate();
    }
  }

  onSubmit(): void {
    if (!this.category) return;
    this.calculate();
  }

  private calculate(): void {
    const numAmount = this.amount ? Number(this.amount) : undefined;
    const result = this.cardService.getOptimalRoute(
      this.category as SpendCategory,
      numAmount,
      this.currency,
    );
    this.optimized.emit(result);
  }
}
