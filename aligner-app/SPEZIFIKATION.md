# Aligner Companion – Produktspezifikation

**Version:** 0.2 (Entwurf) · **Stand:** 13.11.2026
**Plattformen:** Patienten-App für Android (zuerst) und iOS aus einer Codebasis; Praxis-Dashboard als Web-App
**Design:** Dentsply Sirona Corporate Design
**Eingeflossen:** Version 0.1 dieser Spezifikation und der Entwurf „Aligner Compliance Monitoring App – Option B“ (v0.1)

### Änderungen gegenüber Version 0.1
- Neuer Schwerpunkt: **Unsicherheit der Patient:innen auflösen**, nicht nur an die Tragezeit erinnern. Das stützt die Reddit-Auswertung aus Option B (Kap. 1.2).
- Neu: Symptom-Check „Ist das normal?“, Meldung bei verlorenem oder gebrochenem Aligner mit der Standardanweisung der Praxis, Alltags-Ratgeber, neutrale Wochenzusammenfassung, Elternansicht.
- Fotos: Der **Passform-Check mit 3 Ansichten** ist jetzt Standard. Die vollständige Serie mit 6 Ansichten gibt es optional, wenn die Praxis sie anfordert. Die Patient:innen erhalten **keine automatische Bewertung**.
- Praxis-Dashboard ausgebaut: Patientenliste nach Handlungsbedarf, Alarme nach Regeln, Fotobewertung, Aktionen, Audit-Trail, Import der SureSmile-Behandlungsplanung.
- Pausen-Erinnerung jetzt standardmäßig nach **45 min** (vorher 30 min), von der Praxis begrenzt.
- Regulatorik: Umfangsvarianten B1, B2 und B3 für EU und USA. Empfehlung: Start als B1.
- Neu: Erfolgskennzahlen, offene Entscheidungen, nächste Schritte.
- Bleibt erhalten: die Anbindung von SureSmile® VPro™ (in Option B nicht enthalten).

---

## 1. Ziel und Umfang

### 1.1 Produktziel
Die App soll die **Therapietreue in der Aligner-Behandlung verbessern**. Dazu erfasst sie die Tragezeit, lässt die Passform per Foto prüfen, beantwortet die Frage „Ist das normal?“ und meldet der Praxis früh, wenn etwas nicht stimmt. Sie besteht aus einer Patienten-App und einem Praxis-Dashboard. Für SureSmile®-Patient:innen bindet sie zusätzlich das VPro™-Gerät an.

**Im Umfang:**
- **Option A:** Tragezeit erfassen, Erinnerungen, Ratgeber.
- **Option B:** Passform-Fotos, Symptom-Check, Praxis-Dashboard mit Alarmen.
- VPro-Anbindung.

**Nicht im Umfang (Option C):**
- eigene Sensor-Hardware, außer dem bestehenden VPro und optional einer Smart-Case (C)
- automatische Entscheidungen über den Aligner-Wechsel
- automatische Bewertung der Passform gegenüber Patient:innen
- Behandlungsplanung, Abrechnung, Terminbuchung direkt im Praxisverwaltungssystem

**Grundsatz:** Die klinische Verantwortung liegt immer bei der Behandlerin oder dem Behandler. Die App informiert, sie ordnet nie selbst eine Änderung der Behandlung an.

### 1.2 Warum dieser Umfang
Ausgewertet wurden 32.587 Beiträge im Forum r/Invisalign (Okt. 2024 – Okt. 2026). Patient:innen kämpfen dort vor allem mit **Unsicherheit**, weniger mit dem Vergessen des Tragens. Die Zahlen stammen aus einem groben Schlagwortabgleich, der nicht von Hand geprüft wurde. Sie zeigen nur die Größenordnung.

| Thema | Beiträge | Anteil | Kommentare/Beitrag | Antwort in der App |
|---|---|---|---|---|
| „Ist das normal?“ / Unsicherheit | ~3.800 | 11,6 % | 7,5 | Symptom-Check (P-SY) |
| Passform / Tracking (Lücken, Chewies) | ~2.400 | 7,5 % | 7,2 | Passform-Foto, Praxisbewertung (P-FO, D-03) |
| Zeitpunkt des Wechsels | ~1.500 | 4,7 % | 8,4 | Wechselplan, Verlängerung durch die Praxis (P-AL) |
| Tragezeit (22 h) | ~1.200 | 3,6 % | 11,2 | Tracking, Erinnerungen (P-TZ) |
| Reisen / soziale Situationen | ~1.000 | 3,1 % | 9,9 | Ratgeber, Reise-Checkliste (P-RA) |
| Verlorene / gebrochene Aligner | ~900 | 2,8 % | 6,2 | Meldung mit Standardanweisung (P-VG) |
| Essen und Trinken | ~900 | 2,8 % | 16,4 | Ratgeber (P-RA) |
| Apps / Tracker | ~430 | 1,3 % | 7,3 | – |

**Folgerung für das Produkt:** Der Passform-Check und die Einordnung „Ist das normal?“ wiegen schwerer als ein Timer. Erst die Verbindung zur Praxis macht aus Patientendaten ein Signal, auf das Behandelnde reagieren können.

### 1.3 Rollen
| Rolle | Kanal | Hauptbedürfnis |
|---|---|---|
| Patient:in (erwachsen) | Patienten-App | Wissen, ob die Behandlung im Plan ist; wenig Aufwand, kein schlechtes Gewissen |
| Patient:in (jugendlich) + Elternteil | Patienten-App, Elternansicht | Privatsphäre der Jugendlichen gegen Aufsicht der Eltern abwägen; Motivation |
| Kieferorthopäd:in / Zahnärzt:in | Praxis-Dashboard | Sehen, wer Aufmerksamkeit braucht, ohne jedes Foto prüfen zu müssen |
| Praxisteam | Praxis-Dashboard | Alarme sichten, Nachrichten beantworten, Termine vergeben |
| Praxis-Administration | Admin-Bereich | Nutzer:innen, Rechte, Alarmschwellen, Datenexport |
| Betrieb Dentsply Sirona | Betriebskonsole | Technischer Support **ohne** Zugriff auf Gesundheitsdaten |

---

## 2. Marktanalyse: Womit andere werben

| App | Beworbene Funktionen | Lehre für uns |
|---|---|---|
| **SureSmile VPro** (Dentsply Sirona) | VPro koppeln, Nutzung und Tragezeit tracken, Erinnerungen, Akkustand, Gerät finden | Wird integriert. Die App hat nur 2,7/5 Sterne (US App Store); Nutzer bemängeln Bugs und Support. |
| **My Invisalign** (Align) | Tragezeit-Timer mit Statistik, Erinnerungen, Smile-Galerie mit Zeitraffer, Behandlungsplan nur auf Einladung der Praxis | Galerie motiviert; die Praxis-Einladung ist das übliche Onboarding. |
| **TrayMinder** | Timer, Teilen per E-Mail/SMS, Erinnerung nach dem Essen, Foto bei jedem Wechsel, Zeitzonen | „Wieder einsetzen“-Erinnerung ist beliebt; Teilen per unverschlüsselter E-Mail übernehmen wir nicht. |
| **AlignerPro** | Pausen-Tracking, Zeitraffer, PDF-Bericht | PDF für den Praxistermin ist nützlich. |
| **TrioClear** | Praxis sieht Fotos und Tragestatistik | Eine Gegenstelle in der Praxis ist Standard. |
| **DentalMonitoring** | Ärztlich verordnetes Fernmonitoring mit Scan-Aufsatz und KI | Entspricht unserer Stufe B2/B3; reguliertes Medizinprodukt. |

**Wo wir uns abheben:** Unsicherheit wird aufgelöst (Symptom-Check, Passform-Check), alles läuft in einer App (Aligner, VPro, Praxis), die Behandlungsplanung kommt direkt aus SureSmile, Nachrichten laufen über einen sicheren Kanal statt per E-Mail, und die Formulierungen sind wertschätzend statt beschämend.

---

## 3. Funktionale Anforderungen: Patienten-App

Priorität: **M** = Must (Release 1), **S** = Should, **C** = Could. Die Spalte „Ref.“ verweist auf die ID im Entwurf Option B.

### 3.1 Onboarding und Konto (P-ON)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-ON-01 | Registrierung per Einladungscode oder QR-Code der Praxis. Die Behandlungsplanung wird von der Praxis übernommen: Gesamtzahl der Aligner, Wechselintervall, Startdatum, **Attachment- und IPR-Termine**. | M | P-01 |
| P-ON-02 | Anmeldung mit E-Mail und Passwort plus zweitem Faktor (TOTP oder Passkey). Danach Entsperren per Biometrie oder PIN. | M | |
| P-ON-03 | Einzelne, widerrufbare Einwilligungen (Art. 9 DSGVO), jeweils mit Version und Zeitstempel protokolliert. Die **Sekundärnutzung** (anonymisierte Forschung) wird gesondert und optional abgefragt. | M | N-05, N-09 |
| P-ON-04 | Einwilligung je nach Alter und Markt; bei Minderjährigen Einbindung der Eltern. | M | N-07 |
| P-ON-05 | Konto in der App löschen; Hinweis auf die Aufbewahrungspflichten der Praxis. | M | |

### 3.2 Tragezeit (P-TZ)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-TZ-01 | „Raus“ und „Rein“ mit einem Tipp, **höchstens 2 Taps** auch von Sperrbildschirm oder Widget. Tagessumme gegen das Ziel (Standard 22 h, von der Praxis festgelegt). | M | P-02, N-02 |
| P-TZ-02 | Erinnerung, wenn die Aligner länger als eingestellt draußen sind. **Standard 45 min**; Patient:innen können den Wert innerhalb der Grenzen der Praxis anpassen. Eine zweite Erinnerung folgt nach weiteren 30 min. | M | P-03 |
| P-TZ-03 | Pausen nachträglich bearbeiten. Die Änderungen werden protokolliert und im Dashboard gekennzeichnet. | M | |
| P-TZ-04 | Statistik für Tag, Woche, Monat; Serie von Tagen mit erreichtem Ziel. | M | |
| P-TZ-05 | **Wochenzusammenfassung** mit neutraler, ermutigender Sprache, **ohne Beschämung**. Beispiel: „6 von 7 Tagen im Ziel“ statt „Sie haben 1 Tag verfehlt“. | S | P-13 |
| P-TZ-06 | Zeitzonen und Sommerzeit korrekt behandeln; intern UTC. | M | |
| P-TZ-07 | Widget (Android) bzw. Widget und Live Activity (iOS). | S | |
| P-TZ-08 | Optional: Tragezeit über eine Smart-Case erfassen (Bluetooth erkennt Öffnen/Schließen) statt per Tipp. | C | P-15 |
| P-TZ-09 | Erfassen offline möglich, Synchronisation später. | M | P-16 |

### 3.3 Aligner-Wechsel und Fortschritt (P-AL)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-AL-01 | Erinnerung an den Wechsel nach Plan; Patient:in bestätigt den Wechsel. | M | P-04 |
| P-AL-02 | Wenn der Aligner noch nicht sitzt: „Praxis fragen“ statt selbst zu verlängern. Die Praxis kann den aktuellen Aligner verlängern (D-05); das Ergebnis erscheint in der App. | M | D-05 |
| P-AL-03 | Fortschritt: Aligner X von Y, Foto-Zeitleiste, verbleibende Wochen. **Refinements (Korrekturschienen) werden als normaler Teil der Behandlung erklärt.** | S | P-11 |
| P-AL-04 | Termine für Attachments und IPR in der Zeitleiste, mit Erklärung. | S | P-01 |
| P-AL-05 | Retainer-Phase als eigener Modus (z. B. nur nachts). | S | |
| P-AL-06 | PDF-Bericht für den Termin. | S | |

### 3.4 Passform-Fotos (P-FO)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-FO-01 | **Geführtes Passform-Foto in 3 Ansichten** (frontal, links, rechts) mit **eingesetzten Alignern**, Schablone auf dem Bildschirm und Anleitung. | M | P-05 |
| P-FO-02 | Vor dem Hochladen werden Schärfe, Licht und Bildausschnitt geprüft, lokal auf dem Gerät. Die ganze Sitzung dauert **höchstens 2 min** inklusive Wiederholungen. | M | P-05, N-02 |
| P-FO-03 | Rhythmus legt die Praxis fest (Standard: bei jedem Wechsel); Erinnerung in der App. | M | P-06 |
| P-FO-04 | Erweiterte Serie mit 6 Ansichten (zusätzlich Ober- und Unterkiefer okklusal, Lächeln), **nur wenn die Praxis sie anfordert**. | S | D-05 |
| P-FO-05 | **Rückmeldung an Patient:innen in Release 1 nur „Erhalten“ oder „Ihre Praxis meldet sich“.** Keine automatische Bewertung der Passform (siehe Kap. 8). | M | P-07 |
| P-FO-06 | Fotos nur verschlüsselt im App-Speicher, **nicht in der Galerie**, kein Cloud-Backup; EXIF- und GPS-Daten entfernt. | M | N-08 |
| P-FO-07 | Galerie mit Vorher/Nachher und Zeitraffer. | S | P-11 |
| P-FO-08 | Screenshot-Schutz in der Galerie. | M | |

### 3.5 Symptom-Check „Ist das normal?“ (P-SY)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-SY-01 | Strukturierte Fragen zu den Themen **Schmerz/Druck, Weichgewebe (Wange, Zunge), Sprechen, Attachments, Bruch, Zahnfleisch, Passform/Lücke**. | M | P-08 |
| P-SY-02 | Ergebnis in drei Stufen: **normal / beobachten / Praxis kontaktieren**, jeweils mit verständlicher Erklärung und Hinweisen zur Selbsthilfe. | M | P-08 |
| P-SY-03 | Inhalte und Entscheidungsregeln **von Behandelnden freigegeben** und versioniert. Die Praxis kann eigene Hinweise ergänzen. | M | P-08 |
| P-SY-04 | Bei „Praxis kontaktieren“: Mit einem Tipp geht eine Nachricht mit allen Antworten an die Praxis. Das Ergebnis löst zusätzlich einen Alarm im Dashboard aus (D-02). | M | D-02 |
| P-SY-05 | Bei Warnzeichen (z. B. Schwellung, Fieber, Verletzung) erscheint sofort der Hinweis auf die Notfallnummer. | M | |

> Regulatorische Einordnung: Der Symptom-Check ist eine **Funktion, die die Einstufung bestimmt** (Kap. 8). Für B1 wird er als allgemeine Information gestaltet, mit festen, von Behandelnden freigegebenen Inhalten und ohne individuelle Diagnose.

### 3.6 Aligner verloren oder gebrochen (P-VG)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-VG-01 | Meldung „verloren“ oder „gebrochen“, bei Bruch mit Foto. | M | P-09 |
| P-VG-02 | Die App zeigt die **Standardanweisung der Praxis** an, z. B. „vorherigen Aligner tragen“ oder „nächsten Aligner tragen, wenn der aktuelle schon mindestens X Tage getragen wurde“. | M | P-09 |
| P-VG-03 | Die Praxis wird benachrichtigt (Alarm D-02); im Dashboard kann sie einen Ersatz bestellen (D-09). | M | P-09 |

### 3.7 Praxiskontakt und Nachrichten (P-KO)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-KO-01 | Praxisprofil: Behandler:in, Adresse, Telefon, Öffnungszeiten, Notfallnummer; direkt anrufen. | M | |
| P-KO-02 | **Sichere Nachrichten** an die Praxis, auch mit Fotos; Lesebestätigung; Push bei Antwort. | M | P-10 |
| P-KO-03 | „E-Mail an die Praxis“: Die Nachricht läuft über den sicheren Kanal. Die Praxis erhält per E-Mail **nur einen Hinweis ohne Inhalt** mit Link ins Dashboard (Begründung in 3.7.1). | M | |
| P-KO-04 | Vorlagen für häufige Anliegen; jede fragt die nötigen Angaben strukturiert ab. | M | |
| P-KO-05 | Hinweis „kein Notfallkanal“ mit Notfallnummer. | M | |
| P-KO-06 | Terminanfrage; die Praxis bestätigt über das Dashboard (D-05). | S | D-05 |

#### 3.7.1 Warum keine normale E-Mail mit Fotos
Fotos und Gesundheitsangaben sind Gesundheitsdaten nach Art. 9 DSGVO; in den USA gelten sie als PHI nach HIPAA. Normale E-Mail ist nicht verlässlich Ende-zu-Ende verschlüsselt. Deshalb ist der Standardweg der sichere Kanal. Ein Export über das Teilen-Menü des Betriebssystems ist nur nach Warnhinweis möglich und wird im Audit-Log vermerkt.

### 3.8 Ratgeber (P-RA)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-RA-01 | Alltagstipps zu Essen, Trinken (Kaffee, Tee, Rotwein, Zucker), Reinigen, Verfärbungen. | S | P-12 |
| P-RA-02 | Reise-Checkliste (Ersatz-Aligner, Etui, Zahnbürste, Zeitzonen) und Tipps für soziale Situationen. | S | P-12 |
| P-RA-03 | Erklärungen zu Attachments, IPR, Chewies und Refinements. | S | P-11 |
| P-RA-04 | Inhalte werden zentral gepflegt, von Behandelnden freigegeben und sind ohne App-Update änderbar. | S | |

### 3.9 Elternansicht (P-EL)
| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| P-EL-01 | Für Minderjährige kann eine Elternansicht eingeladen werden. **Patient:in, Eltern und Praxis vereinbaren, was sie sieht**, z. B. nur Tragezeit-Status und Termine, keine Nachrichten. | S | P-14 |
| P-EL-02 | Jugendliche sehen jederzeit, was geteilt wird. | S | P-14 |

### 3.10 SureSmile® VPro™ (P-VP)
> **Abhängigkeit:** Das BLE-Protokoll bzw. SDK muss intern freigegeben werden. Ohne Freigabe gibt es nur die manuelle Erfassung (P-VP-06).

| ID | Anforderung | Prio |
|---|---|---|
| P-VP-01 | Gerät koppeln (BLE Secure Connections), entkoppeln, mehrere Geräte unterscheiden. | M* |
| P-VP-02 | Sitzung starten und stoppen; Restzeit der 5 Minuten anzeigen. | M* |
| P-VP-03 | Nutzungsdaten auslesen und synchronisieren, auch nachträglich. | M* |
| P-VP-04 | Akkustand; Gerät finden. | M* / S |
| P-VP-05 | Tägliche Erinnerung; die Nutzung erscheint in der Statistik und im Dashboard. | M* |
| P-VP-06 | Fallback: Sitzung manuell als erledigt markieren. | M |
| P-VP-07 | Signiertes Firmware-Update. | C |

\* Must, sobald das Protokoll freigegeben ist.

### 3.11 Navigation der App
Untere Navigation mit fünf Bereichen:
1. **Heute:** Status „im Plan“, Tragezeit-Ring, Schalter raus/rein, Aligner X von Y, VPro, fällige Aufgaben, Wochenzusammenfassung.
2. **Fotos:** Passform-Check, Galerie, gesendete Serien.
3. **Hilfe:** „Ist das normal?“, Aligner verloren oder gebrochen, Ratgeber.
4. **Praxis:** Nachrichten, Kontakt, Termine.
5. **Profil:** Behandlung, Erinnerungen, Elternansicht, Datenschutz, Gerät.

Den Verlauf (Statistik) erreicht man über „Heute“.

### 3.12 Benachrichtigungen
Lokale Erinnerungen funktionieren offline. Push-Nachrichten enthalten **nie Gesundheitsdaten**; Ruhezeiten sind einstellbar.

---

## 4. Funktionale Anforderungen: Praxis-Dashboard (Web)

| ID | Anforderung | Prio | Ref. |
|---|---|---|---|
| D-01 | Patientenliste **sortiert nach Handlungsbedarf** mit Status: **im Plan / beobachten / Handlung nötig**. | M | D-01 |
| D-02 | Alarme nach Regeln; Schwellen setzt jede Praxis selbst (Standardwerte siehe 4.2). | M | D-02 |
| D-03 | Fotobewertung: aktuelles Foto **neben dem vorherigen** und, wenn verfügbar, neben der **geplanten Zahnstellung** aus der Behandlungsplanung. Behandelnde markieren die Passform als **OK / Lücke / trackt nicht**. | M | D-03 |
| D-04 | Fit-Assist: Die Software markiert mögliche Lücken an den Schneidekanten; Behandelnde bestätigen oder verwerfen **jede Markierung**. Gehört zu Stufe **B2**, nicht zu Release 1. | S | D-04 |
| D-05 | Aktionen aus einem Alarm: Nachricht senden, neue Fotos anfordern (3 oder 6 Ansichten), aktuellen Aligner verlängern, Termin vergeben, Ersatz-Aligner bestellen. | M | D-05 |
| D-06 | Patientendetail: Verlauf der Tragezeit, VPro-Nutzung, Aligner-Historie, Fotos, Symptom-Checks, Nachrichten, Notizen. | M | D-06 |
| D-07 | **Audit-Trail** aller klinischen Aktionen und der Bearbeitung von Alarmen: wer, was, wann. | M | D-07 |
| D-08 | Import der Behandlungsplanung aus der **SureSmile-Software**; manuelle Eingabe für andere Systeme. | M | D-08 |
| D-09 | Ersatz- oder Refinement-Aligner direkt bestellen (Anbindung an die SureSmile-Bestellung). | S | D-09 |
| D-10 | Statistik je Praxis: Anteil der Patient:innen im Plan, mittlere Tragezeit, Alarme pro Woche, Reaktionszeit. | S | D-10 |
| D-11 | Rollen und Rechte konfigurierbar (Behandler:in, Team, Admin); Zwei-Faktor-Anmeldung; Mandantentrennung. | M | D-11 |
| D-12 | Export der Patientenakte als PDF; später als FHIR. | S | D-12 |
| D-13 | Patient:innen einladen (Code oder QR), Ziele und Grenzen setzen: Tragezeit, Pausen-Erinnerung, Foto-Rhythmus, Standardanweisung bei Verlust. | M | |
| D-14 | Gemeinsamer Posteingang für Nachrichten mit Zuweisung im Team und Antwortvorlagen. | M | |
| D-15 | Benachrichtigung an die Praxis per E-Mail oder Web-Push, **ohne Inhalt**. | M | |

### 4.1 Ablauf eines Alarms (Release 1)
1. Daten der Patient:in kommen an: Tragezeit, Foto, Symptom-Check oder Meldung.
2. Die Regel-Engine setzt den Status und legt einen Alarm an, wenn eine Schwelle überschritten ist.
3. Das Team sichtet den Alarm; klinische Alarme gehen an die Behandlerin oder den Behandler.
4. Die Behandlerin oder der Behandler entscheidet und handelt (Nachricht, Fotos anfordern, Verlängerung, Termin).
5. Die Patient:in erhält die Anweisung in der App. Die Aktion wird protokolliert.

### 4.2 Standard-Alarmregeln (je Praxis anpassbar)
| Regel | Standard | Status |
|---|---|---|
| Tragezeit unter dem Ziel | < 20 h an 3 Tagen in Folge | beobachten |
| Tragezeit deutlich unter dem Ziel | < 18 h an 3 von 7 Tagen | Handlung nötig |
| Wechsel nicht bestätigt | 2 Tage nach dem Plantermin | beobachten |
| Passform-Foto fehlt | 3 Tage nach Fälligkeit | beobachten |
| Symptom-Check „Praxis kontaktieren“ | sofort | Handlung nötig |
| Aligner verloren oder gebrochen | sofort | Handlung nötig |
| Passform „trackt nicht“ markiert | sofort | Handlung nötig |
| VPro nicht genutzt | 5 Tage in Folge | beobachten |

---

## 5. Nicht-funktionale Anforderungen

| ID | Bereich | Anforderung | Ref. |
|---|---|---|---|
| NF-01 | Plattformen | App: Android und iOS in den jeweils letzten 2 Hauptversionen, mindestens Android 10 und iOS 16. Dashboard: aktuelle Versionen von Chrome, Edge, Safari. | N-01 |
| NF-02 | Bedienung | „Raus/Rein“ in höchstens 2 Taps; Foto-Sitzung höchstens 2 min. | N-02 |
| NF-03 | Latenz | Alarm im Dashboard höchstens 5 min nach dem Hochladen. | N-03 |
| NF-04 | Verfügbarkeit | Backend mindestens 99,5 %; App-Sitzungen ohne Absturz mindestens 99,8 %. | N-03 |
| NF-05 | Offline | Tracking, Erinnerungen, Fotoaufnahme und Ratgeber funktionieren offline. | P-16 |
| NF-06 | Akku | Keine dauerhafte Hintergrundaktivität; BLE nur bei Bedarf. | |
| NF-07 | Barrierefreiheit | **WCAG 2.2 AA** für App und Dashboard; schließt WCAG 2.1 AA ein und erfüllt den EAA bzw. das BFSG. | N-12 |
| NF-08 | Sprachen | Deutsch und Englisch zum Start, weitere je Markt. | P-17 |
| NF-09 | Tonalität | Wertschätzend, nie beschämend; Texte von UX-Writing und Behandelnden freigegeben. | P-13 |

---

## 6. Architektur (Empfehlung)

- **Mobile App: Flutter** (Open Source, BSD-Lizenz, kostenlos). Eine Codebasis und ein Design für Android und iOS. Plattformnahe Teile nativ: Keystore bzw. Secure Enclave, Widgets, BLE-SDK. Drittbibliotheken werden als SOUP nach IEC 62304 geführt.
- **Praxis-Dashboard:** Web-App (z. B. React/TypeScript); Design-Tokens gemeinsam mit der App.
- **Backend:**
  - Hosting **in der Region der Patient:innen** (EU-Daten in der EU, US-Daten in den USA) bei einem Anbieter mit BSI-C5-Testat bzw. SOC 2 und HIPAA-Eignung.
  - Dienste: Identität (OIDC), Behandlungsplan-Import (SureSmile), Regel-Engine für Alarme, Nachrichten, Medienspeicher, Benachrichtigungen, Audit-Log, Inhalte für Symptom-Check und Ratgeber (versioniert).
  - Datenmodell an HL7 FHIR R4 angelehnt.
- **Lokal:** Verschlüsselte Datenbank (SQLCipher); Fotos verschlüsselt im App-Container.

---

## 7. Sicherheit und Datenschutz

### 7.1 Regelwerke
| Regelwerk | Bedeutung |
|---|---|
| DSGVO (Art. 9, 25, 28, 32, 35), BDSG § 22 | Gesundheitsdaten, Datenschutz durch Technikgestaltung, Auftragsverarbeitung, Sicherheit; DSFA vor dem Start |
| § 203 StGB | Schweigepflicht der Praxis; Dienstleister entsprechend verpflichten |
| HIPAA | USA: Umgang mit PHI; **BAA** mit den Praxen |
| BSI TR-03161 (Teil 1 und 3), OWASP MASVS L2 | Sicherheitsmaßstab für App und Backend; Penetrationstest |
| EU MDR Anhang I, MDCG 2019-16, FDA Premarket Cybersecurity Guidance | Cybersicherheit, falls Medizinprodukt (bzw. vorsorglich) |
| ISO/IEC 27001, BSI C5 | ISMS beim Betreiber, Cloud-Testat |
| IEC 62304, ISO 14971, IEC 62366-1, ISO 13485, IEC 82304-1 | Software-Lebenszyklus, Risiko, Gebrauchstauglichkeit (wenn Medizinprodukt; empfohlen von Anfang an) |
| Google Play Health Apps Policy, Apple Richtlinie 5.1.3 | Store-Vorgaben |

### 7.2 Rollen nach Datenschutzrecht
Die **Praxis ist Verantwortliche**, **Dentsply Sirona ist Auftragsverarbeiter** (Art. 28 DSGVO, in den USA Business Associate). Das muss die Rechtsabteilung noch bestätigen. Für eine Sekundärnutzung (z. B. Forschung und Entwicklung zu Passform und Tragemustern) gilt: **nur anonymisiert und nur mit gesonderter Einwilligung**. Dafür kann eine eigene Verantwortlichkeit von Dentsply Sirona nötig sein; das prüft die Rechtsabteilung.

### 7.3 Technische Maßnahmen
| ID | Maßnahme |
|---|---|
| S-01 | TLS 1.3 (mindestens 1.2), Certificate Pinning, kein Klartextverkehr |
| S-02 | Verschlüsselung im Ruhezustand: auf dem Gerät hardwaregestützt (AES-256), auf dem Server pro Mandant über KMS/HSM |
| S-03 | Nachrichten und Fotos Ende-zu-Ende verschlüsselt (Zielbild); mindestens Transport- plus Ablageverschlüsselung mit strikter Zugriffskontrolle |
| S-04 | OIDC mit PKCE, Zwei-Faktor-Anmeldung, Biometrie/PIN, automatische Sperre nach 5 min |
| S-05 | Keine Gesundheitsdaten in Logs, Crash-Reports, Push-Texten, URLs oder Analysetools; keine Werbe-SDKs |
| S-06 | Prüfung von Root/Jailbreak und App-Integrität (Play Integrity, App Attest) |
| S-07 | Screenshot-Schutz für sensible Ansichten |
| S-08 | BLE nur mit LE Secure Connections; Firmware nur signiert |
| S-09 | Audit-Log für Zugriffe, Exporte, Einwilligungen, Löschungen und klinische Aktionen (D-07), manipulationssicher |
| S-10 | Minimale Rechte, Mandantentrennung, Zwei-Faktor-Anmeldung im Dashboard, Sitzungs-Timeout |
| S-11 | Sicherer Entwicklungsprozess: Threat Modeling, SAST/DAST, SBOM, Penetrationstest vor dem Start und jährlich |
| S-12 | Löschkonzept, Datenexport (Art. 15 und 20), Meldung von Vorfällen binnen 72 h |

---

## 8. Regulatorische Einstufung

Die **Zweckbestimmung** entscheidet über die Klasse und muss **vor dem Designstart** feststehen. Ausschlaggebend sind die Bewertung der Passform (P-FO-05, D-03, D-04), der Symptom-Check (P-SY) und die VPro-Steuerung. Die Einschätzung ist vorläufig; Regulatory Affairs muss sie bestätigen.

| Variante | Funktionen | EU MDR (wahrscheinlich) | FDA (wahrscheinlich) |
|---|---|---|---|
| **B1 – nur Kommunikation** | Erfassen, Erinnerungen, Fotoübertragung, Nachrichten. Behandelnde beurteilen alle Fotos selbst; der Symptom-Check gibt nur allgemeine Information. | Möglicherweise kein Medizinprodukt, sonst Klasse I | Kein Medizinprodukt oder Enforcement Discretion (Datenübertragung und Anzeige) |
| **B2 – Entscheidungsunterstützung für Behandelnde** | B1 + Fit-Assist-Markierungen (D-04) + Alarmregeln, die für klinische Entscheidungen genutzt werden | Klasse IIa (Regel 11) | Medizinprodukt (Bildanalyse erfüllt die Kriterien für Non-Device-CDS nicht); 510(k) oder De Novo |
| **B3 – Bewertung gegenüber Patient:innen** | B2 + automatisches Urteil zur Passform oder Triage-Ergebnis für Patient:innen | Klasse IIa, eventuell IIb | Medizinprodukt; höhere Anforderungen an die Evidenz |
| **VPro-Steuerung** | App steuert bzw. liest ein Medizinprodukt | Möglicherweise **Zubehör** des VPro und dann in dessen Klasse | Abhängig von der Freigabe des VPro; mit RA klären |

**Vorschlag:** Start als **B1**, um schnell in den Markt zu kommen und Daten zu sammeln. Parallel B2 mit klinischer Validierung entwickeln und die vorhandene Usability-Arbeit aus den 510(k)-Verfahren wiederverwenden. Die Entwicklung läuft schon in B1 nach IEC 62304 und ISO 14971, damit der Wechsel zu B2 keine Neuentwicklung erfordert.

---

## 9. Datenmodell (vereinfacht)

```
Praxis ── Regeln (Schwellen, Standardanweisungen) ── Nutzer:innen (Rollen)
   │
Patient:in ── Elternzugang (Umfang)
   ├── Behandlung (Plan aus SureSmile: Aligner gesamt, Intervall, Start, Attachments, IPR, Phase)
   │      └── Aligner (Nr., Start, Ende, verlängert durch, Ersatz bestellt)
   ├── Tragepause (Start/Ende UTC, bearbeitet?, Quelle: Tipp | Smart-Case)
   ├── VProSitzung / VProGerät
   ├── Fotoserie (Typ: Passform-3 | Erweitert-6, Aligner-Nr., Status) ── Foto ── Passformbewertung (OK | Lücke | trackt nicht, von, wann)
   ├── SymptomCheck (Inhaltsversion, Antworten, Ergebnis)
   ├── Meldung (verloren | gebrochen, Foto, angezeigte Anweisung)
   ├── Nachricht (Thread, Anhänge, Status)
   ├── Alarm (Regel, Status, zugewiesen, erledigt durch, Aktion)
   ├── Einwilligung (Typ, Version, erteilt/widerrufen)
   └── AuditEintrag (wer, was, wann, Objekt)
```

---

## 10. Design: Dentsply Sirona
1. Brand Guidelines und Vorgaben für digitale Produkte bei DS Marketing/Brand anfordern: Farben, Typografie, Logo, Icons, Bildsprache, eventuell DS-Core-Komponenten.
2. Daraus Design-Tokens anlegen und gemeinsam für App (Flutter-Theme) und Dashboard nutzen.
3. Der Klickdummy (`aligner-app/klickdummy/`) arbeitet mit **Platzhalter-Tokens**, die ersetzt werden müssen.
4. Grundsätze:
   - klinisch klar, viel Weißraum
   - Statusfarben nie als einziges Signal
   - wertschätzende Sprache
   - Kontrast nach WCAG AA
   - Dark Mode, sofern die Brand-Vorgaben es erlauben
5. Klickdummy mit 5–8 Patient:innen und 2–3 Praxen testen.

---

## 11. Erfolgskennzahlen (Pilot)
Die Zielwerte sind Platzhalter, bis aus dem Pilot eine Ausgangsbasis vorliegt.

| Kennzahl | Ziel |
|---|---|
| Patient:innen, die nach 8 Wochen an mindestens 5 Tagen pro Woche die Tragezeit erfassen | ≥ 60 % |
| Foto-Uploads im angeforderten Rhythmus | ≥ 70 % |
| Ungeplante Refinements im Vergleich zu Praxen ohne App | geringer (Ausgangsbasis nötig) |
| Prüfzeit der Behandelnden pro Fotoserie | ≤ 1 min |
| Reaktionszeit der Praxis auf Alarme „Praxis kontaktieren“ | ≤ 1 Arbeitstag |
| Zustimmung der Patient:innen zu „Ich weiß, ob meine Behandlung im Plan ist“ | Verbesserung gegenüber dem Start |
| Bewertung im Store | ≥ 4,3 |

---

## 12. Umsetzungsphasen
| Phase | Inhalt |
|---|---|
| **0 – Klärung** | Workshop zur Zweckbestimmung mit RA (B1 oder B2), Rollen nach Datenschutzrecht und DSFA, Freigabe des VPro-Protokolls, Brand-Vorgaben, Threat Model, erster Markt |
| **1 – Release 1 (B1)** | App (Android): Onboarding, Tragezeit, Wechsel, Passform-Foto, Symptom-Check, Meldung verloren/gebrochen, Nachrichten, Ratgeber. Dashboard: Liste, Alarme, Fotobewertung, Aktionen, Audit, SureSmile-Import. Pilot mit 2–3 Praxen |
| **2 – Ausbau** | VPro-Anbindung, iOS, Elternansicht, Wochenzusammenfassung, Widgets, Ersatz bestellen, Praxis-Statistik |
| **3 – B2** | Fit-Assist nach klinischer Validierung und Zulassung |
| **4 – Optionen** | Smart-Case, Videosprechstunde, FHIR-Export, weitere Märkte |

---

## 13. Abnahmekriterien (Beispiele)
- **P-TZ-01:** Vom Widget aus ist „raus“ in höchstens 2 Taps erfasst. Nach einem Neustart des Telefons stimmt die Pausendauer auf ±1 min.
- **P-TZ-02:** Bei einer Pause über 45 min kommt die Erinnerung, auch im Flugmodus.
- **P-FO-02:** Testpersonen schaffen 3 Passform-Fotos in höchstens 2 min (Median, Usability-Test nach IEC 62366-1).
- **P-FO-05:** Nach dem Upload sehen Patient:innen nur „Erhalten“ bzw. „Ihre Praxis meldet sich“, nie eine Bewertung.
- **P-SY-04:** Bei „Praxis kontaktieren“ erscheint der Alarm innerhalb von 5 min im Dashboard (NF-03).
- **D-07:** Jede Aktion im Dashboard erscheint mit Person, Zeitpunkt und Objekt im Audit-Trail.
- **S-05:** Eine automatisierte Prüfung findet keine Gesundheitsdaten in Logs, Push-Texten oder Crash-Reports.

---

## 14. Offene Entscheidungen
| Entscheidung | Optionen |
|---|---|
| Selbst bauen oder Partner | selbst entwickeln · White-Label-Partner · bestehenden Monitoring-Anbieter integrieren |
| Regulatorischer Umfang zum Start | nur B1 · B1 und B2 gemeinsam |
| Erfassung der Tragezeit | nur Taps · Smart-Case in Release 1 · Smart-Case später |
| VPro in Release 1 | ja (Protokoll freigegeben) · Release 2 · nur manuell |
| Geschäftsmodell | im SureSmile-Fall enthalten · Praxis-Abo · Gebühr pro Patient:in |
| Markenbindung | nur SureSmile-Patient:innen · jede Aligner-Marke |
| Erster Markt | USA · Deutschland · Großbritannien |
| Foto-Standard | 3 Ansichten (Passform) · 6 Ansichten · je Praxis wählbar |

### Nächste Schritte
- [ ] Reddit-Zahlen an einer Stichprobe von Hand prüfen; Compliance-Tab im Dashboard ergänzen
- [ ] Workshop zur Zweckbestimmung mit RA (B1 oder B2, Symptom-Check, VPro als Zubehör)
- [ ] Wettbewerbsprüfung vertiefen: Monitoring- und Compliance-Apps, Funktionen, Einstufung
- [ ] Interviews mit 5–8 Behandelnden zu Alarmschwellen und Prüfaufwand
- [ ] Recht/Datenschutz: Modell Verantwortlicher/Auftragsverarbeiter, DSFA, BAA
- [ ] VPro-Protokoll bzw. SDK intern anfragen
- [x] Klickdummy (App und Dashboard), siehe `aligner-app/klickdummy/`
- [ ] Pilot mit 2–3 Praxen

---

## Quellen
- SureSmile VPro App: https://apps.apple.com/us/app/suresmile-vpro/id1644889526
- SureSmile VPro (Dentsply Sirona): https://dentsplysirona.com/en/discover/discover-by-brand/suresmile-aligners/suresmile-vpro.html
- My Invisalign: https://invisalign.com/provider/virtual-solutions/my-invisalign-app
- TrayMinder: https://apps.apple.com/us/app/trayminder/id1320684802
- AlignerPro: https://play.google.com/store/apps/details?id=com.alignerpro
- TrioClear: https://apps.apple.com/app/id1631479021
- BSI TR-03161 und C5: https://www.pwc.de/de/risk-regulatory/tr-03161-und-c5-das-fundament-fuer-sichere-digitale-gesundheitsanwendungen.html
- Johner Institut, Datenschutz und Sicherheit bei Gesundheits-Apps: https://international.johner-institute.com/articles/regulatory-affairs/and-more/data-security-and-protection-requirements-for-digital-health-applications/
- Reddit-Auswertung r/Invisalign (Okt. 2024 – Okt. 2026), interner Entwurf Option B
