## 📌 Pull Request Description

### Summary of Changes

<!-- Provide a clear, high-level overview of what this PR introduces or fixes. -->

### Related Issue(s)

<!-- Link any relevant issues: e.g., Closes #12, Fixes #34 -->

---

## 🏷️ Type of Change

- [ ] 💳 **Card Catalog Addition / Update** (updated `cards.json` with verified bank MITC data)
- [ ] 🐛 **Bug Fix** (non-breaking fix resolving an issue)
- [ ] ✨ **New Feature** (non-breaking user feature or UI enhancement)
- [ ] ♻️ **Refactoring / Performance** (clean code improvement with no behavior change)
- [ ] 📚 **Documentation** (updates to README, docs, or guides)
- [ ] 🔒 **Security / CI** (updates to workflows, dependencies, or security rules)

---

## 🧪 Verification & Testing

### Automated Quality Checks

- [ ] Ran `npm run cards:validate` — Master catalog schema validation passed (0 errors).
- [ ] Ran `npm run format:check` — Prettier code style check passed cleanly.
- [ ] Ran `npm run build` — Angular 22 production build compiled with 0 errors.
- [ ] Ran `npm run ci` — Full verification pipeline passed locally.

### Manual Verification

<!-- Describe any manual browser testing performed. Include screenshots or screen recordings if relevant. -->

---

## 🛡️ Security & Privacy Checklist

- [ ] **Zero Credentials**: Confirmed that NO credit card PAN numbers, CVVs, PINs, or user credentials are included.
- [ ] **Privacy-First**: Confirmed that no remote telemetry, analytics, or external trackers are introduced.
- [ ] **Vanilla CSS Only**: Confirmed that NO third-party CSS frameworks (TailwindCSS, Bootstrap, etc.) were installed or imported.
- [ ] **Untouched Seed**: Confirmed that `src/app/core/data/owner_portfolio.json` was NOT modified.
