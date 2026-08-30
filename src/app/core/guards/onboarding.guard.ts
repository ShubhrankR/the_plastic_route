import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CardService } from '../services/card.service';

/**
 * Route guard that ensures first-time visitors are redirected to the dedicated /welcome onboarding gateway.
 */
export const onboardingGuard: CanActivateFn = (route, state) => {
  const cardService = inject(CardService);
  const router = inject(Router);

  // Check if owner seed is requested via query params -> allow direct access
  const isOwnerSeed =
    route.queryParamMap.get('seed') === 'owner' ||
    (typeof window !== 'undefined' && window.location.hash.includes('seed=owner'));

  if (isOwnerSeed) {
    return true;
  }

  // If FTUE is completed -> allow navigation
  if (cardService.hasCompletedOnboarding()) {
    return true;
  }

  // First-time visitor -> redirect to /welcome
  return router.createUrlTree(['/welcome']);
};

/**
 * Route guard for /welcome to redirect already-onboarded users back to /home
 * unless accessed with ?force=true.
 */
export const welcomeGuard: CanActivateFn = (route, state) => {
  const cardService = inject(CardService);
  const router = inject(Router);

  const force = route.queryParamMap.get('force') === 'true';
  if (!force && cardService.hasCompletedOnboarding()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
