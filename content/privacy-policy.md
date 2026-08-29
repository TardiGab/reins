---
title: Privacy Policy
description: Privacy Policy and global data protection disclosures for Reins, World of Warcraft mount tracker.
---

# Privacy Policy

*Last updated: August 29, 2026*

Welcome to **Reins** (accessible at our web application). This Privacy Policy explains how Reins ("we", "us", or "our"), created and maintained by **Gabriel Manciu**, collects, uses, stores, and protects your information when you access or use our World of Warcraft mount tracking, comparison, and guide services, and especially when you choose to connect using your **Battle.net** account.

By accessing Reins, logging in via **Battle.net OAuth 2.0**, or using any of our features, you acknowledge that you have read, understood, and agree to the collection and use of your data as described in this Privacy Policy. If you do not agree with this policy, please do not use our service or connect your Battle.net account.

---

## 1. Data Controller & Contact Information

- **Owner / Developer**: Gabriel Manciu
- **Website**: [gabriel-manciu.be](https://gabriel-manciu.be)
- **Issue Tracker & Support**: [GitHub Issues](https://github.com/TardiGab/reins/issues)

We are committed to respecting global data privacy standards, including the **European Union General Data Protection Regulation (EU GDPR)**, the **UK GDPR**, the **California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA / CPRA)**, and other applicable global privacy regulations.

---

## 2. Blizzard Entertainment Disclaimer & Intellectual Property

**Reins is an independent, community-driven project** designed to help *World of Warcraft* players track, organize, compare, and farm in-game mounts.

- Reins is **not affiliated with, endorsed, sponsored, or specifically approved by Blizzard Entertainment, Inc.**
- *World of Warcraft*, *Battle.net*, *Blizzard Entertainment*, and all related logos, artwork, icons, and trademarks are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the United States and/or other countries.
- All game-related data, character information, mount profiles, and media are obtained via official APIs provided by Blizzard Entertainment in compliance with the *Blizzard Developer API Terms of Use*.

---

## 3. Information We Collect

We adhere to the principle of **data minimization**: we only collect information that is strictly required to provide and improve our features.

### 3.1. Data Collected via Battle.net Sign-In (OAuth 2.0)

When you authenticate through Blizzard Battle.net, we utilize the industry-standard **OAuth 2.0** protocol. We request access only to the following authorization scopes:

- `openid`: To securely identify your account session.
- `wow.profile`: To read your World of Warcraft profile, character roster, and in-game collections.

Through this connection, Reins collects and processes:

- **Your Battle.net User ID (Unique numerical identifier)**: Used to identify your account and link your saved preferences (such as pinned mounts).
- **Your Public BattleTag** (e.g., `Player#1234`): Used as your display identifier across the app.
- **Temporary OAuth Access Tokens**: Encrypted tokens used by our backend server to query official Blizzard API endpoints on your behalf.
- **Public World of Warcraft Game Data**:
  - List of World of Warcraft characters on your account across supported regions (`US`, `EU`, `KR`, `TW`, `CN`) including character name, realm, region, faction, race, class, level, and character render / avatar image.
  - In-game mount collections (obtained mounts) and related mount achievements.

> **What Reins NEVER Accesses or Collects:**
>
> - We **NEVER have access to your Battle.net password**.
> - We do **NOT collect credit cards, banking details, or any payment information**.
> - We do **NOT access your private real-life billing details, real name, or private friends list**.
>
> All login credential verification takes place exclusively on Blizzard Entertainment's secure servers (`oauth.battle.net`).

### 3.2. Data Created During Your Use of Reins

- **Pinned & Favorite Mounts**: Mounts you bookmark for farming or tracking are saved in our database to remain available across your browsing sessions.
- **Manual Character Searches**: When searching public character profiles (without logging in), we query the Blizzard API to retrieve public armory data. These queries are not linked to a personal user identity.

### 3.3. Technical, Log, and Analytics Data

- **Essential Session Cookies**: We use secure, HTTP-only first-party cookies (powered by our authentication framework, `Better Auth`) strictly necessary to maintain your logged-in session and protect against Cross-Site Request Forgery (CSRF). We do **not** use third-party advertising or cross-site tracking cookies.
- **Performance & Analytics (Vercel Analytics)**: Aggregated, privacy-friendly telemetry (pages visited, device/browser type, general country-level geographic location, loading performance, and error logs) may be collected to monitor site reliability and diagnose technical issues. This data is collected without individual user profiling or cross-site tracking.

---

## 4. How We Use Your Information (Purposes of Processing)

We process your data exclusively for the following purposes:

1. **Provide and maintain core app features**: Automatically sync your WoW characters, display your collected mounts, calculate collection completion percentages, and show tailored mount guides.
2. **Personalization**: Persist your pinned mounts, active character selection, and comparison preferences.
3. **Mount Comparison**: Allow you to compare your collection with other characters or friends.
4. **Platform Security and Integrity**: Protect the platform against malicious activity, rate-limit API calls, and maintain reliable session management.

---

## 5. Legal Bases for Processing (GDPR / Global Standards)

If you are located in the European Economic Area (EEA), the United Kingdom, or jurisdictions with similar legal requirements, our processing is based on:

- **Consent (Art. 6(1)(a) GDPR)**: Provided when you voluntarily choose to log in using Battle.net OAuth.
- **Contractual / Service Performance (Art. 6(1)(b) GDPR)**: To deliver the features and synchronization you request.
- **Legitimate Interests (Art. 6(1)(f) GDPR)**: To ensure server security, debug technical issues, and ensure API stability.

---

## 6. Data Sharing and Third-Party Disclosures

**We do NOT sell, rent, trade, or monetize your personal information or gameplay data under any circumstances.**

We only share data with essential technical service providers who support our operations:

- **Blizzard Entertainment, Inc.**: For OAuth authentication and retrieving game data via the Battle.net Community & Profile APIs.
- **Hosting & Cloud Database Providers (e.g., Vercel, Neon / PostgreSQL)**: For infrastructure hosting, secure database management, and serverless API execution.
- **Infrastructure Analytics (e.g., Vercel Analytics)**: For privacy-focused aggregated operational metrics.

All third-party service providers are contractually obligated to safeguard data and comply with applicable privacy laws.

---

## 7. International Data Transfers

Reins serves World of Warcraft players globally across Americas, Europe, Asia, and Oceania.

Because our hosting and database infrastructure may be located in the European Union or the United States, your information may be transferred to and maintained on servers located outside your home state, province, or country. When transferring data across borders, we ensure adequate protection through encryption in transit (HTTPS/TLS) and compliance with recognized cross-border transfer mechanisms (such as Standard Contractual Clauses).

---

## 8. Data Retention & Account Deletion

- **OAuth Session Tokens**: Expire automatically in accordance with Blizzard API policies and are invalidated upon logging out.
- **Pinned Mounts & Profile Preferences**: Stored in our database as long as your account remains active, or until you unpin items or request account deletion.
- **Server Diagnostic Logs**: Retained for a maximum of 12 months for debugging and security auditing, after which they are automatically purged.

---

## 9. Security of Your Information

We implement robust technical and organizational security measures:

- **Encryption in Transit**: All communications between your browser, our servers, and the Blizzard API use HTTPS with TLS encryption.
- **Zero-Password Storage**: Because authentication is handled entirely by Battle.net OAuth, no passwords ever touch our servers or databases.
- **Strict Database Access Controls**: Database access is restricted to authenticated internal backend processes with least-privilege principles.

---

## 10. Your Rights & How to Control Your Data

Depending on your country or region of residence, you have specific rights regarding your personal information:

### 10.1. Instant Battle.net Access Revocation (Global)

You can disconnect Reins from your Battle.net account at any time with immediate effect without needing our assistance:

1. Log into your Blizzard Account Management at: [account.battle.net/connections](https://account.battle.net/connections#authorized-applications).
2. Under the **Authorized Applications** section, locate **Reins**.
3. Click **Remove** / **Revoke**.

Once revoked, Reins will no longer have access to query Blizzard's API for your account.

### 10.2. Rights for European Union / EEA and UK Residents (GDPR / UK GDPR)

You have the following statutory rights:

- **Right of Access** (Art. 15 GDPR): Request a copy of your stored data.
- **Right to Rectification** (Art. 16 GDPR): Correct inaccurate data (game data refreshes automatically upon sync).
- **Right to Erasure / "Right to be Forgotten"** (Art. 17 GDPR): Request permanent deletion of your stored user records and pinned mounts.
- **Right to Restriction of Processing** (Art. 18 GDPR) & **Right to Object** (Art. 21 GDPR).
- **Right to Data Portability** (Art. 20 GDPR).
- **Right to Lodge a Complaint**: You have the right to submit a complaint to your local supervisory authority (e.g., the [Belgian Data Protection Authority / APD](https://www.autoriteprotectiondonnees.be/), the [French CNIL](https://www.cnil.fr/), or the [UK Information Commissioner's Office / ICO](https://ico.org.uk/)).

### 10.3. Rights for California and US Residents (CCPA / CPRA & US State Laws)

If you are a resident of California or another US state with applicable consumer privacy laws:

- **Right to Know and Access**: You may request details about the categories and specific pieces of personal information collected.
- **Right to Delete**: You may request the deletion of your personal information.
- **Right to Correct**: You may request corrections to inaccurate personal information.
- **No Sale or Sharing of Personal Information**: We do **not** sell your personal data or share your personal data for cross-context behavioral advertising.
- **Non-Discrimination**: We will not discriminate against you in pricing, service quality, or availability for exercising any privacy rights.

### 10.4. Exercising Your Rights

To request the deletion of your data or exercise any of your privacy rights, please:

- Open a request on our [GitHub Issues page](https://github.com/TardiGab/reins/issues), or
- Contact the developer directly via [gabriel-manciu.be](https://gabriel-manciu.be).

We will review and respond to verified requests within statutory timeframes (typically within 30 days).

---

## 11. Children's Privacy (COPPA & Global Standards)

Reins is not directed at children under the age of 13 (or under the digital age of consent in your jurisdiction, such as 16 in certain EU member states). We do not knowingly collect personal information from children under these ages.

Usage of Battle.net authentication requires an active Blizzard account, which is governed by Blizzard Entertainment's age and parental consent requirements. If you believe a child has provided us with personal data without parental consent, please contact us so we can promptly delete the information.

---

## 12. "Do Not Track" & Global Privacy Control Signals

Reins does not track users over time and across third-party websites to provide targeted advertising. We honor standard browser privacy signals, including Global Privacy Control (GPC), by ensuring no commercial tracking or advertising cookies are deployed.

---

## 13. Changes to This Privacy Policy

We may update this Privacy Policy periodically to reflect enhancements to Reins, changes in legal requirements, or updates to Blizzard's API policies.

When changes are published, the *"Last updated"* date at the top of this page will be revised. We encourage you to review this page periodically to stay informed about how we protect your information.

---

## 14. Contact Us

If you have questions, concerns, or feedback regarding this Privacy Policy or our privacy practices, please contact us:

- **Developer Website**: [gabriel-manciu.be](https://gabriel-manciu.be)
- **Repository Issues**: [github.com/TardiGab/reins/issues](https://github.com/TardiGab/reins/issues)
