# 💳 Master Credit Card Catalog & Bank Index

This document provides a comprehensive inventory and breakdown of all credit cards maintained in the master dataset ([`src/app/core/data/cards.json`](../src/app/core/data/cards.json)) of **The Plastic Route**.

---

## 📊 Catalog Overview

- **Total Cards**: 165
- **Total Issuers / Banks**: 11
- **Data Source**: Official Most Important Terms & Conditions (MITC), bank product circulars, and verified community disclosures.
- **Dataset File**: [`src/app/core/data/cards.json`](../src/app/core/data/cards.json)
- **Harvester Sync Pipeline**: `npm run cards:sync` (`scripts/sync-cards.mjs` & `.github/workflows/sync-cards.yml`)

---

## 🏦 Summary by Bank / Issuer

| #   | Bank / Issuer              | Card Count | Primary Reward Types                                                                             | Top Representative Cards                                                            |
| --- | -------------------------- | :--------: | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 1   | **Axis Bank**              |   **46**   | EDGE Miles, EDGE Rewards, Direct Cashback, Cobrand Partner Discounts                             | Axis Atlas, Magnus, ACE, Flipkart, Airtel, Olympus                                  |
| 2   | **SBI Card**               |   **25**   | Direct Statement Cashback, Fuel Surcharge Savings, Milestone Vouchers, Air Miles, Travel Credits | Cashback SBI, AURUM, ELITE, PRIME, Miles Elite, BPCL Octane, SimplyCLICK            |
| 3   | **IDFC FIRST Bank**        |   **22**   | 0% Forex, 10X Dining/Travel/Intl, HPCL Points, Never-expiring Rewards                            | FIRST Private, Mayura, Gaj, Wealth, WOW, Ashva, Select, Swyp                        |
| 4   | **IndusInd Bank**          |   **21**   | 0% Forex (Indulge), High cash-redemption (₹0.75/pt), Avios, EazyPoints, Never-expiring Rewards   | Indulge Metal, Pioneer Private, Pioneer Heritage, Crest, Celesta, Pinnacle, Tiger   |
| 5   | **ICICI Bank**             |   **18**   | Amazon Pay Cashback, ICICI Reward Points, Low Forex (Times Black 1.49%), Cobrand Perks           | Amazon Pay ICICI, Emeralde Private Metal, Times Black, Emeralde, Sapphiro, Rubyx    |
| 6   | **HDFC Bank**              |   **17**   | SmartBuy Reward Points, NeuCoins, CashPoints, Direct Cashback, PhonePe Rewards                   | Infinia Metal, Diners Club Black Metal, Regalia Gold, Millennia, Swiggy, MoneyBack+ |
| 7   | **Kotak Mahindra Bank**    |   **10**   | WhitePass Milestones, Zen Points, Mojo Points, 6E Rewards                                        | White Reserve Metal, White, Zen Signature, Mojo, IndiGo 6E XL                       |
| 8   | **Federal Bank & BOBCARD** |   **3**    | Zero-Forex Scapia Coins, Federal Rewards                                                         | BOBCARD Scapia Visa, Federal One Metal, Federal Imperio                             |
| 9   | **American Express**       |   **2**    | Membership Rewards Points, Milestone Travel Vouchers                                             | Platinum Travel, MRCC (Membership Rewards Credit Card)                              |
| 10  | **Yes Bank**               |   **1**    | UPI Reward Points, Virtual RuPay benefits                                                        | Yes Bank RuPay Virtual                                                              |

---

## 📋 Comprehensive Card Directory

### 1. 🔵 HDFC Bank (17 Cards)

| Card Name                        | Network                     | Annual Fee              |              Lounge Access              | Key Highlights                                                                             |
| -------------------------------- | --------------------------- | ----------------------- | :-------------------------------------: | ------------------------------------------------------------------------------------------ |
| **HDFC Infinia Metal**           | Visa Infinite / Metal       | ₹12,500                 |           Unlimited Worldwide           | 3.3% base reward rate, 5x on SmartBuy (up to 33.3%), 1:1 air miles redemption              |
| **HDFC Diners Club Black Metal** | Diners Club / Metal         | ₹10,000                 |           Unlimited Worldwide           | 3.3% base, 5x SmartBuy rewards, unlimited domestic & global lounge access                  |
| **HDFC Regalia Gold**            | Visa Signature / Mastercard | ₹2,500                  | 12 Domestic (₹60k/qtr), 6 Priority Pass | 4 RPs per ₹150, 5x Marks & Spencer/Myntra/Nykaa, milestone flight vouchers                 |
| **HDFC Millennia**               | Visa / Mastercard           | ₹1,000 (Waived on ₹1L)  |                   No                    | 5% cashback on 10 partner merchants (Amazon, Flipkart, Swiggy, Zomato, cap 1k/mo), 1% base |
| **HDFC Bank MoneyBack Plus**     | Visa / Mastercard / RuPay   | ₹500 (Waived on ₹50k)   |                   No                    | 10X CashPoints on Amazon, Flipkart, Swiggy, BigBasket, Reliance Smart; 2 CP/₹200 other     |
| **HDFC Bank Freedom**            | Visa / Mastercard / RuPay   | ₹500 (Waived on ₹50k)   |                   No                    | 10X CashPoints on BigBasket, Swiggy, BookMyShow, OYO, Uber; 1 CP/₹200 other                |
| **HDFC Diners Club Privilege**   | Diners Club                 | ₹1,000 (Waived on ₹3L)  |      2 Domestic (₹50k/qtr), 2 Intl      | 4 RPs/₹200 base, 5X (20 RPs/₹200) on Swiggy & Zomato, low 2.0% forex markup                |
| **Swiggy HDFC Bank**             | Mastercard World            | ₹500 (Waived on ₹2L)    |                   No                    | 10% cashback on Swiggy (Food/Instamart/Dineout up to ₹1,500/mo), 5% online shopping        |
| **Tata Neu Infinity HDFC**       | RuPay / Visa                | ₹1,499 (Waived on ₹3L)  |       8 Domestic, 4 Priority Pass       | 10% NeuCoins on Tata Neu via UPI/Tata brands, 1.5% UPI on other spends                     |
| **Tata Neu Plus HDFC**           | RuPay / Visa                | ₹499 (Waived on ₹1L)    |               4 Domestic                | 7% NeuCoins on Tata Neu, 1% UPI spends                                                     |
| **Marriott Bonvoy HDFC**         | Diners Club                 | ₹3,000 + GST            |      12 Domestic, 12 International      | 1 Free Night Award (up to 15k points), 8 points/₹150 at Marriott properties                |
| **HDFC Indian Oil RuPay**        | RuPay                       | ₹500 (Waived on ₹50k)   |                   No                    | 5% fuel points at IndianOil outlets, fuel surcharge waiver                                 |
| **HDFC Bank UPI RuPay**          | RuPay Virtual               | ₹99 + GST / Free        |                   No                    | 3% CashPoints on groceries, dining & supermarkets, 2% on utilities, UPI QR ready           |
| **PhonePe HDFC Ultimo**          | RuPay                       | ₹999 + GST              |                   No                    | 10 RPs/₹100 on PhonePe bills/utilities, 5 RPs/₹100 on e-commerce, 1 RP on UPI Scan & Pay   |
| **PhonePe HDFC Uno**             | RuPay                       | ₹499 + GST              |                   No                    | 2 RPs/₹100 on PhonePe bills/recharges, 1 RP/₹100 on other spends & UPI Scan & Pay          |
| **HDFC Pixel Play**              | RuPay Virtual / Visa        | ₹500 / Free (LTF promo) |                   No                    | Customizable 5% merchant categories, 3% on preferred merchant (Amazon/Flipkart)            |
| **HDFC Pixel Go**                | Visa                        | ₹250 + GST              |                   No                    | 1% unlimited cashback on eligible retail spends, managed digitally via PayZapp             |

---

### 2. 🟣 Axis Bank (46 Cards)

#### Super-Premium & Luxury

| Card Name                      | Network                     | Annual Fee                   |         Lounge Access          | Key Highlights                                                                  |
| ------------------------------ | --------------------------- | ---------------------------- | :----------------------------: | ------------------------------------------------------------------------------- |
| **Axis Atlas**                 | Visa Signature / Mastercard | ₹5,000                       | Domestic & International Tiers | Tier-based EDGE Miles (Silver/Gold/Platinum), up to 5 EDGE Miles/₹100 on travel |
| **Axis Bank Magnus**           | Mastercard World Elite      | ₹12,500                      |  Unlimited Domestic & Global   | 12 EDGE Rewards/₹200, 35 EDGE Rewards on Travel EDGE                            |
| **Axis Bank Olympus**          | Mastercard World Elite      | ₹20,000                      |  Unlimited Worldwide + Guest   | Luxury travel concierge, high airline transfer partner ratios                   |
| **Axis Bank Reserve**          | Visa Infinite / Metal       | ₹50,000                      |  Unlimited Worldwide + Guest   | Comprehensive luxury concierge, golf rounds, ITC culinary privileges            |
| **Axis Bank Primus**           | Visa Infinite Metal         | By Invitation                |      Unlimited Worldwide       | Ultra-high net-worth private banking tier                                       |
| **Axis Bank Burgundy Private** | Visa Infinite               | ₹50,000 / Free with Burgundy |      Unlimited Worldwide       | 0% forex markup fee, 15 EDGE Rewards per ₹200                                   |

#### Popular Cashback & Daily Drivers

| Card Name                 | Network               | Annual Fee |      Lounge Access       | Key Highlights                                                                  |
| ------------------------- | --------------------- | ---------- | :----------------------: | ------------------------------------------------------------------------------- |
| **Axis Bank ACE**         | Visa Signature        | ₹499       |  Spend-based (₹50k/qtr)  | 5% on Google Pay Bill payments, 4% on Swiggy/Zomato/Ola, 1.5% flat offline base |
| **Airtel Axis Bank**      | Mastercard            | ₹500       |       Spend-based        | 25% on Airtel DTH/Mobile, 10% on BigBasket/Swiggy/Zomato, 10% utility bills     |
| **Flipkart Axis Bank**    | Visa Platinum         | ₹500       |       Spend-based        | 5% unlimited cashback on Flipkart & Myntra, 4% on preferred merchants           |
| **Axis My Zone**          | Visa Platinum / RuPay | ₹500       |      1 per quarter       | Buy 1 Get 1 on Paytm Movies (up to ₹200/mo), flat ₹120 off on Swiggy            |
| **Axis Neo**              | Visa                  | ₹250       |            No            | 10% off on Blinkit, Zomato, Amazon Pay recharges                                |
| **Axis Bank Horizon**     | Visa Signature        | ₹3,000     | Domestic & International | Accelerated travel miles, milestone rewards                                     |
| **Axis SuperMoney RuPay** | RuPay                 | ₹499       |            No            | UPI cashback rewards on super.money app                                         |
| **Axis Bank Cashback**    | Visa                  | ₹500       |            No            | Flat statement cashback across all retail merchant categories                   |
| **Axis KWIK RuPay**       | RuPay Virtual         | ₹0 / ₹250  |            No            | Zero-friction instant UPI payments with cashback                                |

#### Travel & Cobranded

- **IndiGo Axis Bank (Standard & Premium)**: 6E Rewards on IndiGo flights, free seat selection, meal vouchers.
- **SpiceJet Axis Bank Voyage & Voyage Black**: SpiceClub points, priority check-in, complimentary vouchers.
- **Samsung Axis Bank (Signature & Infinite)**: 10% cashback on Samsung products year-round.
- **Shoppers Stop Axis Bank**: Accelerated First Citizen reward points.
- **IKEA Family Axis Bank**: Reward points and EMI privileges for home furnishings.
- **LIC Axis Bank (Signature & Platinum)**: Accelerated reward points on LIC insurance premium payments.
- **IndianOil Axis Bank (RuPay & Premium)**: 4% valueback on IndianOil fuel purchases.
- **Axis Bank SELECT / Privilege / Rewards**: Milestone rewards, Amazon/Swiggy monthly vouchers, golf access.

---

### 3. 🟠 ICICI Bank (18 Cards)

| Card Name                         | Network                | Annual Fee               |                      Lounge Access                      | Key Highlights                                                                                              |
| --------------------------------- | ---------------------- | ------------------------ | :-----------------------------------------------------: | ----------------------------------------------------------------------------------------------------------- |
| **ICICI Emeralde Private Metal**  | Visa Infinite Metal    | ₹12,499 + GST            |                Unlimited Global + Guests                | Ultra-premium metal: 6 RPs/₹200 on all retail, **1.5% low forex markup**, zero travel cancellation fees     |
| **Times Black ICICI Bank**        | Visa                   | ₹20,000 + GST            |                 Premium Domestic & Intl                 | **1.49% ultra-low forex markup**, Times Prime bundled, accelerated dining & entertainment rewards           |
| **ICICI Emeralde Credit Card**    | Visa / Mastercard      | ₹12,000 (Waived on ₹10L) |        Unlimited Domestic & Intl (PP/DreamFolks)        | 4 RP/₹100, **2.0% reduced forex markup**, complimentary monthly golf rounds and spa privileges              |
| **ICICI Sapphiro**                | Visa + Mastercard Dual | ₹6,500 (Waived on ₹6L)   |     4 Domestic/qtr (dual card, ₹75k spend), 2 PP/yr     | Buy 1 Get 1 on BookMyShow (up to ₹500 twice/mo), high milestone rewards, luxury partner vouchers            |
| **ICICI Adani One Signature**     | Visa Signature         | ₹5,000 (Waived on ₹3-4L) |            4 Domestic + 2 International / yr            | Up to 7% Adani Rewards on Adani airport ecosystem (flights, duty-free, hotels, parking)                     |
| **ICICI Rubyx**                   | Visa + Mastercard Dual | ₹3,000 (Waived on ₹3L)   | 2 Domestic/qtr (per variant, ₹75k spend), 2 Railway/qtr | Buy 1 Get 1 on BookMyShow (up to ₹250 twice/mo), 4 RP/₹100 on dining/groceries/intl                         |
| **MakeMyTrip ICICI Signature**    | Visa                   | ₹2,500 + GST             |          Domestic (1/qtr) + Intl (DreamFolks)           | Up to 6% myCash on MMT hotels, 3% on flights, milestone travel vouchers, 1 myCash = ₹1                      |
| **ICICI Coral Visa / Mastercard** | Visa / Mastercard      | ₹500 (Waived on ₹1.5L)   |   1 Domestic/qtr (spend-based ₹75k), 1-2 Railway/qtr    | 2 RPs per ₹100, 25% discount on BookMyShow/Inox (twice/mo), 1% fuel surcharge waiver                        |
| **ICICI Coral RuPay**             | RuPay                  | ₹500 (Waived on ₹1.5L)   |   1 Domestic/qtr (spend-based ₹75k), 1-2 Railway/qtr    | Seamless UPI QR merchant transactions, 2 RPs/₹100, 25% movie ticket discount                                |
| **ICICI HPCL Super Saver**        | Visa                   | ₹500 (Waived on ₹1.5L)   |                           No                            | **4% cashback** on HPCL fuel via HP Pay (cap ₹200/mo) + **20 RP/₹100** on groceries & utilities (5% return) |
| **Adani One ICICI Platinum**      | Visa                   | ₹750 (Waived on ₹1.5L)   |                Domestic (Adani Airports)                | Accelerated Adani Rewards on flights/parking/fuel at Adani managed airports                                 |
| **ICICI Expressions Card**        | Visa / Mastercard      | ₹499 (Waived on ₹1.5L)   |                           No                            | 3 RP/₹100 on retail, Buy 1 Get 1 movie discount on BookMyShow, customizable card face                       |
| **ICICI HPCL Coral**              | Visa                   | ₹199 (Waived on ₹50k)    |                           No                            | **Up to ~3.5-4% valueback** at HPCL pumps (2.5% cashback + 1% fuel surcharge waiver)                        |
| **Manchester United Platinum**    | Visa                   | ₹499 (Waived on ₹1.25L)  |                           No                            | Official MUFC fan privileges, Megastore discounts, match ticket access & experience packages                |
| **ICICI Parakram Select**         | Visa                   | ₹1,000 / Concessional    |                   Domestic + Railway                    | Defence premium: **5X rewards** on CSD canteens, groceries & dining + airport/railway lounge access         |
| **ICICI Parakram Credit Card**    | Visa / RuPay           | Lifetime Free (₹0)       |                           No                            | Lifetime free defence card: **5X rewards** on CSD stores and groceries, concessional APR                    |
| **ICICI Platinum Chip Card**      | Visa / Mastercard      | Lifetime Free (₹0)       |                           No                            | Lifetime free contactless chip card: 2 RP/₹100 on retail spends, zero annual charges                        |
| **Amazon Pay ICICI**              | Visa Platinum          | Lifetime Free (₹0)       |                           No                            | **5% unlimited cashback** on Amazon for Prime members (3% non-Prime), 2% partner spends, 1% base            |

---

### 4. 🔷 SBI Card (25 Cards)

| Card Name                      | Network                     | Annual Fee                  |            Lounge Access             | Key Highlights                                                                                             |
| ------------------------------ | --------------------------- | --------------------------- | :----------------------------------: | ---------------------------------------------------------------------------------------------------------- |
| **SBI Card AURUM**             | Visa Infinite / Metal       | ₹9,999 (Waived on ₹12L)     | 16 Domestic, Unlimited International | Ultra-premium metal: 4 RPs/₹100, Club Marriott, ₹1,000 monthly movie vouchers, low 1.99% forex             |
| **SBI Card Miles Elite**       | Visa / Mastercard           | ₹4,999 (Waived on ₹15L)     |     8 Domestic + 6 Priority Pass     | Top flexible miles: up to 6 Travel Credits/₹200 on travel, **1.99% ultra-low forex markup**, Priority Pass |
| **SBI Card ELITE**             | Mastercard World / Visa     | ₹4,999 (Waived on ₹10L)     |     8 Domestic, 6 Priority Pass      | 5X rewards on dining/groceries, ₹6,000 yearly BookMyShow movie tickets, Club Vistara Silver, 1.99% forex   |
| **SBI Card Miles Prime**       | Visa / Mastercard           | ₹2,999 (Waived on ₹10L)     |     8 Domestic + 4 Priority Pass     | Travel Credits system: ~3-4% travel value, **2.5% reduced forex markup**, milestone travel credits         |
| **SBI Card PRIME**             | Visa Signature / Mastercard | ₹2,999 (Waived on ₹3L)      |     8 Domestic, 4 Priority Pass      | 20 RPs/₹100 on birthday, 10 RPs on dining/groceries/utilities, 1-yr Club ITC Silver                        |
| **Titan SBI Card**             | Visa                        | ₹2,999 (Waived on ₹3L)      |                  No                  | **6% valueback** (6 RP/₹100) across Titan, Tanishq, Mia, Fastrack, Zoya                                    |
| **Reliance SBI Card PRIME**    | Visa Signature              | ₹2,999 (Waived on ₹3L)      |     8 Domestic, 4 Priority Pass      | Up to 10 RPs/₹100 on Reliance Retail brands (Trends, Smart Bazaar, Digital, Ajio, Jewels)                  |
| **Club Vistara SBI PRIME**     | Visa Signature              | ₹2,999                      |     8 Domestic, 4 Priority Pass      | Complimentary Club Vistara Silver tier, free Premium Economy ticket on joining and milestones              |
| **Cashback SBI Card**          | Visa Signature              | ₹999 (Waived on ₹2L)        |                  No                  | **5% cashback** on eligible online retail (capped at ₹2k/mo) + 1% offline (capped at ₹2k/mo), auto credit  |
| **SBI BPCL Octane**            | Visa Signature              | ₹1,499 (Waived on ₹2L)      |          4 Domestic / year           | **~7.25% valueback** (25 RPs/₹100) at BPCL petrol pumps + 1% surcharge waiver (cap 1,750 RP/mo)            |
| **Tata Neu Infinity SBI Card** | Visa / Mastercard / RuPay   | ₹1,499 (Waived on ₹3L)      |     8 Domestic + 4 Priority Pass     | **5% NeuCoins** on Tata brands, 1.5% RuPay UPI spends, **1.99% low forex markup**, 8+4 lounges/yr          |
| **SBI Card MILES**             | Visa / Mastercard           | ₹1,499 + GST                |               Domestic               | Travel Credits on airlines/hotels/OTAs convertible to airline partner miles                                |
| **SBI Card PULSE**             | Visa Signature              | ₹1,499 (Waived on ₹2L)      |          4 Domestic (1/qtr)          | Complimentary FITPASS PRO & Netmeds First, 5X points on chemist/pharmacy/groceries                         |
| **Paytm SBI Card SELECT**      | Visa                        | ₹1,499                      |          4 Domestic (1/qtr)          | 5% cashback on Paytm Mall, Movies & Travel, 2% other Paytm spends                                          |
| **IRCTC SBI Card Premier**     | RuPay / Visa                | ₹1,499 + GST                |        8 Railway Lounges / yr        | Enhanced railway lounge benefits, accelerated IRCTC reward points, 1% tx fee waiver                        |
| **Shaurya Select SBI Card**    | Visa                        | ₹1,499 / Concessional       |               Domestic               | Premium defence personnel card with accelerated CSD canteen and dining rewards                             |
| **BPCL SBI Card**              | Visa                        | ₹499 (Waived on ₹1L)        |                  No                  | **~4.25% valueback** (13X reward points) at BPCL petrol pumps, 5X grocery/dining                           |
| **SBI SimplyCLICK**            | Visa Contactless            | ₹499 (Waived on ₹1L)        |                  No                  | 10X reward points on partner brands (Amazon, Cleartrip, BookMyShow, Myntra, Swiggy), 5X other online       |
| **SBI SimplySAVE**             | RuPay / Visa                | ₹499 (Waived on ₹1L)        |                  No                  | 10X points (≈1.67%) on dining, movies, grocery & departmental stores (cap 5k bonus RP/mo)                  |
| **SimplySAVE UPI RuPay**       | RuPay                       | ₹499 (Waived on ₹1L)        |                  No                  | Dedicated RuPay UPI card with bonus reward points on grocery and merchant QR transactions                  |
| **Tata Neu Plus SBI Card**     | Visa                        | ₹499 (Waived on ₹1L)        |               Domestic               | 2% NeuCoins on Tata brands, 1% on other spends, domestic airport lounge access                             |
| **IRCTC SBI Platinum RuPay**   | RuPay                       | ₹500 + GST                  |           Railway Lounges            | Up to 10% value back on IRCTC AC ticket bookings, complimentary railway lounge visits                      |
| **Flipkart SBI Credit Card**   | Visa / Mastercard           | ₹500 (Waived on ₹1L)        |                  No                  | 5% cashback on Flipkart & Myntra/Cleartrip online shopping                                                 |
| **Shaurya SBI Card**           | Visa                        | ₹250 / Defence Concessional |                  No                  | Concessional APR (~33%), everyday reward points for Indian armed forces                                    |
| **SBI Card Unnati**            | Visa                        | ₹0 (first 4 yrs)            |                  No                  | Secured credit builder issued against FD of ₹25,000+, 1 RP/₹100                                            |

---

### 5. 💠 American Express (2 Cards)

| Card Name                            | Network          | Annual Fee |   Lounge Access   | Key Highlights                                                                                        |
| ------------------------------------ | ---------------- | ---------- | :---------------: | ----------------------------------------------------------------------------------------------------- |
| **American Express Platinum Travel** | American Express | ₹5,000     | 8 Domestic / year | 48,000+ bonus MR points upon reaching ₹4 Lakh annual spend milestone (Taj & travel vouchers)          |
| **Amex Membership Rewards (MRCC)**   | American Express | ₹4,500     |        No         | 1,000 bonus points on 4 transactions of ₹1,500+ every month, 1,000 bonus points on ₹20k monthly spend |

---

### 6. 🌿 Federal Bank & BOBCARD (3 Cards)

| Card Name                | Network             | Annual Fee         |        Lounge Access        | Key Highlights                                                                     |
| ------------------------ | ------------------- | ------------------ | :-------------------------: | ---------------------------------------------------------------------------------- |
| **BOBCARD Scapia Visa**  | Visa Signature      | ₹0 (Lifetime Free) |   Spend-based (₹5,000/mo)   | Zero forex markup (0% FX fee), 10% Scapia coins on travel bookings, 20% on flights |
| **Federal One Metal**    | Visa Infinite Metal | ₹0 / ₹10,000       | 8 Domestic, 4 International | Fractional reward system, high multiplier on top categories                        |
| **Federal Bank Imperio** | Mastercard          | ₹1,000             |    2 Domestic / quarter     | Lifestyle reward points, grocery & utility bill discounts                          |

---

### 7. 🟣 IndusInd Bank (21 Cards)

| Card Name                        | Network                   | Annual Fee                              |                 Lounge Access                  | Key Highlights                                                                                   |
| -------------------------------- | ------------------------- | --------------------------------------- | :--------------------------------------------: | ------------------------------------------------------------------------------------------------ |
| **IndusInd Indulge Metal**       | Visa Infinite Metal       | ₹75,000 joining / ₹10,000 renewal       |    24 Domestic (6/qtr) + 16 Intl (PP 4/qtr)    | **0% Zero Forex Markup**: Super-premium metal card, never-expiring points, golf privileges       |
| **IndusInd Pioneer Private**     | Visa                      | ₹25,000 + GST (Nil joining for Private) |   Unlimited Global + Guests (PP/DragonPass)    | **1.5% Low Forex**: Invite-only private banking card with elevated lifestyle rewards             |
| **IndusInd Pioneer Heritage**    | Visa / Mastercard         | ₹1,00,000 joining / ₹25,000 renewal     |    Domestic + International (Priority Pass)    | **1.5% Low Forex**: Luxury travel card, non-expiring reward points, golf privileges              |
| **IndusInd Crest Card**          | Visa                      | ₹75,000 joining / ₹10,000 renewal       |    Domestic + International (Priority Pass)    | **1.5% Low Forex**: Up to 2.5% effective rewards on travel & dining, luxury concierge            |
| **IndusInd Bank Celesta**        | Visa / Mastercard         | ₹25,000 joining / ₹5,000 renewal        |    Domestic + International (Priority Pass)    | **2.0% Reduced Forex**: Up to 3% rewards on travel & dining, 3 free BookMyShow tickets/mo        |
| **IndusInd Pioneer Legacy**      | Visa / Mastercard         | ₹5,000 - ₹50,000 joining / ₹0 renewal   |    Domestic + International (Priority Pass)    | **1.8% Reduced Forex**: Zero renewal fee relationship card with travel & dining perks            |
| **Indus Solitaire Credit Card**  | Visa                      | ₹30,000 joining / ₹10,000 renewal       |            Domestic + International            | **2.0% Reduced Forex**: Jewelry & lifestyle rewards on high-ticket luxury purchases              |
| **IndusInd Bank Pinnacle**       | Visa                      | ₹15,000 joining / ₹0 renewal            |    Domestic + International (Priority Pass)    | **1.8% Reduced Forex**: Up to ~2.5% on online & travel (1 RP = ₹0.75 cash value, ~1.87% net)     |
| **IndusInd Bank Legend**         | Visa / Mastercard         | ₹5,000 joining / Lifetime Free          | International (Priority Pass 8/yr, $35 waived) | **1.8% Reduced Forex**: 8 complimentary international lounge visits/yr with $35 fee waived       |
| **IndusInd Tiger Credit Card**   | Visa                      | Lifetime Free (₹0)                      |     8 Domestic (2/qtr) + 2 Intl (PP 2/yr)      | **1.5% Low Forex**: Genuine LTF card, up to 6X points on travel & dining (1.2-7.2% return)       |
| **IndusInd Avios Visa Infinite** | Visa Infinite             | ₹10,000 joining / ₹5,000 renewal        | International (Priority Pass) + 2 Domestic/qtr | **1.5% Low Forex**: Accelerated Avios on British Airways & Qatar Airways ticket bookings         |
| **EazyDiner IndusInd Signature** | Visa Signature            | ₹2,999 + GST                            |          2 Domestic / quarter (8/yr)           | **10X points** on EazyDiner Prime dining (~4-10% return), extra 25% instant discount (up to ₹1k) |
| **EazyDiner IndusInd Platinum**  | Visa / Mastercard         | Lifetime Free (₹0)                      |                       No                       | Lifetime free dining card: boosted rewards on EazyDiner bookings, dining discounts               |
| **IndusInd Bank Nexxt**          | Visa / Mastercard         | ₹10,000 joining / ₹0 renewal            |                    Domestic                    | Interactive card with physical push-buttons and LED indicators to switch Credit/EMI/Rewards      |
| **IndusInd Jio-bp Mobility+**    | RuPay                     | ₹499 joining / ₹0 renewal               |                       No                       | Boosted cashback & rewards at Jio-bp fuel pumps, EV mobility chargers & Wild Bean cafes          |
| **CRED IndusInd RuPay Card**     | RuPay                     | Lifetime Free (₹0)                      |                       No                       | Co-branded CRED app card with accelerated CRED coins and UPI QR Scan & Pay                       |
| **IndusInd Platinum Aura Edge**  | Visa / Mastercard / RuPay | Lifetime Free (₹0)                      |                       No                       | Customizable 4X reward plan configurations (Shopping, Dining, Travel, Fuel) + UPI on RuPay       |
| **IndusInd Platinum Card**       | Visa / Mastercard / RuPay | Lifetime Free (₹0)                      |                       No                       | Lifetime free everyday card: ~1-1.5% rewards, never-expiring points, UPI on RuPay                |
| **IndusInd Duo Credit Card**     | Visa                      | Lifetime Free (₹0)                      |                       No                       | 2-in-1 card featuring dual EMV chips and stripes for Credit Card and Debit Card                  |
| **IndusInd ePay Amex Card**      | American Express          | Lifetime Free (₹0)                      |                       No                       | Lifetime free Amex platform card earning accelerated points on online utility bill payments      |
| **IndusInd Samman RuPay**        | RuPay                     | ₹199 + GST (LTF for Govt)               |                       No                       | Government employee card: 1% statement cashback on retail/utilities, zero fuel surcharge, UPI    |

---

### 8. 🔴 Kotak Mahindra Bank (10 Cards)

| Card Name                      | Network             | Annual Fee               |            Lounge Access            | Key Highlights                                                                                              |
| ------------------------------ | ------------------- | ------------------------ | :---------------------------------: | ----------------------------------------------------------------------------------------------------------- |
| **Kotak White Reserve Metal**  | Visa Infinite Metal | ₹12,500 + GST            |     Unlimited Worldwide + Guest     | Ultra-premium metal card: White Pass milestone rewards up to ₹2.5 Lakh valueback, Club Marriott, 2.0% forex |
| **Kotak White Credit Card**    | Visa Signature      | ₹3,000 + GST             | 8 Domestic (2/qtr), 4 Priority Pass | White Pass valueback up to ₹27,000 annually upon hitting spend milestones, luxury brand vouchers            |
| **Kotak Zen Signature**        | Visa Signature      | ₹1,500 (Waived on ₹1.5L) | 8 Domestic (2/qtr), 3 Priority Pass | 10 Zen Points/₹150 on Dining, Departmental stores & International spends, 5 Zen Points on other retail      |
| **Kotak Mojo Platinum**        | Visa Platinum       | ₹1,000 (Waived on ₹1L)   |         8 Domestic (2/qtr)          | 2.5 Mojo Points per ₹100 on all online spends (2.5% return), 1 Mojo Point/₹100 offline                      |
| **Kotak Royale Signature**     | Visa Signature      | ₹999 (Waived on ₹1L)     |         8 Domestic (2/qtr)          | 4X Reward Points on Dining, Hotels & Restaurants, fuel surcharge waiver                                     |
| **Kotak League Platinum**      | RuPay / Visa        | ₹499 (Waived on ₹50k)    |   4 Domestic (1/qtr, spend-based)   | 8X Reward Points on Travel/Departmental, movie tickets on milestones, UPI enabled on RuPay                  |
| **Kotak IndianOil RuPay**      | RuPay               | ₹449 (Waived on ₹50k)    |                 No                  | Up to 5% valueback (24 RPs/₹150) on IndianOil fuel purchases, 2% grocery/dining, UPI supported              |
| **Kotak PVR INOX Signature**   | Visa Signature      | ₹499 + GST               |                 No                  | Complimentary 2 PVR INOX movie tickets (up to ₹400 each)/cycle on ₹10k monthly spend, 20% F&B discount      |
| **Kotak 811 #DreamDifferent**  | Visa                | Lifetime Free            |                 No                  | Secured credit builder issued against FD with 90% credit limit, 2 RPs/₹100 online                           |
| **Kotak IndiGo 6E Rewards XL** | Mastercard          | ₹1,500 + GST             |         8 Domestic (2/qtr)          | 6% 6E Rewards on IndiGo bookings, 3% on Dining/Groceries, free flight welcome voucher (up to ₹3k)           |

---

### 9. 🟣 IDFC FIRST Bank (22 Cards)

| Card Name                           | Network                 | Annual Fee                         |              Lounge Access              | Key Highlights                                                                                                 |
| ----------------------------------- | ----------------------- | ---------------------------------- | :-------------------------------------: | -------------------------------------------------------------------------------------------------------------- |
| **FIRST Private Credit Card**       | Visa Infinite Metal     | ₹50,000 joining / ₹25,000 renewal  |       Unlimited Worldwide + Guest       | Ultra-HNI: **0% forex markup**, unlimited global lounges + guests, flat 10 RP/₹150 (~6.67% on travel)          |
| **Gaj: Credit Card**                | Visa Infinite Metal     | ₹12,500 (Waived on ₹10L)           | 16 Domestic (incl 1 guest) + 16 Intl/yr | Invite-only: **0% forex markup**, 5 RP/₹150 domestic (3.3%), 50 RP/₹150 hotels (~33%), 16 railway lounges      |
| **Mayura Credit Card**              | Visa Infinite Metal     | ₹5,999 + GST                       |       16 Domestic + 16 Intl / yr        | Flagship metal: **0% forex markup**, up to 10% on travel (40X flights/hotels), monthly golf, 32 lounges/yr     |
| **Diamond Reserve Credit Card**     | Visa Infinite           | ₹3,000 (Waived on ₹6L)             |        8 Domestic + 8 Intl / yr         | **0% forex markup**, 10 RP/₹150 on spends >₹20k/mo, up to 10% on app travel, golf & lounge access              |
| **Ashva Credit Card**               | Visa Infinite Metal     | ₹2,999 (Waived on ₹4-6L)           |        16 Domestic + 8 Intl / yr        | Premium travel: **1.0% ultra-low forex markup**, 10X/3X/1X rewards with monthly boosts, 24 lounges/yr          |
| **FIRST Wealth Credit Card**        | Visa Infinite           | Lifetime Free (₹0)                 |        4 Domestic + 4 Intl / yr         | **1.5% low forex markup**, 10X RPs on dining/travel/intl, higher in-app travel multipliers (25 RP/₹100 hotels) |
| **FIRST Select Credit Card**        | Visa / Mastercard       | Lifetime Free (₹0)                 |      4 Domestic + 16 Railway / yr       | **1.99% reduced forex**, 10X on dining/travel/intl, 1 domestic airport lounge/qtr + 4 railway lounges/qtr      |
| **FIRST Millennia Credit Card**     | Visa / RuPay            | Lifetime Free (₹0)                 |                   No                    | **10X rewards from ₹1 spent** on dining/travel/intl/birthdays, 3X other retail, 24-month validity              |
| **FIRST Classic Credit Card**       | Visa                    | Lifetime Free (₹0)                 |         16 Railway Lounges / yr         | **10X on dining/travel/intl**, 3X other, 4 complimentary railway lounge visits per quarter                     |
| **FIRST WOW! Credit Card**          | Visa (FD-backed)        | Lifetime Free (₹0)                 |                   No                    | **0% forex markup** secured against FD (≥₹20k), 4 RP/₹150 (~0.67% return), 100% approval                       |
| **FIRST WOW! Black Credit Card**    | Mastercard + RuPay (FD) | ₹750 + GST                         |           4 Domestic (1/qtr)            | **0% forex markup** + RuPay UPI companion, 4 domestic lounges/yr, accelerated in-app travel boosts             |
| **FIRST Digital RuPay**             | RuPay Virtual           | Lifetime Free (₹0)                 |                   No                    | **1.5% low forex**, 3X RPs on UPI spends via IDFC app, seamless virtual issuance                               |
| **Hello Cashback Credit Card**      | RuPay                   | ₹1,000 (Waived on ₹2L)             |                   No                    | **5% cashback** on online spends above ₹10k/cycle (3% base), up to 6% app travel, 1% other                     |
| **FIRST Power+ Credit Card (HPCL)** | Visa                    | ₹499 (Waived on ₹1.5L)             |           4 Domestic (1/qtr)            | **Up to 6.5% savings** on HPCL fuel, groceries & utilities (30X points), 1 domestic lounge/qtr                 |
| **FIRST Power Credit Card (HPCL)**  | RuPay / Visa            | ₹199 (Waived on ₹50k)              |                   No                    | **Up to 3.5% valueback** (21X points) on HPCL fuel via HP Pay + 15X groceries/utilities, UPI enabled           |
| **FIRST SWYP Credit Card**          | Mastercard              | ₹499 (Waived on ₹1.5L)             |         16 Railway Lounges / yr         | Youth lifestyle: 4 RP/₹150 online, 2 RP offline, instant EMI switch, 4 railway lounges/qtr                     |
| **FIRST EARN RuPay**                | RuPay                   | ₹499 (Waived on ₹1L)               |                   No                    | 4 RP/₹150 online, 2 RP offline, instant UPI QR code merchant payments                                          |
| **Quantum+ Credit Card**            | Visa                    | ₹199 (Waived on ₹50k)              |                   No                    | 10X RP/₹150 on online shopping, 5X offline retail, 3X utility bill payments                                    |
| **Club Vistara IDFC FIRST**         | Visa                    | ₹4,999 + GST                       |        8 Domestic + 4 Intl / yr         | Accelerated CV points (~2.4% return) on flights & retail, 2.99% forex, 12 lounges/yr                           |
| **IndiGo IDFC FIRST Credit Card**   | Visa (Metal / Plastic)  | ₹4,000/₹3,000 joining, ₹2,000 ren. |             Domestic & Intl             | 6E Rewards on IndiGo bookings, 3–4X travel categories, free milestone flight tickets                           |
| **LIC Select Credit Card (IDFC)**   | Visa                    | Lifetime Free (₹0)                 |             Railway Lounges             | Accelerated reward points on LIC insurance premiums, dining and travel + railway lounges                       |
| **LIC Classic Credit Card (IDFC)**  | Visa                    | Lifetime Free (₹0)                 |                   No                    | 4X RP/₹150 on LIC insurance premium payments, 2X groceries & online retail                                     |

---

### 10. 🏦 Yes Bank (1 Card)

| Card Name                  | Network       | Annual Fee | Lounge Access | Key Highlights                                                               |
| -------------------------- | ------------- | ---------- | :-----------: | ---------------------------------------------------------------------------- |
| **Yes Bank RuPay Virtual** | RuPay Virtual | ₹0         |      No       | Instant virtual issuance for seamless UPI QR transactions with reward points |

---

## 🔒 Data Segregation & Developer Seed

In accordance with our **Privacy-First Architecture**:

- **Master Dataset (`cards.json`)**: Contains publicly verifiable terms, reward rates, fees, and lounge conditions for all 165 cards above.
- **Developer Test Portfolio (`owner_portfolio.json`)**: Stored separately in `src/app/core/data/owner_portfolio.json` for isolated local debugging, completely detached from public builds.
