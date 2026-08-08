import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../../../core/services/card.service';
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
  protected amount = '';
  protected category: SpendCategory | '' = '';

  onSubmit(): void {
    if (!this.category) return;
    const result = this.cardService.getOptimalRoute(this.category as SpendCategory);
    this.optimized.emit(result);
  }
}
