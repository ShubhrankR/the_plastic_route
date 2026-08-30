# 💳 The Plastic Route

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-6366f1?style=for-the-badge&logo=github)](https://shubhrankr.github.io/the_plastic_route/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
[![CI Security Gate](https://img.shields.io/badge/CI-Automated_Security_Gate-064e3b?style=for-the-badge&logo=githubactions)](.github/workflows/ci.yml)
[![Zero Backend](https://img.shields.io/badge/Privacy-Zero_Backend-10b981?style=for-the-badge)](SECURITY.md)

> **🌐 Live Interactive Demo**: Experience the web application deployed live on GitHub Pages:  
> 👉 **[https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)**

An open-source, lightweight, privacy-first credit card spend optimizer and billing cycle tracker.

Unlike closed ecosystems that scrape your SMS data or demand heavy permissions, **The Plastic Route** runs entirely in the browser, stores no personal financial data on servers, and lets _you_ map the ultimate mathematical route for your wallet.

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ v24.15.0 (Recommended: Node `24.19.0` via `nvm`)
- npm ≥ 11.0.0

### Installation & Dev Server

```bash
npm install
npm start
```

The app will be available at `http://localhost:4200/`.

### Production Build & Full CI Gate

```bash
# Production Angular 22 build
npm run build

# Validate master card catalog against strict schema
npm run cards:validate

# Run complete pre-PR verification pipeline (Format + Schema + Build)
npm run ci
```

### Autonomous Card Harvester & Master Catalog Sync

```bash
npm run cards:sync
```

Synchronizes scraped CSV/JSON datasets into `src/app/core/data/cards.json` with automatic schema verification while isolating private seed files.

## ✨ Features

- **Automated Card Harvester & GitHub Actions:** On-demand Antigravity skill (`card-harvester`) and scheduled GitHub Actions workflow (`.github/workflows/sync-cards.yml`) that traverses, updates, and validates the master bank database against official MITC circulars.
- **Comprehensive Bank Coverage:** Master catalog containing verified 2026 data for major Indian banks (**HDFC Bank**, **ICICI Bank**, **Axis Bank**, **SBI Card**, **American Express**, **IDFC FIRST**, **Federal Bank**).
- **Dedicated Welcome Gateway & FTUE:** Distraction-free onboarding view (`/#/welcome`) guarded by Angular Functional Route Guards, offering immediate choice between _Explore Demo Mode_ and _Build Personal Wallet_.
- **Home Landing Page:** Interactive landing page (`/#/home`) explaining the application purpose, privacy-first architecture, 3-metric highlight bar, and open-source GitHub contribution guidelines.
- **Spend Optimizer:** Quick lookup tool to instantly see which primary or backup card to swipe based on purchase category (Amazon, Fuel, Forex, UPI, Dining, Travel, etc.).
- **Billing Cycle Tracker:** Real-time analysis of statement dates. Instantly see if a transaction today hits your _current bill_ or safely rolls over to the _next bill_ for maximum interest-free leverage.
- **IndexedDB Wallet Persistence:** Client-side local storage using browser IndexedDB for custom user card portfolios with zero server tracking.
- **Toast Notifications & Undo Card Deletion:** Reactive signal-based toast notification system with interactive `[ ↩️ Undo ]` action to instantly restore deleted cards.
- **Scroll-Triggered Micro-Animations:** Native `IntersectionObserver` scroll reveal directive with zero main-thread blocking and `prefers-reduced-motion` compliance.
- **Soothing Light & Dark Themes:** Nature-inspired Emerald Forest & Gold color system with soft off-white (`#f8fafc`) light mode, rich dark emerald mode, glassmorphism, and WCAG-compliant high-contrast typography.
- **Brand Icon & Multi-Res Favicon:** Custom vector brand mark and multi-resolution `favicon.ico` / `favicon.svg` embedded across all viewports.
- **Privacy-First:** Zero backend, zero cookies, zero tracking. All data stays strictly in your browser.

## 📚 Project Documentation

Detailed project roadmaps, scaling strategies, and architectural research are available in the [`docs/`](docs/) directory:

- **[Development & Feature Roadmap (TODO)](docs/TODO.md)**: Origin philosophy, milestone history, Phase 1–5 feature checklists, backlog, and open research questions.
- **[Master Credit Card Catalog & Bank Index](docs/CARD_CATALOG_DATASET.md)**: Comprehensive breakdown of all 165 cards across 11 banks in the dataset, reward structures, lounge access, and fees.
- **[Perplexity Deep Research Integration](docs/PERPLEXITY_RESEARCH_INTEGRATION.md)**: Standardized research prompt templates, Perplexity Project setup, and autonomous dataset ingestion workflows.
- **[User Onboarding Strategy](docs/USER_ONBOARDING_STRATEGY.md)**: Complete specification of the implemented FTUE onboarding gateway, data segregation, and route guard lifecycle.
- **[Security, Privacy & App Navigation](docs/SECURITY_PRIVACY_AND_NAVIGATION.md)**: Security risk analysis, zero-credential storage guarantee, master catalog vs local wallet data separation, and route guard flows.
- **[CSS Framework Research Report](docs/CSS_FRAMEWORK_RESEARCH_REPORT.md)**: Comprehensive evaluation of Tailwind CSS v4, Spartan UI, DaisyUI 5, PrimeNG, and Vanilla CSS for Angular 22.
- **[Architecture & Scaling Strategy](docs/SCALING_STRATEGY.md)**: Multi-vector scoring algorithm, declarative rule schemas, Web Workers, IndexedDB, PWA setup, and P2P sync.

## 🛠️ Project Architecture

The project is built with modern Angular (v22) using standalone components, signals, and TypeScript:

| Layer           | Tech                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Framework       | Angular 22 (standalone components, signals, functional route guards, Angular Router)                           |
| Language        | TypeScript 6 (strict mode, extensible data schemas)                                                            |
| Styling         | 100% Custom Vanilla CSS Design System (Emerald Forest & Gold tokens, soft off-white light mode, glassmorphism) |
| Brand Assets    | SVG brand vector icon + multi-resolution `.ico` / `.svg` favicons                                              |
| State & Storage | Angular Signals + Browser IndexedDB + Synchronous localStorage FTUE cache                                      |
| Build           | Angular CLI + esbuild                                                                                          |

### Project Structure

```
src/
├── app/
│   ├── core/                       # Singleton services, models, guards, and datasets
│   │   ├── data/                   # Master catalog (cards.json) & owner seed data
│   │   ├── guards/                 # Functional route guards (onboardingGuard, welcomeGuard)
│   │   ├── models/card.model.ts    # Extensible TypeScript interfaces
│   │   └── services/               # CardService, ThemeService, IndexedDBService, ToastService
│   ├── features/                   # Domain feature views (Route pages)
│   │   ├── welcome/                # First-Time User Experience gateway (/welcome)
│   │   ├── home/                   # Home / Landing Page view & sub-components
│   │   ├── optimizer/              # Spend Optimizer page view & form components
│   │   ├── tracker/                # Billing Cycle Tracker page view & table
│   │   └── portfolio/              # Card Portfolio overview & management
│   ├── shared/                     # Reusable layout components and directives
│   │   ├── components/             # Navbar, Footer, Toast notifications, Modals
│   │   └── directives/             # ScrollRevealDirective (IntersectionObserver)
│   ├── app.config.ts               # App configuration & router providers
│   ├── app.routes.ts               # HashLocationStrategy route mapping & guards
│   └── app.ts                      # Root application component shell
├── index.html
├── main.ts
└── styles.css                      # Global design system & theme tokens
```

## 🤝 Contributing & Community

Banking rules, reward multipliers, and lounge access thresholds evolve continuously. We welcome community contributions from developers, researchers, and credit card enthusiasts!

Please review our dedicated guides before contributing:

- **[Contributing Guidelines (CONTRIBUTING.md)](CONTRIBUTING.md)** — Step-by-step setup, research protocol, card schema, Vanilla CSS rules, and PR checklist.
- **[Security Policy (SECURITY.md)](SECURITY.md)** — Responsible vulnerability disclosure, zero-backend privacy model, and storage sandboxing.
- **[Code of Conduct (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md)** — Contributor Covenant v2.1 standards.

---

## 📜 License

This project is open-source software licensed under the **[MIT License](LICENSE)**. Feel free to fork, adapt, and build upon it!
