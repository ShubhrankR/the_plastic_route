# 💳 The Plastic Route

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-6366f1?style=for-the-badge&logo=github)](https://shubhrankr.github.io/the_plastic_route/)

> **🌐 Live Interactive Demo**: Experience the web application deployed live on GitHub Pages:  
> 👉 **[https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)**

An open-source, lightweight, privacy-first credit card spend optimizer and billing cycle tracker.

Unlike closed ecosystems that scrape your SMS data or demand heavy permissions, **The Plastic Route** runs entirely in the browser, stores no personal financial data on servers, and lets *you* map the ultimate mathematical route for your wallet.

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ v24.15.0
- npm ≥ 11.0.0

### Installation & Dev Server
```bash
npm install
npm start
```
The app will be available at `http://localhost:4200/`.

### Production Build
```bash
npm run build
```
Output is generated in the `dist/the-plastic-route/` directory.

## ✨ Features
*   **Home Landing Page:** Interactive landing page (`/#/home`) explaining the application purpose, privacy-first architecture, 3-step user guide, and open-source GitHub contribution guidelines.
*   **Spend Optimizer:** Quick lookup tool to instantly see which primary or backup card to swipe based on the purchase category (Amazon, Fuel, Forex, UPI, etc.).
*   **Billing Cycle Tracker:** Real-time analysis of statement dates. Instantly see if a transaction today hits your *current bill* or safely rolls over to the *next bill* for maximum interest-free leverage.
*   **IndexedDB Wallet Persistence:** Client-side local storage using browser IndexedDB for custom user card portfolios with zero server tracking.
*   **Emerald Forest & Gold Theme:** Nature-inspired high-contrast dark and light theme tokens with glassmorphic cards, emerald primary accents, and golden optimization vectors.
*   **Brand Icon & Multi-Res Favicon:** Custom vector brand mark and multi-resolution `favicon.ico` / `favicon.svg` embedded across all viewports.
*   **Privacy-First:** Zero backend, zero cookies, zero tracking. All data stays in your browser.

## 📚 Project Documentation

Detailed project roadmaps, scaling strategies, and architectural research are available in the [`docs/`](docs/) directory:

- **[Development & Feature Roadmap (TODO)](docs/TODO.md)**: Milestone tasks, Phase 1 to Phase 5 feature checklists, and backlog.
- **[Security, Privacy & App Navigation](docs/SECURITY_PRIVACY_AND_NAVIGATION.md)**: Security risk analysis, zero-credential storage guarantee, master catalog vs local wallet data separation, and multi-user route flows.
- **[CSS Framework Research Report](docs/CSS_FRAMEWORK_RESEARCH_REPORT.md)**: Comprehensive evaluation of Tailwind CSS v4, Spartan UI, DaisyUI 5, PrimeNG, and Vanilla CSS for Angular 22.
- **[Architecture & Scaling Strategy](docs/SCALING_STRATEGY.md)**: Multi-vector scoring algorithm, declarative rule schemas, Web Workers, IndexedDB, PWA setup, and P2P sync.
- **[Future Vision & Research](project_future_research.md)**: Origin philosophy, framework migration background, and architectural questions.

## 🛠️ Project Architecture
The project is built with modern Angular (v22) using standalone components, signals, and TypeScript:

| Layer | Tech |
|---|---|
| Framework | Angular 22 (standalone components, signals, Angular Router) |
| Language | TypeScript 6 (strict mode) |
| Styling | 100% Custom Vanilla CSS Design System (Emerald Forest & Gold tokens, glassmorphism) |
| Brand Assets | SVG brand vector icon + multi-resolution `.ico` / `.svg` favicons |
| State & Storage | Angular Signals + Browser IndexedDB |
| Build | Angular CLI + esbuild |

### Project Structure
```
src/
├── app/
│   ├── core/                       # Singleton services, models, and datasets
│   │   ├── data/cards.json         # Master card dataset
│   │   ├── models/card.model.ts    # TypeScript interfaces
│   │   └── services/               # CardService, ThemeService, IndexedDBService
│   ├── features/                   # Domain feature views (Route pages)
│   │   ├── home/                   # Home / Landing Page view & sub-components
│   │   ├── optimizer/              # Spend Optimizer page view & form components
│   │   ├── tracker/                # Billing Cycle Tracker page view & table
│   │   └── portfolio/              # Card Portfolio overview & management
│   ├── shared/                     # Reusable layout components
│   │   └── components/             # Navbar (header & theme switcher), Footer
│   ├── app.config.ts               # App configuration & router providers
│   ├── app.routes.ts               # HashLocationStrategy route mapping
│   └── app.ts                      # Root application component shell
├── index.html
├── main.ts
└── styles.css              # Global design system
```

## 🤝 How to Contribute (The Open-Source Way)
Banking rules, reward points, and lounge access thresholds change constantly. We rely on the community to keep this matrix sharp and updated.

### Adding or Updating Card Logic
The core spending matrix is driven by `src/app/data/cards.json`. If a bank changes its policy or you want to add a new category killer:
1. Fork this repository.
2. Update the card data in `src/app/data/cards.json`.
3. If adding a new spending category, update `CATEGORY_MAP` in `src/app/services/card.service.ts`.
4. Open a Pull Request!

## 📜 License
MIT License - feel free to fork, modify, and use it for your own portfolio.