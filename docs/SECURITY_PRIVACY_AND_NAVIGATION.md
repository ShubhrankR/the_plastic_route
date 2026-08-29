# 🛡️ Security, Privacy & App Navigation Architectural Discussion

This document captures the analysis of security risks regarding credit card data, privacy guarantees, and the multi-user navigation architecture for **The Plastic Route**.

---

## 🔒 1. Security & Financial Risk Analysis

### Is storing current card information in the public code a security risk?

#### ✅ **No Financial Risk**
The repository and JSON dataset store **only high-level product metadata**:
- Card Product Names (e.g., `"Amazon Pay ICICI Visa"`, `"SBI BPCL Octane"`)
- Card Networks (`"Visa"`, `"Mastercard"`, `"RuPay"`)
- Statement Start & End Days (e.g., `20` to `19`)
- Reward Vectors & Lounge Access Thresholds

> [!NOTE]
> **Zero Credential Storage**: 16-digit Card Numbers (PAN), Expiration Dates, CVV/CVC codes, PINs, NetBanking credentials, and OTPs are **NEVER** asked, stored, or processed by this application. It is mathematically and operationally impossible for anyone to execute fraudulent transactions or compromise bank accounts with this metadata.

---

#### ⚠️ **Privacy & Product Design Exposure**
While financially safe, hardcoding a specific personal portfolio into `cards.json` poses two challenges:
1. **Privacy Exposure**: It reveals the exact set of credit cards and statement dates belonging to the repository owner to any public viewer or web crawler.
2. **Single-User Constraint**: Hardcoding a personal portfolio prevents other users from utilizing the app for *their* unique credit card mix.

---

## 🏛️ 2. Proposed Multi-User Navigation Architecture

To transition **The Plastic Route** from a hardcoded single-user app into a universal, privacy-first web application for all users, we propose segregating the dataset into a **Master Catalog Template** and a **Local User Wallet**.

```
                               ┌────────────────────────────────────────────────────────┐
                               │                     DATA SEPARATION                    │
                               │                                                        │
                               │  ┌──────────────────────────────────────────────────┐  │
                               │  │              Master Card Catalog                 │  │
                               │  │            (src/app/core/data/cards.json)        │  │
                               │  │   • Read-only template library of 50+ cards     │  │
                               │  └──────────────────────────┬───────────────────────┘  │
                               │                             │                          │
                               │                             ▼                          │
                               │  ┌──────────────────────────────────────────────────┐  │
                               │  │             User Personal Wallet                 │  │
                               │  │            (IndexedDB Local Storage)             │  │
                               │  │   • User's active cards, custom dates & rules   │  │
                               │  └──────────────────────────────────────────────────┘  │
                               └────────────────────────────────────────────────────────┘
```

---

## 🧭 3. App Navigation & User Flows

```
                             ┌─────────────────────────────────────────────────────────┐
                             │                    App Navigation Bar                   │
                             │  [Home]  [Optimizer]  [Tracker]  [Portfolio]  [Theme]   │
                             └────┬──────────┬────────────┬──────────┬───────────┬─────┘
                                  │          │            │          │           │
         ┌────────────────────────┘          │            │          │           └────────────────────────┐
         ▼                                   ▼            ▼          ▼                                    ▼
┌──────────────────┐               ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Home Landing   │               │ Spend Optimizer  │ │ Billing Tracker  │ │  Card Portfolio  │ │ Welcome Gateway  │
│    (/#/home)     │               │  (/#/optimizer)  │ │   (/#/tracker)   │ │  (/#/portfolio)  │ │   (/#/welcome)   │
├──────────────────┤               ├──────────────────┤ ├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ • Hero Overview  │               │ • Amount Input   │ │ • Current vs Next│ │ • Active Card    │ │ • First-Visit    │
│ • App Purpose    │               │ • Category Select│ │   Bill Status    │ │   Table          │ │   Onboarding     │
│ • Usage Guide    │               │ • Best/Backup    │ │ • Days Left      │ │ • Add Card Modal │ │ • Explore vs     │
│ • Open Source    │               │   Recommendation │ │   Countdown      │ │ • Edit Stmt Dates│ │   Build Choice   │
│   Contributions  │               └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘
└──────────────────┘
```

### Detailed Route Specifications

#### 0. 🚀 Welcome Gateway (`/#/welcome`) — *First-Time Visitor Route*
- **Purpose**: Dedicated, distraction-free onboarding gateway that presents first-time visitors with an immediate two-path choice:
  - **⚡ Explore Demo Mode**: Pre-loads 20+ Master Catalog cards into memory and routes to `/#/home`.
  - **💼 Build Personal Wallet**: Initializes a clean private local wallet in IndexedDB and routes to `/#/portfolio`.
- **Guard Policy**: Protected by `welcomeGuard` (redirects returning users to `/#/home` unless accessed with `?force=true`), while `onboardingGuard` intercepts un-onboarded traffic to any other route.

#### 1. 🏠 Home & Landing Page (`/#/home`)
- **Purpose**: Welcomes users, explains zero-backend privacy guarantees, demonstrates how to use the 3 core features, and provides open-source contribution instructions.
- **Key Sections**: Hero CTA Header, Value Pillars, 3-Metric Highlight Bar, 3-Step Interactive Guide, and Open-Source GitHub Contribution Card.

#### 2. 💳 Spend Optimizer (`/#/optimizer`)
- **Purpose**: Instant transaction optimization lookup.
- **Data Source**: Evaluates rules against **User's Active Wallet** in IndexedDB.
- **Controls**:
  - Optional Transaction Amount field.
  - Category Selector dropdown.
  - Recommended Primary Card, Backup Card, Interest-Free Window, and Lounge Eligibility display.

#### 2. 📅 Billing Cycle Tracker (`/#/tracker`)
- **Purpose**: Real-time statement cycle leverage monitor.
- **Data Source**: Calculates days remaining for each card in **User's Active Wallet**.
- **Visuals**: Color-coded severity badges (`danger` for ≤ 3 days left, `warning` for current bill, `success` for next bill rollover).

#### 3. 💼 My Wallet / Card Portfolio (`/#/portfolio`) — *Portfolio Manager*
- **Purpose**: Manage personal credit cards.
- **Features**:
  - **Add Card Modal**:
    - **Tab 1: From Catalog** — Select from pre-loaded templates (Amazon Pay ICICI, Infinia, SBI Cashback, Scapia, etc.) and auto-fill details.
    - **Tab 2: Custom Card** — Input custom Card Name, Bank, Network, Statement Day, and Notes.
  - **Edit Statement Date**: Users can update their statement generation day if modified by the bank.
  - **Toggle Card Status**: Enable / disable cards without deleting them.
  - **Delete Card**: Remove card from local IndexedDB.

#### 4. ⚙️ Settings & Privacy (`/#/settings`)
- **Purpose**: Data management & privacy controls.
- **Features**:
  - **Export Wallet**: Download encrypted `.tpr` / JSON backup file.
  - **Import Wallet**: Upload JSON file to restore wallet across browsers.
  - **Reset to Sample Demo**: Re-populate wallet with default sample cards.

---

## 📋 4. Next Implementation Action Items

1. **Update `docs/TODO.md`**: Add Phase 2 tasks for Catalog Separation and Portfolio Builder Modal.
2. **Build Portfolio Builder Form Component**: Create `/portfolio/add` modal supporting catalog selection & custom card creation.
3. **Add `/settings` Route**: Implement JSON export and import options for user data portability.

---

## 🔄 5. Data Persistence Across Page Refreshes & App Updates Strategy

### The Problem / Question:
> *"If a user enters card details, will data survive browser refreshes when the app is updated with new open-source features on GitHub Pages?"*

---

### 🛡️ The 4-Layer Solution:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        APP UPDATE & DATA PERSISTENCE WORKFLOW                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  ┌───────────────────────┐   1. User Enters Cards   ┌──────────────────────────────┐   │
│  │   User App Interface  │ ───────────────────────► │    Browser IndexedDB Store   │   │
│  │     (Angular UI)      │                          │     (ThePlasticRouteDB)      │   │
│  └───────────▲───────────┘                          └──────────────┬───────────────┘   │
│              │                                                     │                   │
│              │ 3. PWA Auto-Reload (Keeps Data!)                    │ 2. Survives       │
│              │                                                     │    Refreshes      │
│  ┌───────────┴───────────┐                          ┌──────────────▼───────────────┐   │
│  │  PWA Service Worker   │                          │ Persistent Browser Storage   │   │
│  │ (Detects Build Hash)  │                          │  (Survives reloads/updates)  │   │
│  └───────────────────────┘                          └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1. IndexedDB Client-Side Database (Zero In-Memory Data Loss)
* User card data is **NOT** stored in transient JavaScript RAM memory.
* It is written to browser `IndexedDB` (`ThePlasticRouteDB`).
* **IndexedDB is permanent local disk storage**. It survives page refreshes, tab closes, browser updates, and system reboots.

#### 2. Non-Destructive App Updates (Service Worker PWA)
* When a new version of the app is deployed to GitHub Pages (`dist/the-plastic-route/`), Angular's PWA Service Worker detects the new build hash.
* It downloads the new code in the background and presents a non-intrusive prompt: *"New version available! Click to update."*
* When the user reloads, the browser loads the **new UI code**, while Angular initializes `IndexedDBService` and reads the existing `ThePlasticRouteDB`. **100% of user data remains intact!**

#### 3. Smart Schema Versioning & Catalog Merging
When the open-source community updates `cards.json` with new cards or revised bank rules:
* **Custom Cards**: User-created cards are strictly private and never modified.
* **Template Cards**: If the community updates a reward cap or lounge rule for a card in `cards.json`, the app detects the version bump and offers an optional 1-click *"Sync Bank Rule Update"* button without touching the user's custom statement dates or credit limits.

#### 4. Fail-Safe Backup (`.tpr` / JSON Export)
* For complete user peace of mind, the `/settings` page will provide a 1-click **Export Backup** (`my_wallet_backup.tpr`).
* If a user clears their browser cache or switches to a new laptop/phone, uploading their `.tpr` file instantly restores their entire portfolio in 2 seconds.

