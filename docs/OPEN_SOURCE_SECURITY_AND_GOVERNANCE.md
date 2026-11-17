# 🛡️ Open Source Security, Data Integrity & Governance Architecture

This document establishes the comprehensive threat model, security posture, and governance guardrails required to open **The Plastic Route** to public community contributions while guaranteeing that original code, master catalog data, and user privacy remain incorruptible.

---

## 📌 Executive Summary

As **The Plastic Route** expands its open-source footprint, external contributors will be invited to submit credit card updates, new card additions, bug fixes, and feature improvements.

While open collaboration accelerates catalog growth, it introduces distinct security and governance risks:

- Malicious pull requests attempting to inject spyware, clipboard stealers, or cryptominers.
- Accidental or intentional deletion/truncation of master catalog data (`cards.json`) or core services.
- Data poisoning (phishing links, affiliate redirects, or inaccurate reward terms).
- Supply chain tampering via malicious npm dependencies or `postinstall` lifecycle scripts.
- Bypass of repository merge controls.

This architecture document details the verified baseline defenses currently protecting the application and specifies strict defense-in-depth policies to prevent data loss, unauthorized code merging, and security regressions.

---

## 🏛️ Current Security Baseline & Verified Defenses

An exhaustive security audit of the repository reveals strong architectural security foundations:

| Layer                              | Implementation                                                                                                                                           | Security Benefit                                                                                                                                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content Security Policy (CSP)**  | `<meta http-equiv="Content-Security-Policy">` in `src/index.html` with `connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';` | **Total Network Lockdown**: Prohibits any unauthorized outbound network requests (e.g. `fetch`, `XMLHttpRequest`, beacon APIs) even if arbitrary JavaScript were injected. |
| **XSS & DOM Injection**            | Angular 22 Context-Aware Interpolation (`{{ }}`); zero use of `innerHTML` or `DomSanitizer` across the entire codebase                                   | Eliminates DOM-based Cross-Site Scripting (XSS). All dynamic content is automatically escaped.                                                                             |
| **Data Schema & Anti-Scripting**   | `scripts/validate-cards.mjs` enforces regex check `/[<>]                                                                                                 | (?:javascript                                                                                                                                                              | vbscript | data):/i` on all card text fields | Blocks payload injection within JSON data attributes. |
| **Supply Chain & Vulnerabilities** | Automated `npm audit --audit-level=high` in CI and Dependabot monitoring                                                                                 | 0 known vulnerabilities across all production and development dependencies.                                                                                                |
| **Static Code Analysis**           | GitHub Actions CodeQL Security Analysis (`codeql.yml`) run on every push and PR                                                                          | Automated detection of security flaws, path traversal, injection, and weak cryptography.                                                                                   |
| **Access Control (CODEOWNERS)**    | `.github/CODEOWNERS` assigns root `*`, `/.github/`, `/src/app/core/`, and `/scripts/` to `@ShubhrankR`                                                   | Enforces owner oversight for all code areas.                                                                                                                               |
| **Zero Backend Storage**           | 100% client-side execution using browser `IndexedDB`                                                                                                     | Eliminates server-side database compromise, credential breaches, and data exfiltration targets.                                                                            |

---

## 🚨 Threat Modeling for Public Collaboration

### 1. Threat: Unauthorized Direct Merging / Governance Bypass

- **Vector**: A collaborator, bot, or compromised account pushes commits directly to `main` or merges a pull request without maintainer sign-off.
- **Impact**: Bypasses all review mechanisms, allowing unvetted or malicious code into the production build.
- **Analysis**:
  - `require_code_owner_reviews: true` is active (assigned to `@ShubhrankR`).
  - **Mitigation Implemented**: Branch protection on `main` strictly requires `Code Quality, Schema & Security Verification` and `CodeQL Analysis (javascript-typescript)`, requires branches to be up to date before merging (`strict: true`), and requires linear history. Outside contributors have zero merge permissions in the repository.

### 2. Threat: Accidental or Malicious Deletion of Core Files / Catalog Truncation

- **Vector**: A pull request removes core files (e.g., `cards.json`, `owner_portfolio.json`, `card.service.ts`) or shrinks `cards.json` from 182 cards down to a handful.
- **Impact**: Destroys the application's intelligence dataset or causes production build crashes.
- **Analysis**:
  - **Mitigation Implemented**: `scripts/validate-cards.mjs` enforces a strict minimum catalog threshold (`MINIMUM_CARD_COUNT = 180`), verifies that all `CRITICAL_FILES` exist on disk, and enforces an approved banking domain whitelist on any embedded URLs. Runs automatically in CI on every push and PR.

### 3. Threat: Supply Chain Poisoning (Malicious npm Packages)

- **Vector**: A PR introduces a dependency that appears legitimate but contains malicious `postinstall` scripts or runtime backdoors.
- **Impact**: Execution of arbitrary code during CI/local compilation, compromised build artifacts.
- **Analysis**:
  - Most card additions and UI improvements require **zero new runtime packages**. Any package addition represents an unnecessary risk profile for an offline client utility.

### 4. Threat: Data Poisoning & Phishing Links in `cards.json`

- **Vector**: An open-source contributor updates card terms to include fraudulent phishing links, affiliate spam, or deceptive reward rates.
- **Impact**: End-user financial harm and loss of reputation.
- **Analysis**:
  - `validate-cards.mjs` prevents HTML tags and `javascript:` URIs, but does not currently enforce an HTTPS domain whitelist for external URLs if documentation links are added.

### 5. Threat: GitHub Actions Workflow Compromise

- **Vector**: A malicious PR modifies `.github/workflows/` to abuse runner privileges, steal repository tokens, or alter deployment scripts.
- **Impact**: Compromised GitHub Pages deployment or exfiltrated repository tokens.
- **Analysis**:
  - `ci.yml` correctly uses `on: pull_request` with read-only token permissions (`permissions: contents: read`). Forked PRs do not have access to deployment secrets.
  - `.github/` is locked under `CODEOWNERS`.

---

## 🛡️ Governance & Defense-in-Depth Implementation Plan

To ensure the repository is completely resilient against corruption, the following 6 guardrails are established:

### Rule 1: Strict Branch Protection & Status Check Policy

Branch protection on `main` is actively configured and enforced with the following invariant rules:

1. **Required status checks to pass before merging**:
   - `Code Quality, Schema & Security Verification` (`ci.yml`) — encompasses Prettier formatting, catalog schema validation, zero-telemetry scan, 55 automated Vitest unit tests, Angular production build, and `npm audit`.
   - `CodeQL Analysis (javascript-typescript)` (`codeql.yml`) — automated static security and injection analysis.
   - **"Require branches to be up to date before merging"**: Enabled (`strict: true`).
2. **Require review from Code Owners**: Enabled (1 approval minimum from `@ShubhrankR` via `.github/CODEOWNERS`).
3. **Dismiss stale pull request approvals when new commits are pushed**: Enabled (`dismiss_stale_reviews: true`).
4. **Require linear history**: Enabled (enforces clean, rebased or squashed commits; prevents merge commits).
5. **Block force pushes and branch deletions**: Enabled (`allow_force_pushes: false`, `allow_deletions: false`).
6. **Owner-Exclusive Merge & Bypass Controls**:
   - External community contributors who fork the repository have **zero write access**; the GitHub interface disables and hides merge buttons entirely for fork PRs.
   - Repository collaborators are verified and restricted solely to `@ShubhrankR` (sole admin/owner).
   - Under GitHub branch protection, `enforce_admins: false` explicitly guarantees that **only the repository owner/administrator (`@ShubhrankR`)** holds the technical authority to bypass branch protections when merging self-authored pull requests, while any non-admin contributor or future collaborator is strictly blocked until all checks and reviews pass.
   - Recommended merge strategy is **Squash and merge**, producing clean, single atomic commits per PR on `main`.

---

### Rule 2: Catalog Volume & Core Files Integrity Guard

Enhance `scripts/validate-cards.mjs` with hardcoded safety assertions:

```javascript
// 1. Guard against database truncation
const MINIMUM_CARD_COUNT = 180;
if (catalog.length < MINIMUM_CARD_COUNT) {
  errors.push(
    `SECURITY ALERT: Master catalog size (${catalog.length}) is below safety threshold (${MINIMUM_CARD_COUNT}). Card deletion is prohibited without explicit maintainer override.`,
  );
}

// 2. Guard against critical file deletion
const CRITICAL_FILES = [
  'src/app/core/data/cards.json',
  'src/app/core/data/owner_portfolio.json',
  'src/app/core/services/card.service.ts',
  'src/app/core/services/indexed-db.service.ts',
  'scripts/validate-cards.mjs',
  'scripts/sync-cards.mjs',
  '.github/CODEOWNERS',
  '.github/workflows/ci.yml',
];

for (const relPath of CRITICAL_FILES) {
  if (!fs.existsSync(path.resolve(ROOT_DIR, relPath))) {
    errors.push(
      `CRITICAL SECURITY FAILURE: Essential repository file "${relPath}" has been deleted.`,
    );
  }
}
```

---

### Rule 3: Automated Zero-Telemetry CI Linter

To guarantee the Zero-Backend privacy model, integrate a static analysis check into `.github/workflows/ci.yml` that fails the build if any outbound network APIs or analytics scripts are introduced:

```bash
# Verify Zero-Backend guarantee (fails build if unauthorized network calls are detected in application code)
! git grep -nE "fetch\(|XMLHttpRequest|navigator\.sendBeacon" src/app/
```

Coupled with the Content Security Policy (`connect-src 'self'`), this provides double-layer protection against telemetry introduction.

---

### Rule 4: Dependency Addition Lock

Community contributions to the credit card catalog must **never** modify `package.json` or `package-lock.json`.

- Any pull request altering `package.json` or lockfiles will automatically be flagged for heightened maintainer review.
- `npm ci` is strictly used in CI to guarantee that lockfiles cannot be tampered with during automated builds.

---

### Rule 5: Strict External Domain Whitelist

If external banking circulars or MITC links are accepted in `cards.json`:

- Only official bank top-level domains (e.g., `*.hdfcbank.com`, `*.icicibank.com`, `*.sbi.co.in`, `*.axisbank.com`, `*.rbi.org.in`) and secure HTTPS protocols are permitted.
- URL shorteners (e.g. `bit.ly`, `tinyurl.com`), IP addresses, or unverified third-party domains will trigger immediate schema validation failure.

---

### Rule 6: Code Owner Sign-Off Protocol

Every pull request must receive explicit approval from `@ShubhrankR` before GitHub allows merging. Even if multiple community contributors approve a PR, merge buttons remain locked until the designated code owner verifies:

- Verified MITC documentation source.
- Automated CI pipeline is 100% green.
- No changes to core algorithmic weights without consensus.

---

## 📊 Risk & Mitigation Summary Matrix

| Risk Vector                            | Unprotected Severity | Implemented / Planned Mitigation                                         | Residual Risk |
| -------------------------------------- | :------------------: | ------------------------------------------------------------------------ | :-----------: |
| **Unauthorized Direct Merge**          |       🔴 High        | `CODEOWNERS` + `enforce_admins` + Required status checks                 | 🟢 Negligible |
| **Catalog File Deletion / Truncation** |       🔴 High        | Minimum catalog threshold check (≥180 cards) + file existence assertions | 🟢 Negligible |
| **Supply Chain Poisoning**             |       🔴 High        | `npm audit` + Dependabot + Zero-dependency catalog update policy         |    🟢 Low     |
| **XSS / HTML Injection in Data**       |      🟡 Medium       | Anti-script regex validation + Angular default escaping + Strict CSP     | 🟢 Negligible |
| **Telemetry / Data Leakage**           |       🔴 High        | Strict CSP (`connect-src 'self'`) + CI Zero-Telemetry grep check         | 🟢 Negligible |
| **CI Runner Exploitation**             |      🟡 Medium       | Read-only PR tokens + Scheduled sync isolation + Scoped permissions      | 🟢 Negligible |

---

## 📚 References & Policies

- [`SECURITY.md`](../SECURITY.md): Vulnerability reporting policy and architectural privacy guarantees.
- [`docs/CARD_CATALOG_DATASET.md`](CARD_CATALOG_DATASET.md): Schema specifications and normalization rules.
- [`docs/SECURITY_PRIVACY_AND_NAVIGATION.md`](SECURITY_PRIVACY_AND_NAVIGATION.md): Early multi-user data segregation architecture.
