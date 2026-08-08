import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'optimizer', pathMatch: 'full' },
  {
    path: 'optimizer',
    loadComponent: () =>
      import('./features/optimizer/optimizer.component').then(m => m.OptimizerComponent),
  },
  {
    path: 'tracker',
    loadComponent: () =>
      import('./features/tracker/tracker.component').then(m => m.TrackerComponent),
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent),
  },
  { path: '**', redirectTo: 'optimizer' },
];
