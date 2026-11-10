# 📋 The Plastic Route — Development & Feature Roadmap

This document tracks all active, upcoming, and long-term development tasks for **The Plastic Route**, including the project's origin philosophy, current production readiness, and phased feature roadmap.

---

## 🌱 Origin & Core Philosophy

The idea for **The Plastic Route** was born out of a real-world problem: managing multiple credit cards and trying to remember which card yields the best benefits for a specific transaction at a specific time.

While commercial FinTech applications (like CRED and others) offer reward tracking and bill payment, they often obscure the most critical information behind gamification, ads, or complex UX. They do not provide a direct, clear answer to the immediate question: _"I am about to pay for X. Which card should I swipe right now to maximize my rewards and interest-free period?"_

The Plastic Route is designed to solve exactly this problem—providing immediate, actionable clarity without the noise.

### 🛡️ Privacy-First Data Architecture

To build trust and ensure security, this application operates on a strict **Zero-Backend / Privacy-First** model.

- **Client-Side Storage**: Users input their specific credit card portfolio (card name, network, billing cycle dates, and custom rules). All data is stored **exclusively** on the user's browser using `IndexedDB`.
- **No Telemetry**: The app itself (and its creators) have absolutely zero access to the user's financial setup. There is no database, no server syncing, and no user accounts required.
- **Static Hosting**: 100% statically built client deployed directly to GitHub Pages with SPA hash-routing support.

---

## 🚀 Current Production Status

- **Live URL**: [https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)
- **Catalog Size**: 182 credit cards across major Indian banks (HDFC, ICICI, SBI, Axis, IDFC FIRST, Kotak, IndusInd, Federal, etc.).
- **CI / Security Gate**: Fully automated with CodeQL security scanning and zero high/critical vulnerabilities.

---

## ✅ Completed Milestones

### Phase 0 — Framework Migration (July 2026)

The project was migrated from **HTML5 + Bootstrap 5 + jQuery** to **Angular 22** with:

- **Standalone components** (no NgModules)
- **Angular Signals** for reactive state management
- **TypeScript 6** with strict mode
- **Injectable services** (`CardService`, `ThemeService`) with dependency injection
- **Custom CSS design system** replacing Bootstrap (glassmorphism aesthetic preserved)
- **Externalized card data** in `cards.json` for easy community contributions

### Phase 1 — State, Routing & Design Foundation

- [x] **Modern Angular Architecture Reorganization (`core/`, `features/`, `shared/`)**
  - [x] Reorganize codebase to modern Angular 22 standalone industry standards with Signals.
- [x] **Angular Router Integration (`/router`)**
  - [x] Configure Angular Router in `src/app/app.routes.ts` with `HashLocationStrategy`.
  - [x] Add dedicated route views: `/home`, `/optimizer`, `/tracker`, `/portfolio`.
  - [x] Update `Navbar` component to use `routerLink` and `routerLinkActive` for seamless navigation.
- [x] **IndexedDB Persistence Layer (`IndexedDBService`)**
  - [x] Implement `IndexedDBService` in `core/services/` using native `window.indexedDB` and Angular Signals.
  - [x] Define object stores for `user_cards` and `user_settings`.
  - [x] Add automatic fallback mechanism to `cards.json` when local IndexedDB is empty.
- [x] **Design System & Brand Identity**
  - [x] Implement 100% custom Vanilla CSS **Emerald Forest & Gold (Organic Growth)** color system for Dark and Light modes.
  - [x] Create and integrate vector brand assets (`public/the_plastic_route.svg`, `public/favicon.svg`, `public/favicon.ico`).
  - [x] Add animated circulating conic-gradient borders on interactive hero CTA buttons.

### Phase 2 — Dynamic User Portfolio & Customization (August 2026)

- [x] **Dedicated First-Time User Experience (FTUE) & Route Guards**
  - [x] Create dedicated, distraction-free Onboarding Gateway (`/#/welcome`) with balanced dual choice cards (_Explore Demo Mode_ vs _Build Personal Wallet_).
  - [x] Implement Angular Functional Route Guards (`onboardingGuard`, `welcomeGuard`) with synchronous `localStorage` verification to eliminate content flash (FOUC).
  - [x] Expose `hasCompletedOnboarding` reactive signal and clean up homepage layout.
- [x] **Toast Notifications & Undo Card Deletion System**
  - [x] Create reactive Signal-based `ToastService` and glassmorphic `<app-toast>` component.
  - [x] Implement interactive `[ ↩️ Undo ]` action to instantly restore deleted cards back to IndexedDB and reactive signals.
- [x] **Scroll-Triggered Micro-Animations**
  - [x] Implement `ScrollRevealDirective` leveraging native `IntersectionObserver` with one-shot unobserve and `prefers-reduced-motion` compliance.
- [x] **Light Mode Theming & Form Accessibility Overhaul**
  - [x] Soften light theme primary background to eye-friendly neutral off-white (`#f8fafc` / slate-50) and white cards (`#ffffff`).
  - [x] Upgrade light mode typography to high-contrast Slate-900 (`#0f172a`) and Slate-700 (`#334155`).
  - [x] Overhaul Edit Card modal contrast: crisp white input surfaces with slate borders, dark labels, and readable select dropdowns.
- [x] **Extensible Data Models & Distinct Sample Dataset**
  - [x] Make `CreditCard` and `MasterCatalogCard` interfaces extensible with optional metadata fields and open index signatures (`[key: string]: any`).
  - [x] Randomize and distribute default statement dates in `cards.json` across the month, completely segregating demo data from the developer seed.
- [x] **Autonomous Card Harvester & Multi-Bank Dataset Ingestion**
  - [x] Standalone Node.js dataset ingestion & normalization engine (`scripts/sync-cards.mjs` / `npm run cards:sync`).
  - [x] Master card catalog expansion to 182 cards across all major Indian banks with 2026 lounge criteria and spend thresholds.
  - [x] Strict schema validation suite (`scripts/validate-cards.mjs` / `npm run cards:validate`).
  - [x] Guaranteed isolation of private seed data (`src/app/core/data/owner_portfolio.json`).

### Phase 2.5 — CI/CD, Supply Chain & Security Hardening (November 2026)

- [x] **Continuous Integration & Automated GitHub Pages Deployment**
  - [x] Configure `.github/workflows/deploy.yml` with SPA 404 routing for hash navigation.
  - [x] CodeQL Static Analysis workflow integration with zero security warnings.
- [x] **Dependency Security Vulnerability Remediations**
  - [x] Upgraded `@angular/build` and `@angular/cli` to `^22.2.5` to resolve high-severity advisories on `vite@8.3.0–8.3.2`.
  - [x] Patched `fast-uri` to `3.1.9` resolving scheme spoofing and host canonicalization CVEs.
  - [x] Resolved Dependabot `typescript@7.x` peer dependency conflict by separating TypeScript from the Angular dependency group and adding major version update ignore rules.
  - [x] Tuned Dependabot execution cadence to monthly with adjusted PR limits (3 for npm, 2 for actions) to eliminate pipeline noise.

---

## 🎯 Active & Upcoming Milestones

### Phase 3 — Pre-Launch Polish & Data Sovereignty (Immediate Priority)

- [x] **Privacy-First Data Sovereignty (Backup & Restore)**
  - [x] Implement **Export Wallet (JSON)**: one-click file download containing user's cards and custom settings.
  - [x] Implement **Import Wallet (JSON)**: file upload validator to restore/migrate portfolio across devices or after clearing browser cache.
  - [x] Add explicit "Reset Wallet to Default" confirmation dialog with toast undo protection.
- [x] **Public UI Clean-up**
  - [x] Remove/hide developer-only action (`📥 Load Developer Seed`) from public `/portfolio` view (keep accessible only via `?dev=true` or `?seed=owner` URL parameter for maintainers).
  - [x] Clean up legacy Bootstrap CSS classes embedded in `src/index.html`.
- [x] **Social Sharing & SEO Metadata**
  - [x] Add OpenGraph metadata tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) to `src/index.html`.
  - [x] Add Twitter Card metadata tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
  - [x] Generate branded social share banner asset in `public/` (`og-image.jpg` and `og-image.svg`).

### Phase 4 — Progressive Web App (PWA) & Mobile Offline Engine

- [x] **Progressive Web App Setup (`@angular/service-worker`)**
  - [x] Configure Angular Service Worker (`ngsw-config.json`) for instant offline launch.
  - [x] Create `manifest.webmanifest` with brand assets, theme colors (`#064e3b` / `#041d16`), and standard + maskable app icons.
  - [x] Implement offline caching strategy for app shell, fonts, and static card catalog.
  - [x] Add unobtrusive "Install App" prompt in navbar and automatic update notifications via `PwaService`.

### Phase 5 — Advanced Rule Engine & Spend Analytics

- [ ] **Dynamic Rule Evaluation Engine**
  - [ ] Support custom user-level card reward overrides (e.g. user-specific negotiated fee waiver, customized Swiggy/Zomato cashback rates).
  - [ ] Support quarterly and annual milestone reward tracking (e.g., spend ₹1 Lakh in a quarter to trigger voucher alerts).
  - [ ] Excluded category detection (automatic warning when a category like fuel or rent does not earn points on a selected card).
- [ ] **Airport Lounge Terminal Checker**
  - [ ] Airport/terminal search interface to view lounge access eligibility and quarter spend qualification requirements per card.
- [ ] **Forex & Multi-Currency Comparison**
  - [ ] Compare zero-forex cards vs standard markup cards (including GST on forex markups).

### Phase 6 — Test Suite & Community Ecosystem

- [ ] **Automated Unit & Integration Test Suite**
  - [ ] Add Jasmine/Karma or Vitest unit tests (`*.spec.ts`) for `CardService` optimization algorithms and billing cycle calculations.
  - [ ] Add tests for `IndexedDBService` storage operations and FTUE route guards.
- [ ] **Community Contribution Guidelines**
  - [ ] Document `cards.json` schema specification in `docs/` for open-source contributors.
  - [ ] Create dedicated GitHub Issue templates for "New Card Request" and "Bank Devaluation Update".

---

## ❓ Resolved & Open Architectural Decisions

1. **Pre-loaded Card Database** ✅ _Resolved_: Implemented via `cards.json` with 182 verified cards and interactive "Quick Add from Catalog" modal.
2. **Rule Engine Balance** 🔄 _In Progress_: Static baseline rules maintained in catalog via automated weekly harvester; user overrides to be added in Phase 5 without requiring code edits.
3. **PWA Mobile-First Usage** 🔜 _Prioritized for Phase 4_: Critical for in-store checkout decisions where cell signal may be spotty.
