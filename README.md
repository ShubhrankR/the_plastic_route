# 💳 The Plastic Route

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-6366f1?style=for-the-badge&logo=github)](https://shubhrankr.github.io/the_plastic_route/)
[![Tests: 55 Passed](https://img.shields.io/badge/Tests-55%20Passed-10b981?style=for-the-badge&logo=vitest)](src/app/core/services/catalog-security.spec.ts)
[![Angular: 22](https://img.shields.io/badge/Angular-22-dd0031?style=for-the-badge&logo=angular)](package.json)
[![TypeScript: 6](https://img.shields.io/badge/TypeScript-6-3178c6?style=for-the-badge&logo=typescript)](tsconfig.json)
[![PWA: Offline Ready](https://img.shields.io/badge/PWA-Offline_Ready-064e3b?style=for-the-badge&logo=pwa)](public/manifest.webmanifest)
[![Zero Backend](https://img.shields.io/badge/Privacy-Zero_Backend-059669?style=for-the-badge)](SECURITY.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b.svg?style=for-the-badge)](LICENSE)

> **🌐 Live Interactive Application**: Experience the app deployed live on GitHub Pages:  
> 👉 **[https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)**

An open-source, lightweight, zero-tracking web application to instantly know **which credit card to use** and **when your bills roll over**.

Unlike closed FinTech apps that demand invasive SMS permissions, scrape private statements, or monetize your financial footprint, **The Plastic Route** runs 100% client-side in your browser. It stores zero data on remote servers and gives you immediate mathematical clarity for your wallet.

---

## 📸 Overview & Features

![The Plastic Route Preview](public/og-image.jpg)

### 🎯 Core Capabilities

- **⚡ Spend Optimizer**: Instant recommendation engine that tells you the primary and backup card to swipe for any transaction category (Amazon, Flipkart, BPCL/Fuel, RuPay UPI, Dining, Travel, Rent, Utilities, Education, Government).
- **📅 Billing Cycle Tracker**: Real-time statement rollover analysis. Instantly tells you if a transaction today hits your _current statement_ or safely rolls over to the _next billing cycle_ for maximum interest-free leverage (up to 50 days).
- **🛫 Airport Lounge Terminal Checker**: Fast lookup of lounge eligibility across major Indian airports (BLR, DEL, BOM, HYD, MAA, CCU, GOX) with 2026 terminal operator data and quarterly spend qualification thresholds.
- **💱 Zero-Forex Markup Calculator**: Live savings comparison between zero/low-forex cards and standard 3.5% + 18% GST markups across USD, EUR, GBP, AED, SGD, THB, and JPY.
- **🏆 Milestone & Fee Waiver Tracker**: Dynamic visual progress bars tracking quarterly spend goals, bonus reward milestones, and annual renewal fee waivers.
- **🏦 Authentic Brand Vector Badges**: Normalized vector SVG marks for payment networks (Visa, Mastercard, RuPay, Amex, Diners Club) and banks (HDFC, SBI, ICICI, Axis, Kotak, IDFC FIRST, IndusInd, BOBCARD, Federal Bank, Yes Bank) with dark-mode contrast plates.
- **📱 Progressive Web App (PWA)**: Offline-first architecture powered by `@angular/service-worker`. Installable as a native standalone app on iOS, Android, macOS, and Windows.
- **🛡️ Strict Zero-Backend Privacy**: 100% client-side execution via browser `IndexedDB`. Zero cookies, zero analytics, zero telemetry, and zero remote tracking.

---

## 📊 Master Card Catalog

The Plastic Route ships with an offline master catalog of **182 verified credit cards** across major Indian issuing banks:

- **HDFC Bank** (Infinia, Regalia Gold, Diners Club Black Metal, Tata Neu Infinity, Millennia, Swiggy, etc.)
- **SBI Card** (Aurum, Cashback SBI, SimplyCLICK, BPCL Octane, Prime, Elite, etc.)
- **ICICI Bank** (Emeralde Private Metal, Sapphiro, Rubyx, Coral RuPay, Amazon Pay ICICI, etc.)
- **Axis Bank** (Magnus Burgundy, Atlas, Olympus, Airtel Axis, Horizon, Ace, Flipkart Axis, Neo, etc.)
- **American Express** (Platinum Card, Platinum Travel, Gold Card, SmartEarn, Membership Rewards)
- **IDFC FIRST Bank** (Club Vistara, Wealth, Select, Classic, Millennia, SWYP, WOW)
- **Kotak Mahindra Bank** (White Reserve, Zen, Mojo, League, Indian Oil)
- **IndusInd Bank**, **Federal Bank**, **Bank of Baroda (BOBCARD)**, **Yes Bank**, and **Standard Chartered**.

Catalog schema, reward vectors, and annual fee waiver rules are validated autonomously against official issuer MITC schedules (`scripts/sync-cards.mjs` and `scripts/validate-cards.mjs`).

---

## 🚀 Quick Start & Development

### Prerequisites

- **Node.js**: `≥ 24.15.0` (Recommended: Node `24.19.0` via `nvm`)
- **npm**: `≥ 11.0.0`

### Setup & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ShubhrankR/the_plastic_route.git
cd the_plastic_route

# 2. Install dependencies
npm ci

# 3. Start local development server with live reload
npm start
```

Open [http://localhost:4200/](http://localhost:4200/) in your browser.

### Quality, Security & Test Commands

```bash
# Run automated Vitest unit test suite (55 tests across 9 spec suites)
npm test

# Check code formatting with Prettier
npm run format:check

# Validate master card catalog against strict schema & integrity assertions
npm run cards:validate

# Production compilation
npm run build

# Run complete pre-PR unified CI gate (Format + Schema + Tests + Build)
npm run ci
```

---

## 🛠️ Architecture & Technology Stack

The project is built on modern Angular (v22) standalone architecture with zero external UI framework bloat:

| Layer          | Technology              | Key Capabilities                                                                                                   |
| :------------- | :---------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Framework**  | Angular 22              | 100% Standalone components, functional route guards, Signals reactive state                                        |
| **Language**   | TypeScript 6            | Strict type checking, extensible data models, zero `any` policy                                                    |
| **Styling**    | Custom Vanilla CSS      | Emerald Forest & Gold design tokens (`src/styles.css`), frosted glassmorphic elevation, dark/light theme switching |
| **Storage**    | Browser IndexedDB       | Client-side wallet persistence (`ThePlasticRouteDB`) with zero server exfiltration                                 |
| **Testing**    | Vitest                  | 55 unit tests covering algorithms, spend optimizations, billing cycles, and security guards                        |
| **Security**   | Content Security Policy | Strict CSP (`connect-src 'self'`), anti-script regex schema checks, CI zero-telemetry linter                       |
| **Deployment** | GitHub Pages & Actions  | Automated CI gate, CodeQL security scanning, scheduled catalog synchronization                                     |

---

## 📁 Repository Structure

```
the_plastic_route/
├── .github/                        # Workflows (ci.yml, codeql.yml, deploy.yml, sync-cards.yml)
├── docs/                           # Architecture specs, security threat model, and roadmap
│   ├── CARD_CATALOG_DATASET.md     # Full catalog schema and bank inventory breakdown
│   ├── OPEN_SOURCE_SECURITY_AND_GOVERNANCE.md  # Threat model, supply chain, and branch governance
│   ├── SECURITY_PRIVACY_AND_NAVIGATION.md      # Data segregation and zero-credential model
│   └── TODO.md                     # Origin philosophy, completed milestones, and backlog
├── public/                         # Brand SVGs, PWA icons, manifest, and OpenGraph assets
│   ├── icons/                      # Authentic bank & payment network vector SVGs
│   ├── og-image.jpg                # High-resolution social media preview banner
│   └── manifest.webmanifest        # PWA application manifest
├── scripts/                        # Automated validation, MITC sync, and icon generator
│   ├── sync-cards.mjs              # Scraped MITC dataset synchronization script
│   └── validate-cards.mjs          # Strict schema, volume threshold & domain whitelist validator
├── src/
│   ├── app/
│   │   ├── core/                   # Core models, services, guards, and master catalog
│   │   │   ├── data/cards.json     # Master credit card database (182 verified cards)
│   │   │   ├── guards/             # FTUE onboarding and route protection guards
│   │   │   └── services/           # CardService, IndexedDBService, ThemeService, PwaService
│   │   ├── features/               # Route views: /welcome, /home, /optimizer, /tracker, /portfolio
│   │   └── shared/                 # Reusable BankBadge, NetworkBadge, Navbar, Footer, Toast
│   ├── index.html                  # Strict CSP headers, OpenGraph / Twitter meta tags
│   └── styles.css                  # Global design tokens and theme palettes
├── CONTRIBUTING.md                 # Community contribution guidelines and schema rules
├── LICENSE                         # MIT License
└── SECURITY.md                     # Responsible disclosure policy and architectural privacy guarantees
```

---

## 🤝 Contributing

We warmly welcome community contributions from developers, designers, and credit card enthusiasts! Whether you want to add a newly launched card, update devalued reward terms, or refine UI components, check out our guides:

- **[Contributing Guidelines](CONTRIBUTING.md)**: Development setup, branch workflow, card schema, and PR checklists.
- **[Security & Governance Policy](docs/OPEN_SOURCE_SECURITY_AND_GOVERNANCE.md)**: Catalog integrity rules, domain whitelists, and review requirements.
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Contributor Covenant standards.

---

## 📜 License

This project is open-source software licensed under the **[MIT License](LICENSE)**. Feel free to fork, adapt, and build upon it!
