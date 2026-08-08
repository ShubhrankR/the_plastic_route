# 📋 The Plastic Route — Development & Feature Roadmap (TODO)

This document tracks all active, upcoming, and long-term development tasks for **The Plastic Route**, categorized into clear architectural phases.

---

## 🎯 Current Milestone: Phase 1 — State & Routing Foundation

- [x] **Modern Angular Architecture Reorganization (`core/`, `features/`, `shared/`)**
  - [x] Reorganize codebase to modern Angular 22 standalone industry standards.
- [x] **Angular Router Integration (`/router`)**
  - [x] Configure Angular Router in `src/app/app.routes.ts` with `HashLocationStrategy`.
  - [x] Add dedicated route views: `/optimizer`, `/tracker`, `/portfolio`.
  - [x] Update `Navbar` component to use `routerLink` and `routerLinkActive` for seamless navigation.

- [x] **IndexedDB Persistence Layer (`IndexedDBService`)**
  - [x] Implement `IndexedDBService` in `core/services/` using native `window.indexedDB` and Angular Signals.
  - [x] Define object stores for `user_cards` and `user_settings`.
  - [x] Add automatic fallback mechanism to `cards.json` when local IndexedDB is empty.

---

## 🛠️ Phase 2 — Dynamic User Portfolio & Customization

- [ ] **Interactive Portfolio Builder UI**
  - [ ] Build `/portfolio/add` form to let users add custom credit cards to their personal wallet.
  - [ ] Add editable fields for: Card Name, Bank, Network (Visa/Mastercard/RuPay/Amex), Statement Date, Due Date Offset, Credit Limit, and Annual Fee.
  - [ ] Support editing and deleting cards from local IndexedDB.

- [ ] **Pre-Loaded Master Card Catalog**
  - [ ] Expand `src/app/data/cards.json` to cover 50+ popular Indian credit cards (HDFC Millennia, Infinia, SBI Cashback, Axis Ace, ICICI Amazon Pay, IDFC First Wealth, Scapia, etc.).
  - [ ] Add "Quick Add from Catalog" dropdown so users don't have to manually type card details.

- [ ] **Flexible Input Fields**
  - [ ] Make "Transaction Amount" field optional in the Spend Optimizer form.
  - [ ] Allow category-only instant lookups (e.g., selecting "Dining" immediately highlights the best card multiplier regardless of amount).

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
