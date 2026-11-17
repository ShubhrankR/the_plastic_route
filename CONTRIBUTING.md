# 🤝 Contributing to The Plastic Route

Thank you for your interest in contributing to **The Plastic Route**! 🎉

The Plastic Route is an open-source, privacy-first, zero-backend credit card spend optimizer and billing cycle tracker. We welcome contributions from developers, researchers, and credit card enthusiasts worldwide.

---

## 📜 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Prerequisites & Development Setup](#-prerequisites--development-setup)
3. [Branching Strategy & PR Workflow](#-branching-strategy--pr-workflow)
4. [Contributing to the Master Credit Card Catalog](#-contributing-to-the-master-credit-card-catalog)
5. [UI & Styling Rules (Strict Custom Vanilla CSS)](#-ui--styling-rules-strict-custom-vanilla-css)
6. [Security, Privacy & Data Integrity Guarantees](#-security-privacy--data-integrity-guarantees)
7. [Pre-Submission Verification Checklist](#-pre-submission-verification-checklist)
8. [Commit Message Conventions](#-commit-message-conventions)

---

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior following the guidelines in the document.

---

## 💻 Prerequisites & Development Setup

### System Requirements

- **Node.js**: `≥ 24.15.0` (Recommended: Node `24.19.0` via `nvm`)
- **npm**: `≥ 11.0.0`

### Setup Instructions

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/the_plastic_route.git
cd the_plastic_route

# 2. Use the recommended Node version
nvm use 24.19.0

# 3. Clean install dependencies
npm ci

# 4. Start local development server with live reload
npm start
```

The application will launch at `http://localhost:4200/`.

---

## 🌿 Branching Strategy & PR Workflow

1. **Target Branch**:
   - All pull requests should target the **`main`** branch.
2. **Branch Naming Conventions**:
   - Features: `feat/<feature-name>` (e.g., `feat/pwa-notifications`)
   - Bug Fixes: `fix/<bug-summary>` (e.g., `fix/lounge-threshold-calculation`)
   - Data / Catalog updates: `data/<bank-name>-cards` (e.g., `data/hdfc-2026-mitc`)
   - Documentation: `docs/<topic>` (e.g., `docs/mcc-guide`)
3. **Submitting a Pull Request**:
   - Ensure all automated checks pass locally (`npm run ci`).
   - Fill out the [Pull Request Template](.github/pull_request_template.md) thoroughly with verified documentation sources.

---

## 💳 Contributing to the Master Credit Card Catalog

Bank reward structures, cashback caps, and lounge spend thresholds evolve regularly. Community updates to the card database are warmly welcomed!

### 1. Research Protocol & Verification

- Refer to [`docs/PERPLEXITY_RESEARCH_INTEGRATION.md`](docs/PERPLEXITY_RESEARCH_INTEGRATION.md) for our standardized research prompt framework.
- Ensure all data points (reward rates, annual fees, forex markups, minimum quarterly spends for airport lounge access) are sourced from official bank MITC (Most Important Terms and Conditions) schedules.

### 2. Card Schema (`MasterCatalogCard`)

Card objects in `src/app/core/data/cards.json` must strictly adhere to the following schema:

```json
{
  "id": "bank_card_name_slug",
  "name": "Full Card Product Name",
  "bank": "Issuing Bank Name",
  "network": "Visa",
  "optimizationVector": "Concise summary of top reward categories, cashback rates, and special multipliers.",
  "defaultBillingStart": 15,
  "defaultBillingEnd": 14,
  "loungeAccess": {
    "eligible": true,
    "spendThreshold": 50000,
    "terminals": ["Domestic", "International"]
  },
  "regulatoryUpdate": "2026 Update: Verified terms via issuer schedule & MITC.",
  "categories": ["dining_travel", "forex", "general"],
  "annualFee": "₹2,500 + GST",
  "forexMarkup": "1.5%"
}
```

#### Allowed Enum Values:

- **`network`**: `'Visa'`, `'Mastercard'`, `'RuPay'`, `'Amex'`, `'Diners Club'` (or combination token strings like `'Visa / RuPay'`).
- **`categories`**: Allowed spend categories (lowercase tokens):
  - `'amazon'` — Amazon Shopping & Amazon Pay
  - `'flipkart'` — Flipkart, Myntra, Cleartrip
  - `'bpcl'` — BPCL Fuel
  - `'other_fuel'` — HPCL, IOCL, and general fuel
  - `'upi'` — RuPay UPI QR & merchant transactions
  - `'forex'` — Zero/low forex markup & international travel
  - `'dining_travel'` — Dining out, flights, and hotels
  - `'gaming_wallet'` — Gaming portals & wallet reloads
  - `'utilities'` — Electricity, water, broadband, gas bills
  - `'rent'` — Rental payment platforms
  - `'education'` — College, school, and course fee payments
  - `'wallet_load'` — Prepaid wallet loading transactions
  - `'government'` — Government taxes and municipal fees
  - `'general'` — General / baseline catch-all spend

### 3. Automated Catalog Validation & Safety Thresholds

Before submitting any data changes, run the validator:

```bash
npm run cards:validate
```

The validator enforces:

- **Volume Threshold**: Prohibits pull requests from shrinking the catalog below 180 cards (`MINIMUM_CARD_COUNT = 180`).
- **Critical Files Check**: Ensures essential repository files (`cards.json`, `card.service.ts`, `CODEOWNERS`, etc.) exist.
- **Anti-Scripting / HTML Sanitization**: Blocks any angle brackets (`<`, `>`) or dangerous URI schemes (`javascript:`, `vbscript:`, `data:`).
- **Approved External Domains**: Any embedded links must use `https://` and belong strictly to official banking/regulatory domains (`*.hdfcbank.com`, `*.sbi.co.in`, `*.rbi.org.in`, etc.).

> [!CAUTION]
> **NEVER modify `src/app/core/data/owner_portfolio.json`**: This file contains sample seed wallet configuration and must remain untouched.

---

## 🎨 UI & Styling Rules (Strict Custom Vanilla CSS)

> [!IMPORTANT]
> **NO THIRD-PARTY CSS FRAMEWORKS**:
> The Plastic Route strictly uses a 100% custom Vanilla CSS design system powered by CSS Custom Properties (`src/styles.css`).
> **Do NOT install, import, or generate code for TailwindCSS, Bootstrap, DaisyUI, PrimeNG, or Angular Material.**

### Guidelines:

- Use predefined theme CSS tokens (`var(--bg-app)`, `var(--surface-card)`, `var(--color-primary)`, `var(--color-mint)`, `var(--border-subtle)`, `var(--text-main)`, etc.).
- Author scoped component styles in `<component-name>.css`.
- Ensure light mode (`[data-theme="light"]`) and dark mode (`[data-theme="dark"]`) remain fully harmonious and WCAG AA contrast compliant.
- Use Angular Signals (`signal()`, `computed()`, `input()`) for reactive component state.
- Use native Angular 22 control flow (`@if`, `@else`, `@for (item of items; track item.id)`).

---

## 🛡️ Security, Privacy & Data Integrity Guarantees

- **Zero Backend**: All card processing and optimization logic runs exclusively in the user's browser.
- **No Telemetry**: Our CI pipeline executes an automated static analysis linter (`git grep -nE "fetch\(|XMLHttpRequest|navigator\.sendBeacon" src/app/`). Any attempt to add network tracking or telemetry fails the build immediately.
- **Zero Credential Collection**: Never ask for or store 16-digit Card Numbers (PAN), CVVs, PINs, OTPs, or NetBanking credentials.
- **Zero Dependency Policy for Data**: Pull requests adding or updating credit cards must **never** modify `package.json` or `package-lock.json`.

---

## ✅ Pre-Submission Verification Checklist

Before creating a pull request, run the unified verification suite:

```bash
# Full local CI verification
npm run ci
```

This runs:

1. `npm run format:check` — Prettier code formatting validation.
2. `npm run cards:validate` — Master catalog schema, volume threshold (≥ 180 cards), critical files existence, and domain whitelist verification.
3. `npm test` — Automated unit test suite (55 tests across 9 spec suites).
4. `npm run build` — Production Angular 22 compilation.

---

## 🏷️ Commit Message Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat(catalog): add Axis Horizon Visa credit card`
- `fix(tracker): correct statement rollover calculation for leap years`
- `docs(readme): update live demo badge and architecture overview`
- `style(navbar): refine glassmorphic border blur token`
- `refactor(optimizer): streamline category scoring algorithm`
- `ci(actions): add automated security audit step`
- `test(security): add catalog integrity assertions`
