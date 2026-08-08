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
*   **Spend Optimizer:** Quick lookup tool to instantly see which primary or backup card to swipe based on the purchase category (Amazon, Fuel, Forex, UPI, etc.).
*   **Billing Cycle Tracker:** Real-time analysis of statement dates. Instantly see if a transaction today hits your *current bill* or safely rolls over to the *next bill* for maximum interest-free leverage.
*   **Privacy-First:** Zero backend, zero cookies, zero tracking. All data stays in your browser.

## 📚 Project Documentation

Detailed project roadmaps, scaling strategies, and architectural research are available in the [`docs/`](docs/) directory:

- **[Development & Feature Roadmap (TODO)](docs/TODO.md)**: Milestone tasks, Phase 1 to Phase 5 feature checklists, and backlog.
- **[Architecture & Scaling Strategy](docs/SCALING_STRATEGY.md)**: Multi-vector scoring algorithm, declarative rule schemas, Web Workers, IndexedDB, PWA setup, and P2P sync.
- **[Future Vision & Research](project_future_research.md)**: Origin philosophy, framework migration background, and architectural questions.

## 🛠️ Project Architecture
The project is built with modern Angular (v22) using standalone components, signals, and TypeScript:

| Layer | Tech |
|---|---|
| Framework | Angular 22 (standalone components, signals) |
| Language | TypeScript 6 (strict mode) |
| Styling | Custom CSS design system with CSS custom properties |
| State | Angular Signals |
| Build | Angular CLI + esbuild |

### Project Structure
```
src/
├── app/
│   ├── components/         # Standalone UI components
│   │   ├── navbar/         # Top navigation + theme toggle
│   │   ├── spend-optimizer/        # Transaction form
│   │   ├── optimization-results/   # Card recommendation display
│   │   ├── billing-cycle-tracker/  # Statement cycle analysis
│   │   ├── portfolio-table/        # Full card portfolio overview
│   │   └── footer/
│   ├── data/
│   │   └── cards.json      # Credit card reward rules & billing data
│   ├── models/
│   │   └── card.model.ts   # TypeScript interfaces
│   └── services/
│       ├── card.service.ts # Optimization logic & billing cycle math
│       └── theme.service.ts # Dark/light theme management
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