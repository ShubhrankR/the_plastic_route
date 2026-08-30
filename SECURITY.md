# 🛡️ Security Policy

## 🔒 Commitment to Security & Privacy

**The Plastic Route** is engineered from the ground up as a **privacy-first, zero-backend** application. We prioritize the safety, privacy, and integrity of our users and open-source codebase.

---

## 📦 Supported Versions

Only the latest release deployed on the `main` branch is actively supported with security updates and patches.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `main` (Latest)  | :white_check_mark: |
| `< 1.0.0`        | :white_check_mark: |
| Older releases   | :x:                |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, flaw, or data handling issue within this repository, please disclose it responsibly.

### How to Report:

1. **GitHub Security Advisory (Preferred)**:
   - Navigate to the **Security** tab of the repository.
   - Click **Report a vulnerability** to open a private disclosure draft.
2. **Email Disclosure**:
   - Alternatively, email the project maintainer directly at `shubhrank.rastogi@gmail.com` with the subject prefix `[SECURITY] The Plastic Route`.

### What to Include in Your Report:

- Description of the vulnerability or security risk.
- Steps to reproduce or proof-of-concept (PoC).
- Potential impact and affected components.
- Proposed fix or remediation, if available.

> [!NOTE]
> Please **do NOT** file public GitHub issues for sensitive security vulnerabilities. We will review all reports promptly, coordinate a patch, and publish an advisory once remediated.

---

## 🏛️ Security & Privacy Architectural Model

### 1. Zero Backend & Zero Credentials

- **No Remote Servers**: The Plastic Route runs 100% client-side in the browser. There are no backend database servers or API endpoints receiving user telemetry or card data.
- **Prohibited Financial Data**: The application **NEVER** requests, stores, or processes 16-digit Card Numbers (PAN), CVVs/CVCs, Expiration Dates, PINs, NetBanking credentials, or OTPs.

### 2. Client-Side Data Storage & Origin Sandboxing

- User custom portfolios and statement dates are stored locally using browser `IndexedDB` (`ThePlasticRouteDB`).
- Browser same-origin policy ensures that this data is isolated exclusively to the host origin.

### 3. Content Security Policy (CSP)

The application includes a strict Content Security Policy (`<meta http-equiv="Content-Security-Policy">`) to defend against Cross-Site Scripting (XSS) and unauthorized subresource loading.

### 4. Dependency Security & Automated Gates

- Automated **Dependabot** checks continuously scan all npm dependencies and GitHub Actions workflows for known vulnerabilities.
- Every pull request must pass automated schema validation (`npm run cards:validate`) and high-severity vulnerability audits (`npm audit --audit-level=high`) in CI before merging.
