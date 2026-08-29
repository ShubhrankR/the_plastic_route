import { Routes } from '@angular/router';
import { onboardingGuard, welcomeGuard } from './core/guards/onboarding.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'welcome',
    canActivate: [welcomeGuard],
    loadComponent: () =>
      import('./features/welcome/welcome.component').then(m => m.WelcomeComponent),
  },
  {
    path: 'home',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'optimizer',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./features/optimizer/optimizer.component').then(m => m.OptimizerComponent),
  },
  {
    path: 'tracker',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./features/tracker/tracker.component').then(m => m.TrackerComponent),
  },
  {
    path: 'portfolio',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent),
  },
  { path: '**', redirectTo: 'home' },
];
