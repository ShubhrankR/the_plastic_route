import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../../../core/services/card.service';

@Component({
  selector: 'app-milestone-tracker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './milestone-tracker.html',
  styleUrl: './milestone-tracker.css',
})
export class MilestoneTracker {
  private readonly cardService = inject(CardService);

  readonly milestones = signal(this.cardService.getWalletMilestones());
  quarterlySpendSim = signal<number>(35000);

  getProgress(target: number): number {
    if (!target || target <= 0) return 0;
    return Math.min(100, Math.round((this.quarterlySpendSim() / target) * 100));
  }

  getSpendNeeded(target: number): number {
    return Math.max(0, target - this.quarterlySpendSim());
  }
}
