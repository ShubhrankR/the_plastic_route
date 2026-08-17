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
* **Styling**: Custom CSS Design System (CSS Custom Properties, Emerald Forest & Gold palette, Glassmorphic UI)
* **Brand Assets**: Custom SVG brand vector (`public/the_plastic_route.svg`) & Multi-Res Favicon (`public/favicon.ico`, `public/favicon.svg`)
* **Data Storage**: Client-side (JSON dataset / IndexedDB integration)

---

## 🏗️ Technical Architecture & Directory Structure

```
/home/shubhrank_rastogi/WORKSPACE/PROJECTS/my_projects/the_plastic_route/
├── src/
│   ├── app/
│   │   ├── core/                       # Singleton services, models, and datasets
│   │   │   ├── data/cards.json         # Master credit card dataset
│   │   │   ├── models/card.model.ts    # TypeScript interfaces
│   │   │   └── services/               # CardService, ThemeService, IndexedDBService
│   │   ├── features/                   # Domain feature views (Route pages)
│   │   │   ├── home/                   # Home / Landing Page view & guide
│   │   │   ├── optimizer/              # Spend Optimizer form & results
│   │   │   ├── tracker/                # Billing Cycle Tracker view
│   │   │   └── portfolio/              # Card Portfolio overview & management
│   │   ├── shared/                     # Reusable layout components
│   │   │   └── components/             # Navbar (header & theme toggle), Footer
│   │   ├── app.config.ts               # App configuration & router providers
│   │   ├── app.routes.ts               # HashLocationStrategy route definitions
│   │   ├── app.ts                      # Root component shell
│   │   ├── app.html                    # Main layout template (<router-outlet />)
│   │   └── app.css                     # Root layout styling
│   ├── styles.css                      # Global design system & theme tokens
│   └── main.ts                         # Application entry point
├── docs/                               # TODO.md, SCALING_STRATEGY.md, SECURITY_PRIVACY_AND_NAVIGATION.md
├── project_future_research.md          # Architectural vision & research roadmap
├── angular.json                        # Angular CLI configuration
└── package.json                        # Project dependencies
```

---

## ⚠️ Mandatory AI Rules & Coding Directives

### 1. 🔒 Git & Security Rules
> [!CAUTION]
> **NEVER EXECUTE GIT PUSH**: AI assistants MUST NEVER execute `git push` or attempt to push any commits/branches to remote repositories without explicit user permission.

> [!IMPORTANT]
> **PRE-COMMIT APPROVAL REQUIRED WITH YES/NO MENU**: Before executing any `git commit`, the AI assistant MUST explicitly showcase the proposed commit message, modified files, and prompt the user with a direct **Yes / No** option choice (using the interactive `ask_question` tool). Do NOT run `git commit` unless the user selects **Yes**.

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

### 4. 🎨 Design System & Styling Rules (Strict Custom Vanilla CSS)
> [!IMPORTANT]
> **NO THIRD-PARTY CSS FRAMEWORKS**: The project strictly uses a 100% custom Vanilla CSS design system powered by CSS custom properties (`:root` tokens in `src/styles.css`). Do NOT install, import, or generate code for TailwindCSS, Bootstrap, DaisyUI, PrimeNG, or Angular Material. All utility classes, glassmorphic cards, animations, and theme styles MUST be authored in custom CSS.
* **Custom CSS Variables**: Use CSS custom properties (`var(--bg-primary)`, `var(--card-bg)`, `var(--text-primary)`, `var(--link-color)`, etc.) for dark/light theme switching.
* **Performance Guarantee**: Maintains an ultra-lightweight ~10 KB production CSS footprint with zero build-time PostCSS dependencies.

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
