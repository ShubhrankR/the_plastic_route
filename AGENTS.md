# AGENTS.md - Antigravity AI Project Instructions & Context 🚀

This document defines the technical architecture, design principles, mandatory rules, and operational guidelines for **Antigravity AI** assistants working on **The Plastic Route** codebase.

---

## 📌 Project Summary

**The Plastic Route** is an open-source, privacy-first, zero-backend credit card spend optimizer and billing cycle tracker. It helps users determine the optimal credit card for any transaction category to maximize reward multipliers, cashback, and interest-free repayment cycles.

### 🌐 Key Links & Quick Stats
* **Live Demo**: [https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)
* **Framework**: Angular 22 (Standalone Architecture)
* **Language**: TypeScript 6 (Strict Mode)
* **State Management**: Angular Signals
* **Styling**: Custom CSS Design System (CSS Custom Properties & Glassmorphic UI)
* **Data Storage**: Client-side (JSON dataset / future IndexedDB integration)

---

## 🏗️ Technical Architecture & Directory Structure

```
/home/shubhrank_rastogi/WORKSPACE/PROJECTS/my_projects/the_plastic_route/
├── src/
│   ├── app/
│   │   ├── components/                 # Standalone UI components
│   │   │   ├── navbar/                 # App navigation & theme toggle
│   │   │   ├── spend-optimizer/        # Spend category form
│   │   │   ├── optimization-results/   # Card recommendation & billing breakdown
│   │   │   ├── billing-cycle-tracker/  # Statement cycle analysis table
│   │   │   ├── portfolio-table/        # Full credit card portfolio view
│   │   │   └── footer/                 # Footer component
│   │   ├── data/
│   │   │   └── cards.json              # Community-maintained card database
│   │   ├── models/
│   │   │   └── card.model.ts           # Interfaces (CreditCard, OptimizationResult, etc.)
│   │   ├── services/
│   │   │   ├── card.service.ts         # Category mapping & billing cycle math
│   │   │   └── theme.service.ts        # Dark/Light theme manager
│   │   ├── app.config.ts               # Application configuration
│   │   ├── app.ts                      # Root component (App)
│   │   ├── app.html                    # Main layout template
│   │   └── app.css                     # Root component styles
│   ├── styles.css                      # Design system tokens & utility styles
│   └── main.ts                         # Application entry point
├── project_future_research.md          # Architectural vision & research roadmap
├── angular.json                        # Angular CLI configuration
└── package.json                        # Project dependencies
```

---

## ⚠️ Mandatory AI Rules & Coding Directives

### 1. 🔒 Git & Security Rules
> [!CAUTION]
> **NEVER EXECUTE GIT PUSH**: AI assistants MUST NEVER execute `git push` or attempt to push any commits/branches to remote repositories without explicit user permission.

### 2. 🟢 Environment & Build Requirements
> [!IMPORTANT]
> **Node.js Version Requirement**: The Angular CLI requires Node.js `≥ 24.15.0`.
> Before running build commands, load the appropriate Node environment using nvm:
> ```bash
> export NVM_DIR="$HOME/.nvm"
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
> nvm use 24.19.0
> npm run build
> ```

### 3. 🅰️ Angular 22 & State Conventions
* **100% Standalone Components**: Do NOT introduce `NgModules`. All new components must set `standalone: true`.
* **Angular Signals**: Use Signals (`signal()`, `computed()`, `input()`, `output()`) for reactive component state and data flow.
* **Modern Control Flow**: Always use native control flow blocks (`@if`, `@else`, `@for (item of items; track item.id)`) instead of legacy `*ngIf` / `*ngFor` directives.
* **Dependency Injection**: Inject services using functional `inject()` or constructor injection.

### 4. 🎨 Design System & Styling Rules
* **Vanilla CSS System**: The project uses custom CSS properties (`:root` variables in `styles.css`) for theme switching, glassmorphism card surfaces, and responsive grids.
* **Do NOT Add Heavy UI Frameworks**: Do not install Bootstrap, TailwindCSS, or Angular Material unless explicitly requested by the user.
* **Theme Support**: Ensure all new components support dark/light modes by referencing root CSS variables (`var(--bg-primary)`, `var(--card-bg)`, `var(--text-primary)`, etc.).

### 5. 🛡️ Privacy-First Philosophy
* **Zero Backend**: All card processing and optimization logic must run client-side in the browser.
* **No Telemetry**: Do not introduce analytics, network logging, or third-party tracking scripts.
* **IndexedDB Readiness**: Any future user portfolio storage feature must use local browser storage (`IndexedDBService` / `localStorage`).

---

## 🧪 Verification & Quality Control

Before marking any task as complete:
1. Ensure the Node environment is set to `24.19.0` using nvm.
2. Execute the production build command:
   ```bash
   export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.19.0 && npm run build
   ```
3. Confirm that the compilation succeeds with **0 errors**.

---

## 🗺️ Extending Card Rules & Categories

When adding a new credit card or spending category:
1. Update `src/app/data/cards.json` with the new `CreditCard` entry.
2. Update `SpendCategory` type union and `CategoryOption` array in `src/app/models/card.model.ts`.
3. Update `CATEGORY_MAP` in `src/app/services/card.service.ts` to assign primary and backup cards.
