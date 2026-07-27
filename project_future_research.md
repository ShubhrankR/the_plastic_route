# The Plastic Route: Future Vision & Research Document

## Origin & Core Philosophy
The idea for **The Plastic Route** was born out of a real-world problem: managing multiple credit cards and trying to remember which card yields the best benefits for a specific transaction at a specific time. 

While commercial FinTech applications (like CRED and others) offer reward tracking and bill payment, they often obscure the most critical information behind gamification, ads, or complex UX. They do not provide a direct, clear answer to the immediate question: *"I am about to pay for X. Which card should I swipe right now to maximize my rewards and interest-free period?"*

The Plastic Route is designed to solve exactly this problem—providing immediate, actionable clarity without the noise.

## ✅ Completed: Framework Migration (July 2026)
The project has been migrated from **HTML5 + Bootstrap 5 + jQuery** to **Angular 22** with:
- **Standalone components** (no NgModules)
- **Angular Signals** for reactive state management
- **TypeScript 6** with strict mode
- **Injectable services** (`CardService`, `ThemeService`) with dependency injection
- **Custom CSS design system** replacing Bootstrap (glassmorphism aesthetic preserved)
- **Externalized card data** in `cards.json` for easy community contributions

## Privacy-First Data Architecture
To build trust and ensure security, this application will operate on a strict **Zero-Backend / Privacy-First** model.
- **Client-Side Storage**: Users will input their specific credit card portfolio (card name, network, billing cycle dates, and custom rules). All of this data will be stored **exclusively** on the user's browser using `IndexedDB`.
- **No Telemetry**: The app itself (and its creators) will have absolutely zero access to the user's financial setup. There is no database, no server syncing, and no user accounts required.

## Upcoming Feature Enhancements
1. **Dynamic Portfolio Builder**: Users can visit the app and visually add/remove cards to build their personalized portfolio instead of relying on a hardcoded `cards.json`.
2. **Optional Transaction Amounts**: The "Transaction Amount" input field will become optional. Users can simply select a spend category (e.g., "Dining") to instantly see which card offers the best multiplier, regardless of the spend volume.
3. **Open Source Community**: The project will remain fully open-source, allowing the community to contribute new credit card profiles, updated reward logic, and optimizations as bank rules change.

## Next Architecture Steps
Now that Angular 22 is in place, the next priorities are:

1. **IndexedDB Integration**: Use Angular's DI to create an `IndexedDBService` for persisting user's personal card portfolio in the browser.
2. **PWA Support**: Run `ng add @angular/pwa` to add service worker, manifest, and offline caching.
3. **Dynamic Rule Engine**: Allow users to customize reward multipliers and thresholds per card.
4. **Angular Router**: Add proper routing (`/optimizer`, `/tracker`, `/portfolio`) as the app grows.

---

## Open Questions for Discussion

> [!IMPORTANT]
> Please review these questions as they will guide our next architectural decisions.

1. **Pre-loaded Card Database**: Should we maintain a "Master Database" of popular Indian credit cards that users can select from a dropdown to quickly populate their local IndexedDB, rather than typing all the details manually?
2. **Rule Engine Complexity**: Credit card rules change frequently (e.g., the 2026 gaming fee updates). Should we build a dynamic rule engine where users can tweak the logic themselves, or should the community maintain the logic via open-source PRs?
3. **Offline Support (PWA)**: Should we configure the architecture as a Progressive Web App (PWA) so users can install it on their phones and use it completely offline?
