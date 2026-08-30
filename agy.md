# Antigravity AI Project Context & Guidelines 🚀

This document provides project context, technical architecture, and operational guidelines for **Antigravity AI** assistants working on **The Plastic Route** codebase.

---

## 📌 Project Overview

**The Plastic Route** is an open-source, privacy-first, lightweight credit card spend optimizer and billing cycle tracker built with **Angular 22**. It operates entirely in the browser without server dependencies or personal financial tracking.

### Technical Stack & Architecture

- **Live Demo**: [https://shubhrankr.github.io/the_plastic_route/](https://shubhrankr.github.io/the_plastic_route/)
- **Framework**: Angular 22 (`@angular/core`: `^22.0.0`)
- **Architecture**: 100% **Standalone Components** (`bootstrapApplication` in `src/main.ts`, `app.ts` root component).
- **State Management**: **Angular Signals** (`signal()`, `computed()`, `input()`, `output()`) across components and services.
- **Control Flow**: Modern template control flow blocks (`@if`, `@else`, `@for ... track`).
- **Styling**: Vanilla CSS design system with CSS custom properties (`src/styles.css`) for dark/light themes and glassmorphic card elements.
- **Data & Services**:
  - `src/app/data/cards.json`: Card definitions & reward rules.
  - `src/app/services/card.service.ts`: Category optimization & billing cycle math.
  - `src/app/services/theme.service.ts`: Theme switcher.

---

## ⚠️ Mandatory AI Agent Rules

### 1. **NEVER PUSH CODE WITHOUT EXPLICIT PERMISSION**

> [!CAUTION]
> **CRITICAL RULE**: The AI assistant MUST NEVER execute `git push` or attempt to push any branch/commit to remote repositories without receiving explicit permission and confirmation from the author / user.

### 2. **Environment Setup Before Commands**

> [!IMPORTANT]
> Always ensure Node.js `≥ 24.15.0` is active before running build or CLI scripts:
>
> ```bash
> export NVM_DIR="$HOME/.nvm"
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
> nvm use 24.19.0
> ```

### 3. **Maintain Standalone & Signals Conventions**

- Do NOT re-introduce legacy `NgModules`. All components, directives, and pipes must be created as `standalone: true`.
- Use Angular Signals (`signal()`, `input()`, `output()`) for reactive state management, component inputs, and event outputs.
- Prefer native template control flow (`@if`, `@else`, `@for ... track`) over legacy structural directives (`*ngIf`, `*ngFor`).

### 4. **Preserve Privacy-First Architecture**

- Keep all computations 100% client-side in the browser.
- Never add external API endpoints, tracking analytics, or telemetry scripts.

### 5. **Verification & Quality Assurance**

- Always run `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.19.0 && npm run build` to verify clean compilation with 0 errors before completing technical tasks.
