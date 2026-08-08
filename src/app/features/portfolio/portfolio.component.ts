import { Component } from '@angular/core';
import { PortfolioTable } from './components/portfolio-table/portfolio-table';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [PortfolioTable],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {}
