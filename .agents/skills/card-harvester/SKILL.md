---
name: card-harvester
description: Autonomous credit card dataset harvester and updater for major Indian banks (HDFC, SBI, ICICI, Axis, Amex, IDFC). Use when the user asks to fetch, update, scrape, or sync credit card rules and rewards from the web into the master catalog.
---

# Card Harvester Skill 💳

This skill enables Antigravity assistants to fetch and synchronize credit card rules, reward multipliers, lounge access criteria, and fee structures from official bank schedules (MITC) and web datasets directly into `src/app/core/data/cards.json`.

---

## 🎯 Target Banks & Card Scopes

1. **HDFC Bank**: Infinia, Diners Black, Regalia Gold, Millennia, Tata Neu Infinity/Plus, Swiggy HDFC.
2. **SBI Card**: Cashback SBI, SimplyCLICK, BPCL Octane, Aurum, Prime, Pulse.
3. **ICICI Bank**: Amazon Pay ICICI, Emeralde Private Metal, Sapphiro, Coral RuPay, Rubyx.
4. **Axis Bank**: Atlas, Magnus, Horizon, ACE, Airtel Axis, Flipkart Axis, My Zone, SuperMoney RuPay, Burgundy Private.
5. **Secondary Banks**: Amex India (Plat Travel, MRCC, Gold Charge), IDFC FIRST (Wealth, Select), Federal Bank (Scapia, OneCard).

---

## 📋 Execution Protocol

When the user asks to fetch or sync card data:

### Step 1: Check Local Datasets & Perplexity Deep Research Exports
Check if any new CSV, Markdown, or JSON files exist in `worker/` or if the user provided Perplexity Deep Research outputs in the chat.
Refer to [`docs/PERPLEXITY_RESEARCH_INTEGRATION.md`](../../../docs/PERPLEXITY_RESEARCH_INTEGRATION.md) for detailed Perplexity Project configurations, prompt templates, and schema definitions.
If CSV datasets exist in `worker/`, run:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.19.0 && npm run cards:sync
```

### Step 2: Web Traversal & Term Verification
If the user specifies particular bank cards or latest devaluations to verify:
1. Search official bank MITC documents or verified aggregators (e.g. TechnoFino, CardExpert).
2. Extract fields conforming strictly to `MasterCatalogCard` in `src/app/core/models/card.model.ts`:
   - `id`: unique snake_case string (e.g., `axis_magnus`, `hdfc_infinia`)
   - `name`: Official card title
   - `bank`: Bank name
   - `network`: `'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Diners Club'`
   - `optimizationVector`: Core reward proposition and return rate
   - `loungeAccess`: `{ eligible: boolean, spendThreshold?: number, terminals?: string[] }`
   - `regulatoryUpdate`: Year + devaluation/capping note
   - `categories`: Union subset (`['amazon', 'flipkart', 'bpcl', 'other_fuel', 'upi', 'forex', 'dining_travel', 'gaming_wallet', 'general']`)
   - `annualFee`: e.g., `"₹500 + GST"` or `"Lifetime Free"`
   - `forexMarkup`: e.g., `"3.5%"` or `"0.0%"`

### Step 3: Isolation Rule
> [!CAUTION]
> **NEVER MODIFY `src/app/core/data/owner_portfolio.json`**. The owner seed portfolio must stay untouched. Only update `src/app/core/data/cards.json`.

### Step 4: Priority Map Update & Documentation Sync
1. If new cards serve as category champions (forex, fuel, dining, upi, travel), add their IDs to `CATEGORY_PRIORITY_MAP` in `src/app/core/services/card.service.ts`.
2. Update the master card inventory and bank tables in `docs/CARD_CATALOG_DATASET.md`.

### Step 5: Build Verification
Always execute production build verification:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 24.19.0 && npm run build
```
