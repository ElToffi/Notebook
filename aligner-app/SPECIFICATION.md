# Aligner Companion – Product Specification

**Version:** 0.3 (draft) · **Date:** Nov 13, 2026
**Platforms:** patient app for Android (first) and iOS from one code base; practice dashboard as a web app
**Design:** Dentsply Sirona corporate design
**Inputs:** spec v0.1/v0.2 and the draft “Aligner Compliance Monitoring App – Option B” (v0.1)
**Related:** `INFRASTRUKTUR.md` (infrastructure, security, onboarding; German), `klickdummy/` (clickable prototype)

### Changes from v0.2
- Document translated to English.
- **New chapter 5: accounts, devices and access.** Covers patients with several devices, clinicians with several devices, several clinicians per clinic, multi-site organizations, locums, shared workstations, lost devices, lost passwords and second factors, staff leaving, practice transfer or closure, minors turning 18 and SSO outages.
- Data model extended: organization, location, membership, device, session, delegation.
- New acceptance criteria and open decisions for chapter 5.

### Changes from v0.1 (kept for reference)
- Focus shifted to resolving patient uncertainty (Reddit analysis, chapter 1.2).
- Added: symptom check, lost/broken aligner flow, guides, weekly summary, parent view.
- Fit check with 3 views as the default; no automated verdict shown to patients.
- Practice dashboard, alert rules, audit trail and SureSmile plan import added.
- Break reminder default changed to 45 min, with a limit set by the practice.
- Regulatory scope variants B1/B2/B3 added; recommendation: launch as B1.

---

## 1. Purpose and scope

### 1.1 Product goal
The app improves **adherence in aligner treatment**. It tracks wear time, lets the practice check tray fit by photo, answers “Is this normal?” and alerts the practice early. It consists of a patient app and a practice dashboard. For SureSmile® patients it also connects the VPro™ device.

**In scope:**
- **Option A:** wear logging, reminders, guides.
- **Option B:** fit photos, symptom check, practice dashboard with alerts.
- VPro connection.

**Out of scope (Option C):**
- new sensor hardware, apart from the existing VPro and an optional smart case (C)
- automated tray-change decisions
- automated fit verdicts shown to patients
- treatment planning, billing, booking directly in the practice management system

**Principle:** the clinician stays responsible for every clinical decision. The app informs; it never instructs a treatment change on its own.

### 1.2 Why this scope
In 32,587 r/Invisalign posts (Oct 2024 – Oct 2026), patients mostly struggle with **uncertainty**, not with forgetting to wear aligners. The counts come from a rough keyword match that has not been checked by hand, so treat them as order of magnitude only.

| Topic | Posts | Share | Comments/post | Answer in the app |
|---|---|---|---|---|
| “Is this normal?” / uncertainty | ~3,800 | 11.6 % | 7.5 | Symptom check (P-SY) |
| Fit / tracking (gaps, chewies) | ~2,400 | 7.5 % | 7.2 | Fit photo, practice review (P-FO, D-03) |
| Tray change timing | ~1,500 | 4.7 % | 8.4 | Change plan, extension by practice (P-AL) |
| Wear time (22 h) | ~1,200 | 3.6 % | 11.2 | Tracking, reminders (P-WT) |
| Travel / social situations | ~1,000 | 3.1 % | 9.9 | Guides, travel checklist (P-GU) |
| Lost / broken trays | ~900 | 2.8 % | 6.2 | Report with standing instruction (P-LB) |
| Eating and drinking | ~900 | 2.8 % | 16.4 | Guides (P-GU) |
| Apps / trackers | ~430 | 1.3 % | 7.3 | – |

**Product consequence:** fit checking and “is this normal?” triage matter more than a timer. The link to the practice turns patient data into a signal the clinician can act on.

### 1.3 Roles
| Role | Channel | Main need |
|---|---|---|
| Patient (adult) | Patient app | Know if treatment is on track; low effort, no guilt |
| Patient (teen) + parent | Patient app, parent view | Balance teen privacy against parent oversight; motivation |
| Orthodontist / dentist | Practice dashboard | See who needs attention without reviewing every photo |
| Practice staff | Practice dashboard | Triage alerts, answer messages, book appointments |
| Practice admin | Admin area | Users, permissions, alert thresholds, data export |
| Organization admin (group / DSO) | Admin area | Locations, central policies, SSO |
| Dentsply Sirona operations | Operations console | Technical support **without** access to health data |

---

## 2. Market scan: what others advertise

| App | Advertised features | Lesson for us |
|---|---|---|
| **SureSmile VPro** (Dentsply Sirona) | Pair VPro, track device use and wear time, reminders, battery status, find device | Will be integrated. Rated only 2.7/5 (US App Store); users complain about bugs and support. |
| **My Invisalign** (Align) | Wear timer with statistics, reminders, smile gallery with time-lapse, treatment plan only by doctor invitation | Gallery motivates; practice invitation is the usual onboarding. |
| **TrayMinder** | Timer, sharing by email/SMS, reminder after meals, photo at every change, time zones | “Put them back in” reminder is popular; we do not copy sharing by unencrypted email. |
| **AlignerPro** | Break tracking, time-lapse, PDF report | A PDF for the appointment is useful. |
| **TrioClear** | Practice sees photos and wear statistics | A practice-side counterpart is standard. |
| **DentalMonitoring** | Prescribed remote monitoring with scan attachment and AI | Matches our scope B2/B3; regulated medical device. |

**Where we stand out:** we resolve uncertainty (symptom check, fit check); everything is in one app (aligners, VPro, practice); the treatment plan comes straight from SureSmile; messages use a secure channel instead of email; the tone is supportive, never shaming.

---

## 3. Functional requirements: patient app

Priority: **M** = must (release 1), **S** = should, **C** = could. “Ref.” points to the ID in the Option B draft.

### 3.1 Onboarding and account (P-ON)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-ON-01 | Sign-up with the practice’s invite code or QR code. The treatment plan is synced from the practice: total trays, change interval, start date, **attachment and IPR dates**. | M | P-01 |
| P-ON-02 | Sign-in with email and password plus a second factor (TOTP or passkey). After that, unlock with biometrics or PIN. Details in chapter 5. | M | |
| P-ON-03 | Separate, revocable consents (GDPR Art. 9), each logged with version and timestamp. **Secondary use** (anonymized research) is asked separately and is optional. | M | N-05, N-09 |
| P-ON-04 | Consent by age and market; parents involved for minors. | M | N-07 |
| P-ON-05 | Delete the account in the app; notice about the practice’s retention duties. | M | |

### 3.2 Wear time (P-WT)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-WT-01 | “Out” and “in” with one tap, **at most 2 taps** including from widget or lock screen. Daily total against the target (default 22 h, set by the practice). | M | P-02, N-02 |
| P-WT-02 | Reminder when aligners have been out longer than set. **Default 45 min**; patients can adjust within the practice’s limits. A second reminder follows after another 30 min. | M | P-03 |
| P-WT-03 | Edit breaks afterwards. Edits are logged and flagged in the dashboard. | M | |
| P-WT-04 | Statistics for day, week, month; streak of days on target. | M | |
| P-WT-05 | **Weekly summary** in neutral, encouraging language, **no shaming**. Example: “6 of 7 days on target” rather than “you missed 1 day”. | S | P-13 |
| P-WT-06 | Correct handling of time zones and daylight saving time; stored in UTC. | M | |
| P-WT-07 | Widget (Android); widget and Live Activity (iOS). | S | |
| P-WT-08 | Optional wear logging via smart case (Bluetooth open/close) instead of taps. | C | P-15 |
| P-WT-09 | Offline logging with later sync. | M | P-16 |

### 3.3 Tray change and progress (P-AL)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-AL-01 | Tray-change reminder per plan; patient confirms the change. | M | P-04 |
| P-AL-02 | If the aligner does not fit yet: “ask the practice” instead of extending on their own. The practice can extend the current tray (D-05); the result appears in the app. | M | D-05 |
| P-AL-03 | Progress: tray x of y, photo timeline, weeks remaining. **Refinements are explained as a normal part of treatment.** | S | P-11 |
| P-AL-04 | Attachment and IPR dates in the timeline, with explanations. | S | P-01 |
| P-AL-05 | Retainer phase as a separate mode (e.g. nights only). | S | |
| P-AL-06 | PDF report for the appointment. | S | |

### 3.4 Fit photos (P-FO)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-FO-01 | **Guided fit photo in 3 views** (front, left, right) **with aligners in**, on-screen overlay and instructions. | M | P-05 |
| P-FO-02 | Sharpness, lighting and framing are checked on the device before upload. A session takes **at most 2 min** including retakes. | M | P-05, N-02 |
| P-FO-03 | Cadence set by the practice (default: every tray change); reminder in the app. | M | P-06 |
| P-FO-04 | Extended set with 6 views (adds upper and lower occlusal and smile), **only when the practice requests it**. | S | D-05 |
| P-FO-05 | **In release 1 patients only see “received” or “your practice will contact you”.** No automated fit verdict (see chapter 9). | M | P-07 |
| P-FO-06 | Photos stored only encrypted inside the app, **not in the camera roll**, not in cloud backup; EXIF and GPS data removed. | M | N-08 |
| P-FO-07 | Gallery with before/after and time-lapse. | S | P-11 |
| P-FO-08 | Screenshot protection in the gallery. | M | |

### 3.5 Symptom check “Is this normal?” (P-SY)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-SY-01 | Structured questions on **pain/pressure, soft tissue (cheek, tongue), speech, attachments, breakage, gums, fit/gap**. | M | P-08 |
| P-SY-02 | Result in three levels: **normal / watch / contact practice**, each with a plain explanation and self-care tips. | M | P-08 |
| P-SY-03 | Content and decision rules **approved by clinicians** and versioned. The practice can add its own notes. | M | P-08 |
| P-SY-04 | On “contact practice”, one tap sends all answers to the practice. The result also raises an alert in the dashboard (D-02). | M | D-02 |
| P-SY-05 | Warning signs (e.g. swelling, fever, injury) show the emergency number immediately. | M | |

> Regulatory note: the symptom check **drives the classification** (chapter 9). For B1 it is designed as general information, with fixed content approved by clinicians and no individual diagnosis.

### 3.6 Lost or broken aligner (P-LB)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-LB-01 | Report “lost” or “broken”; with a photo if broken. | M | P-09 |
| P-LB-02 | The app shows the **practice’s standing instruction**, e.g. “wear the previous tray” or “move to the next tray if the current one has been worn for at least X days”. | M | P-09 |
| P-LB-03 | The practice is notified (alert D-02) and can order a replacement from the dashboard (D-09). | M | P-09 |

### 3.7 Practice contact and messages (P-CO)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-CO-01 | Practice profile: clinician, address, phone, opening hours, emergency number; call directly. | M | |
| P-CO-02 | **Secure messaging** with the practice, including photos; read receipts; push on reply. | M | P-10 |
| P-CO-03 | “Email the practice”: the message goes through the secure channel. The practice gets **only a notice without content** by email, with a link to the dashboard (rationale in 3.7.1). | M | |
| P-CO-04 | Templates for common topics; each asks for the needed details in a structured way. | M | |
| P-CO-05 | “Not for emergencies” notice with emergency number. Outside opening hours the app says when a reply can be expected. | M | |
| P-CO-06 | Appointment request; the practice confirms in the dashboard (D-05). | S | D-05 |

#### 3.7.1 Why no regular email with photos
Photos and health details are health data under GDPR Art. 9 and PHI under HIPAA in the US. Regular email is not reliably end-to-end encrypted. The default path is therefore the secure channel. Export through the OS share sheet is possible only after a warning and is recorded in the audit log.

### 3.8 Guides (P-GU)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-GU-01 | Tips on eating, drinking (coffee, tea, red wine, sugar), cleaning, staining. | S | P-12 |
| P-GU-02 | Travel checklist (spare aligners, case, toothbrush, time zones) and tips for social situations. | S | P-12 |
| P-GU-03 | Explanations of attachments, IPR, chewies and refinements. | S | P-11 |
| P-GU-04 | Content maintained centrally, approved by clinicians, changeable without an app update. | S | |

### 3.9 Parent view (P-PA)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-PA-01 | A parent view can be invited for minors. **Patient, parent and practice agree on what it shows**, e.g. only wear-time status and appointments, no messages. | S | P-14 |
| P-PA-02 | The teen can always see what is shared. | S | P-14 |
| P-PA-03 | One parent account can follow several children. Further rules in 5.4. | S | |

### 3.10 SureSmile® VPro™ (P-VP)
> **Dependency:** the BLE protocol or SDK must be released internally. Without it, only manual logging is possible (P-VP-06).

| ID | Requirement | Prio |
|---|---|---|
| P-VP-01 | Pair the device (BLE Secure Connections), unpair, tell several devices apart. | M* |
| P-VP-02 | Start and stop a session; show the time left of the 5 minutes. | M* |
| P-VP-03 | Read and sync usage data, including sessions done without the phone nearby. | M* |
| P-VP-04 | Battery level; find device. | M* / S |
| P-VP-05 | Daily reminder; usage shows in statistics and dashboard. | M* |
| P-VP-06 | Fallback: mark a session as done manually. | M |
| P-VP-07 | Signed firmware update. | C |
| P-VP-08 | A VPro is paired to one patient account. Re-pairing to another patient (e.g. after a device mix-up) needs confirmation and is logged. | M* |

\* Must once the protocol is released.

### 3.11 App navigation
Bottom navigation with five areas:
1. **Today:** “on track” status, wear-time ring, out/in switch, tray x of y, VPro, due tasks, weekly summary.
2. **Photos:** fit check, gallery, sent sets.
3. **Help:** “Is this normal?”, lost or broken aligner, guides.
4. **Practice:** messages, contact, appointments.
5. **Profile:** treatment, reminders, parent view, devices, privacy.

History (statistics) is reached from Today.

### 3.12 Notifications
Local reminders work offline. Push messages **never contain health data**. Quiet hours can be set. Behavior with several devices is defined in 5.2.

---

## 4. Functional requirements: practice dashboard (web)

| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| D-01 | Patient list **sorted by need for attention**, with status **on track / watch / action needed**. | M | D-01 |
| D-02 | Rule-based alerts; each practice sets its own thresholds (defaults in 4.2). | M | D-02 |
| D-03 | Photo review: current photo **next to the previous one** and, where available, next to the **planned tooth position** from the treatment plan. Clinicians mark fit as **OK / gap / not tracking**. | M | D-03 |
| D-04 | Fit assist: the software highlights possible gaps at the incisal edges; clinicians confirm or reject **every marker**. Belongs to scope **B2**, not release 1. | S | D-04 |
| D-05 | Actions from an alert: send message, request new photos (3 or 6 views), extend the current tray, book an appointment, order a replacement tray. | M | D-05 |
| D-06 | Patient detail: wear-time trend, VPro use, tray history, photos, symptom checks, messages, notes. | M | D-06 |
| D-07 | **Audit trail** of all clinical actions and alert handling: who, what, when, from which device. | M | D-07 |
| D-08 | Treatment plan import from **SureSmile software**; manual entry for other systems. | M | D-08 |
| D-09 | Order replacement or refinement trays directly (SureSmile ordering integration). | S | D-09 |
| D-10 | Practice statistics: share of patients on track, average wear time, alerts per week, response time. | S | D-10 |
| D-11 | Configurable roles and permissions (clinician, staff, practice admin, organization admin); two-factor sign-in; tenant separation. Details in chapter 5. | M | D-11 |
| D-12 | Export of the patient record as PDF; later as FHIR. | S | D-12 |
| D-13 | Invite patients (code or QR); set targets and limits: wear time, break reminder, photo cadence, standing instruction for lost trays. | M | |
| D-14 | Shared inbox with assignment, “in progress by …” marker and reply templates. Details in 5.3. | M | |
| D-15 | Notifications to the practice by email or web push, **without content**. | M | |

### 4.1 Alert flow (release 1)
1. Patient data arrives: wear log, photo, symptom check or report.
2. The rules engine sets the patient status and creates an alert if a threshold is crossed.
3. Staff triage the alert; clinical alerts go to the responsible clinician (5.3).
4. The clinician decides and acts (message, photos, extension, appointment).
5. The patient receives the instruction in the app; the action is logged.

### 4.2 Default alert rules (adjustable per practice)
| Rule | Default | Status |
|---|---|---|
| Wear time below target | < 20 h on 3 days in a row | watch |
| Wear time well below target | < 18 h on 3 of 7 days | action needed |
| Tray change not confirmed | 2 days after planned date | watch |
| Fit photo missing | 3 days after due date | watch |
| Symptom check “contact practice” | immediately | action needed |
| Aligner lost or broken | immediately | action needed |
| Fit marked “not tracking” | immediately | action needed |
| VPro not used | 5 days in a row | watch |
| Alert unanswered | 1 working day | escalate (5.3) |

---

## 5. Accounts, devices and access

This chapter covers situations beyond the simple “one patient, one phone, one clinician” case. Requirements carry the prefix **AC**.

### 5.1 Principles
- **Accounts belong to people, not to devices.** Every person has their own identity, and every device has its own session.
- **The server is the source of truth.** Devices hold an encrypted working copy and sync to the server.
- **Every session and device is visible and can be revoked** by the person themselves and, for practice accounts, by the practice admin.
- **Recovery never depends on email alone.** Losing a factor needs a second, independent proof.
- **Nobody is locked out of urgent care.** Patients can always call the practice; alerts are never lost because one person is unavailable.

### 5.2 Patients with several devices
| ID | Scenario | Requirement | Prio |
|---|---|---|---|
| AC-P-01 | Patient uses a phone and a tablet, or an Android phone and an iPhone | One account can be signed in on **up to 3 devices** at the same time. Every device needs its own sign-in with second factor. | M |
| AC-P-02 | Taps “out” on one device and “in” on the other | Wear events are stored as single events with device ID and time. The server merges them in time order. The app shows the shared state within 5 s when online. | M |
| AC-P-03 | Both devices log conflicting events while offline (e.g. two “out” taps) | Merge rule: events sorted by time, duplicates within 2 min are combined, impossible sequences (e.g. “in” without “out”) are flagged for the patient to confirm. Nothing is silently dropped. | M |
| AC-P-04 | Reminders on all devices | Reminders fire on all signed-in devices by default. Once dismissed or done on one device, they are cleared on the others. The patient can choose a single “main device” for reminders. | S |
| AC-P-05 | Photos taken on the tablet | Photos are uploaded and then shown on all devices of the account. Local copies on other devices are loaded only when opened and cached encrypted. | S |
| AC-P-06 | VPro paired with phone, patient also has a tablet | The VPro syncs with whichever signed-in device is in range. Usage data is merged on the server without duplicates. | M* |
| AC-P-07 | Device list | Profile shows all devices with name, platform, last activity; any device can be signed out remotely. | M |
| AC-P-08 | Device clock is wrong or manipulated | The app compares device time with server time on every sync. Differences over 5 min are corrected for logged events and flagged in the dashboard. | S |

### 5.3 Several clinicians, staff and devices in a practice
| ID | Scenario | Requirement | Prio |
|---|---|---|---|
| AC-C-01 | Clinician works on a practice PC, a laptop and a tablet | Every device has its own session with second factor. Device list with remote sign-out. Passkeys can be registered on several devices. | M |
| AC-C-02 | Shared workstation (e.g. reception PC used by several people) | **No shared logins.** Fast user switch: sign out with one click, sign in with passkey or security key. Session timeout 15 min of inactivity (practice may set 5–30 min). No “remember me” on devices marked as shared. | M |
| AC-C-03 | Several clinicians in one clinic | Every patient has a **responsible clinician**. Clinical alerts go to them first. The whole team sees the shared inbox, according to role. | M |
| AC-C-04 | Two people open the same alert | The first person who acts marks the alert “in progress by …”. Others see the marker and get a warning before acting too. | M |
| AC-C-05 | Clinician on vacation or sick | **Delegation:** the clinician or the practice admin names a cover for a period. Alerts and messages go to the cover; the original clinician stays informed. Out-of-office text for patients is optional. | M |
| AC-C-06 | Nobody reacts to an alert | Escalation after a set time (default: 1 working day) to the practice admin and all clinicians. | M |
| AC-C-07 | Patient moves to another clinician in the same practice | Reassignment in patient detail; history stays complete; logged. | M |
| AC-C-08 | Locum, student or temporary assistant | Account with **expiry date** and limited role. Expires automatically; the admin gets a reminder 7 days before. | S |
| AC-C-09 | Staff member leaves the practice | Admin disables the account: all sessions end immediately, passkeys are invalidated. Open alerts and threads must be reassigned before disabling. The account is **disabled, not deleted**, so the audit trail still names the person. | M |
| AC-C-10 | Notification on several devices | Web push to every signed-in browser of the person and an email notice. Each person sets which channels they want; at least one channel stays on. | S |

### 5.4 Organizations, sites and patient lifecycle
| ID | Scenario | Requirement | Prio |
|---|---|---|---|
| AC-O-01 | Practice group or DSO with several sites | Structure **organization → locations → patients**. Organization admins set central policies (2FA, SSO, session timeout, default rules); locations can tighten them, never loosen them. | S |
| AC-O-02 | Clinician works at several sites or in several independent practices | **One identity, several memberships.** After sign-in the person picks the practice or location; data of independent practices is strictly separate and never shown together. | M |
| AC-O-03 | Patient moves to another site of the same organization | Transfer within the organization keeps the full history; logged. | S |
| AC-O-04 | Patient changes to an independent practice (move, relocation) | Only with the patient’s consent. The new practice gets the treatment plan and a summary; the old practice keeps its records for its retention period. The app switches to the new practice in one step. | S |
| AC-O-05 | Patient moves to another country or data region | The account stays in its home region while treatment continues. A move to another region is a controlled export and import with consent. | C |
| AC-O-06 | Practice is sold or the owner changes | Contracts (DPA, BAA) are transferred or newly signed; the new owner becomes practice admin after verification by Dentsply Sirona. Patients are informed. | S |
| AC-O-07 | Practice closes | Patients are informed at least 30 days ahead; data is exported to the practice (PDF/FHIR) and deleted after the agreed period. Patients can export their own data. | M |
| AC-O-08 | Patient finishes treatment | Retainer mode or account closure; reminders end; the practice’s record stays with the practice. | M |
| AC-O-09 | Patient has a second treatment later (relapse, retreatment) | The same account gets a new treatment linked to the earlier one; history stays readable. | S |
| AC-O-10 | Minor turns 18 (or the age of consent in the market) | The parent view ends automatically; the patient confirms consents again on the next app start. | M |
| AC-O-11 | Parent with several children in treatment, possibly at different practices | One parent account linked to several child profiles. Each link needs its own approval from the practice concerned. | S |
| AC-O-12 | Shared family device | Not recommended; the app warns. One patient account per device sign-in; switching accounts means a full sign-out. Notifications never show names or content. | S |

### 5.5 Lost access and lost devices
| ID | Scenario | Requirement | Prio |
|---|---|---|---|
| AC-R-01 | Patient forgot the password | Reset by email link **plus** the second factor. Link valid for 30 min, single use. All other sessions end after a reset. | M |
| AC-R-02 | Patient lost the second factor (phone with authenticator is gone) | Option 1: **recovery codes** (10 single-use codes shown at setup). Option 2: the practice re-verifies the patient (in person or by phone with date of birth and treatment details) and issues a new one-time recovery code. | M |
| AC-R-03 | Patient’s phone lost or stolen | Sign out remotely from another device, via the practice, or via support. Data on the phone is encrypted; on the next start of the app the device learns it was revoked and deletes local data. Unsynced events on that phone are lost; the app shows a warning when data is waiting to sync. | M |
| AC-R-04 | Patient gets a new phone | Sign in with the second factor; data loads from the server; the old device is offered for sign-out. VPro is re-paired. | M |
| AC-R-05 | Patient changes email address | Change only after re-authentication; confirmation to the old and the new address. | M |
| AC-R-06 | Clinician or staff lost the passkey or security key | Every practice account must register **at least two** factors (e.g. passkey on phone and security key). If all are lost: the practice admin resets the factors after identity check; the person registers new ones at the next sign-in. | M |
| AC-R-07 | Only practice admin lost access or left | Every practice needs **at least two practice admins**. If none are available: recovery by Dentsply Sirona support with verification of practice ownership (customer number, licence, call back to the registered practice number). Four-eyes approval at Dentsply Sirona; logged. | M |
| AC-R-08 | Practice laptop or tablet stolen | Admin or person revokes the device; sessions end within 1 min; passkeys bound to that device are removed. No health data is stored in the browser (see INFRASTRUKTUR.md 2.3). | M |
| AC-R-09 | Account possibly compromised (strange sign-in, unknown device) | Sign-in from a new device or country triggers a notice to the person. Admin or support can lock the account immediately; all sessions end; audit log is reviewed. | M |
| AC-R-10 | Too many failed sign-ins | Progressive delays; temporary lock after 10 failures; notice to the account owner. No permanent lock that could be used to block a practice. | M |
| AC-R-11 | Practice SSO provider is down | Each organization keeps **at least one break-glass admin account** outside SSO (with security key), stored securely and reviewed every 3 months. | S |
| AC-R-12 | Support needs to help with a problem | Support sees metadata only (versions, errors, device list). Access to content only via break-glass with written approval of the practice, time-limited and logged. | M |

### 5.6 App versions and devices
| ID | Scenario | Requirement | Prio |
|---|---|---|---|
| AC-V-01 | Security fix needs an app update | The server can set a minimum app version. Older versions show an update prompt and block access to health data until updated. | M |
| AC-V-02 | Rooted or jailbroken device, or failed integrity check | Warning to the patient; health data stays available only if the practice policy allows it (default: allowed with warning, logged). | S |
| AC-V-03 | OS version no longer supported | The app announces the end of support 60 days ahead; data stays reachable by signing in on another device. | S |

---

## 6. Non-functional requirements

| ID | Area | Requirement | Ref. |
|---|---|---|---|
| NF-01 | Platforms | App: last 2 major versions of Android and iOS, at least Android 10 and iOS 16. Dashboard: current Chrome, Edge, Safari. | N-01 |
| NF-02 | Effort | “Out/in” in at most 2 taps; photo session at most 2 min. | N-02 |
| NF-03 | Latency | Alert visible in the dashboard at most 5 min after upload; sync between a patient’s devices within 5 s online. | N-03 |
| NF-04 | Availability | Backend ≥ 99.5 %; crash-free app sessions ≥ 99.8 %. | N-03 |
| NF-05 | Offline | Tracking, reminders, photo capture and guides work offline. | P-16 |
| NF-06 | Battery | No permanent background activity; BLE only when needed. | |
| NF-07 | Accessibility | **WCAG 2.2 AA** for app and dashboard; includes WCAG 2.1 AA and meets the EAA. | N-12 |
| NF-08 | Languages | English and German at launch; more per market. | P-17 |
| NF-09 | Tone | Supportive, never shaming; texts approved by UX writing and clinicians. | P-13 |

---

## 7. Architecture (recommendation)

- **Mobile app: Flutter** (open source, BSD licence, free). One code base and one design for Android and iOS. Platform-specific parts are native: Keystore / Secure Enclave, widgets, BLE SDK. Third-party libraries are managed as SOUP under IEC 62304.
- **Practice dashboard:** web app (e.g. React/TypeScript), sharing design tokens with the app.
- **Backend:**
  - Hosted **in the patient’s region** (EU data in the EU, US data in the US) with a provider holding BSI C5, SOC 2 and HIPAA eligibility.
  - Services: identity (OIDC), treatment plan import (SureSmile), alert rules engine, messaging, media storage, notifications, audit log, versioned content for symptom check and guides.
  - Wear data stored as **events** (append-only) so data from several devices can be merged (AC-P-02/03).
  - Data model based on HL7 FHIR R4.
- **On the device:** encrypted database (SQLCipher); photos encrypted in the app container.

Details on infrastructure, encryption and onboarding: `INFRASTRUKTUR.md`.

---

## 8. Security and privacy

### 8.1 Regulations
| Regulation | Relevance |
|---|---|
| GDPR (Art. 9, 25, 28, 32, 35), German BDSG § 22 | Health data, privacy by design, processing on behalf, security; DPIA before launch |
| German Criminal Code § 203 | Professional secrecy of the practice; service providers bound accordingly |
| HIPAA | US: handling of PHI; **BAA** with practices |
| BSI TR-03161 (parts 1 and 3), OWASP MASVS L2 | Security benchmark for app and backend; penetration test |
| EU MDR Annex I, MDCG 2019-16, FDA premarket cybersecurity guidance | Cybersecurity if a medical device (or as a precaution) |
| ISO/IEC 27001, BSI C5 | ISMS of the operator, cloud attestation |
| IEC 62304, ISO 14971, IEC 62366-1, ISO 13485, IEC 82304-1 | Software lifecycle, risk, usability (if a medical device; recommended from the start) |
| Google Play Health Apps policy, Apple guideline 5.1.3 | Store rules |

### 8.2 Data protection roles
The **practice is the controller** and **Dentsply Sirona is the processor** (GDPR Art. 28; business associate in the US). Legal still has to confirm this. Secondary use (e.g. R&D on fit and wear patterns) is allowed **only anonymized and only with separate consent**; this may require Dentsply Sirona to act as a separate controller, which Legal will check.

### 8.3 Technical measures
| ID | Measure |
|---|---|
| S-01 | TLS 1.3 (at least 1.2), certificate pinning, no cleartext traffic |
| S-02 | Encryption at rest: on the device hardware-backed (AES-256); on the server per tenant via KMS/HSM |
| S-03 | Messages and photos end-to-end encrypted (target, MLS RFC 9420); at minimum transport plus storage encryption with strict access control |
| S-04 | OIDC with PKCE, second factor for everyone, passkeys preferred, biometrics/PIN on the device, auto-lock after 5 min |
| S-05 | No health data in logs, crash reports, push texts, URLs or analytics; no advertising SDKs |
| S-06 | Root/jailbreak and app integrity checks (Play Integrity, App Attest) |
| S-07 | Screenshot protection for sensitive views |
| S-08 | BLE only with LE Secure Connections; firmware only signed |
| S-09 | Tamper-proof audit log of access, exports, consents, deletions, clinical actions, sign-ins, device changes and recoveries |
| S-10 | Least privilege, tenant separation, session timeouts, device binding of sessions (chapter 5) |
| S-11 | Secure development: threat modeling, SAST/DAST, SBOM, penetration test before launch and yearly |
| S-12 | Deletion concept, data export (Art. 15 and 20), incident notification within 72 h |

---

## 9. Regulatory classification

The **intended purpose** decides the class and must be fixed **before design starts**. The functions that drive the decision are the fit assessment (P-FO-05, D-03, D-04), the symptom check (P-SY) and VPro control. The assessment is preliminary; Regulatory Affairs must confirm it.

| Variant | Functions | EU MDR (likely) | FDA (likely) |
|---|---|---|---|
| **B1 – communication only** | Logging, reminders, photo transfer, messaging. Clinicians judge all photos; the symptom check gives general information only. | Possibly not a medical device, or Class I | Non-device or enforcement discretion (data transfer and display) |
| **B2 – clinician decision support** | B1 + fit-assist markers (D-04) + alert rules used for clinical decisions | Class IIa (Rule 11) | Device function (image analysis fails the non-device CDS criteria); 510(k) or De Novo |
| **B3 – patient-facing assessment** | B2 + automated fit verdict or triage result shown to patients | Class IIa, possibly IIb | Device; higher evidence needs |
| **VPro control** | The app controls or reads a medical device | Possibly an **accessory** of the VPro and then in its class | Depends on the VPro clearance; clarify with RA |

**Proposal:** launch as **B1** to get to market and collect data. Develop B2 in parallel with clinical validation, reusing the usability work from the existing 510(k) submissions. Development follows IEC 62304 and ISO 14971 from B1 on, so moving to B2 does not mean rebuilding.

---

## 10. Data model (simplified)

```
Organization ── policies (2FA, SSO, timeouts, default rules)
   └── Location / Practice ── rules (thresholds, standing instructions) ── contracts (DPA, BAA)
         └── Membership (person, role, valid from/to, delegation)
Person (practice user) ── factors (passkeys, keys, TOTP) ── devices ── sessions
Patient ── responsible clinician ── parent links (scope, approved by)
   ├── devices ── sessions ── VPro pairing
   ├── treatment (plan from SureSmile: trays, interval, start, attachments, IPR, phase; previous treatment link)
   │      └── aligner (no., start, end, extended by, replacement ordered)
   ├── wear event (type out/in, time UTC, device, source: tap | smart case, edited?, merge flag)
   ├── VPro session
   ├── photo set (type: fit-3 | extended-6, aligner no., status) ── photo ── fit review (OK | gap | not tracking, by, when)
   ├── symptom check (content version, answers, result)
   ├── report (lost | broken, photo, instruction shown)
   ├── message (thread, attachments, status, assigned to, in progress by)
   ├── alert (rule, status, assigned to, escalated, resolved by, action)
   ├── consent (type, version, given/withdrawn)
   └── audit entry (who, what, when, object, device)
```

---

## 11. Design: Dentsply Sirona
1. Request brand guidelines and digital product rules from DS Marketing/Brand: colors, typography, logo, icons, imagery, possibly DS Core components.
2. Turn them into design tokens shared by the app (Flutter theme) and the dashboard.
3. The prototype (`aligner-app/klickdummy/`) uses **placeholder tokens** that must be replaced.
4. Principles:
   - clinical and clear, plenty of white space
   - status colors never as the only signal
   - supportive language
   - contrast per WCAG AA
   - dark mode if the brand rules allow it
5. Test the prototype with 5–8 patients and 2–3 practices.

---

## 12. Success metrics (pilot)
Targets are placeholders until a baseline from the pilot is available.

| Metric | Target |
|---|---|
| Patients logging wear time on at least 5 days per week after 8 weeks | ≥ 60 % |
| Photo uploads at the requested cadence | ≥ 70 % |
| Unplanned refinements compared with practices without the app | lower (baseline needed) |
| Clinician review time per photo set | ≤ 1 min |
| Practice response time to “contact practice” alerts | ≤ 1 working day |
| Patient agreement with “I know if my treatment is on track” | improvement vs. start |
| Account recoveries handled without support involvement | ≥ 80 % |
| Store rating | ≥ 4.3 |

---

## 13. Delivery phases
| Phase | Content |
|---|---|
| **0 – Clarify** | Intended-purpose workshop with RA (B1 or B2), data protection roles and DPIA, VPro protocol release, brand rules, threat model, first market, identity provider (reuse DS Core?) |
| **1 – Release 1 (B1)** | App (Android): onboarding, wear time incl. multi-device sync, tray change, fit photo, symptom check, lost/broken report, messages, guides, device list and recovery. Dashboard: list, alerts, photo review, actions, assignment and delegation, audit, SureSmile import. Pilot with 2–3 practices |
| **2 – Expansion** | VPro connection, iOS, parent view, weekly summary, widgets, ordering, practice statistics, organizations with several locations, SSO |
| **3 – B2** | Fit assist after clinical validation and clearance |
| **4 – Options** | Smart case, video consultation, FHIR export, more markets, end-to-end encryption (MLS) |

---

## 14. Acceptance criteria (examples)
- **P-WT-01:** From the widget, “out” is logged in at most 2 taps. After a phone restart the break duration is correct to ±1 min.
- **P-WT-02:** With a break over 45 min the reminder fires, also in flight mode.
- **P-FO-02:** Test users finish 3 fit photos in at most 2 min (median, usability test per IEC 62366-1).
- **P-FO-05:** After upload, patients only see “received” or “your practice will contact you”, never a verdict.
- **P-SY-04:** On “contact practice” the alert appears in the dashboard within 5 min (NF-03).
- **AC-P-02:** “Out” on the phone and “in” on the tablet 30 min later produce one break of 30 min on both devices and in the dashboard.
- **AC-P-03:** Two offline devices logging “out” within 1 min of each other produce one break, not two.
- **AC-C-04:** When person A opens an alert and clicks “message”, person B sees “in progress by A” within 5 s.
- **AC-C-05:** With a delegation active, a new clinical alert reaches the cover; the original clinician sees it as “delegated”.
- **AC-C-09:** After disabling an account, its sessions end within 1 min; earlier audit entries still show the person’s name.
- **AC-R-02:** A patient without second factor and without recovery codes regains access only through a code issued by the practice after verification.
- **AC-R-03:** A revoked phone deletes local data on the next app start, even before sign-in.
- **AC-R-07:** A practice whose two admins are unavailable regains admin access only after Dentsply Sirona verification with four-eyes approval; every step is in the audit log.
- **D-07:** Every dashboard action appears in the audit trail with person, time, object and device.
- **S-05:** An automated check finds no health data in logs, push texts or crash reports.

---

## 15. Open decisions
| Decision | Options |
|---|---|
| Build or partner | build in-house · white-label partner · integrate an existing monitoring provider |
| Regulatory scope at launch | B1 only · B1 and B2 together |
| Wear-time capture | taps only · smart case in release 1 · smart case later |
| VPro in release 1 | yes (protocol released) · release 2 · manual only |
| Business model | included in the SureSmile case · practice subscription · per-patient fee |
| Brand scope | SureSmile patients only · any aligner brand |
| First market | US · Germany · UK |
| Photo standard | 3 views (fit) · 6 views · selectable per practice |
| Identity provider | reuse DS Core / DS customer identity · separate identity service |
| Max. devices per patient | 3 (proposal) · 2 · unlimited |
| Second factor for patients | mandatory (proposal) · optional with biometrics |
| Patient recovery without codes | via practice (proposal) · via DS support with ID check |
| Rooted devices | allowed with warning (proposal) · blocked |

### Next steps
- [ ] Check the Reddit topic counts on a hand sample; add a compliance tab to the dashboard
- [ ] Intended-purpose workshop with RA (B1 or B2, symptom check, VPro as accessory)
- [ ] Deeper competitor check: monitoring and compliance apps, features, classification
- [ ] Interviews with 5–8 clinicians on alert thresholds, review effort, delegation and shared workstations
- [ ] Legal/data protection: controller/processor model, DPIA, BAA, practice transfer and closure
- [ ] Request VPro protocol or SDK internally
- [ ] Decide on identity provider together with DS IT (see INFRASTRUKTUR.md 7.2)
- [x] Clickable prototype (app and dashboard), see `aligner-app/klickdummy/`
- [ ] Pilot with 2–3 practices

---

## Sources
- SureSmile VPro app: https://apps.apple.com/us/app/suresmile-vpro/id1644889526
- SureSmile VPro (Dentsply Sirona): https://dentsplysirona.com/en/discover/discover-by-brand/suresmile-aligners/suresmile-vpro.html
- My Invisalign: https://invisalign.com/provider/virtual-solutions/my-invisalign-app
- TrayMinder: https://apps.apple.com/us/app/trayminder/id1320684802
- AlignerPro: https://play.google.com/store/apps/details?id=com.alignerpro
- TrioClear: https://apps.apple.com/app/id1631479021
- BSI TR-03161 and C5: https://www.pwc.de/de/risk-regulatory/tr-03161-und-c5-das-fundament-fuer-sichere-digitale-gesundheitsanwendungen.html
- Johner Institute, data protection and security for health apps: https://international.johner-institute.com/articles/regulatory-affairs/and-more/data-security-and-protection-requirements-for-digital-health-applications/
- Reddit analysis r/Invisalign (Oct 2024 – Oct 2026), internal draft Option B
