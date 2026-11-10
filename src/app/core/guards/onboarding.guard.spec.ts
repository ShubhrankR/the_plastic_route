import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { onboardingGuard, welcomeGuard } from './onboarding.guard';
import { CardService } from '../services/card.service';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Route Guards', () => {
  let mockCardService: { hasCompletedOnboarding: ReturnType<typeof signal<boolean>> };
  let mockRouter: Partial<Router>;
  let dummyRoute: ActivatedRouteSnapshot;
  let dummyState: RouterStateSnapshot;

  beforeEach(() => {
    mockCardService = {
      hasCompletedOnboarding: signal<boolean>(false),
    };

    mockRouter = {
      createUrlTree: vi.fn(
        (commands: any[]) => ({ url: commands.join('/') }) as unknown as UrlTree,
      ),
    };

    dummyRoute = {
      queryParamMap: {
        get: vi.fn().mockReturnValue(null),
      },
    } as unknown as ActivatedRouteSnapshot;

    dummyState = { url: '/home' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: CardService, useValue: mockCardService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  describe('onboardingGuard', () => {
    it('should redirect first-time visitors to /welcome if onboarding is not completed', () => {
      mockCardService.hasCompletedOnboarding.set(false);

      const result = TestBed.runInInjectionContext(() => onboardingGuard(dummyRoute, dummyState));

      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/welcome']);
      expect(result).toBeDefined();
    });

    it('should allow navigation if user has completed onboarding', () => {
      mockCardService.hasCompletedOnboarding.set(true);

      const result = TestBed.runInInjectionContext(() => onboardingGuard(dummyRoute, dummyState));

      expect(result).toBe(true);
      expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
    });

    it('should bypass guard if query param has seed=owner or dev=true', () => {
      mockCardService.hasCompletedOnboarding.set(false);
      (dummyRoute.queryParamMap.get as any).mockImplementation((key: string) =>
        key === 'seed' ? 'owner' : null,
      );

      const result = TestBed.runInInjectionContext(() => onboardingGuard(dummyRoute, dummyState));

      expect(result).toBe(true);
      expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
    });
  });

  describe('welcomeGuard', () => {
    it('should redirect onboarded users visiting /welcome back to /home', () => {
      mockCardService.hasCompletedOnboarding.set(true);

      const result = TestBed.runInInjectionContext(() => welcomeGuard(dummyRoute, dummyState));

      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/home']);
    });

    it('should allow non-onboarded visitors to view /welcome', () => {
      mockCardService.hasCompletedOnboarding.set(false);

      const result = TestBed.runInInjectionContext(() => welcomeGuard(dummyRoute, dummyState));

      expect(result).toBe(true);
    });

    it('should allow onboarded users to revisit /welcome if ?force=true is supplied', () => {
      mockCardService.hasCompletedOnboarding.set(true);
      (dummyRoute.queryParamMap.get as any).mockImplementation((key: string) =>
        key === 'force' ? 'true' : null,
      );

      const result = TestBed.runInInjectionContext(() => welcomeGuard(dummyRoute, dummyState));

      expect(result).toBe(true);
    });
  });
});
