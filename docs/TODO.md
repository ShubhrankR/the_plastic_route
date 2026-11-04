# 📋 The Plastic Route — Development & Feature Roadmap

This document tracks all active, upcoming, and long-term development tasks for **The Plastic Route**, including the project's origin philosophy, architectural research questions, and phased feature roadmap.

---

## 🌱 Origin & Core Philosophy

The idea for **The Plastic Route** was born out of a real-world problem: managing multiple credit cards and trying to remember which card yields the best benefits for a specific transaction at a specific time.

While commercial FinTech applications (like CRED and others) offer reward tracking and bill payment, they often obscure the most critical information behind gamification, ads, or complex UX. They do not provide a direct, clear answer to the immediate question: _"I am about to pay for X. Which card should I swipe right now to maximize my rewards and interest-free period?"_

The Plastic Route is designed to solve exactly this problem—providing immediate, actionable clarity without the noise.

### 🛡️ Privacy-First Data Architecture

To build trust and ensure security, this application operates on a strict **Zero-Backend / Privacy-First** model.

- **Client-Side Storage**: Users input their specific credit card portfolio (card name, network, billing cycle dates, and custom rules). All data is stored **exclusively** on the user's browser using `IndexedDB`.
- **No Telemetry**: The app itself (and its creators) have absolutely zero access to the user's financial setup. There is no database, no server syncing, and no user accounts required.

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

---

## ✅ Completed Milestones: Phase 2 — Dynamic User Portfolio & Customization (August 2026)

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

- [x] **Autonomous Card Harvester & Multi-Bank Dataset Ingestion (August 2026)**
  - [x] Standalone Node.js dataset ingestion & normalization engine (`scripts/sync-cards.mjs` / `npm run cards:sync`).
  - [x] GitHub Actions automated workflow (`.github/workflows/sync-cards.yml`) with manual `workflow_dispatch` and weekly Monday cron triggers.
  - [x] Workspace Antigravity Skill (`.agents/skills/card-harvester/SKILL.md`) for on-demand web research, MITC parsing, and schema validation.
  - [x] Comprehensive card catalog expansion for major Indian banks (**Axis Bank**, **HDFC Bank**, **ICICI Bank**) with verified 2026 lounge spend criteria (e.g. ₹60k/₹75k thresholds) and SmartBuy voucher sub-caps.
  - [x] Guaranteed isolation of private seed data (`src/app/core/data/owner_portfolio.json`).

---

## ⚡ Phase 3 — PWA & Offline Engine

- [ ] **Progressive Web App Setup (`@angular/pwa`)**
  - [ ] Execute `ng add @angular/pwa` to configure Service Worker (`ngsw-config.json`).
  - [ ] Create `manifest.webmanifest` with brand assets, theme color (`#0B0F19`), and app icons.
  - [ ] Implement offline caching strategy for app shell and static card definitions.
  - [ ] Add "Install App" PWA prompt banner for mobile and desktop browsers.

---

## 🧠 Phase 4 — Rule Engine & Spend Analytics

- [ ] **Dynamic Rule Evaluation Engine**
  - [ ] Design a JSON rule schema capable of modeling complex reward structures (e.g., 5% cashback up to ₹1,000/month, 2x reward points on forex above ₹50k, excluded categories like wallet load/fuel).
  - [ ] Support custom user overrides (e.g., user wants to force a specific card for fuel).
  - [ ] Support milestone reward tracking (e.g., spend ₹1 Lakh in a quarter to get milestone voucher).

- [ ] **Privacy-First Data Management**
  - [ ] Implement Export Data feature (JSON file download containing user's card setup and custom rules).
  - [ ] Implement Import Data feature (JSON file upload to restore portfolio on a new browser/device).
  - [ ] Add "Reset All Data" option with confirmation modal.

---

## 🌐 Phase 5 — Community Ecosystem & Open Source

- [ ] **Community Contribution Guidelines**
  - [ ] Document `cards.json` schema specification in `docs/` for open-source contributors.
  - [ ] Add automated JSON validation schema using Zod or JSON Schema in GitHub Actions.
  - [ ] Create a dedicated issue template for "New Card Request / Regulatory Update".

---

## 📌 Backlog & Icebox

- [ ] Multi-currency support (USD, EUR, GBP, AED FX markups and zero-forex card comparison).
- [ ] Lounge access terminal finder (search terminal/airport to see eligible cards).
- [ ] Dark/Light mode scheduled auto-switching based on system preferences.

---

## ❓ Open Research Questions

> [!IMPORTANT]
> These questions will guide upcoming architectural decisions.

1. **Pre-loaded Card Database**: Should we maintain a "Master Database" of popular Indian credit cards that users can select from a dropdown to quickly populate their local IndexedDB, rather than typing all the details manually?
2. **Rule Engine Complexity**: Credit card rules change frequently (e.g., the 2026 gaming fee updates). Should we build a dynamic rule engine where users can tweak the logic themselves, or should the community maintain the logic via open-source PRs?
3. **Offline Support (PWA)**: Should we configure the architecture as a Progressive Web App (PWA) so users can install it on their phones and use it completely offline?
