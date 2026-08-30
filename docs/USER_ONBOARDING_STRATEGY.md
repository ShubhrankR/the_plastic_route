# 🚪 User Onboarding & Data Segregation Strategy

**Status**: ✅ Implemented (August 2026)
**Branch**: `feature/seg-login`
**Date**: August 2026

---

## 🎯 Implemented Architecture Summary

The two-path First-Time User Experience (FTUE) has been fully implemented as a **dedicated `/welcome` onboarding gateway** with Angular functional route guards and two-tier state synchronization:

```
                          ┌────────────────────────────────┐
                          │   First-Time Visitor Arrives   │
                          └───────────────┬────────────────┘
                                          │
                                          ▼
                               ┌─────────────────────┐
                               │   onboardingGuard   │
                               └──────────┬──────────┘
                                          │
                        ┌─────────────────┴─────────────────┐
                        ▼                                   ▼
             [ FTUE Not Completed ]               [ FTUE Completed ]
                        │                                   │
                        ▼                                   ▼
           ┌────────────────────────┐             ┌───────────────────┐
           │    /#/welcome Screen   │             │   /#/home / App   │
           └────────────┬───────────┘             └───────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
┌───────────────────┐       ┌───────────────────┐
│ ⚡ Explore Demo   │       │ 💼 Build Wallet   │
│ (20+ Master Cards)│       │ (Local IndexedDB) │
└─────────┬─────────┘       └─────────┬─────────┘
          ▼                           ▼
┌───────────────────┐       ┌───────────────────┐
│ Routes to /#/home │       │Routes to/portfolio│
└───────────────────┘       └───────────────────┘
```

1. **Dedicated Gateway (`/welcome`)**: A distraction-free, beautifully balanced view featuring equal-elevation choice cards for *Explore Demo Mode* and *Build Personal Wallet*.
2. **Angular Functional Route Guard (`onboardingGuard`)**: Seamlessly redirects first-time visitors to `/#/welcome`, while `welcomeGuard` prevents onboarded returning visitors from being trapped on the onboarding view.
3. **Two-Tier State Sync**: Synchronous `localStorage` check (`tpr_ftue_completed`) to guarantee **zero flash of un-onboarded content**, paired with persistent `IndexedDB` wallet storage.
4. **Data Segregation**: The public demo catalog (`cards.json`) is populated with distinct, randomized statement dates, completely separated from the developer/owner seed (`owner_portfolio.json`).

---

## 🧨 The Problem

Currently, when a brand-new visitor opens [The Plastic Route](https://shubhrankr.github.io/the_plastic_route/), they immediately see the **repository owner's personal credit card portfolio** loaded from `cards.json`. This creates two issues:

1. **Privacy Exposure**: The owner's exact set of credit cards and statement dates is visible to every public visitor.
2. **Confusing UX**: New users see cards that aren't theirs, making the Optimizer and Tracker results irrelevant to them — there's no clear path to set up *their own* portfolio.

---

## 🤔 What Should a Brand-New User See?

The core question: **When someone visits The Plastic Route for the first time, what experience should they get?**

---

## 🔀 Options Evaluated

### Option A: Login / Local Profile System

Give the user a "sign in" / "create profile" experience on first visit, then start with a clean empty wallet.

```
  ┌────────────────────────────────────────────────────────────┐
  │                     FIRST VISIT FLOW                       │
  │                                                            │
  │    Landing Page  ──►  "Create Your Profile" Screen         │
  │                          (enter a display name)            │
  │                              │                             │
  │                              ▼                             │
  │                       Empty Wallet                         │
  │                    "Add Your First Card"                   │
  └────────────────────────────────────────────────────────────┘
```

**Pros**:
- Clean separation — each "profile" gets its own IndexedDB namespace.
- Feels intentional and personal.
- Future: could support multiple local profiles (e.g., spouse's cards vs. yours) on the same browser.

**Cons**:
- The word "Login" implies server authentication — misleading for a zero-backend app.
- Adds friction for first-time visitors who just want to explore.
- Empty wallet on first visit means the Optimizer / Tracker have nothing to show → user may bounce.

---

### Option B: Two-Path Onboarding (Explore vs. Build)

On first visit, present a choice: explore with a public reference dataset **or** jump straight to building your own wallet.

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                        FIRST VISIT FLOW                               │
  │                                                                        │
  │    Landing Page  ──►   Onboarding Modal / Inline Section              │
  │                              │                                         │
  │                    ┌─────────┴──────────┐                              │
  │                    ▼                    ▼                               │
  │         ┌──────────────────┐  ┌────────────────────┐                   │
  │         │  "Explore Cards" │  │  "Build My Wallet" │                   │
  │         │  (Master Catalog │  │  (Start with empty │                   │
  │         │   — read-only    │  │   wallet, add your │                   │
  │         │   reference)     │  │   own cards)       │                   │
  │         └────────┬─────────┘  └────────┬───────────┘                   │
  │                  ▼                     ▼                                │
  │          Browse 50+ popular     Portfolio Builder                      │
  │          Indian credit cards    with "Quick Add                        │
  │          and see how the app    from Catalog" option                   │
  │          works with sample data                                        │
  └────────────────────────────────────────────────────────────────────────┘
```

**Pros**:
- Zero friction — user can explore immediately without entering anything.
- The Master Catalog acts as a **demo mode**: shows the app's full power with real (but generic) card data.
- User can switch to "My Wallet" anytime and start adding their own cards.
- Aligns with the existing Master Catalog vs. User Wallet separation in [SECURITY_PRIVACY_AND_NAVIGATION.md](SECURITY_PRIVACY_AND_NAVIGATION.md).

**Cons**:
- Need to clearly distinguish between "exploring catalog data" and "my personal wallet" in the UI.
- If user explores for a while, they may forget to actually build their wallet.

---

### Option C: Hybrid — Local Profile + Two-Path (Recommended for Discussion)

Combine the strengths of both approaches:

```
  ┌───────────────────────────────────────────────────────────────────────────────┐
  │                           FIRST VISIT FLOW                                   │
  │                                                                               │
  │    Landing Page (Home)                                                        │
  │         │                                                                     │
  │         ▼                                                                     │
  │    First-Visit Detection (IndexedDB check: has user data?)                   │
  │         │                                                                     │
  │         ├── YES: User has cards ──► Normal app experience                    │
  │         │                                                                     │
  │         └── NO: New visitor ──► Onboarding Welcome Section                   │
  │                                     │                                         │
  │                           ┌─────────┴──────────┐                              │
  │                           ▼                    ▼                               │
  │                ┌───────────────────┐  ┌────────────────────┐                   │
  │                │  "Explore Mode"   │  │  "Setup My Wallet" │                   │
  │                │                   │  │                    │                   │
  │                │  Browse the full  │  │  Enter a display   │                   │
  │                │  Master Catalog   │  │  name (optional),  │                   │
  │                │  of 50+ popular   │  │  then add cards    │                   │
  │                │  Indian credit    │  │  from the catalog  │                   │
  │                │  cards. See how   │  │  or manually.      │                   │
  │                │  the Optimizer    │  │                    │                   │
  │                │  and Tracker work │  │  Data saved to     │                   │
  │                │  with real data.  │  │  your browser's    │                   │
  │                │                   │  │  IndexedDB. Never  │                   │
  │                │  (Read-only, no   │  │  leaves your       │                   │
  │                │   data saved)     │  │  device.           │                   │
  │                └────────┬──────────┘  └────────┬───────────┘                   │
  │                         │                      │                               │
  │                         ▼                      ▼                               │
  │                  Catalog Browse View      Portfolio Builder                    │
  │                  with "Add to My          (Quick Add from                      │
  │                  Wallet" buttons           Catalog + Manual)                   │
  └───────────────────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions**:
1. **No traditional login** — the browser IS the identity. No passwords, no servers.
2. **First-visit detection** via IndexedDB: if `user_cards` store is empty → show onboarding.
3. **Explore Mode** loads the Master Catalog as read-only data for the Optimizer/Tracker — user can try the app without committing anything.
4. **"Setup My Wallet"** leads to the Portfolio Builder where users add cards from the catalog or create custom ones.
5. **Seamless transition**: while exploring, every card shows an **"Add to My Wallet"** button that copies it to IndexedDB with the user's custom statement dates.
6. **Persistent nudge**: if user is in Explore Mode, a subtle banner reminds them: *"You're browsing sample data. Set up your wallet for personalized recommendations."*

---

## 📊 Data Architecture: Separating Owner Data from Master Catalog

The current `cards.json` mixes **generic card product info** (name, bank, network, reward rules) with the **owner's personal data** (specific `billingCycleStart`/`billingCycleEnd` dates). We need to split this into separate files so that:

1. **New visitors** never see the owner's personal billing dates
2. **The owner** retains their data and can load it seamlessly

### File Split Strategy

```
  src/app/core/data/
  ├── cards.json                  # Master Catalog (generic templates, community-maintained)
  └── owner_portfolio.json        # Owner's personal portfolio (NOT loaded for new users)
```

#### `cards.json` — Master Catalog (Public, Read-Only)
Contains **generic card product metadata** without any personal billing dates. These are template entries that any user can browse or "Quick Add" to their wallet:

```json
[
  {
    "id": "amazon_pay_icici",
    "name": "Amazon Pay ICICI Visa",
    "network": "Visa",
    "optimizationVector": "Yields 5% back directly as a statement credit.",
    "loungeAccess": { "eligible": false },
    "regulatoryUpdate": "2026 Update: Avoid loading more than ₹5,000 into your Amazon Pay wallet per month.",
    "categories": ["amazon", "general"]
  }
]
```

> [!NOTE]
> **No `billingCycleStart` / `billingCycleEnd` fields** in catalog entries. These are personal to each user and only exist in the User Wallet (IndexedDB) after a user adds a card and enters their own statement dates.

#### `owner_portfolio.json` — Owner's Personal Seed Data (Private)
Contains the owner's 10 cards with their **specific billing cycle dates**. This file ships with the repo but is **never auto-loaded for new visitors**:

```json
[
  {
    "id": "amazon_pay_icici",
    "billingCycleStart": 20,
    "billingCycleEnd": 19
  },
  {
    "id": "icici_coral",
    "billingCycleStart": 20,
    "billingCycleEnd": 19
  },
  {
    "id": "idfc_first_wealth",
    "billingCycleStart": 20,
    "billingCycleEnd": 19
  },
  {
    "id": "sbi_flipkart",
    "billingCycleStart": 11,
    "billingCycleEnd": 10
  },
  {
    "id": "sbi_bpcl_octane",
    "billingCycleStart": 11,
    "billingCycleEnd": 10
  },
  {
    "id": "hdfc_indian_oil",
    "billingCycleStart": 11,
    "billingCycleEnd": 10
  },
  {
    "id": "bobcard_scapia",
    "billingCycleStart": 18,
    "billingCycleEnd": 17
  },
  {
    "id": "federal_one_metal",
    "billingCycleStart": 19,
    "billingCycleEnd": 18
  },
  {
    "id": "federal_imperio",
    "billingCycleStart": 21,
    "billingCycleEnd": 20
  },
  {
    "id": "yes_bank_rupay",
    "billingCycleStart": 3,
    "billingCycleEnd": 2
  }
]
```

> [!IMPORTANT]
> The `owner_portfolio.json` entries reference cards by `id`, which maps back to the Master Catalog. When loaded, the app merges the owner's billing dates with the generic card metadata from `cards.json` and writes the combined result into IndexedDB.

---

## 🔄 How the Owner Retains Their Data

The owner needs a way to auto-load their personal portfolio so the app works exactly as it does today — but **only for them**, not for every new visitor.

### Approach: Seed via URL Parameter

```
  ┌───────────────────────────────────────────────────────────────────────────────┐
  │                        OWNER DATA LOADING FLOW                               │
  │                                                                               │
  │    Owner visits:                                                              │
  │    https://shubhrankr.github.io/the_plastic_route/#/home?seed=owner          │
  │         │                                                                     │
  │         ▼                                                                     │
  │    App detects `?seed=owner` query parameter                                 │
  │         │                                                                     │
  │         ▼                                                                     │
  │    Fetches `owner_portfolio.json` from app assets                            │
  │         │                                                                     │
  │         ▼                                                                     │
  │    Merges owner billing dates with Master Catalog card metadata              │
  │         │                                                                     │
  │         ▼                                                                     │
  │    Writes merged cards into IndexedDB (`user_cards` store)                   │
  │         │                                                                     │
  │         ▼                                                                     │
  │    Normal app experience — Optimizer, Tracker, Portfolio all                  │
  │    show the owner's personal cards with correct billing dates                │
  │                                                                               │
  │    (Subsequent visits — IndexedDB already has data, no seed needed)          │
  └───────────────────────────────────────────────────────────────────────────────┘
```

### Alternative Approaches Considered

| Approach | How It Works | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **`?seed=owner` URL param** | Owner bookmarks a special URL that triggers seed loading | Simple, one-time action, no UI clutter | URL is publicly visible in repo if documented |
| **"Load Developer Portfolio" button** | Hidden or dev-only button in Settings or onboarding | Discoverable, no magic URLs | Adds UI complexity |
| **`.tpr` Export/Import** | Owner exports current data before migration, imports after | Cleanest separation, most portable | Requires Export feature to be built first |
| **localStorage flag** | Owner sets a `localStorage` key manually via DevTools once | Zero UI, zero URL traces | Not user-friendly, fragile |

> [!TIP]
> The **`?seed=owner` approach** is the simplest to implement first. Once the Export/Import feature is built (Phase 4), the owner can switch to using a `.tpr` backup file instead — which is the long-term solution for anyone (not just the owner) to transfer their wallet between browsers.

---

## 🔑 What About the Word "Login"?

Since The Plastic Route is a **zero-backend** app, a traditional login (username + password + server auth) contradicts the core philosophy. However, there's value in having a **local identity concept**:

| Approach | Description | Fits Our Philosophy? |
| :--- | :--- | :--- |
| **Server Login** (username/password/OAuth) | Requires backend auth server | ❌ Violates zero-backend rule |
| **Local Profile** (display name stored in IndexedDB) | User enters a name, stored locally, purely cosmetic | ✅ Privacy-preserving |
| **No Identity** (browser = identity) | No names, no profiles — IndexedDB just has cards | ✅ Simplest approach |
| **Passphrase-Protected Export** | Identity only matters during backup/restore | ✅ Privacy-preserving |

**Recommendation**: Start with **"No Identity"** (browser = identity). The onboarding flow doesn't need a name or login — it just detects whether IndexedDB has cards or not. A local profile name can be added later as a nice-to-have in Settings.

---

## ✅ Proposed Implementation Sequence

1. **Split `cards.json`**: Separate the current file into a generic Master Catalog (`cards.json` — no personal billing dates) and an owner seed file (`owner_portfolio.json` — owner's 10 cards with their billing cycle dates). Both live in `src/app/core/data/`.
2. **Seed mechanism**: Implement `?seed=owner` URL parameter detection. When present and IndexedDB is empty, merge `owner_portfolio.json` with `cards.json` metadata and write to IndexedDB.
3. **First-visit detection**: Check IndexedDB `user_cards` count on app init. If `0` and no seed param → trigger onboarding flow.
4. **Onboarding UI**: Build inline welcome section or modal on the Home page with "Explore" and "Setup My Wallet" paths.
5. **Explore Mode**: Load Master Catalog data into Optimizer/Tracker as read-only (not written to IndexedDB).
6. **Portfolio Builder**: Build the `/portfolio` add/edit/delete UI with "Quick Add from Catalog" integration.
7. **Persistent mode indicator**: Subtle UI badge showing whether user is in "Explore Mode" or "My Wallet" mode.

---

## 🔗 Related Documents

- [TODO.md](TODO.md) — Phase 2 roadmap (this feature is the first task)
- [SECURITY_PRIVACY_AND_NAVIGATION.md](SECURITY_PRIVACY_AND_NAVIGATION.md) — Original Master Catalog vs User Wallet architecture
- [SCALING_STRATEGY.md](SCALING_STRATEGY.md) — Multi-tiered storage strategy and rule engine vision

