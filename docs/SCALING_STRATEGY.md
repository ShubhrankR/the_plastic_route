# 🚀 The Plastic Route — Architecture & Scaling Strategy

This document outlines the technical architecture, optimization strategies, and growth blueprint for scaling **The Plastic Route** from a static card matrix into an ecosystem-grade, privacy-first credit card spend optimization engine.

---

## 🏛️ Core Principles & Architectural Constraints

1. **Zero-Backend Guarantee**: Zero servers, zero user accounts, zero cookies, zero financial telemetry. All user data remains local to the browser.
2. **Mathematical Precision**: Spend optimization must consider **Cashback %, Reward Point Conversion Ratios, Cap Thresholds, Surcharges, and Interest-Free Payment Liquidity**.
3. **Community-Driven Knowledge Base**: Bank rules, reward caps, and regulatory changes (e.g., fuel surcharges, utility caps, gaming taxes) change frequently; the rules dataset must be open-source and community-maintained.

---

## 📐 Scalable System Architecture

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    BROWSER (CLIENT)                    │
                               │                                                        │
                               │  ┌───────────────────┐        ┌─────────────────────┐  │
                               │  │   UI Components   │◄───────┤   Angular Signals   │  │
                               │  │ (Standalone Views)│        │   State Management  │  │
                               │  └─────────┬─────────┘        └──────────▲──────────┘  │
                               │            │                             │             │
                               │            ▼                             │             │
                               │  ┌───────────────────────────────────────┴──────────┐  │
                               │  │         Card Optimization Engine         │  │
                               │  │    (Multi-Vector Scoring & Rule Engine)   │  │
                               │  └─────────┬─────────────────────────────▲──────────┘  │
                               │            │                             │             │
                               │            ▼                             │             │
                               │  ┌───────────────────┐        ┌──────────┴──────────┐  │
                               │  │  IndexedDB Store  │        │   Master Registry   │  │
                               │  │ (User Portfolio)  │        │    (cards.json)     │  │
                               │  └───────────────────┘        └─────────────────────┘  │
                               └────────────────────────────────────────────────────────┘
```

---

## 💡 Key Scaling Strategies

### 1. 🧠 Advanced Dynamic Rule Engine Architecture

As bank reward programs grow more intricate (e.g., HDFC Infinia vs SBI Cashback vs Axis Magnus), card rules cannot remain hardcoded in static `switch` statements.

#### Declarative Rule Schema Specification

```json
{
  "cardId": "sbi_cashback",
  "name": "SBI Cashback Credit Card",
  "rules": [
    {
      "category": "online_general",
      "type": "cashback",
      "percentage": 5.0,
      "monthlyCap": 5000,
      "excludedMcc": ["fuel", "utility", "wallet", "rent", "jewelry"],
      "effectiveFrom": "2024-04-01"
    },
    {
      "category": "offline_general",
      "type": "cashback",
      "percentage": 1.0,
      "monthlyCap": null
    }
  ]
}
```

#### Multi-Vector Recommendation Algorithm

When evaluating the optimal card for a transaction of amount $A$ in category $C$ on date $D$:

$$\text{Score}(Card) = w_1 \cdot \text{CashbackValue}(A, C) + w_2 \cdot \text{RewardPointValue}(A, C) + w_3 \cdot \text{LiquidityValue}(D) - \text{Fees/Surcharges}$$

Where:

- **CashbackValue**: Evaluates percentage yield up to remaining monthly cap.
- **RewardPointValue**: Multiplies base points by conversion rate (e.g., 1 point = ₹1 for Accor/flights vs ₹0.20 cash statement credit).
- **LiquidityValue**: Scores interest-free leverage (e.g., 50 interest-free days remaining has higher financial utility than 5 days).
- **Fees/Surcharges**: Accounts for FX markup (0% for Scapia vs 3.5% for standard cards), fuel surcharges, or payment gateway fees.

---

### 2. 🗄️ Multi-Tiered Client-Side Storage Strategy

To handle users with 10–20 cards, historical spend tracking, and custom category overrides without sluggish UI rendering:

| Storage Layer      | Technology                      | Purpose                                                              |
| :----------------- | :------------------------------ | :------------------------------------------------------------------- |
| **Active State**   | Angular Signals                 | UI reactivity, active tab, current recommendation                    |
| **User Portfolio** | IndexedDB (`IndexedDBService`)  | Storing personal card inventory, custom billing dates, credit limits |
| **App Settings**   | `localStorage`                  | Dark/light theme, default spend volume, preferred reward type        |
| **Offline Assets** | Service Worker (`CacheStorage`) | Pre-caching HTML/CSS/JS bundles & card logos                         |

#### Offloading Computation to Web Workers

For complex portfolio analysis (e.g., evaluating milestone rewards across 10 cards over 12 billing cycles), rule evaluation will run inside a dedicated **Web Worker** (`optimization.worker.ts`) to maintain 60 FPS smooth UI rendering.

---

### 3. 🌐 Decentralized Master Card Registry & Sync Engine

To keep card rules updated without requiring backend servers:

1. **GitHub as Central Registry**: The `src/app/data/cards.json` master dataset remains in the public GitHub repository.
2. **Stale-While-Revalidate Fetch Engine**:
   - On app launch, the app serves local `cards.json` / IndexedDB immediately.
   - In the background, `CardService` fetches the latest `cards.json` raw release from GitHub CDN (`raw.githubusercontent.com`).
   - If new card rules or regulatory updates are detected, the app notifies the user with a non-intrusive toast: _"Updated card reward rules available (v2026.08). Tap to update."_
3. **Open-Source CI Validation**:
   - GitHub Actions pipeline runs JSON Schema validation (`ajv` / Zod) on every Pull Request to ensure community submissions have valid fields, non-overlapping date ranges, and correct network types.

---

### 4. 📲 Offline-First PWA & Mobile Web Experience

1. **Native App-Like Experience**:
   - Progressive Web App (PWA) configuration via `@angular/pwa`.
   - Desktop and Mobile home screen installability (`manifest.webmanifest`).
   - Full offline functionality—users can check card recommendations while standing at a checkout counter with zero cellular signal.
2. **Web Share Target API**:
   - Users can share a transaction notification or text snippet directly to The Plastic Route to automatically trigger a spend lookup.

---

### 5. 🔐 Privacy-Preserving Portability & Peer-to-Peer Sync

Since there are no user accounts or cloud databases:

1. **Encrypted JSON Backup / Restore**:
   - Export card portfolio to an encrypted `.tpr` JSON file using the browser's native Web Crypto API (`crypto.subtle.encrypt` with AES-GCM).
   - Password-protect exports for safe backup to Google Drive / iCloud.
2. **Peer-to-Peer QR Code Sync**:
   - Transfer card setup between Desktop browser and Mobile phone via encrypted QR Code scans or WebRTC peer-to-peer data channels—zero data passes through any third-party server.

---

### 6. 🤖 Autonomous Multi-Source Card Harvester & CI/CD Data Pipeline

To prevent manual maintenance debt as Indian banks introduce frequent circulars and devaluations:

1. **Dual-Trigger Architecture**:
   - **Antigravity Interactive Harvester (`.agents/skills/card-harvester/SKILL.md`)**: On-demand web traversal to query official issuer schedules, MITCs, and verified community portals (TechnoFino, CardExpert).
   - **GitHub Actions Scheduled CI/CD (`.github/workflows/sync-cards.yml`)**: Weekly automated execution that syncs datasets, verifies Angular compilation (`npm run build`), and opens PRs on updates.
2. **Schema Ingestion & Normalization (`scripts/sync-cards.mjs`)**:
   - Programmatically parses CSV/JSON feeds, infers bank brands, networks, lounge thresholds, forex rates, and spend category unions.
   - Strictly isolates private user seed datasets (`src/app/core/data/owner_portfolio.json`) from the public catalog (`src/app/core/data/cards.json`).

---

## 🛣️ Long-Term Feature Roadmap Summary

```mermaid
flowchart LR
    A[Phase 1: Angular Router & IndexedDB] --> B[Phase 2: Dynamic Portfolio Builder]
    B --> C[Phase 3: Automated Card Harvester]
    C --> D[Phase 4: Dynamic Rule Engine]
    D --> E[Phase 5: P2P Sync & Community Registry]
```
