# Aligner Companion – Product Specification

**Version:** 0.6 (draft) · **Date:** Nov 13, 2026
**Platforms:** patient app for Android (first) and iOS from one code base; practice dashboard as a web app
**Design:** Dentsply Sirona corporate design
**Inputs:** spec v0.1/v0.2 and the draft “Aligner Compliance Monitoring App – Option B” (v0.1)
**Related:** `INFRASTRUKTUR.md` (infrastructure, security, onboarding; German), `klickdummy/` (clickable prototype)

### Changes from v0.5
- Decisions on the gaps from chapter 18: **education videos on YouTube (3.20), app rating prompts (3.21), satisfaction surveys (3.22), discreet mode (3.23) and emergency numbers per country (3.24)** are in scope. A practice photo gallery and a referral programme are **out of scope**.
- **20 languages** at launch, including one right-to-left language (3.26, NF-08).
- **Gamification is on by default** and can be switched off with one switch; patients can also hide single items (3.25, 17.5).
- Prototype v0.4 shows all of this.

### Changes from v0.4
- **Product links are advertising.** Every product link is clearly labelled as an ad with an affiliate disclosure (3.8.1). Patients can switch product links off.
- **Oral hygiene guidance** with links to electric toothbrushes, floss and interdental brushes, water flossers and fluoride toothpaste (3.8, P-GU-08 to P-GU-12), plus a tip of the day.
- **Journey (3.13):** visual progress as a climber on a mountain; every refinement adds a small hill after the summit; progress and hours worn per aligner.
- **Achievements and care kit (3.14):** 30 achievements; 20 unlock a free Dentsply Sirona care kit.
- **Daily check-in diary (3.15):** one-tap feedback on comfort, fit and care habits.
- **Appointments (3.16):** the practice proposes slots, the patient accepts, declines or suggests another time; calendar export.
- **Widgets, quick controls and shortcuts (3.17)**, **pause mode (3.18)**, **retainer journey (3.19)**.
- **Practice dashboard:** digital lab orders and lab contact (4.3), appointment proposals (4.4), kudos, comfort diary view and new alert rule (4.5).
- **New chapter 17: engagement and behavioural design** (nudges, gamification, guardrails for ethics, minors and dark patterns).
- **New chapter 18: further gaps** found while reviewing the scope.
- Navigation changed: Today, Journey, Photos, Help, Practice; Profile moves to the avatar (3.11).

### Changes from v0.3
- **New chapter 16: updates without data loss** for the patient app, the practice dashboard, the backend, content and VPro firmware, including communication to patients and clinicians.
- **Product links in the guides (3.8):** Retainer Brite® for cleaning and Chewies™ for seating aligners, each linking to the local Amazon store of the patient’s market.

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
- a before/after photo gallery for the practice’s own marketing
- a referral or “recommend a friend” programme

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
| Digital lab (Dentsply Sirona or partner) | Lab portal or integration | Receive orders and questions from practices with the minimum case data needed |
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
| P-WT-07 | Widgets, quick controls and shortcuts: see 3.17. | S | |
| P-WT-08 | Optional wear logging via smart case (Bluetooth open/close) instead of taps. | C | P-15 |
| P-WT-09 | Offline logging with later sync. | M | P-16 |

### 3.3 Tray change and progress (P-AL)
| ID | Requirement | Prio | Ref. |
|---|---|---|---|
| P-AL-01 | Tray-change reminder per plan; patient confirms the change. | M | P-04 |
| P-AL-02 | If the aligner does not fit yet: “ask the practice” instead of extending on their own. The practice can extend the current tray (D-05); the result appears in the app. | M | D-05 |
| P-AL-03 | Progress: tray x of y, photo timeline, weeks remaining. **Refinements are explained as a normal part of treatment.** | S | P-11 |
| P-AL-04 | Attachment and IPR dates in the timeline, with explanations. | S | P-01 |
| P-AL-05 | Retainer phase as a separate mode (e.g. nights only); see 3.19. | S | |
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
| P-GU-05 | **Cleaning guide (aligners and retainers):** recommends **Retainer Brite®** (Dentsply Sirona) with a “Buy on Amazon” button that opens the **local Amazon store** of the patient’s market (see 3.8.1). Also shown in retainer mode (P-AL-05). | S | |
| P-GU-06 | **Chewies™ Aligner Tray Seaters** (Dentsply Sirona) with the same local Amazon button in the chewies guide, after a fit-related symptom check result (P-SY) and in the fit-check tips. | S | |
| P-GU-07 | The practice can switch product links off or replace them with its own source (e.g. “available at our practice”). | S | |
| P-GU-08 | **Brushing and flossing guide for aligner wearers:** take aligners out; brush 2 min twice a day with fluoride toothpaste; clean between the teeth daily; rinse or brush before putting aligners back in; do not brush aligners with toothpaste (scratches, stains). Step-by-step with short animations. | S | |
| P-GU-09 | **Electric toothbrush** tips (pressure sensor, timer, small round head for brackets-free aligner wearers) with a labelled ad link to electric toothbrushes in the local Amazon store. Brand-neutral category link, no brand ranking. | S | |
| P-GU-10 | **Floss, interdental brushes and water flosser:** how to choose and use; labelled ad links per category. | S | |
| P-GU-11 | **Toothpaste:** fluoride content and low abrasiveness (RDA) explained; labelled ad link to fluoride toothpaste. Final wording and values approved by clinicians per market. | S | |
| P-GU-12 | **Tip of the day** on Today: short, rotating tips (cleaning, care, habits), content approved by clinicians, at most one per day, can be switched off. | S | |
| P-GU-13 | **Retainer cleaning** (retainer mode, 3.19): daily rinse, weekly deep clean with Retainer Brite®; labelled ad link. | S | |
| P-GU-14 | No product links on screens with a “contact practice” or “urgent” result, or when the patient reports strong pain. | M | |

#### 3.8.1 Product links to the local Amazon store
| Topic | Rule |
|---|---|
| Market | Taken from the **country of the practice**; fallback: app store country of the device; fallback: device region. Not from the app language, so a German-speaking patient in Austria lands on amazon.de only if the practice is in Germany. |
| Link targets | One curated product page per product and market (e.g. amazon.com, .ca, .com.mx, .com.br, .co.uk, .de, .fr, .it, .es, .nl, .se, .pl, .com.be, .com.tr, .ae, .sa, .in, .co.jp, .sg, .com.au). Kept as **remote content**, so links can be added or fixed without an app update. Preferably to the official Dentsply Sirona brand store or offers sold by Amazon or an authorized seller, because counterfeit and look-alike products are reported for both products. |
| Fallback | If no curated page exists for a market: a search link on the local store (e.g. `https://www.amazon.de/s?k=Retainer+Brite+Dentsply`). If there is no Amazon store for the market: hide the button and show “ask your practice”. |
| Privacy | The link opens in the external browser. No health data, patient ID or practice ID in the URL. Opening a link is counted only with analytics consent and only as “link opened, product, market”. |
| **Ad labelling** | **Every product link is clearly marked as an advertisement** (“Ad”, localized: “Anzeige” or “Werbung” in German, etc.) in a chip directly at the button, visible before the tap, not in a footnote. Below it: “Affiliate link: if you buy through it, Dentsply Sirona may earn a commission from Amazon at no extra cost to you.” Tapping “Why an ad?” explains this in plain language. |
| **Amazon Associates** | If Amazon’s Associates programme is used, the statement required by Amazon for the market (e.g. “As an Amazon Associate we earn from qualifying purchases”) is shown in the app and in the legal notice, and the programme rules for links and price display are followed. |
| Own vs third-party products | Retainer Brite® and Chewies™ are Dentsply Sirona products and are marked as “Product by Dentsply Sirona”. Toothbrush, floss and toothpaste links are brand-neutral category searches, marked as ads, with no brand ranking or sponsored placement. |
| Patient control | Profile › Privacy has a switch “Show product links (ads)”. Switched off, no product links appear anywhere in the app. The practice can also turn links off for all its patients. |
| Minors | Product links are hidden by default for patients under the age of digital consent (market-specific, 16 in Germany) unless the practice enables them and a parent has agreed. |
| Context | The decision which link to show is made on the device. The URL contains only a generic product search; no health data, no patient, practice or diagnosis information. Opening a link is counted only with analytics consent. |
| Legal review | Legal checks advertising and labelling rules per market (e.g. German UWG § 5a and HWG, EU unfair commercial practices rules, FTC endorsement guides, UK CAP code), Amazon programme terms and Apple/Google store rules before release. |
| Link health | A weekly automated check reports broken or redirected links to the content team. |

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
1. **Today:** “on track” status, wear-time ring, out/in switch, tray x of y, daily check-in, tip of the day, achievements progress, VPro, due tasks.
2. **Journey:** mountain progress, per-aligner progress and hours, achievements and care kit, statistics.
3. **Photos:** fit check, gallery, sent sets.
4. **Help:** “Is this normal?”, lost or broken aligner, guides (including cleaning and product links).
5. **Practice:** messages, appointments (proposals, calendar export), contact.

**Profile** (treatment, reminders, widgets, parent view, devices, privacy, product links switch, pause mode) opens from the avatar at the top of Today and Journey.

### 3.12 Notifications
Local reminders work offline. Push messages **never contain health data**. Quiet hours can be set. Behavior with several devices is defined in 5.2. A **notification budget** applies (17.4): at most 4 non-urgent notifications per day, adaptive timing, one notification centre in Profile where each type can be switched off.

### 3.13 Journey and progress (P-JR)
| ID | Requirement | Prio |
|---|---|---|
| P-JR-01 | **Mountain view:** a small figure climbs a mountain; position = share of the treatment plan completed (trays completed plus part of the current tray, from days worn). **The summit is 100 % of the planned trays.** | S |
| P-JR-02 | **Refinements:** when the practice adds a refinement, **a small extra hill appears after the summit** (one per refinement). The text calls it a “fine-tuning hill” and explains that refinements are a normal part of treatment, never a setback. Hills are shown only after the practice has added them. | S |
| P-JR-03 | After the last hill: a flag and a retainer “base camp” that leads into the retainer journey (3.19). | S |
| P-JR-04 | **Endowed progress:** the climber starts at base camp with the welcome achievement already collected, and the first day already shows movement after onboarding. | S |
| P-JR-05 | **Per-aligner progress:** every tray shows how far along it is (days and hours worn against target). The current tray shows days elapsed, **hours worn so far**, target hours (days × daily target) and the share reached. Finished trays show their total hours; upcoming trays are shown greyed. | S |
| P-JR-06 | Tapping a tray opens details: dates, hours worn, average per day, days on target, fit-check status. | S |
| P-JR-07 | **Total hours worn** over the whole treatment, shown with a neutral comparison (“about 5,900 hours, roughly 245 days”). | S |
| P-JR-08 | Estimated finish date from the plan; updated when the practice extends a tray or adds a refinement. Marked as an estimate. | S |
| P-JR-09 | **Goal date:** optional personal goal (event, holiday) with a countdown; shown at milestones. | C |
| P-JR-10 | Milestone celebrations (25, 50, 75, 100 %) with a short animation; animation off with reduced-motion setting and when gamification is switched off (17.5). | S |
| P-JR-11 | Optional share card (journey picture without health data or photos) via the OS share sheet; off by default. | C |

### 3.14 Achievements and care kit (P-AC)
| ID | Requirement | Prio |
|---|---|---|
| P-AC-01 | A catalogue of **30 achievements** in six groups: wear routine, tray changes and milestones, fit photos, care and cleaning, check-ins, learning and contact (see 3.14.1). Two are hidden surprises. | S |
| P-AC-02 | **Achievements are never taken away** and never depend on pain, symptoms or negative events. | M |
| P-AC-03 | Each achievement has a name, a one-line description, an unlock date and, if locked, a hint. Unlocking shows a short celebration and a toast. | S |
| P-AC-04 | **Care kit reward:** with **20 achievements** the patient can claim one **Dentsply Sirona care kit** free of charge (contents per the current SureSmile patient kit: appliance case, Chewies™ Aligner Tray Seaters, Retainer Brite® cleaning tablets; to be confirmed). Progress “8 of 20” is shown on Today and Journey. | S |
| P-AC-05 | **Redemption:** the delivery address is asked only at redemption, in a separate form with its own consent line; passed to the fulfilment partner only to ship the kit and deleted after shipment (data minimisation). Order status is shown in the app. One kit per patient and treatment. | S |
| P-AC-06 | **Anti-fraud and fairness:** at least 5 of the 20 must come from **verified sources** (VPro device data, practice-confirmed appointments, fit checks received by the practice, tray changes confirmed against the plan). Server-side plausibility checks on wear logs; implausible patterns (e.g. 24 h every day with no breaks) do not count towards wear achievements but never accuse the patient. | S |
| P-AC-07 | Achievements never reward wearing aligners while eating or drinking, and never encourage skipping the daily breaks that cleaning needs. | M |
| P-AC-08 | For minors the kit needs a parent’s agreement for the address, or is sent to the practice for hand-over (market-specific). | S |
| P-AC-09 | Definitions, texts and thresholds are **remote content** (versioned), so they can be tuned without an app update (UP-B-07). | S |
| P-AC-10 | Rewards, terms, availability by market and promotion rules are reviewed by Legal (3.14.2). Terms are shown before redemption. | M |

#### 3.14.1 Achievement catalogue (draft)
| Group | Achievements |
|---|---|
| Wear routine | First tap · Perfect day (target reached) · 3-day streak · 7-day streak · 14-day streak · 30-day streak · Perfect week (7 of 7 days on target) · Quick return (back in within 30 min after 10 meals) |
| Tray changes and milestones | First change · 5 changes on time · Halfway · Summit (100 %) · Welcome (hidden at the start: given at onboarding) |
| Fit photos | First fit check · 5 fit checks · Perfect photo (all three views right the first time) |
| Care and cleaning | Clean routine (7 days brushed before putting aligners in) · Chewies champion (7 days) · Floss master (7 days) · Retainer shine (retainer cleaned 7 times) |
| Check-ins | First check-in · 7 check-ins · 30 check-ins |
| VPro | First VPro session · 10 VPro sessions · VPro week |
| Learning and contact | Guide reader (5 guides) · Asked a question (symptom check or message to the practice) · Appointment kept (3 appointments) |
| Hidden surprises | Holiday hero (wear logged across a time-zone change) · Night owl (retainer worn every night for 30 days) |

#### 3.14.2 Care kit programme
| Topic | Rule |
|---|---|
| Legal | Promotions to patients can be restricted for medical products. Legal checks per market, for example German HWG § 7 (gifts), US rules on gifts to patients of federal health programmes, UK and EU consumer promotion and prize rules. Terms and conditions, one kit per patient, market availability. |
| Cost and logistics | Cost per kit, stock, fulfilment partner, shipping regions and lead time are set by Dentsply Sirona; open decision (chapter 15). |
| Abuse | Account must be linked to a practice; minimum treatment time before redemption (proposal: 8 weeks); duplicates detected by account and address. |
| Data | Address, name and phone for the courier only; processor agreement with the fulfilment partner; deleted after delivery confirmation plus statutory retention. No health data in the shipment order. |

### 3.15 Daily check-in diary (P-DI)
| ID | Requirement | Prio |
|---|---|---|
| P-DI-01 | **One-tap daily check-in** taking about 15 seconds: comfort/pain on five faces (none, mild, moderate, strong, severe), aligner fit (snug, loose, too tight), and toggles for chewies used, brushed before putting aligners in, flossed. Optional short note. | S |
| P-DI-02 | The check-in can be done at any time of the day; a gentle evening reminder (set by the patient). Missed days are never punished. | S |
| P-DI-03 | **Feedback after saving:** general information only (for example “mild pressure is common in the first days after a tray change”), no diagnosis. With “strong” or “severe” comfort or “too tight” fit, it offers “Is this normal?” and “Message the practice”. Product links are not shown (P-GU-14). | S |
| P-DI-04 | Comfort trend over 14 days in History, with tray-change days marked so patients see that discomfort follows changes. | S |
| P-DI-05 | The practice sees the comfort trend in the patient detail (4.5). A rule can raise a watch alert (for example strong comfort rating on 2 days in a row). Release 1 shows the data and raises the alert for the team; it does not tell patients what to do beyond P-DI-03. | S |
| P-DI-06 | The diary is health data (GDPR Art. 9), covered by the same consent as wear data; shown only to the patient and the practice. | M |
| P-DI-07 | Diary entries can be edited for the same day, and exported with the patient’s data. | S |

### 3.16 Appointments and calendar (P-AP)
| ID | Requirement | Prio |
|---|---|---|
| P-AP-01 | **Appointment proposal from the practice:** the practice sends 1–5 time slots with appointment type, duration and an optional note. Push notification without content. | S |
| P-AP-02 | The patient can **accept one slot**, **decline** (with a reason: cannot attend, will book by phone, other) or **suggest another time**. The practice sees the answer immediately. A proposal expires after a time set by the practice (default 5 days) with a reminder after 2 days. | S |
| P-AP-03 | Accepted appointments appear in Practice and Today, with a countdown on the day. Reminders: 1 day and 2 hours before, configurable. | S |
| P-AP-04 | **Add to calendar:** native insert on Android (calendar intent) and iOS (EventKit with “add only” permission), plus download of an **.ics** file and web links for Google Calendar and Outlook. | S |
| P-AP-05 | Optional **calendar feed** (subscription URL, secret token, revocable) for all appointments. | C |
| P-AP-06 | **Privacy of calendar entries:** title “Dental appointment”, practice name and address as the location; no treatment details, no patient name. | M |
| P-AP-07 | Changes by the practice (move, cancel) update the app, the feed and, where the OS allows, the inserted calendar entry; the patient is notified. | S |
| P-AP-08 | Appointments created in the practice system (via integration, later) show as read-only entries. | C |
| P-AP-09 | “Appointment kept” is confirmed by the practice and feeds an achievement (verified source). | S |

### 3.17 Widgets, quick controls and shortcuts (P-WG)
| ID | Requirement | Prio |
|---|---|---|
| P-WG-01 | **Wear widget** (small): ring with today’s wear time and a button “out/in”. Android home screen and lock screen; iOS home screen, lock screen and StandBy. | S |
| P-WG-02 | **Journey widget:** mountain with climber and percentage. | S |
| P-WG-03 | **Next widget:** days until the tray change, hours worn for the current tray, next appointment. | S |
| P-WG-04 | **Quick controls:** Android quick settings tile “Aligners out/in”; iOS lock screen control and Action Button shortcut; both work without opening the app. | S |
| P-WG-05 | **Live Activity / ongoing notification** while the aligners are out, showing the elapsed break time with a button “Back in”. | S |
| P-WG-06 | **Voice and shortcuts:** “Hey Siri / Hey Google, aligners out”, via App Shortcuts or App Actions. | C |
| P-WG-07 | Wear OS tile and watchOS complication for out/in. | C |
| P-WG-08 | **Privacy on the lock screen:** widgets show only counts and ring (no names, no appointment details) by default; a setting hides everything until unlock. | M |
| P-WG-09 | Widgets update within 1 minute after a change on any device and work offline. | S |

### 3.18 Pause mode (P-PM)
| ID | Requirement | Prio |
|---|---|---|
| P-PM-01 | “Pause tracking” for a period (travel without aligners, illness, dental procedure, wisdom-tooth removal, hospital stay) with a reason from a list and an end date. | S |
| P-PM-02 | During a pause reminders stop, wear-time alerts are suppressed, and streaks are kept (no loss). The practice is informed and can confirm or end the pause. | S |
| P-PM-03 | Pauses longer than 14 days need practice confirmation, because the tray plan may need adjusting. | S |

### 3.19 Retainer journey (P-RT)
| ID | Requirement | Prio |
|---|---|---|
| P-RT-01 | After the active phase the app switches to the retainer phase. The journey continues beyond the summit as a gentle long-term path (months and years), with a lighter set of reminders. | S |
| P-RT-02 | Retainer plan from the practice: nights only, then fewer nights per week; a simple “worn last night” tap in the morning. | S |
| P-RT-03 | Retainer care: cleaning guide and Retainer Brite® link (P-GU-13), replacement reminder, “retainer lost or broken” report (same flow as P-LB). | S |
| P-RT-04 | Check-up reminders (for example 3, 6, 12 months) and an optional photo check for the practice. | S |
| P-RT-05 | Retainer achievements (for example “Night owl”) and a yearly “smile anniversary” message. | C |

### 3.20 Education videos (P-VI)
| ID | Requirement | Prio |
|---|---|---|
| P-VI-01 | Short videos (under 2 min): putting in and taking out aligners, fit-check photos, chewies, cleaning aligners and retainers, brushing and flossing, attachments and IPR, using the VPro. | S |
| P-VI-02 | **Hosted on YouTube** in an official Dentsply Sirona playlist; content approved by clinicians and Brand. | S |
| P-VI-03 | Subtitles in all 20 app languages (3.26); spoken versions for the largest markets. Transcripts in the app for screen-reader users. | S |
| P-VI-04 | **Privacy:** videos open in the YouTube app or browser by default. If shown inside the app, only via the privacy-enhanced player (youtube-nocookie.com) and only after the patient agrees to load YouTube content. No health data in the link. | M |
| P-VI-05 | Videos appear in Help, next to the matching guide, and at the right moment (fit-check video on the Photos screen, VPro video during pairing, “first day” video after onboarding). | S |
| P-VI-06 | YouTube may show its own ads or suggestions; Brand checks channel settings. Links show the source (“YouTube”). | S |

### 3.21 App rating prompts (P-RV)
| ID | Requirement | Prio |
|---|---|---|
| P-RV-01 | Use only the **system rating dialogs**: Google Play In-App Review API and Apple’s StoreKit review request. No own pre-question (“Do you like the app?”) and no filtering of happy users, as the store rules forbid it. | M |
| P-RV-02 | Triggered only after positive moments: a confirmed tray change, a milestone (25/50/75/100 %) or a perfect week. | S |
| P-RV-03 | Never after pain, a “contact practice” or urgent result, a lost or broken report, during a pause, or in the first 14 days. Never linked to survey answers. At most 2 attempts per year (the systems apply their own limits too). | M |
| P-RV-04 | “Rate the app” in Profile opens the store page at any time. Patients can switch prompts off (3.25). | S |

### 3.22 Satisfaction surveys (P-SU)
| ID | Requirement | Prio |
|---|---|---|
| P-SU-01 | Three short surveys per treatment: after 2 weeks, at the halfway point and at the end (plus one in the retainer phase after 6 months). Five questions on a 1–5 scale and an optional comment; about 1 minute. | S |
| P-SU-02 | Questions (draft): satisfaction with the treatment so far; “I know whether my treatment is on track”; “The app makes my treatment easier”; “It is easy to reach my practice”; “Reminders come at the right moments”. | S |
| P-SU-03 | The patient chooses: share with the practice **anonymously** (default; shown only as totals from at least 5 patients) or **with their name**. Dentsply Sirona receives only anonymous totals for product improvement, with consent. | M |
| P-SU-04 | Surveys are optional, can be skipped or switched off, and are never required for rewards or features. | M |

### 3.23 Discreet mode (P-DM)
| ID | Requirement | Prio |
|---|---|---|
| P-DM-01 | One switch: notifications show only “Reminder” and “Open the app for details”, without sound or vibration pattern, and never name aligners, teeth or the practice. | S |
| P-DM-02 | Optional neutral app icon and name (“Companion”), using the platforms’ alternate-icon support. | C |
| P-DM-03 | Widgets and lock-screen controls switch to the neutral view (P-WG-08). | S |
| P-DM-04 | Can be scheduled (for example school or work hours). | C |

### 3.24 Emergency numbers (P-EM)
| ID | Requirement | Prio |
|---|---|---|
| P-EM-01 | An **Emergency** entry at the top of Help and in Practice: the practice number, the practice’s after-hours line (set by the practice) and the general emergency number of the practice’s country, with a short text on when to call which. | M |
| P-EM-02 | Numbers are remote content per country, checked by the local Dentsply Sirona team, cached for offline use and shown as selectable text as well as call buttons. | M |
| P-EM-03 | Country-specific services where they exist, for example NHS 111 in the UK for urgent dental care, set per country. | S |
| P-EM-04 | Warning signs in the symptom check (P-SY-05) link straight to this sheet. | M |

### 3.25 Customize what is shown (P-CU)
| ID | Requirement | Prio |
|---|---|---|
| P-CU-01 | Profile › **Customize** lets the patient hide and show each card on Today: status, daily check-in, achievements, tip of the day, VPro and photos shortcuts, help, surveys. Wear time and the current tray always stay. | S |
| P-CU-02 | Feature switches: gamification (on by default, 17.5), product links (3.8.1), videos, tips, surveys, rating prompts, weekly summary. | S |
| P-CU-03 | Always visible and not switchable: emergency numbers, messages from the practice, appointment proposals, safety notices. | M |
| P-CU-04 | Settings sync across the patient’s devices (5.2). A “reset to default” button. | S |
| P-CU-05 | The practice can switch off product links, achievements and care kit for all its patients (D-EN-04); patients can always switch things off, never on against the practice’s setting. | S |

### 3.26 Languages (P-LG)
| ID | Requirement | Prio |
|---|---|---|
| P-LG-01 | **20 languages at launch (proposal):** English, Spanish, Portuguese, French, German, Italian, Dutch, Polish, Swedish, Turkish, Russian, Ukrainian, Arabic, Hindi, Chinese (Simplified), Japanese, Korean, Indonesian, Vietnamese, Thai. Final list aligned with market plans. | M |
| P-LG-02 | Language follows the device setting and can be changed in the app. The practice dashboard offers the same languages. | M |
| P-LG-03 | **Right-to-left** layout for Arabic (mirrored navigation, icons and progress direction where meaningful). | M |
| P-LG-04 | Medical and safety texts (symptom check, emergency, consents, instructions) are translated by certified medical translators and reviewed by a clinician who speaks the language; UI texts by professional translators. No raw machine translation in production. | M |
| P-LG-05 | Local formats for dates, times, numbers and units; time-zone handling as in P-WT-06. Plural rules and text expansion (up to +40 %) tested. | M |
| P-LG-06 | Store listings, videos (subtitles), guides, emails, calendar entries and the care-kit flow are localized as well. | S |
| P-LG-07 | Automated screenshot tests for every language and both themes in CI. | S |

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
| D-16 | **Digital lab:** create orders and contact the lab (4.3). | M | D-09 |
| D-17 | **Appointment proposals** to patients with accept/decline/suggest (4.4). | S | D-05 |
| D-18 | **Kudos, comfort diary view, gamification settings** (4.5). | S | |

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
| Comfort diary: strong or severe | 2 days in a row | watch |
| Pause longer than 14 days | on request | action needed (confirm or end pause) |
| Lab order late | 2 days after the estimated date | watch |
| Appointment proposal unanswered | 5 days | watch |

### 4.3 Digital lab: orders and contact (D-LB)
Practices need to start lab processes from the dashboard, for example when a patient reports a lost or broken aligner, when a refinement is planned, or when retainers are needed.

| ID | Requirement | Prio |
|---|---|---|
| D-LB-01 | **Create a lab order** from the patient detail or from an alert (a lost/broken report pre-fills the form). Types: replacement aligner, additional aligners, refinement set, retainer set, remake because of fit, other. Fields: patient, tray numbers and arch, urgency (standard or express), ship-to (practice or patient), note, optional attachments (for example the patient’s report photo). | M |
| D-LB-02 | **Order status tracking:** submitted, accepted by lab, in production, shipped (with tracking number), delivered. Estimated date shown; a late order raises a watch alert. | M |
| D-LB-03 | **Contact the lab:** a message thread per order and a general lab contact (questions on a case, design change request), with attachments and read receipts. | M |
| D-LB-04 | **Approvals:** by default only clinicians can submit; the practice admin can allow staff, or require a second approval above a set value. Every step is in the audit trail. | M |
| D-LB-05 | **Patient information:** the patient sees “replacement ordered, estimated delivery …” and the practice’s standing instruction in the meantime (P-LB-02). Prices are never shown to patients. | M |
| D-LB-06 | **Data minimisation:** the lab receives only what it needs (case ID, tray numbers, notes, attachments added on purpose). Lab staff accounts are covered by processor agreements; orders are routed to the lab of the practice’s region. | M |
| D-LB-07 | **Integration:** connect to the SureSmile ordering and lab systems via API or EDI. Until then, the order goes as a structured message with a PDF to the lab portal. | M |
| D-LB-08 | Price, warranty and re-make rules are shown before submitting (from the Dentsply Sirona price and warranty rules). | S |
| D-LB-09 | Order history per patient and per practice, search, reorder, export. | S |
| D-LB-10 | An express order for a lost tray in the middle of treatment is flagged to the lab, and the patient receives the instruction “wear the previous tray” at once. | S |

### 4.4 Appointment proposals (D-AP)
| ID | Requirement | Prio |
|---|---|---|
| D-AP-01 | Propose **1–5 time slots** with type, duration and note. Later: pick slots from the practice calendar’s free times. | S |
| D-AP-02 | Status per proposal: proposed, accepted, declined (with reason), counter-suggestion, expired. Notification to the assigned team member; a declined or countered proposal creates a task, not an alert. | S |
| D-AP-03 | Automatic reminders to the patient; no-show tracking; “kept” confirmation feeds an achievement (verified source, P-AP-09). | S |
| D-AP-04 | Calendar feed for staff (ICS, secret token); two-way sync with the practice system later. | C |

### 4.5 Engagement tools for the practice (D-EN)
| ID | Requirement | Prio |
|---|---|---|
| D-EN-01 | **Kudos:** one-tap praise (templates) to a patient, suggested automatically at milestones (for example three weeks on target) with a frequency cap. | S |
| D-EN-02 | **Comfort diary view:** 14-day trend with tray-change days marked, next to wear time. | S |
| D-EN-03 | **Milestones list** (verified achievements) so staff can congratulate patients at visits. | C |
| D-EN-04 | **Gamification settings** per practice: enable or disable journey, achievements and care kit, kudos, product links. Patients can still switch gamification off (17.5). | S |
| D-EN-05 | Confirm or end patient pauses (P-PM-02). | S |
| D-EN-06 | **Satisfaction results** (3.22) in Statistics: averages per question and trend, only as totals from at least 5 patients unless a patient chose to share with their name. | S |

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
| NF-08 | Languages | **20 languages** at launch (list and process in 3.26), including right-to-left layout for Arabic. | P-17 |
| NF-09 | Tone | Supportive, never shaming; texts approved by UX writing and clinicians. | P-13 |
| NF-10 | Motion and colour | Animations respect reduced-motion; progress is never shown by colour alone; the mountain has a text equivalent for screen readers (“tray 7 of 24, 29 % of the way”). | |
| NF-11 | Remote content | Tips, achievements, guides, texts and product links are versioned remote content (UP-B-07), with a local fallback for offline use. | |

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
| S-13 | Care kit: delivery address only at redemption, held by the fulfilment partner under a processor agreement, deleted after delivery confirmation plus statutory retention; no health data in the order |
| S-14 | Lab orders: minimum necessary data, regional routing, processor agreements, access logged; attachments only when added on purpose |
| S-15 | Calendar exports (ICS, feed): generic title, no patient name or treatment data; feed token revocable |
| S-16 | Product links: no health data in URLs; no third-party tracking SDKs for links; link opening counted only with consent |

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
   ├── journey (progress share, summit reached, refinements [trays, done], retainer phase, goal date)
   ├── tray stats (aligner no., hours worn, days on target)
   ├── achievement (id, unlocked at, verified source?) ── care kit order (status, fulfilment reference; address held only by fulfilment partner)
   ├── check-in (date, comfort 0–4, fit, chewies, brushed, flossed, note)
   ├── appointment proposal (type, slots, status: proposed | accepted | declined | counter-suggested | expired, reason) ── appointment (time, location, kept?)
   ├── pause (reason, from, to, confirmed by)
   ├── lab order (type, trays, urgency, ship-to, status, tracking, thread) ── lab message
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
| Weekly active patients during active treatment | ≥ 80 % |
| Days with a check-in (patients who started the diary) | ≥ 50 % |
| Appointment proposals answered within 48 h | ≥ 70 % |
| Patients who switch gamification off or turn off product links (guard metric, watched, no target to push down) | monitored, reviewed monthly |
| Wear-time adherence compared with a control group without gamification (primary outcome) | higher (baseline needed) |
| Store rating | ≥ 4.3 |

---

## 13. Delivery phases
| Phase | Content |
|---|---|
| **0 – Clarify** | Intended-purpose workshop with RA (B1 or B2), data protection roles and DPIA, VPro protocol release, brand rules, threat model, first market, identity provider (reuse DS Core?) |
| **1 – Release 1 (B1)** | App (Android): onboarding, wear time incl. multi-device sync, tray change, fit photo, symptom check, lost/broken report, messages, guides with labelled ad links, journey (mountain, per-tray progress), daily check-in, appointment proposals with calendar export, wear widget, device list and recovery. Dashboard: list, alerts, photo review, actions, assignment and delegation, audit, SureSmile import. Pilot with 2–3 practices |
| **2 – Expansion** | VPro connection, iOS, parent view, weekly summary, full widget set, achievements and care kit, lab orders in the dashboard, kudos, pause mode, retainer journey, practice statistics, organizations with several locations, SSO |
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
- **3.8.1:** Every product link has an “Ad” label in the same visual block; an automated UI test fails if a link lacks it.
- **P-GU-14:** With a “contact practice” or “urgent” result, or strong pain in the check-in, no product link is shown.
- **P-JR-02:** After the practice adds a refinement, one small hill appears in the app within 5 min; none appears before.
- **P-JR-05:** Hours worn for the current tray equal the sum of its wear events (±1 min).
- **P-AC-02:** No function or support action can remove an unlocked achievement.
- **P-AC-04/05:** At 20 achievements the claim button appears; the address is deleted from Dentsply Sirona systems after delivery confirmation (plus statutory retention at the fulfilment partner).
- **P-DI-01:** A check-in takes at most 4 taps.
- **P-AP-02:** Accepting a slot shows in the dashboard within 5 s and creates exactly one appointment.
- **P-AP-06:** The .ics file contains no patient name and no treatment data.
- **D-LB-02/05:** A status change of a lab order shows in the dashboard within 5 min; the patient sees “replacement ordered” without a price.
- **17.5:** Switching gamification off hides journey animation, streaks, achievements and tips; wear tracking and reminders are unchanged.
- **P-CU-01:** Every card on Today except wear time and the current tray can be hidden and shown again in Profile › Customize.
- **P-RV-03:** The rating prompt never appears after a pain, “contact practice” or urgent result, during a pause, or in the first 14 days.
- **P-DM-01:** With discreet mode on, no notification shows the words aligner, tooth, dental or the practice name, and none plays a sound.
- **P-EM-02:** The emergency sheet shows the number of the practice’s country and works offline.
- **3.26:** In Arabic the whole app is mirrored (right-to-left) without clipped or overlapping text; automated screenshot tests run for all 20 languages.
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
| Product links | Amazon only · Amazon plus DS webshop · practice’s own source; with or without Amazon Associates tag |
| Hard minimum version | only for security issues (proposal) · also for major feature changes |
| Product link programme | Amazon Associates affiliate links with commission · plain links without commission · own webshop |
| Owner of the Associates account | Dentsply Sirona entity per market · central entity |
| Care kit | threshold 20 achievements (given) · minimum of 5 verified (proposal) · minimum treatment time before redemption (proposal 8 weeks) · cost, stock and fulfilment partner |
| Gamification default | **decided:** on for everyone, can be switched off |
| Final language list | 20 languages in 3.26 (proposal, to align with market plans) |
| Video hosting | YouTube, official Dentsply Sirona channel (decided) · ad-free settings to check with Brand |
| Minors | no ads, no streak-loss messages, kit via parent or practice (proposal) |
| Social proof | show aggregated norms from at least 50 patients (proposal) · not at all |
| Lab integration | API/EDI to SureSmile ordering (target) · portal with structured message first |
| Achievements visible to the practice | verified ones only (proposal) · all · none |

### Next steps
- [ ] Check the Reddit topic counts on a hand sample; add a compliance tab to the dashboard
- [ ] Intended-purpose workshop with RA (B1 or B2, symptom check, VPro as accessory)
- [ ] Deeper competitor check: monitoring and compliance apps, features, classification
- [ ] Interviews with 5–8 clinicians on alert thresholds, review effort, delegation and shared workstations
- [ ] Legal/data protection: controller/processor model, DPIA, BAA, practice transfer and closure
- [ ] Request VPro protocol or SDK internally
- [ ] DS e-commerce: curated Amazon product pages per market for Retainer Brite® and Chewies™; Legal: advertising and affiliate rules
- [ ] Decide on identity provider together with DS IT (see INFRASTRUKTUR.md 7.2)
- [ ] Legal: advertising labelling and affiliate disclosure per market, care kit promotion rules, minors
- [ ] DS e-commerce: Amazon Associates set-up per market, product categories, local search terms and curated pages
- [ ] Lab and operations: lab portal or API, order types, price and warranty rules, regional routing
- [ ] Behavioural science and clinical review of nudges, achievements and copy; ethics review plan for experiments
- [ ] Care kit: contents, cost, stock, fulfilment partner, shipping regions
- [x] Clickable prototype (app and dashboard), see `aligner-app/klickdummy/`
- [ ] Pilot with 2–3 practices

---

## 16. Updates without data loss

Updates must never lose patient data, never interrupt clinical work and always stay traceable for regulatory purposes. Requirements carry the prefix **UP**.

### 16.1 Principles
- **The server never rejects data because a client is old.** Data from an outdated app is accepted, stored and, if needed, converted.
- **Every write has a client-generated ID.** Retries during a deployment or a lost connection never create duplicates and never lose entries (idempotency).
- **Changes are backwards compatible.** Nothing old is removed in the same release that adds something new (expand/contract).
- **Every release can be rolled back** without data loss.
- **Nobody is surprised.** Patients and practices learn about relevant changes before or when they happen.

### 16.2 Patient app
| ID | Requirement | Prio |
|---|---|---|
| UP-A-01 | Distribution through Google Play and the App Store with a **staged rollout** (1 % → 10 % → 50 % → 100 %). The rollout stops automatically if crash rate, sync errors or failed migrations exceed set thresholds. | M |
| UP-A-02 | **Local database migrations** are versioned, run in a transaction and are tested on upgrade paths from every supported older version (at least the last 4). Before a migration the app makes an encrypted local copy of the database and restores it if the migration fails. | M |
| UP-A-03 | **Unsynced data is never deleted** by an update. The app tries to upload pending events before a migration. The format of the pending queue is versioned and readable by newer versions. | M |
| UP-A-04 | Keys in the Keystore / Secure Enclave are kept across updates. Re-encrypting the local database with a new key happens only as a separate, resumable step, never as part of a migration. | M |
| UP-A-05 | Local reminders are rescheduled after every update and after a device restart (Android clears alarms on app update). | M |
| UP-A-06 | **Minimum version:** the server can recommend (“soft”) or require (“hard”) an update. Even under a hard block the app first uploads all pending data, then shows only the update screen and the practice phone number. | M |
| UP-A-07 | The server accepts sync from app versions up to **6 months old**. Older API versions get a deprecation signal at least 60 days before they end. | M |
| UP-A-08 | Updates are not applied during an active VPro session, photo capture or unsent message. Android uses the in-app update API in “flexible” mode; “immediate” only for security updates. | S |
| UP-A-09 | New features are released behind **feature flags** (per market, per practice, per percentage), with a remote kill switch for faulty features. | M |
| UP-A-10 | “What’s new” in the app after an update, in plain language. Changes that affect the treatment routine (e.g. a new reminder logic) are also shown to the practice beforehand. No marketing push messages. | S |

### 16.3 VPro firmware
| ID | Requirement | Prio |
|---|---|---|
| UP-V-01 | Firmware only signed by Dentsply Sirona; the device checks the signature before installing. | M* |
| UP-V-02 | Update only with battery ≥ 50 %, never during a session, resumable after a broken connection. | M* |
| UP-V-03 | Device keeps the previous firmware and falls back to it if the new one does not start (A/B or rollback). | M* |
| UP-V-04 | Usage data stored on the device is read before the update and never deleted by it. | M* |

### 16.4 Practice dashboard
| ID | Requirement | Prio |
|---|---|---|
| UP-D-01 | Deployments **without downtime** (blue/green or canary). Running sessions remain valid. | M |
| UP-D-02 | **Drafts are saved on the server** while typing (messages, notes, fit ratings in progress). A reload or new version never loses input. | M |
| UP-D-03 | A new version shows a banner “New version available – reload when convenient”. The dashboard never reloads by itself while someone is typing. The server supports the previous dashboard version for at least 24 h. | M |
| UP-D-04 | Planned maintenance that affects use is announced **at least 7 days ahead** (dashboard banner, email to practice admins, status page), placed outside usual practice hours per region. Security patches may be applied at short notice. | M |
| UP-D-05 | Changelog in the dashboard. Bigger changes come with a short guide; changes to clinical workflows can be enabled per practice first (pilot practices). | S |
| UP-D-06 | Changes that alter data or workflows practices rely on (e.g. alert rules, exports, roles) are announced **at least 30 days ahead**. | M |

### 16.5 Backend and data
| ID | Requirement | Prio |
|---|---|---|
| UP-B-01 | **Database changes follow expand/contract:** add the new structure, write to both, backfill, switch reads, remove the old structure in a later release. No destructive change in the same release as the code that needs it. | M |
| UP-B-02 | A snapshot is taken right before every migration; point-in-time recovery stays on. Every release has a documented rollback plan, tested in staging. | M |
| UP-B-03 | Migrations are tested with production-sized **synthetic** data (no real patient data outside production) and their run time is measured. | M |
| UP-B-04 | Queues are durable; workers finish or hand back running jobs during deployment (graceful shutdown). No alert, message or notification is lost or sent twice. | M |
| UP-B-05 | Rollout region by region (EU and US separately), each first to a canary group, with monitoring of error rates and alert latency (NF-03). | M |
| UP-B-06 | Changes to the SureSmile plan import format are versioned on both sides; the old format is accepted until all practices have moved. | M |
| UP-B-07 | **Content updates** (symptom check, guides, product links) are versioned, approved and can be rolled back. Every symptom check stores the content version used, so the practice can see what the patient was shown. | M |

### 16.6 Quality and regulatory
| ID | Requirement | Prio |
|---|---|---|
| UP-Q-01 | Every release goes through change control under IEC 62304: impact analysis, risk review (ISO 14971), regression tests, traceability, approval. If the app is a medical device, check whether the change is significant (MDCG 2020-3) or needs FDA notification. | M |
| UP-Q-02 | SOUP and library updates are part of the same process; critical security fixes follow a fast track (deployed within 7 days). | M |
| UP-Q-03 | After every release: monitoring for 72 h with defined rollback criteria (crash rate, sync errors, alert latency, support tickets). | M |

### 16.7 Who learns what, and when
| Change | Patients | Practices |
|---|---|---|
| Bug fix, small improvement | Store release notes | Changelog |
| New feature in the app | “What’s new” after update | Changelog; for clinical relevance email beforehand |
| Change in treatment-related behavior (reminders, alerts, photo cadence) | “What’s new” plus explanation | Email ≥ 30 days ahead, can test with pilot |
| Planned maintenance | Notice in the app if the app is affected | Banner, email, status page ≥ 7 days ahead |
| Security update (forced) | Update screen with reason in plain language | Email to admins the same day |
| Incident with data impact | Per GDPR Art. 34 if required | Immediately, per contract and GDPR Art. 33 |

### 16.8 Acceptance criteria
- **UP-A-02/03:** Upgrading from each of the last 4 versions with 500 unsynced wear events keeps all 500 events, locally and after sync.
- **UP-A-02:** Killing the app during the migration and starting it again leaves the data complete and the app usable.
- **UP-A-06:** With a hard minimum version set, an outdated app still uploads its pending events before showing the update screen.
- **UP-A-05:** After an app update and after a restart, all reminders fire at the planned times.
- **UP-D-02:** Deploying a new dashboard version while a clinician writes a message keeps the full draft after reload.
- **UP-B-04:** Deploying the backend while 100 messages are being sent delivers each message exactly once.
- **UP-B-02:** Rolling back a release in staging restores the previous state with no lost entries.

---

## 17. Engagement and behavioural design

### 17.1 Purpose
The goal is to keep patients using the app **because it helps them wear their aligners and finish treatment**, not to maximise time in the app. Success is measured by adherence and outcomes (17.7). The daily loop must be short: a patient should finish what matters in under a minute.

**The loop:** a well-timed prompt (reminder or widget) → one easy action (tap, check-in) → an honest reward (progress, kind feedback, recognition) → a small investment (diary entry, goal, photos) that makes the next round easier.

### 17.2 Mechanisms
| Mechanism | Behavioural principle | In the app | Guardrail |
|---|---|---|---|
| Visible progress | Goal-gradient effect: effort rises near the goal | Mountain, per-tray progress, hours worn, estimated finish date | Never implies failure when progress is slow; no comparison with other patients |
| Head start | Endowed progress | Welcome achievement and first steps counted at onboarding, so the climber has already left base camp | Only real onboarding steps count; no fake progress |
| Small wins | Progress principle; ease of action (Fogg model) | 15-second check-in, one-tap widget, tray-day mini goals | Tasks stay short; no long forms |
| Compassionate streaks | Habit formation; mild loss aversion | Streaks with 2 rest tokens per month; pause mode keeps streaks | No “you lost your streak” messages; none for minors |
| Own plan | Implementation intentions (“when X, I do Y”) | At onboarding: “When I finish eating, I put them back in” sets the reminder after the learned break length | Patient writes and edits the plan |
| Personal why | Commitment and identity | Optional “why” and goal date, shown at milestones | Optional and private |
| Fresh start | Fresh-start effect | Each new tray opens a “new chapter” card with the next small goals | No guilt for the previous tray |
| Norms | Descriptive social norms | “Most patients at this stage wear their aligners on 6 of 7 days” (aggregated, anonymous, min. 50 patients) | No leaderboards, no individual comparison, never shown as a reproach |
| Recognition | Reciprocity and social reward | Kudos from the practice; achievements; care kit | Rewards for varied, verified actions; no obligation |
| Light surprise | Variable reward | Two hidden achievements, occasional surprise tips | No loot boxes, no random paid items, no gambling-like patterns for anyone |
| Positive endings | Peak-end rule | Each check-in and tray change ends on an honest, warm message | No praise that contradicts the data |
| Smart defaults | Default effect | Reminders on, practice defaults for goals; ads off for minors | Defaults serve the patient; opt-out in one tap |
| Right moment | Context-aware prompts | Reminder after the usual meal break, check-in in the evening | Quiet hours and the notification budget (17.4) |
| Tangible reward | Extrinsic reward | Care kit at 20 achievements | Risk of crowding out intrinsic motivation: reward spans many behaviours, outcome stays the focus |

### 17.3 Tone
Warm, short, concrete. “Time to put them back in. Your smile will thank you.” rather than “You have been out for 2 hours!”. Low days get “Tomorrow is a fresh start”, not a red number. Copy is approved by clinicians and UX writing and versioned (UP-B-07).

### 17.4 Notification budget
- At most **4 non-urgent notifications per day**; urgent ones (practice message, appointment change) are exempt.
- A break reminder is sent once after the usual break length plus 10 minutes, once more after 30 minutes, then stops.
- Timing adapts to the patient’s meal pattern and quiet hours.
- A **notification centre** in Profile controls each type separately.
- **Discreet mode:** neutral text (“Reminder”) and no sound, for school and work.

### 17.5 Guardrails
| Rule | Detail |
|---|---|
| No dark patterns | No fake urgency, hidden opt-outs, guilt-based wording or countdowns to buy. Product links are labelled as ads (3.8.1). |
| **Gamification switch** | Gamification is **on by default** for all patients. One switch (“Gamification”) turns off the journey animation, streaks, achievements and tips; plain tracking and reminders stay. Single items can also be hidden (3.25). The practice cannot force gamification on. |
| Minors | No ads by default, no streak-loss messages, no random rewards; nudges reviewed against age-appropriate design rules (for example the UK Children’s Code); parent view stays optional. |
| Do not raise anxiety | No daily score that shames; low days are met with support. Comfort diary answers never feed rewards. |
| Health first | Nothing rewards ignoring pain, wearing aligners while eating or drinking, or skipping cleaning. |
| Transparency | Profile › “How the app motivates you” explains the mechanisms in plain language. |
| Data | Engagement analytics only with consent, aggregated; no sale of data; no ad profiling from health data. |
| Review | Nudge copy and thresholds are reviewed by clinicians and a behavioural scientist; changes go into the content change log. |
| Experiments | A/B tests of nudges need an ethics review, patient-level opt-out and success measured by adherence, not by clicks. |

### 17.6 Practice side
Kudos (D-EN-01) and the milestones list (D-EN-03) let the practice take part in the motivation. The practice can switch gamification components on or off (D-EN-04).

### 17.7 Measuring
| Type | Measure |
|---|---|
| Primary | Wear-time adherence; unplanned refinements; appointment attendance |
| Secondary | Weekly active patients, check-in rate, fit-photo cadence |
| Guard | Gamification and product-link opt-outs, complaints, notification mute rate, comfort diary signals of stress, support tickets about “too many reminders” |

---

## 18. Further gaps found in review

| Gap | Decision |
|---|---|
| Onboarding is thin on motivation | In scope: personal “why”, goal date, meal pattern, short permission explanation, first-day video (S) |
| Education beyond text | **In scope:** videos on YouTube (3.20) |
| Practice branding | In scope: co-branded header within Dentsply Sirona design rules (S) |
| App store rating prompts | **In scope** (3.21) |
| Patient-reported outcomes | **In scope:** satisfaction surveys (3.22) |
| Photo use by the practice for a gallery | **Out of scope** (decided) |
| Referral programme | **Out of scope** (decided) |
| Health platform integration | Could, later: optional write of wear time to Apple Health or Health Connect with explicit consent |
| Accessibility of the journey | In scope: text equivalent, high contrast, large text, one-handed use (M) |
| Right-to-left languages | **In scope:** Arabic at launch (3.26) |
| After-hours emergency information | **In scope** (3.24) |
| Practice onboarding checklist | In scope: first 7 days checklist in the dashboard (S) |
| In-app help centre and support | In scope: help articles and a support form without health data; status page (S) |
| Discreet mode | **In scope** (3.23) |
| Patients without a smartphone | Practice handles it on paper or by phone (C) |
| Showing less | **In scope:** customize what is shown (3.25) |

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
- Chewies™ (Dentsply Sirona, FDA GUDID): https://accessgudid.nlm.nih.gov/devices/D746ACWR1
- Retainer Brite® instructions (Dentsply Sirona): https://assets.dentsplysirona.com/websites/dentsply_sirona_orthodontics/dfus/RTE-311-17_RB-Foam_RB-FDFU.pdf
- SureSmile aligner care booklet (kit with Chewies and Retainer Brite): https://www.suresmile.com/en/wp-content/uploads/2020/07/RTE-007-18_r2_SureSmileAlignerCareBooklet.pdf
- Reddit analysis r/Invisalign (Oct 2024 – Oct 2026), internal draft Option B
