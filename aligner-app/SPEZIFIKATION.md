# Aligner-Companion-App – Produktspezifikation

**Arbeitstitel:** Aligner Companion (Name noch offen)
**Version:** 0.1 (Entwurf) · **Stand:** 13.11.2026
**Plattformen:** Android (zuerst), iOS (später, gleiche Codebasis)
**Design:** Dentsply Sirona (DS) Corporate Design – nur mit Freigabe durch DS (siehe Kap. 9)

---

## 1. Ziel und Abgrenzung

### 1.1 Produktziel
Eine Patienten-App für die Aligner-Behandlung (z. B. SureSmile®), mit der Patientinnen und Patienten

1. ihre Aligner-Tragezeit und Schienenwechsel erfassen,
2. das SureSmile® VPro™-Vibrationsgerät per Bluetooth koppeln und steuern bzw. auslesen,
3. ihre Praxis kontaktieren (Anruf, sichere Nachricht, E-Mail),
4. geführte Fotos ihres Behandlungsstands aufnehmen und
5. diese Fotos sicher an die Praxis übermitteln.

Dazu kommt ein **Praxis-Portal (Web)**, in dem die Praxis Nachrichten, Fotos und Tragezeiten sieht. Ohne Gegenstelle bei der Praxis lassen sich Punkte 3 und 5 nicht sicher umsetzen.

### 1.2 Nicht im Umfang (Version 1)
- Keine automatische Diagnose und keine KI-Bewertung des Zahnstatus. Das hält die App in einer niedrigen MDR-Risikoklasse (siehe 7.1).
- Keine Behandlungsplanung und keine Anzeige der 3D-Planung (kann später per Praxis-Freigabe kommen).
- Keine Terminbuchung im Praxisverwaltungssystem (nur Anfrage per Nachricht).
- Keine Abrechnung oder Zahlung.

### 1.3 Nutzergruppen
| Rolle | Beschreibung | Kanal |
|---|---|---|
| Patient:in (P) | Erwachsene und Jugendliche ab 16 in Aligner-Behandlung | Mobile App |
| Erziehungsberechtigte (E) | Bei Patient:innen unter 16: Einwilligung und ggf. Mitnutzung | Mobile App |
| Behandler:in (B) | Kieferorthopäd:in oder Zahnärzt:in | Praxis-Portal |
| Praxisteam (T) | Assistenz, Rezeption | Praxis-Portal, eingeschränkte Rechte |
| Administrator (A) | Betrieb, Support (ohne Zugriff auf Gesundheitsdaten) | Admin-Konsole |

---

## 2. Marktanalyse: Womit andere werben

| App | Anbieter | Beworbene Funktionen | Lehre für uns |
|---|---|---|---|
| **SureSmile VPro** | Dentsply Sirona | Kopplung mit VPro-Gerät, Nutzung des Geräts tracken, Tragezeit tracken, Erinnerungen (Gerät, Schienenwechsel), Akkustand, Gerät finden | Direkte Referenz und Anknüpfungspunkt. Bewertung nur 2,7/5 (US App Store); Nutzer bemängeln Bugs und Support („no client email address“). Chance: stabiler und mit Praxiskontakt. |
| **My Invisalign** | Align Technology | Tragezeit-Log mit Timer, Wochen-/Monats-/Jahresansicht, Wechsel-Erinnerungen, Smile-Galerie mit Vorher/Nachher-Zeitraffer, Behandlungsplan-Ansicht nur auf Einladung der Praxis | Galerie und Zeitraffer motivieren stark; Praxis-Einladung als Onboarding-Modell. |
| **TrayMinder** | unabhängig | Timer, Teilen der Tragedaten per E-Mail/SMS an die Praxis, Erinnerung nach dem Essen, „Teethie“-Foto bei jedem Wechsel, automatische Zeitzonen-/Sommerzeit-Anpassung | Erinnerung „Schiene wieder rein“ ist sehr beliebt; Zeitzonen sauber behandeln. Teilen per unverschlüsselter E-Mail übernehmen wir **nicht**. |
| **AlignerPro** (Android) | unabhängig | Trage- und Pausenzeit, Foto-Zeitraffer, PDF-Bericht, Premium-Funktionen | PDF-Export für Praxisbesuch ist nützlich. |
| **TrioClear** | TrioClear | Praxis-Oberfläche sieht Fotos und Tragestatistik | Praxis-Gegenstelle ist Standard bei Herstellerlösungen. |
| **DentalMonitoring** | DentalMonitoring | Ärztlich verordnetes Fernmonitoring mit Scan-Aufsatz und KI-Auswertung | Höchste Ausbaustufe, aber Medizinprodukt höherer Klasse. Für uns frühestens in einer späteren Phase. |

**Ableitung, was im Markt erwartet wird (Pflicht):**
Tragezeit-Timer mit Tagesziel (meist 22 h), Wechsel-Erinnerungen, „Wieder einsetzen“-Erinnerung, Statistik, Foto-Galerie mit Vergleich, Teilen mit der Praxis.

**Wo wir uns abheben:**
1. Alles in einer App: Aligner, VPro und Praxis, statt getrennter Apps.
2. Sicherer Kanal zur Praxis statt E-Mail/SMS mit Gesundheitsdaten.
3. Geführte Fotoaufnahme mit Schablonen, damit die Praxis vergleichbare Bilder bekommt.
4. Nachweisbare Sicherheit (BSI TR-03161, DSGVO), als Verkaufsargument gegenüber Praxen.
5. Herstellerqualität: stabil, barrierefrei, mehrsprachig.

---

## 3. Funktionale Anforderungen

Priorität: **M** = Must (MVP), **S** = Should, **C** = Could (später).

### 3.1 Onboarding und Konto
| ID | Anforderung | Prio |
|---|---|---|
| F-ON-01 | Registrierung über **Einladungscode/QR-Code der Praxis**. Damit sind Patient:in und Praxis eindeutig verknüpft. | M |
| F-ON-02 | Anmeldung mit E-Mail und Passwort plus zweitem Faktor (TOTP oder Passkey). Danach Entsperren per Biometrie oder App-PIN. | M |
| F-ON-03 | Einwilligungen einzeln und widerrufbar einholen (DSGVO Art. 9): Verarbeitung von Gesundheitsdaten, Übermittlung an die Praxis, optionale Analyse. Jede Einwilligung wird mit Version und Zeitstempel protokolliert. | M |
| F-ON-04 | Altersprüfung; unter 16 Jahren Einwilligung der Erziehungsberechtigten. | M |
| F-ON-05 | Behandlungsdaten von der Praxis übernehmen: Anzahl Aligner, Wechselintervall (z. B. 7 oder 14 Tage), Tragezeitziel, Startdatum. Patient:in kann sie bei Bedarf manuell eintragen. | M |
| F-ON-06 | Konto löschen in der App (Pflicht in Google Play und App Store), inklusive Hinweis auf gesetzliche Aufbewahrungspflichten der Praxis. | M |

### 3.2 Aligner-Tracking
| ID | Anforderung | Prio |
|---|---|---|
| F-AL-01 | Großer Ein-Tipp-Schalter **„Aligner raus / Aligner rein“**. Die Tragezeit läuft standardmäßig mit, erfasst werden Pausen. | M |
| F-AL-02 | Tagesziel (Standard 22 h, von der Praxis einstellbar) als Fortschrittsring auf dem Startbildschirm. | M |
| F-AL-03 | Erinnerung, wenn eine Pause länger dauert als eingestellt (z. B. 30 min): „Aligner wieder einsetzen“. Eskalation nach weiteren 30 min. | M |
| F-AL-04 | Aktuelle Schiene „Nr. X von Y“, Tage bis zum nächsten Wechsel, Wechsel-Erinnerung am Wechseltag zur gewählten Uhrzeit. | M |
| F-AL-05 | Wechsel bestätigen. Optional die Tragedauer der aktuellen Schiene verlängern, wenn die Praxis das freigibt oder die Schiene nicht sitzt (mit Hinweis „Praxis informieren“). | M |
| F-AL-06 | Pausen nachträglich bearbeiten (vergessen zu stoppen). Änderungen werden protokolliert und für die Praxis gekennzeichnet. | M |
| F-AL-07 | Statistik: Tag, Woche, Monat, gesamte Behandlung; Durchschnitt; Tage mit erreichtem Ziel in Serie. | M |
| F-AL-08 | Zeitzonen- und Sommerzeitwechsel korrekt behandeln. Intern alles in UTC speichern. | M |
| F-AL-09 | Ersatzschienen und Retainer-Phase (nur nachts tragen) als eigener Modus. | S |
| F-AL-10 | Homescreen-Widget (Android) bzw. Live Activity und Widget (iOS) mit Timer und Schalter. | S |
| F-AL-11 | Wearable-Anbindung (Wear OS, watchOS) für den Schalter. | C |
| F-AL-12 | Motivation: Erfolgsabzeichen, Countdown bis zum Behandlungsende. | S |
| F-AL-13 | PDF-Bericht für den Praxistermin. | S |

### 3.3 SureSmile® VPro™ steuern (Bluetooth LE)
> **Wichtige Abhängigkeit:** Das Bluetooth-Protokoll des VPro ist proprietär. Diese Funktion lässt sich nur mit **Protokoll-Dokumentation oder SDK von Dentsply Sirona/Propel** umsetzen. Ohne diese Freigabe bleibt nur die manuelle Erfassung (F-VP-08). Klärung ist Voraussetzung für Phase 2.

| ID | Anforderung | Prio |
|---|---|---|
| F-VP-01 | Gerät koppeln (BLE), mehrere Geräte unterscheiden, entkoppeln. | M* |
| F-VP-02 | Sitzung starten und stoppen, soweit das Gerät das erlaubt; Restzeit der 5-Minuten-Sitzung anzeigen. | M* |
| F-VP-03 | Nutzungsdaten aus dem Gerät auslesen und synchronisieren, auch nachträglich für Sitzungen ohne Telefon in der Nähe. | M* |
| F-VP-04 | Akkustand anzeigen; Warnung bei niedrigem Akku. | M* |
| F-VP-05 | Tägliche Erinnerung an die VPro-Sitzung. | M* |
| F-VP-06 | Gerät finden (zuletzt bekannte Verbindung, Signalstärke). | S |
| F-VP-07 | Firmware-Update über die App (signiert, nur vom Hersteller). | C |
| F-VP-08 | Fallback: VPro-Sitzung manuell als erledigt markieren. | M |
| F-VP-09 | VPro-Nutzung erscheint in Statistik und Praxis-Portal. | M* |

\* Must, sobald das Protokoll freigegeben ist.

### 3.4 Praxis kontaktieren
| ID | Anforderung | Prio |
|---|---|---|
| F-KO-01 | Praxisprofil: Name, Behandler:in, Adresse mit Kartenlink, Telefon, Öffnungszeiten, Notfallnummer. | M |
| F-KO-02 | Direkt anrufen (Dialer des Systems). | M |
| F-KO-03 | **Sichere In-App-Nachrichten** an die Praxis: Text plus Fotos, Lesebestätigung, Push-Benachrichtigung bei Antwort. Ende-zu-Ende- bzw. Transportverschlüsselung und verschlüsselte Ablage, siehe 6. | M |
| F-KO-04 | **„E-Mail an die Praxis“** (siehe 3.4.1): Die Nachricht geht über den sicheren Kanal; die Praxis erhält auf ihre normale E-Mail-Adresse nur eine Benachrichtigung ohne Gesundheitsdaten mit Link ins Portal. | M |
| F-KO-05 | Vorlagen für häufige Anliegen: „Aligner passt nicht“, „Aligner verloren/gebrochen“, „Schmerzen“, „Attachment abgefallen“, „Termin verschieben“. Jede Vorlage fragt die nötigen Angaben strukturiert ab. | M |
| F-KO-06 | Hinweis im Nachrichtenbereich: „Kein Notfallkanal. Bei Notfällen anrufen: …“ | M |
| F-KO-07 | Terminanfrage mit Wunschzeiten (ohne PVS-Anbindung). | S |
| F-KO-08 | Videosprechstunde über einen zertifizierten Anbieter (KBV-Anlage 31b). | C |

#### 3.4.1 Warum keine normale E-Mail mit Fotos
Normale E-Mail ist zwischen den Servern oft nur optional verschlüsselt, liegt im Klartext in Postfächern und wird auf Geräten zwischengespeichert. Fotos des Gebisses und Gesundheitsangaben sind **Gesundheitsdaten nach Art. 9 DSGVO**. Für die Praxis gilt zusätzlich die ärztliche Schweigepflicht (§ 203 StGB). Deshalb:

- **Standardweg:** Nachricht und Fotos über den sicheren App-Kanal; E-Mail nur als inhaltsfreie Benachrichtigung.
- **Optionaler Weg (S):** Wenn die Praxis S/MIME oder PGP unterstützt, eine verschlüsselte E-Mail serverseitig erzeugen.
- **Ausnahme auf Wunsch:** Export über das Teilen-Menü des Betriebssystems an eine beliebige App, nur nach deutlichem Warnhinweis und ausdrücklicher Bestätigung. Für jeden Export einen Eintrag im Audit-Log anlegen.

### 3.5 Fotos des Behandlungsstands
| ID | Anforderung | Prio |
|---|---|---|
| F-FO-01 | Geführte Aufnahme in festen Ansichten: frontal mit Zähnen zusammen, rechts, links, Oberkiefer okklusal, Unterkiefer okklusal, Lächeln. Jede Ansicht mit Schablone (Overlay) und kurzer Anleitung, inklusive Hinweis auf Wangenhalter/Spiegel. | M |
| F-FO-02 | Qualitätshinweise vor dem Speichern: Schärfe, Helligkeit, Ausrichtung (lokal auf dem Gerät berechnet, keine Diagnose). | S |
| F-FO-03 | Fotos werden **nur verschlüsselt im App-Speicher** abgelegt, nicht in der System-Galerie und nicht im Cloud-Backup des Geräts. | M |
| F-FO-04 | Metadaten entfernen (EXIF, GPS). Zuordnung zu Datum und Aligner-Nummer. | M |
| F-FO-05 | Fotoserie mit einem Tipp an die Praxis senden, mit optionalem Kommentar. Status: gesendet, angekommen, angesehen. | M |
| F-FO-06 | Erinnerung an Fotoserie, z. B. bei jedem Schienenwechsel oder in einem von der Praxis gesetzten Intervall. | M |
| F-FO-07 | Galerie mit Vorher/Nachher-Vergleich (Schieberegler) und Zeitraffer pro Ansicht. | S |
| F-FO-08 | Die Praxis kann eine Fotoserie anfordern (Push an Patient:in). | S |
| F-FO-09 | Screenshot-Schutz in der Galerie (Android FLAG_SECURE; iOS Abdecken im App-Umschalter). | M |

### 3.6 Startbildschirm und Navigation
Untere Navigation mit fünf Bereichen:
1. **Heute:** Tragezeit-Ring, Schalter rein/raus, aktuelle Schiene, VPro-Status, nächste Aufgabe.
2. **Verlauf:** Statistik zu Tragezeit und VPro.
3. **Fotos:** Aufnahme und Galerie.
4. **Praxis:** Nachrichten, Kontakt, Termine.
5. **Profil:** Einstellungen, Erinnerungen, Datenschutz, Gerät, Hilfe.

### 3.7 Benachrichtigungen
- Lokale Benachrichtigungen für Tragezeit-, Wechsel- und VPro-Erinnerungen funktionieren auch offline.
- Push über FCM/APNs **ohne Gesundheitsdaten im Text**, z. B. „Neue Nachricht Ihrer Praxis“ statt des Inhalts.
- Ruhezeiten einstellbar.

### 3.8 Praxis-Portal (Web)
| ID | Anforderung | Prio |
|---|---|---|
| F-PP-01 | Anmeldung mit 2FA; Rollen Behandler:in und Team; Mandantentrennung je Praxis. | M |
| F-PP-02 | Patient:innen einladen (Code/QR), Behandlungsparameter setzen. | M |
| F-PP-03 | Posteingang für Nachrichten und Fotos, Zuweisung im Team, Antwortvorlagen. | M |
| F-PP-04 | Übersicht Compliance: Tragezeit und VPro-Nutzung je Patient:in, Ampel bei Unterschreitung. | M |
| F-PP-05 | Fotovergleich je Ansicht über die Zeit. | S |
| F-PP-06 | Export in die Patientenakte (PDF/Bild, später FHIR). | S |
| F-PP-07 | Anbindung an DS Core bzw. SureSmile-Software. | C |

---

## 4. Nicht-funktionale Anforderungen

| ID | Bereich | Anforderung |
|---|---|---|
| NF-01 | Plattformen | Android ab 10 (API 29), iOS ab 16. Smartphones; Tablets lauffähig. |
| NF-02 | Offline | Tracking, Erinnerungen und Fotoaufnahme funktionieren offline. Synchronisation bei Verbindung mit Konfliktlösung. |
| NF-03 | Performance | Kaltstart unter 2 s auf Mittelklasse-Geräten; Schalter rein/raus reagiert in unter 100 ms. |
| NF-04 | Zuverlässigkeit | Absturzfreie Sitzungen ≥ 99,8 %; Backend-Verfügbarkeit ≥ 99,5 %. |
| NF-05 | Akku | Keine dauerhafte Hintergrundaktivität. BLE nur bei Bedarf. Timer basiert auf Zeitstempeln statt auf laufendem Dienst. |
| NF-06 | Barrierefreiheit | WCAG 2.2 AA bzw. EN 301 549 (Barrierefreiheitsstärkungsgesetz, seit 28.06.2025). Unterstützung von TalkBack/VoiceOver, dynamische Schriftgröße, Kontrast ≥ 4,5:1, Bedienelemente ≥ 48 dp. |
| NF-07 | Sprachen | Deutsch und Englisch zum Start; weitere Sprachen über Übersetzungsdateien. Formate für Datum und Zahlen nach Gebietsschema. |
| NF-08 | Dark Mode | Unterstützt, sofern die DS-Richtlinien es zulassen. |

---

## 5. Architektur (Empfehlung)

### 5.1 Mobile App: Flutter
Begründung: eine Codebasis und eine UI für Android und iOS, also identisches DS-Design auf beiden Plattformen; ausgereifte Bibliotheken für BLE, Kamera und sichere Speicherung; ein Team statt zwei.
Alternative: Kotlin Multiplatform mit Compose Multiplatform, wenn das Team Kotlin-lastig ist.

Plattformnahe Teile werden nativ angebunden: Android Keystore und iOS Secure Enclave, Widgets, Live Activities, gegebenenfalls ein BLE-SDK des Herstellers.

Für IEC 62304 gilt: Jede Drittbibliothek wird als SOUP mit Version, Zweck und Risikobewertung geführt. Abhängigkeiten bewusst klein halten.

### 5.2 Backend
- Hosting in der EU (Deutschland bevorzugt) bei einem Anbieter mit **BSI-C5-Testat**, ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO) liegt vor.
- API: REST oder GraphQL über TLS 1.3, Datenmodell an **HL7 FHIR R4** angelehnt (Patient, Observation, Media, Communication, Consent), damit spätere Schnittstellen zu Praxissoftware einfacher werden.
- Komponenten: Identitätsdienst (OIDC), Messaging-Dienst, Medien-Speicher (verschlüsselter Objektspeicher), Benachrichtigungsdienst, Audit-Log (manipulationssicher), Praxis-Portal.

### 5.3 Lokale Datenhaltung
- Verschlüsselte Datenbank (SQLCipher o. Ä.), Schlüssel im Keystore bzw. in der Secure Enclave.
- Fotos als verschlüsselte Dateien im App-Container, vom Systembackup ausgeschlossen.

---

## 6. Sicherheit und Datenschutz

### 6.1 Maßgebliche Regelwerke
| Regelwerk | Bedeutung für die App |
|---|---|
| **DSGVO**, insb. Art. 9, 25, 32, 35 | Gesundheitsdaten, Datenschutz durch Technikgestaltung, Sicherheit der Verarbeitung, Datenschutz-Folgenabschätzung ist Pflicht. |
| **BDSG § 22** | Zusätzliche Schutzmaßnahmen für Gesundheitsdaten. |
| **§ 203 StGB** | Schweigepflicht der Praxis; Dienstleister müssen entsprechend verpflichtet werden. |
| **BSI TR-03161** (Teil 1 mobile Anwendungen, Teil 3 Hintergrundsysteme) | Technische Sicherheitsrichtlinie für Gesundheits-Apps; Pflicht für DiGA, hier als Sicherheitsmaßstab verwendet. |
| **OWASP MASVS L2** und MASTG | Prüfmaßstab für Penetrationstests der App. |
| **ISO/IEC 27001** und **BSI C5** | Informationssicherheits-Managementsystem beim Betreiber; Cloud-Testat. |
| **MDR (EU 2017/745)**, IEC 62304, ISO 14971, IEC 62366-1, ISO 13485, IEC 82304-1 | Falls die App als Medizinprodukt eingestuft wird (siehe 7). |
| **Barrierefreiheitsstärkungsgesetz / EN 301 549** | Barrierefreiheit. |
| **Google Play Health Apps Policy**, Apple App Review 5.1.3 | Gesundheitsdaten nicht für Werbung, Datenschutzerklärung, Löschfunktion. |
| **HIPAA** | Nur bei späterem Vertrieb in den USA. |

### 6.2 Technische Maßnahmen (Auszug)
| ID | Maßnahme |
|---|---|
| S-01 | TLS 1.3, Certificate Pinning, kein Klartextverkehr (Android Network Security Config, iOS ATS). |
| S-02 | Verschlüsselung im Ruhezustand: auf dem Gerät AES-256 mit hardwaregestützten Schlüsseln; auf dem Server pro Mandant mit KMS bzw. HSM. |
| S-03 | Nachrichten und Fotos Ende-zu-Ende zwischen App und Praxis-Portal verschlüsselt (Zielbild). Mindestens: Transport- plus Ablageverschlüsselung mit strikter Zugriffskontrolle. |
| S-04 | Authentifizierung nach OIDC mit PKCE; 2FA; Biometrie bzw. PIN zum Entsperren; automatische Sperre nach Inaktivität (Standard 5 min). |
| S-05 | Kurzlebige Zugriffstoken, Refresh-Token im Keystore, Geräte-Bindung, Sitzungen in der App widerrufbar. |
| S-06 | Keine Gesundheitsdaten in Logs, Crash-Reports, Push-Texten, Analysetools oder URLs. |
| S-07 | Keine Werbe- oder Tracking-SDKs. Analyse nur nach Einwilligung, anonymisiert, EU-gehostet. |
| S-08 | Root- bzw. Jailbreak-Erkennung mit Warnhinweis; Integritätsprüfung über Play Integrity API und App Attest. |
| S-09 | Screenshot-Schutz für sensible Ansichten; Inhalte im App-Umschalter verdecken. |
| S-10 | BLE: gesicherte Kopplung (LE Secure Connections), nur bekannte Geräte, Firmware nur signiert. |
| S-11 | Audit-Log für Zugriffe, Exporte, Einwilligungen und Löschungen. |
| S-12 | Rechte- und Rollenkonzept im Portal nach dem Prinzip der minimalen Rechte; Mandantentrennung. |
| S-13 | Sicherer Entwicklungsprozess: Threat Modeling (STRIDE), SAST/DAST, Prüfung der Abhängigkeiten (SBOM), Code-Review, jährlicher externer Penetrationstest nach MASVS und TR-03161. |
| S-14 | Löschkonzept mit Fristen; Datenexport für Patient:innen (Art. 15 und 20 DSGVO). |
| S-15 | Prozess für Sicherheitsvorfälle und Meldung binnen 72 h (Art. 33 DSGVO). |

### 6.3 Pflichtdokumente
Verzeichnis der Verarbeitungstätigkeiten, Datenschutz-Folgenabschätzung, Datenschutzerklärung (App und Store), Einwilligungstexte, Auftragsverarbeitungsverträge mit Praxen und Dienstleistern, Rollen- und Berechtigungskonzept, Löschkonzept, Sicherheitskonzept bzw. Threat Model.

---

## 7. Regulatorik

### 7.1 Medizinprodukt oder nicht?
Die Einstufung hängt von der **Zweckbestimmung** ab und muss vor Entwicklungsbeginn schriftlich festgelegt werden:

- **Kein Medizinprodukt** ist wahrscheinlich: Tragezeit-Tagebuch, Erinnerungen, Kommunikation, Fotos ohne Auswertung. Die App dient dann der Organisation und Kommunikation.
- **Medizinprodukt**, meist Klasse I oder IIa nach MDR Anhang VIII Regel 11, liegt vor, sobald die App eigenständig medizinische Informationen erzeugt. Beispiele: automatische Bewertung des Aligner-Sitzes aus Fotos, Empfehlungen zum Schienenwechsel auf Basis von Daten, Steuerung von Therapieparametern.
- **VPro-Steuerung:** Das VPro ist selbst ein Medizinprodukt. Eine App, die es steuert, kann als **Zubehör** gelten und unterliegt dann der MDR. Mit Dentsply Sirona Regulatory abstimmen.

**Empfehlung:** Version 1 bewusst ohne Diagnose- und Auswertungsfunktionen gestalten. Trotzdem nach IEC 62304 und ISO 14971 entwickeln, damit eine spätere Höherstufung (z. B. KI-Fotoauswertung) ohne Neuentwicklung möglich ist.

### 7.2 Weitere Punkte
- Eine Einordnung als DiGA ist für Aligner-Begleitung derzeit nicht realistisch und nicht nötig. TR-03161 dient trotzdem als Sicherheitsmaßstab.
- Store-Einordnung: Kategorie „Medizin“ bzw. „Gesundheit“, Data-Safety- und Privacy-Nutrition-Labels korrekt ausfüllen.

---

## 8. Datenmodell (vereinfacht)

```
Patient ── gehört zu ── Praxis
   │
   ├── Behandlung (Startdatum, Anzahl Aligner, Wechselintervall, Tragezeitziel, Phase)
   │      └── Aligner (Nr., Start, Ende, verlängert?)
   ├── Tragepause (Start UTC, Ende UTC, manuell bearbeitet?, Quelle)
   ├── VProSitzung (Start, Dauer, Quelle: Gerät oder manuell)
   ├── VProGeraet (ID, Kopplung, Akku, Firmware)
   ├── Fotoserie (Datum, Aligner-Nr., Status) ── Foto (Ansicht, Datei verschlüsselt, Hash)
   ├── Nachricht (Thread, Absender, Text, Anhänge, Status)
   ├── Einwilligung (Typ, Version, erteilt, widerrufen)
   └── Erinnerung (Typ, Zeit, aktiv)
```

---

## 9. Design: Dentsply Sirona

> **Rechtlicher Hinweis:** Name, Logo, Farben und Schrift von Dentsply Sirona sowie die Marken SureSmile® und VPro™ sind geschützt. Die App darf nur **im Auftrag oder mit schriftlicher Lizenz von Dentsply Sirona** in deren Corporate Design veröffentlicht werden. Ohne diese Freigabe ein neutrales Design verwenden und VPro nur beschreibend nennen (z. B. „kompatibel mit …“, wenn vertraglich erlaubt).

Vorgehen:
1. Offizielle Unterlagen beim DS-Markenportal oder Marketing anfragen: Farbpalette (Primärblau und Sekundärfarben), Typografie, Logo-Regeln, Bildsprache, Icons, Vorgaben für digitale Produkte. Gegebenenfalls DS-Core-UI-Komponenten verwenden.
2. Daraus **Design-Tokens** anlegen (Farben, Schriftgrößen, Abstände, Radien, Schatten) und als Flutter-Theme umsetzen, damit Android und iOS identisch aussehen.
3. Grundsätze bis zur Freigabe (Platzhalter):
   - Klinisch-klar, viel Weißraum, ruhige Farbflächen, eine Primärfarbe für Aktionen.
   - Statusfarben (Erfolg, Warnung, Fehler) nie als einziges Signal; immer mit Symbol oder Text.
   - Fotos und Illustrationen freundlich, nicht klinisch-abschreckend.
   - Alle Farbkombinationen auf Kontrast (WCAG AA) prüfen.
4. Klickbarer Prototyp (Figma) für die fünf Hauptbereiche; Test mit 5–8 Patient:innen und 2–3 Praxen vor der Entwicklung.

---

## 10. Umsetzungsphasen

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **0 – Klärung** (2–4 Wo.) | Zweckbestimmung und MDR-Einstufung, DS-Freigabe für Design und VPro-Protokoll, DSFA-Entwurf, Threat Model, Hosting-Auswahl | Freigegebene Spezifikation |
| **1 – MVP Android** | Onboarding, Aligner-Tracking, Erinnerungen, Fotoaufnahme, sichere Nachrichten, Basis-Praxisportal | Geschlossener Test mit Pilotpraxen |
| **2 – VPro und Ausbau** | BLE-Anbindung VPro, Statistik, Galerie und Vergleich, Widgets, PDF-Bericht | Öffentlicher Release Android |
| **3 – iOS** | iOS-Build aus gleicher Codebasis, Live Activities, App-Store-Freigabe | Release iOS |
| **4 – Erweiterung** | Wearables, Videosprechstunde, Anbindung DS Core/FHIR, optional KI-Fotoauswertung (dann MDR-Klasse prüfen) | Roadmap |

Vor jedem Release: externer Penetrationstest, Barrierefreiheitsprüfung, Datenschutz-Review.

---

## 11. Abnahmekriterien (Beispiele)
- **F-AL-01:** Patient:in tippt „Aligner raus“, schließt die App und startet das Telefon neu. Nach 45 min tippt sie „Aligner rein“. Die Pause wird mit 45 min ±1 min erfasst.
- **F-AL-03:** Bei einer Pause über 30 min erscheint eine Benachrichtigung, auch im Flugmodus.
- **F-FO-03:** Nach der Aufnahme taucht kein Foto in der System-Galerie auf; die Dateien im App-Container sind ohne Schlüssel nicht lesbar.
- **F-KO-04:** Die Benachrichtigungs-E-Mail an die Praxis enthält weder Namen noch Nachrichtentext noch Fotos.
- **S-06:** Eine automatisierte Prüfung findet in Logs und Crash-Reports keine Felder mit Gesundheitsdaten.

---

## 12. Offene Fragen
1. Entsteht die App **im Auftrag von Dentsply Sirona** oder unabhängig? Davon hängen Design, Markennutzung und der Zugang zum VPro-Protokoll ab.
2. Gibt es Zugang zu einem **VPro-SDK bzw. zur BLE-Protokolldokumentation**?
3. Welche Praxen nutzen das Portal, und soll eine Anbindung an bestehende Praxissoftware (PVS) erfolgen?
4. Zielmärkte zum Start: nur Deutschland/DACH oder EU? USA (HIPAA) später?
5. Wer betreibt das Backend (Verantwortlicher bzw. Auftragsverarbeiter nach DSGVO)?
6. Soll es ein Geschäftsmodell geben (kostenlos über die Praxis, Lizenz pro Praxis)?
7. Mindestalter der Nutzer:innen; Jugendliche sind bei Alignern häufig.

---

## Quellen (Marktanalyse und Regulatorik)
- SureSmile VPro App (App Store): https://apps.apple.com/us/app/suresmile-vpro/id1644889526
- SureSmile VPro (Dentsply Sirona): https://dentsplysirona.com/en/discover/discover-by-brand/suresmile-aligners/suresmile-vpro.html
- My Invisalign App: https://invisalign.com/provider/virtual-solutions/my-invisalign-app
- TrayMinder: https://apps.apple.com/us/app/trayminder/id1320684802
- AlignerPro: https://play.google.com/store/apps/details?id=com.alignerpro
- TrioClear: https://apps.apple.com/app/id1631479021
- BSI TR-03161 und C5 (PwC): https://www.pwc.de/de/risk-regulatory/tr-03161-und-c5-das-fundament-fuer-sichere-digitale-gesundheitsanwendungen.html
- Datenschutz- und Sicherheitsanforderungen an Gesundheits-Apps (Johner Institut): https://international.johner-institute.com/articles/regulatory-affairs/and-more/data-security-and-protection-requirements-for-digital-health-applications/
