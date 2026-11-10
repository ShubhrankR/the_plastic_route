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
- **Unit Test Coverage**: 49 automated tests across 8 spec suites (`npm test`).
- **Offline Readiness**: PWA with Service Worker offline caching and app installation support.
- **Iconography**: Authentic bank and payment network SVG vector marks with theme-adaptive contrast plates.

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

- [x] **Dynamic Rule Evaluation Engine**
  - [x] Support custom user-level card reward overrides (negotiated fee waiver, custom reward notes).
  - [x] Support quarterly and annual milestone reward tracking with spend simulator and lounge qualification progress.
  - [x] Excluded category detection (automatic warnings for rent 0 points + 1% surcharge, wallet loads, government taxes, fuel surcharge caps).
- [x] **Airport Lounge Terminal Checker**
  - [x] Airport/terminal search interface across BLR, DEL, BOM, HYD, MAA, CCU, GOX with 2026 terminal lounge operators and spend qualification criteria.
- [x] **Forex & Multi-Currency Comparison**
  - [x] Compare zero-forex cards vs standard 3.5% + 18% GST markup on USD, EUR, GBP, AED, SGD, THB, JPY with live rupee savings breakdown.

### Phase 6 — Test Suite & Community Ecosystem

- [x] **Automated Unit & Integration Test Suite**
  - [x] Add Vitest unit test suite (`*.spec.ts`) for `CardService` optimization algorithms, forex calculator, airport lounge matching, and billing cycle calculations.
  - [x] Add tests for `IndexedDBService`, `ToastService`, `ThemeService`, `PwaService`, and FTUE route guards (`onboardingGuard`, `welcomeGuard`).
  - [x] Wire `npm test` into `package.json` and `.github/workflows/ci.yml`.
- [x] **Community Contribution Guidelines**
  - [x] Document `cards.json` schema specification in `docs/CARD_CATALOG_DATASET.md` for open-source contributors.
  - [x] Create dedicated GitHub Issue templates for "New Card Request" and "Bank Devaluation Update" (`.github/ISSUE_TEMPLATE/devaluation_update.yml`).

### Phase 7 — Brand Vector Iconography & Theme-Adaptive Badges (November 2026)

- [x] **Official Payment Network Vector Suite (`public/icons/networks/`)**
  - [x] Source and integrate authentic vector artwork for Visa, MasterCard, RuPay, American Express, and Diners Club.
  - [x] Standardize aspect ratios (3:2 rectangular card format) with subtle micro-borders and soft shadows.
- [x] **Official Bank Logos Suite (`public/icons/banks/`)**
  - [x] Curate normalized 24x24 authentic vector brand marks for HDFC Bank, SBI Card, ICICI Bank, Axis Bank, Kotak Bank, IDFC FIRST, IndusInd Bank, Bank of Baroda (BOBCARD), Federal Bank, Yes Bank, and American Express.
  - [x] Provide clean fallback generic SVG bank mark for unmapped institutions.
- [x] **Reusable Standalone Angular 22 Badge Components**
  - [x] Implement `BankBadgeComponent` (`<app-bank-badge>`) and `NetworkBadgeComponent` (`<app-network-badge>`) with size variants (`xs`, `sm`, `md`) and toggleable text labels (`showLabel`).
  - [x] Integrate badges across all application views:
    - [x] Spend Optimizer results (Best Card & Backup Card recommendations).
    - [x] Portfolio Table & Add/Edit Card Modal (with real-time catalog preview).
    - [x] Billing Cycle Tracker.
    - [x] Airport Lounge Checker (compact icon badge mode).
    - [x] Milestone & Fee Waiver Tracker.
- [x] **Theme-Adaptive Contrast & Frosted Glass Design**
  - [x] Implement clean white micro-plate canvas backing for `.bank-icon` in dark mode (`[data-theme='dark']`) so colored bank marks (Axis maroon, SBI cyan/blue, HDFC red/blue, Kotak red/blue) maintain WCAG AA contrast and pop vibrantly.
  - [x] Upgrade badge containers with elevated translucent glass (`rgba(255, 255, 255, 0.08)`) and luminous borders (`rgba(255, 255, 255, 0.18)`).
  - [x] Preserve native clean card chip styling in light mode (`#ffffff`).
  - [x] Add complete unit test coverage in `bank-badge.spec.ts` and `network-badge.spec.ts`.

---

## 🔮 Future Horizons & Backlog

### Phase 8 — Advanced Financial Utilities & Enhancements

- [ ] **Statement Bill Due Date Reminders**
  - [ ] Local Notifications API / Calendar `.ics` export for upcoming payment deadlines and interest-free grace periods.
- [ ] **Merchant Category Code (MCC) Lookup Guide**
  - [ ] Interactive reference table of Indian MCC codes (e.g., 5411 Groceries, 5812 Dining, 5541 Fuel) with reward eligibility flags per bank.
- [ ] **Reward Redemption Valuation Matrix**
  - [ ] Points-to-Rupee transfer ratios across airline & hotel loyalty programs (KrisFlyer, Air India Flying Returns, Accor ALL, Marriott Bonvoy).
- [ ] **Custom Card Art / Color Accent Customizer**
  - [ ] Allow users to pick custom gradient or accent colors for cards in their portfolio view to match custom physical card editions.

---

## ❓ Resolved & Open Architectural Decisions

1. **Pre-loaded Card Database** ✅ _Resolved_: Implemented via `cards.json` with 182 verified cards and interactive "Quick Add from Catalog" modal.
2. **Rule Engine Balance** ✅ _Resolved_: Static baseline rules maintained in catalog via automated harvester; custom user overrides (fee waiver thresholds, reward notes) supported in wallet without code modifications.
3. **PWA Mobile-First Usage** ✅ _Resolved_: Configured with `@angular/service-worker`, offline caching, install prompts, and `manifest.webmanifest`.
4. **Automated Testing & Security Gate** ✅ _Resolved_: Vitest unit test suite (49 tests) integrated into CI alongside Prettier formatting, catalog schema validation, production build, and CodeQL security analysis.
5. **Brand Iconography & Contrast Compliance** ✅ _Resolved_: Offline vector SVG icon system with theme-adaptive contrast plates delivering high vibrancy across dark and light themes without external CDN dependencies.
