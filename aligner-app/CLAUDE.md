# CLAUDE.md
# Aligner Companion – Engineering & Security Rules

Version 0.2 · aligned with Product Specification v0.6 (`SPECIFICATION.md`) and the infrastructure and security concept (`INFRASTRUKTUR.md`).

## 1. Project

Aligner Companion is a Dentsply Sirona healthcare software platform consisting of:

- Flutter patient application (Android first, iOS from the same code base).
- React practice dashboard.
- NestJS backend.
- PostgreSQL database.
- Regional cloud infrastructure: one separate installation per data region (EU, US). No data crosses regions.
- OIDC identity integration (provider pending, see 2.1).

The initial release follows regulatory scope **B1** (specification chapter 9).

Authoritative documents, in this order:
1. `SPECIFICATION.md` (Product Specification v0.6). Requirement IDs such as `P-WT-01`, `AC-R-03` or `UP-A-02` are the reference for all work.
2. `INFRASTRUKTUR.md` (infrastructure, security and onboarding concept) and specification chapters 5, 8 and 16. Together they are the **security architecture**. They are mandatory for all implementation work.
3. Accepted ADRs in `docs/adr/`.

If documents conflict, stop and ask. Do not resolve a conflict silently.

## 2. Technology

Mobile:
- Flutter, Dart
- Native platform security integrations (Android Keystore, iOS Keychain and Secure Enclave)
- SQLCipher for the local database; photos encrypted in the app container
- Offline-first: tracking, reminders, photo capture and guides work without a network (NF-05)

Web:
- React, TypeScript
- WCAG 2.2 AA (NF-07); responsive down to 390 px

Backend:
- NestJS, TypeScript
- REST API described with OpenAPI; versioned (UP-A-07)

Database:
- PostgreSQL
- Version-controlled migrations following expand/contract (UP-B-01)
- Append-only events for wear tracking (AC-P-02/03), audit log and consent history

Infrastructure:
- Approved cloud with BSI C5 attestation (EU) and HIPAA eligibility with BAA (US)
- Regional data storage, private object storage, short-lived signed URLs for media
- KMS/HSM with per-tenant keys (envelope encryption)
- Managed secrets and monitoring

Languages:
- 20 languages from day one (P-LG-01), including Arabic right-to-left
- No hard-coded user-facing text; all strings externalized; ICU plural rules

### 2.1 Identity
- OIDC with PKCE, MFA for every account, passkeys where supported.
- Patients and practice users are **customer identities**. They are not employee accounts in a workforce directory.
- Which identity platform is used (for example DS Core / DS customer identity or a separate customer identity service) is an **open decision** (specification chapter 15). Record it as an ADR with status "pending" until DS IT confirms.
- Practice groups may federate their own IdP (OIDC/SAML). Each organization keeps a break-glass admin account outside federation (AC-R-11).
- Do not introduce an identity provider in production that DS IT has not approved.

## 3. Security is mandatory

All implementations follow:

- Zero Trust.
- Least privilege.
- Deny by default.
- Tenant isolation (organization → location → patient).
- Resource-level authorization on every request.
- **Consent-aware processing:** check the patient’s consents (P-ON-03) before processing or sharing data; research use only with separate consent.
- Privacy by design and data minimisation.
- Defense in depth.

Every protected API request validates authentication and authorization on the server.

Never trust client-provided roles, permissions, tenant IDs or timestamps. Device time is corrected against server time (AC-P-08).

Never expose direct database access to application clients.

Session, lockout and recovery rules follow chapter 5 (for example AC-R-01 to AC-R-12). Recovery never relies on email alone.

Transport: TLS 1.3 (minimum 1.2), certificate pinning in the app, no cleartext traffic.

## 4. Data protection

Outside production, use synthetic data only.

Never:
- Use real patient data in development, test or staging.
- Commit credentials, keys or tokens.
- Expose health data in logs, crash reports, analytics or error messages.
- Include patient information, health information or the practice name in push notification text (discreet mode, P-DM-01).
- Store clinical photos in the camera roll or the device cloud backup.
- Use public object storage buckets.
- Put health data or personal data into URLs. Capability tokens in URLs (signed media URLs, calendar feed tokens) must be short-lived or revocable and must never be logged.
- Transfer health data to third-party services that are not on the approved list (section 5.1).
- Send health or patient context with outgoing links (product links, YouTube, calendars).

Deletion and export follow the deletion concept (S-12). Care-kit addresses are deleted after delivery (S-13).

## 5. Integration boundaries

The following interfaces are abstracted from the start. Use local mock implementations for development:

- IdentityProvider
- KeyManagement
- ObjectStorage
- SecretsManagement
- Monitoring
- PushNotificationProvider (FCM, APNs; content-free messages only)
- EmailProvider (content-free notices only)
- TreatmentPlanImport (SureSmile)
- LabOrdering (SureSmile ordering and lab systems, D-LB-07)
- FulfilmentProvider (care kit, P-AC-05)
- RemoteContent and FeatureFlags (guides, symptom-check content, product links, achievements, videos, emergency numbers; versioned, UP-B-07)
- AnalyticsProvider (consent-gated, no health data)
- VProDevice (BLE; protocol pending release, P-VP)

Do not invent production credentials, endpoints, cloud accounts or identity configuration.

Do not deploy infrastructure without explicit approval.

### 5.1 Approved third parties (to be confirmed by Legal and DS IT)
| Service | Purpose | Health data allowed |
|---|---|---|
| Approved cloud provider | Hosting, KMS | Yes, encrypted |
| FCM, APNs | Push notices | No |
| Email delivery (EU/US region) | Invitations, notices | No |
| Crash reporting (EU-hosted or self-hosted) | Stability | No |
| Amazon (links only) | Product links, labelled as ads | No |
| YouTube (links or privacy-enhanced player after consent) | Education videos | No |

Anything else needs an ADR and approval.

## 6. B1 regulatory boundaries

The initial release must not implement:

- Automated clinical fit assessment (D-04 fit assist is scope B2).
- AI-based photo interpretation.
- Automated treatment recommendations.
- Automated tray-change decisions.
- Patient-facing diagnostic results or automated fit verdicts (P-FO-05).

Photo quality validation is technical only (sharpness, light, framing).

All clinical decisions remain with the responsible clinician.

**Items that need Regulatory Affairs confirmation before implementation:**
- The symptom check (P-SY) shows patients one of three levels. It must be deterministic, versioned, approved by clinicians and worded as general information. Its classification under B1 is pending RA.
- Daily check-in feedback (P-DI-03) follows the same rule.
- Rule-based alerts (D-02) are a workflow aid with thresholds set by the practice. The specification lists rules “used for clinical decisions” under B2; RA must confirm how release 1 alerts are framed.
- VPro control (P-VP) may make the app an accessory of a medical device.

Symptom-check and other clinical content and its logic are versioned and approved by clinical stakeholders; each result stores the content version used.

Development follows IEC 62304 and ISO 14971 from the start (section 8.1).

## 7. Architecture

Use a modular monolith, deployed once per region.

Separate domains:

- Identity (accounts, factors, sessions, devices)
- Organization (organizations, locations, memberships, roles, delegation)
- Consent
- Patient
- Treatment (plan, trays, refinements, retainer phase, pause)
- Wear Tracking (events, merge, statistics)
- Photos
- Symptom Check
- Diary (daily check-in)
- Messaging
- Appointments
- Alerts (rules engine)
- Lab Orders
- Engagement (journey, achievements, care kit, surveys)
- Content (guides, tips, videos, product links, emergency numbers)
- Devices (VPro)
- Notifications
- Audit
- Integrations

Avoid unnecessary microservices.

Use explicit interfaces between modules. No module reads another module’s tables.

Every write from a client carries a client-generated ID; the API is idempotent (UP principles, chapter 16).

The server never rejects data only because the client is old (UP-A-07). Unsynced client data is never deleted (UP-A-03).

## 8. Development workflow

For every task:

1. Read the relevant requirements and note their IDs.
2. Read the applicable security requirements.
3. Identify dependencies and open decisions.
4. For non-trivial changes, present the proposed implementation and a short threat assessment (what could be abused, which data is touched) before writing code.
5. Implement incrementally.
6. Write unit tests.
7. Write authorization tests (allowed and denied cases, cross-tenant access).
8. Write negative security tests.
9. Where relevant, write tests for offline sync, migrations from older versions, and all 20 languages including right-to-left.
10. Run linting, type checking, dependency and secret scanning.
11. Run all relevant tests.
12. Update documentation and the traceability list.
13. Report actual results and unresolved issues.

Never claim a security control is implemented without corresponding tests or evidence.

Never skip, disable or weaken a test or a security check to make the pipeline pass.

### 8.1 Regulatory traceability
- Reference requirement IDs in commit messages and pull requests.
- Keep a traceability list: requirement → design → code → test.
- Keep a SOUP list (every third-party library with version, purpose and risk) and generate an SBOM in CI.
- Record risk-relevant changes for the ISO 14971 risk file.

## 9. Architecture decisions

Record significant technical decisions in:

docs/adr/

Every ADR contains:
- Context
- Decision
- Alternatives
- Security and privacy implications
- Regulatory implications
- Consequences
- Approval status

Mark all decisions that depend on DS IT, Legal or Regulatory Affairs as pending until confirmed.

## 10. First development objective

Establish the secure local development foundation.

Do not build the complete patient application yet.

The first milestone is a reproducible, tested development environment with:
- Repository structure (Flutter app, React dashboard, NestJS backend, shared OpenAPI contract)
- Domain boundaries (section 7)
- Database foundation with migrations, append-only wear events and audit log
- Mock OIDC provider
- Authorization framework with tenant isolation and consent checks
- Audit framework
- Log redaction with a test that fails if health data reaches logs (S-05)
- Synthetic test data generator
- Internationalization scaffolding (20 languages, right-to-left) in app and dashboard
- CI pipeline with linting, type checks, tests, dependency and secret scanning, SBOM
- Security documentation, threat model and the first ADRs (identity platform, cloud, region split: all pending)

Wait for approval before making irreversible architectural decisions.
