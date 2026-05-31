/* ═══════════════════════════════════════════
   I18N DATA + SECTIONS/ITEMS + SCAN PATTERNS
   ═══════════════════════════════════════════ */

const I18N = {
  en: {
    pageTitle: 'GDPR Compliance Checklist',
    mastheadTitle: 'GDPR<br>Compliance<br><span>Checklist</span>',
    mastheadDesc: 'A self-assessment tool for the General Data Protection Regulation. Built for legal practitioners, compliance officers, and anyone navigating GDPR obligations.',
    progressLabel: 'Complete',
    scannerTitle: 'Document Scanner',
    scannerNote: 'Paste privacy policy text or upload a file to check GDPR coverage',
    scanPlaceholder: 'Paste your privacy policy, data processing agreement, or any GDPR-related document text here…',
    fileLabel: 'Upload File',
    scanBtn: 'Scan Document',
    chars: 'chars',
    resetBtn: 'Reset All',
    disclaimer: 'For informational purposes only — not legal advice. Scanner uses keyword heuristics, not AI.',
    scanResultsTitle: 'Scan Results',
    scanScoreHigh: 'Good coverage — most GDPR domains addressed.',
    scanScoreMid: 'Partial coverage — several important domains need attention.',
    scanScoreLow: 'Limited coverage — significant GDPR gaps detected.',
    scanFound: 'Addressed',
    scanPartial: 'Partially',
    scanMissing: 'Not found',
    exportHtml: 'Export HTML',
    exportPdf: 'Export PDF',
    sections: [
      { id:'tech', title:'Technical Implementation', sub:'Art. 5, 24–25, 28–29, 32, §25 TTDSG, §64 BDSG', items:[
        { id:'t1', art:'Art. 32, §64 BDSG', title:'SSL/TLS transport encryption (website & email)', desc:'All websites processing personal data must use HTTPS with valid certificates (Let\'s Encrypt or paid). Implement 301 HTTP→HTTPS redirects and HSTS. Email transmissions via contact forms must use SMTP encryption — avoid PHP mail(). For SPAM protection use the honeypot method; reCAPTCHA is not GDPR-compliant due to data transfers.' },
        { id:'t2', art:'Art. 28, 29, 32', title:'CMS, plugin & server security', desc:'Limit incorrect login attempts against brute-force. Use honeypot for SPAM. Keep CMS, plugins, themes always updated — delete unused ones. Enable IP pseudonymisation in access logs, reduce storage to 7–14 days. For shared hosting: responsibility lies with the host (request DPA). For VPS/dedicated servers: shared responsibility.' },
        { id:'t3', art:'§25 TTDSG, Art. 7', title:'Cookie consent management', desc:'All non-essential cookies require prior consent. Cookie banners must offer equal \'Accept\'/\'Decline\' buttons — no dark patterns, no pre-checked legitimate-interest boxes. Inform users about cookie purposes, providers and data transfers. No cookies set before consent (except essential ones). §25 TTDSG requires consent for terminal equipment access.' },
        { id:'t4', art:'Art. 44–49, Art. 6', title:'External services governance', desc:'Web fonts: localise (Google Webfonts Helper). CDNs: assess necessity for D-A-CH audience. Analytics: use GDPR-compliant tools (Fathom, Plausible), avoid Google Analytics. Social media plugins: 2-click solution (Shariff). Video/music: 2-click or preview image + link. Maps: 2-click or screenshot + link.' },
        { id:'t5', art:'Art. 28', title:'Data Processing Agreement with web host', desc:'All server-stored personal data constitutes \'processing\' — a written DPA (AVV) with the web host is mandatory per Art. 28. The DPA must cover: subject-matter & duration, nature & purpose, data types, categories of data subjects, and controller\'s rights & obligations. Review DPA terms regularly.' }
      ]},
      { id:'basics', title:'Basic Concepts & Scope', sub:'Art. 2–4', items:[
        { id:'c1', art:'Art. 4 Nr. 1', title:'Definition of personal data', desc:'The concept of personal data is interpreted broadly — any information relating to an identified or identifiable natural person (Art. 4 Nr. 1). Includes objective and subjective data; CJEU: wide interpretation (C-487/21, C-413/23 P).' },
        { id:'c2', art:'Art. 2', title:'Material scope (Art. 2 DSGVO)', desc:'The GDPR applies to wholly or partly automated processing, and to non-automated processing in a filing system. Exceptions: household exemption (Art. 2(2)(c)), CFSP, criminal justice (JI Directive).' },
        { id:'c3', art:'Art. 3', title:'Territorial scope (Art. 3 DSGVO)', desc:'GDPR applies to controllers/processors with an EU establishment (Art. 3(1)), and to processing of EU data subjects\' data when offering goods/services or monitoring behaviour (Art. 3(2), \'marketplace principle\').' },
        { id:'c4', art:'Art. 4 Nr. 2', title:'Broad concept of processing', desc:'\'Processing\' encompasses any operation: collection, storage, disclosure, erasure — whether automated or manual (Art. 4 Nr. 2). Anonymisation and pseudonymisation also qualify as processing operations.' }
      ]},
      { id:'lawful', title:'Principles, Legal Bases & Special Processing', sub:'Art. 5–9, §26, 28 BDSG', items:[
        { id:'l1', art:'Art. 5(1)', title:'Data protection principles (Art. 5 DSGVO)', desc:'All seven principles are observed: lawfulness, fairness, transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity & confidentiality (Art. 5(1)(a)–(f)). Accountability (Art. 5(2)).' },
        { id:'l2', art:'Art. 6(1)', title:'Legal basis for every processing activity', desc:'Every processing activity has at least one legal basis from the exhaustive list in Art. 6(1): consent (a), contract (b), legal obligation (c), vital interests (d), public interest (e), legitimate interest (f).' },
        { id:'l3', art:'Art. 7, 8', title:'Valid consent (Art. 7–8 DSGVO)', desc:'Consent is freely given, specific, informed, unambiguous (Art. 4 Nr. 11, Art. 7). No imbalance of power (EG 43). Withdrawal as easy as giving (Art. 7(3)). Koppelungsverbot (Art. 7(4)). Children: parental consent (Art. 8).' },
        { id:'l4', art:'Art. 9', title:'Special category data (Art. 9 DSGVO)', desc:'Art. 9(1) data (race, politics, religion, union, genetics, biometrics, health, sexuality) is prohibited UNLESS an Art. 9(2) exception applies. BOTH an Art. 6(1) basis AND an Art. 9(2) condition must be satisfied (CJEU C-60/22).' },
        { id:'l5', art:'Art. 5(1)(b), 6(4)', title:'Purpose limitation & compatible further use', desc:'Data collected for specified, explicit, legitimate purposes. No incompatible further processing. Privileged purposes (archiving, research, statistics) are \'deemed compatible\' (Art. 5(1)(b), Art. 89). Art. 6(4): compatibility test for other changes.' },
        { id:'b1', art:'§26 BDSG', title:'Employee data protection (§26 BDSG)', desc:'Personal data of employees may only be processed for employment-related purposes where strictly necessary (§26(1) BDSG). Consent from employees is scrutinised more strictly due to the imbalance of power — freely given consent must be assessed considering the employee\'s position. For criminal offence detection, strict conditions apply: documented factual indications, no overriding employee interests, proportionality. Employee data subject rights (Art. 17, 18, 20, 21 GDPR) may be restricted where necessary for employment purposes (§26(5) BDSG).' },
        { id:'b6', art:'§28 BDSG', title:'Data processing for research & statistics (§28 BDSG)', desc:'Personal data may be processed for scientific, historical research or statistical purposes without consent if: (1) processing is necessary for those purposes; and (2) the controller\'s interests substantially outweigh the data subject\'s interests in not processing. Appropriate safeguards must be in place per Art. 89(1) GDPR, especially pseudonymisation where research purposes can be achieved with pseudonymised data. Data subject rights under Art. 15, 16, 18, and 21 GDPR are restricted if they would render the research/statistical purposes impossible or seriously impair them.' }
      ]},
      { id:'roles', title:'Roles & Responsibilities', sub:'Art. 4, 26, 28–29', items:[
        { id:'o1', art:'Art. 4 Nr. 7, 26', title:'Controller & joint controllers', desc:'Controller decides on purposes and means (Art. 4 Nr. 7). Joint controllers under Art. 26 must transparently allocate GDPR obligations. Functional concept — assessed per processing operation, not per organisation.' },
        { id:'o2', art:'Art. 4 Nr. 8, 28', title:'Processor & Art. 28 contract', desc:'Processor acts on documented instructions only (Art. 29). An Art. 28 contract binds the processor, covering: subject-matter, duration, nature, purpose, data types, obligations (security, sub-processors, DSR assistance, deletion/return, audits).' },
        { id:'o3', art:'Art. 4 Nr. 9–10', title:'Recipient & third party', desc:'Internal data flows are mapped: recipient = anyone receiving data (Art. 4 Nr. 9); third party = anyone other than data subject, controller, processor, or authorised persons (Art. 4 Nr. 10).' },
        { id:'o4', art:'Art. 26, 28, 29', title:'Multi-party processing governance', desc:'Joint controllership requires an \'arrangement\' (Art. 26(1)). Data subjects may exercise rights against each controller (Art. 26(3)). Sub-processors need controller\'s prior authorisation (Art. 28(2)).' }
      ]},
      { id:'rights', title:'Data Subject Rights', sub:'Art. 12–23, §22, 31 BDSG', items:[
        { id:'r1', art:'Art. 12–14', title:'Transparency & information obligations', desc:'Information per Art. 13–14 provided in concise, transparent, intelligible form, clear language (Art. 12(1)). Response within 1 month (Art. 12(3)). Information free of charge (Art. 12(5)). Manifestly unfounded requests may be refused/charged.' },
        { id:'r2', art:'Art. 15', title:'Right of access (Art. 15 DSGVO)', desc:'Data subjects obtain confirmation + copy of data + info on purposes, categories, recipients, retention, rights, source, automated decisions, third-country safeguards. The right is not unlimited (CJEU C-487/21, FFG).' },
        { id:'r3', art:'Art. 16, 17, 18', title:'Rectification, erasure & restriction', desc:'Inaccurate data must be rectified (Art. 16). Erasure under Art. 17 grounds (right to be forgotten). Processing restriction where accuracy is contested (Art. 18(1)(a)) or processing is unlawful but erasure is opposed (Art. 18(1)(c)).' },
        { id:'r4', art:'Art. 20', title:'Data portability (Art. 20 DSGVO)', desc:'Data provided by data subject: receive in structured, commonly used, machine-readable format. Direct transmission between controllers where technically feasible. Applies only to consent/contract + automated processing.' },
        { id:'r5', art:'Art. 21, 22', title:'Right to object & automated decisions', desc:'Object to legitimate-interest/public-interest processing including profiling (Art. 21(1)). Absolute right to object to direct marketing (Art. 21(2)–(3)). Automated individual decisions producing legal/significant effects require human intervention safeguards (Art. 22).' },
        { id:'r6', art:'Art. 23', title:'Restrictions on rights (Art. 23 DSGVO)', desc:'Union/Member State law may restrict Art. 12–22 rights by legislative measure respecting the essence of fundamental rights, where necessary and proportionate (Art. 23(1)). Öffnungsklausel for national legislators.' },
        { id:'b2', art:'§22 BDSG', title:'Automated individual decisions (§22 BDSG)', desc:'Automated decisions including profiling are subject to additional safeguards beyond Art. 22 GDPR. §22 BDSG requires: human intervention rights, right to express one\'s point of view, and right to contest the decision. Decisions may NOT be based on special categories of Art. 9(1) data unless adequate protective measures are in place. This supplements Art. 22 GDPR with stricter German-specific requirements.' },
        { id:'b7', art:'§31 BDSG', title:'Scoring & credit checks (§31 BDSG)', desc:'The use of probability values (scoring) for decisions on contractual relationships is only permitted if: (1) data protection law provisions are complied with; (2) data used is demonstrably relevant based on a scientifically recognised mathematical-statistical method; (3) for address data, the data subject has been informed of the planned use; and (4) the calculation is NOT based exclusively on special category data or address data. This is distinct from Art. 22 GDPR automated decision-making and applies even when the decision is not fully automated.' }
      ]},
      { id:'security', title:'Technical & Organisational Measures', sub:'Art. 24–25, 32–36, §32, 64 BDSG', items:[
        { id:'s1', art:'Art. 24, 25', title:'Data protection by design & by default', desc:'Appropriate TOMs implemented at determination of means AND at processing time (Art. 25(1)). By default, only necessary data is processed (data minimisation, Art. 25(2)). Risk-based approach; measures reviewed/updated (Art. 24(1)).' },
        { id:'s2', art:'Art. 32', title:'Security of processing (Art. 32 DSGVO)', desc:'Appropriate TOMs ensuring risk-appropriate security: pseudonymisation/encryption (a), CIA + resilience (b), timely restoration (c), regular testing/evaluation (d). State-of-the-art and implementation costs considered.' },
        { id:'s3', art:'Art. 33, 34', title:'Breach notification & communication', desc:'Data breaches notified to supervisory authority within 72 hours (Art. 33(1)). Processor notifies controller without undue delay (Art. 33(2)). High-risk breaches communicated to data subjects (Art. 34). All breaches documented (Art. 33(5)).' },
        { id:'s4', art:'Art. 35, 36', title:'DPIA & prior consultation', desc:'DPIA required for high-risk processing: new technologies, systematic evaluation/profiling, large-scale sensitive data, systematic public monitoring (Art. 35(1),(3)). Prior consultation if DPIA shows high residual risk (Art. 36).' },
        { id:'b3', art:'§32 BDSG', title:'Video surveillance (§32 BDSG)', desc:'Video surveillance of publicly accessible premises is only permitted for: (1) exercising the right to determine who may enter (Hausrecht); or (2) safeguarding legitimate, specifically defined interests for specifically defined purposes — provided no overriding data subject interests exist. The surveillance must be made known by appropriate signage at the earliest possible point (name + contact details of the controller). Processing of surveillance data must be restricted as far as possible.' },
        { id:'b5', art:'§64 BDSG', title:'Specific security measures (§64 BDSG)', desc:'§64 BDSG concretises the Art. 32 GDPR requirements with a specific catalogue of technical and organisational measures: (1) physical access control to systems and data processing equipment; (2) system access control; (3) data access control (authorisation concept); (4) transmission control; (5) input control (retrospective audit trail); (6) availability control (protection against accidental destruction/loss); and (7) separation control (data collected for different purposes must be processable separately). All measures must be implemented according to the state of the art (Stand der Technik).' }
      ]},
      { id:'govern', title:'Accountability & Governance', sub:'Art. 5(2), 24, 30, 37–43, §45 BDSG', items:[
        { id:'g1', art:'Art. 5(2), 24', title:'Accountability (Art. 5(2) DSGVO)', desc:'Controller is responsible for compliance with Art. 5(1) principles AND must demonstrate compliance (Rechenschaftspflicht). Includes burden of proof in disputes (CJEU C-60/22). TOMs appropriate to risk, nature, scope, context (Art. 24).' },
        { id:'g2', art:'Art. 30', title:'Record of Processing Activities (RoPA/VVT)', desc:'Complete RoPA maintained (Art. 30(1)): controller/DPO details, purposes, data subject/data categories, recipients including third countries + safeguards, erasure time limits, security measures (Art. 32). Obligation < 250 employees limited.' },
        { id:'g3', art:'Art. 37–39', title:'Data Protection Officer (DSB/DPO)', desc:'DPO designated where: public body (a), core activities = large-scale systematic monitoring (b), large-scale sensitive/criminal data (c) (Art. 37(1)). DPO: independent, involved, contact point (Art. 38–39). Group DPO possible (Art. 37(2)).' },
        { id:'g4', art:'Art. 40–43', title:'Codes of conduct & certification', desc:'Member States, authorities, Board encourage codes of conduct (Art. 40) and certification (Art. 42) to demonstrate compliance. Certification is voluntary, transparent, issued by accredited bodies (Art. 43).' },
        { id:'b4', art:'§45 BDSG', title:'DPO designation — extended obligation (§45 BDSG)', desc:'Beyond Art. 37 GDPR, German law (§45 BDSG) requires a Data Protection Officer (DSB) if the organisation constantly employs at least 20 persons dealing with automated data processing. Additionally, a DPO is mandatory irrespective of employee count if the processing is commercial AND requires a DPIA under Art. 35 GDPR. The DPO enjoys special protection against dismissal: termination is only permitted applying §626 BGB (extraordinary dismissal for cause).' }
      ]},
      { id:'supervision', title:'International Transfers, Supervision & Enforcement', sub:'Art. 44–59, 77–84', items:[
        { id:'i1', art:'Art. 45', title:'Adequacy decisions', desc:'Transfers permitted where Commission has adopted an adequacy decision for the third country/territory/sector/international organisation (Art. 45(1)). No specific authorisation required. Reviewed periodically (Art. 45(3)–(5)).' },
        { id:'i2', art:'Art. 46', title:'Appropriate safeguards (SCC, BCR, etc.)', desc:'Where no adequacy decision: Standard Contractual Clauses (Art. 46(2)(c)), Binding Corporate Rules (Art. 47), Codes of conduct + certification (Art. 46(2)(e)–(f)), ad-hoc clauses with authorisation (Art. 46(3)). Transfer Impact Assessment required.' },
        { id:'i3', art:'Art. 49', title:'Derogations for specific situations', desc:'Absent adequacy/safeguards, Art. 49 derogations: explicit consent after informed of risks (a), contract necessity (b), public interest (d), legal claims (e), vital interests (f). Interpreted strictly; not for repetitive transfers.' },
        { id:'i4', art:'Art. 44', title:'General transfer principle', desc:'All Chapter V provisions must be applied to ensure the level of natural persons\' protection guaranteed by the GDPR is not undermined (Art. 44). Supplementary measures may be needed even with SCCs (CJEU Schrems II, C-311/18).' },
        { id:'e1', art:'Art. 51–59', title:'Independent supervisory authorities', desc:'Each Member State has one or more independent authorities (Art. 51). Powers: investigative (Art. 58(1)), corrective — warnings, reprimands, bans, fines (Art. 58(2)), advisory (Art. 58(3)). Lead authority = main establishment (one-stop-shop, Art. 56).' },
        { id:'e2', art:'Art. 77–79', title:'Right to complain & judicial remedy', desc:'Data subjects lodge complaints with supervisory authority (Art. 77). Judicial remedy against authority (Art. 78) and against controller/processor (Art. 79). Proceedings may be brought where controller has establishment OR data subject resides.' },
        { id:'e3', art:'Art. 82', title:'Compensation & liability (Art. 82 DSGVO)', desc:'Material/non-material damage entitles to compensation. Controller liable unless proves not responsible. Processor liable only for GDPR/instruction breaches. Joint and several liability for full compensation (Art. 82(4)).' },
        { id:'e4', art:'Art. 83, 84', title:'Administrative fines (Art. 83 DSGVO)', desc:'Fines up to EUR 20M or 4% global annual turnover (whichever higher). Two-tier system: Art. 83(4) (up to EUR 10M/2%) and Art. 83(5) (up to EUR 20M/4%). Fines effective, proportionate, dissuasive (Art. 83(1)). Member State penalties (Art. 84).' }
      ]}
    ]
  },
  de: {
    pageTitle: 'DSGVO-Compliance-Checkliste',
    mastheadTitle: 'DSGVO<br>Compliance<br><span>Checkliste</span>',
    mastheadDesc: 'Ein Selbstbewertungstool für die Datenschutz-Grundverordnung. Entwickelt für Juristen, Datenschutzbeauftragte und alle, die sich mit DSGVO-Pflichten auseinandersetzen.',
    progressLabel: 'Erledigt',
    scannerTitle: 'Dokumenten-Scanner',
    scannerNote: 'Datenschutzerklärung einfügen oder Datei hochladen, um DSGVO-Abdeckung zu prüfen',
    scanPlaceholder: 'Fügen Sie Ihre Datenschutzerklärung, Auftragsverarbeitungsvertrag oder ein anderes DSGVO-relevantes Dokument hier ein…',
    fileLabel: 'Datei hochladen',
    scanBtn: 'Dokument scannen',
    chars: 'Zeichen',
    resetBtn: 'Alles zurücksetzen',
    disclaimer: 'Nur zu Informationszwecken — keine Rechtsberatung. Scanner verwendet Keyword-Heuristiken, keine KI.',
    scanResultsTitle: 'Scan-Ergebnisse',
    scanScoreHigh: 'Gute Abdeckung — die meisten DSGVO-Bereiche sind adressiert.',
    scanScoreMid: 'Teilweise Abdeckung — mehrere wichtige Bereiche benötigen Aufmerksamkeit.',
    scanScoreLow: 'Geringe Abdeckung — erhebliche DSGVO-Lücken erkannt.',
    scanFound: 'Adressiert',
    scanPartial: 'Teilweise',
    scanMissing: 'Nicht gefunden',
    exportHtml: 'HTML exportieren',
    exportPdf: 'PDF exportieren',
    sections: [
      { id:'tech', title:'Technische Umsetzung', sub:'Art. 5, 24–25, 28–29, 32, §25 TTDSG, §64 BDSG', items:[
        { id:'t1', art:'Art. 32, §64 BDSG', title:'SSL/TLS-Transportverschlüsselung (Webseite & E-Mail)', desc:'Jede Webseite, die personenbezogene Daten verarbeitet, muss HTTPS mit gültigen Zertifikaten verwenden (Let\'s Encrypt oder kostenpflichtig). 301-Weiterleitung HTTP→HTTPS und HSTS einrichten. E-Mail-Versand über Kontaktformulare muss SMTP-Verschlüsselung nutzen — keine PHP-mail()-Funktion. Für SPAM-Schutz Honeypot-Methode bevorzugen; reCAPTCHA ist wegen Datenübertragung nicht DSGVO-konform.' },
        { id:'t2', art:'Art. 28, 29, 32', title:'CMS-, Plugin- & Server-Sicherheit', desc:'Schutz vor Brute-Force durch Begrenzung falscher Login-Versuche. Honeypot für SPAM. CMS, Plugins, Themes stets aktuell halten — ungenutzte deinstallieren. IP-Pseudonymisierung in Access-Logs aktivieren, Speicherdauer auf 7–14 Tage verkürzen. Bei Shared Hosting: Verantwortung beim Hoster (AVV anfordern). Bei VPS/dedizierten Servern: Mitverantwortung.' },
        { id:'t3', art:'§25 TTDSG, Art. 7', title:'Cookie-Einwilligungsmanagement', desc:'Alle nicht-essentiellen Cookies erfordern vorherige Einwilligung. Cookie-Banner müssen gleichwertige „Akzeptieren"-/„Ablehnen"-Buttons bieten — keine Dark Patterns, keine vorab angekreuzten „Berechtigtes Interesse"-Boxen. Über Cookie-Zwecke, Anbieter und Datenübertragungen informieren. Keine Cookies vor Einwilligung (außer technisch notwendige). §25 TTDSG: Einwilligung für Zugriff auf Endeinrichtungen.' },
        { id:'t4', art:'Art. 44–49, Art. 6', title:'Governance externer Dienste', desc:'Webfonts: lokalisieren (Google Webfonts Helper). CDNs: Notwendigkeit für D-A-CH prüfen. Analyse: DSGVO-konforme Tools (Fathom, Plausible), Google Analytics vermeiden. Social-Media-Plugins: 2-Klick-Lösung (Shariff). Video/Musik: 2-Klick oder Vorschaubild + Link. Kartendienste: 2-Klick oder Screenshot + Link.' },
        { id:'t5', art:'Art. 28', title:'Auftragsverarbeitungsvertrag mit Webhoster', desc:'Alle auf Servern gespeicherten personenbezogenen Daten stellen „Verarbeitung" i.S.d. DSGVO dar — ein schriftlicher AVV mit dem Webhoster ist nach Art. 28 DSGVO verpflichtend. Der AVV muss regeln: Gegenstand & Dauer, Art & Zweck, Datenarten, Kategorien betroffener Personen sowie Rechte & Pflichten des Verantwortlichen. AVV-Bedingungen regelmäßig prüfen.' }
      ]},
      { id:'basics', title:'Grundbegriffe & Anwendungsbereich', sub:'Art. 2–4', items:[
        { id:'c1', art:'Art. 4 Nr. 1', title:'Begriff der personenbezogenen Daten', desc:'Weite Auslegung: alle Informationen über identifizierte/identifizierbare natürliche Person (Art. 4 Nr. 1). Umfasst objektive und subjektive Daten. CJEU: Inhalt/Zweck/Auswirkung (C-487/21, C-413/23 P). Auch pseudonymisierte Daten sind pbD.' },
        { id:'c2', art:'Art. 2', title:'Sachlicher Anwendungsbereich (Art. 2 DSGVO)', desc:'Gilt für ganz/teilweise automatisierte Verarbeitung und nichtautomatisierte Verarbeitung in Dateisystem. Ausnahmen: Haushaltsausnahme (Art. 2(2)(c)), GASP, Strafjustiz (JI-Richtlinie).' },
        { id:'c3', art:'Art. 3', title:'Räumlicher Anwendungsbereich (Art. 3 DSGVO)', desc:'Niederlassungsprinzip (Art. 3(1)) und Marktortprinzip (Art. 3(2)). Anwendbar bei Angebot von Waren/Dienstleistungen an EU-Personen oder Verhaltensbeobachtung in der EU (Art. 3(2)).' },
        { id:'c4', art:'Art. 4 Nr. 2', title:'Weiter Verarbeitungsbegriff', desc:'\'Verarbeitung\' umfasst jeden Vorgang: Erheben, Speichern, Offenlegung, Löschung — automatisiert oder manuell (Art. 4 Nr. 2). Auch Anonymisierung ist Verarbeitung (h.M.). Pseudonymisierung als Schutzmaßnahme.' }
      ]},
      { id:'lawful', title:'Grundsätze, Rechtsgrundlagen & besondere Verarbeitung', sub:'Art. 5–9, §26, 28 BDSG', items:[
        { id:'l1', art:'Art. 5(1)', title:'Datenschutzgrundsätze (Art. 5 DSGVO)', desc:'Alle sieben Grundsätze sind einzuhalten: Rechtmäßigkeit, Treu und Glauben, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität & Vertraulichkeit (Art. 5(1)(a)–(f)). Rechenschaftspflicht (Art. 5(2)).' },
        { id:'l2', art:'Art. 6(1)', title:'Rechtsgrundlage für jede Verarbeitung', desc:'Jede Verarbeitung benötigt mindestens eine Rechtsgrundlage aus Art. 6(1): Einwilligung (a), Vertrag (b), rechtliche Verpflichtung (c), lebenswichtige Interessen (d), öffentliches Interesse (e), berechtigtes Interesse (f). Erschöpfende Liste (EuGH C-60/22).' },
        { id:'l3', art:'Art. 7, 8', title:'Wirksame Einwilligung (Art. 7–8 DSGVO)', desc:'Freiwillig, spezifisch, informiert, unmissverständlich (Art. 4 Nr. 11). Kein klares Ungleichgewicht (EG 43). Widerruf so einfach wie Erteilung (Art. 7(3)). Koppelungsverbot (Art. 7(4)). Minderjährige: elterliche Einwilligung (Art. 8).' },
        { id:'l4', art:'Art. 9', title:'Besondere Kategorien pbD (Art. 9 DSGVO)', desc:'Art. 9(1)-Daten (Rasse, Politik, Religion, Gewerkschaft, Genetik, Biometrie, Gesundheit, Sexualität) grds. verboten. Ausnahme nur bei Art. 9(2)-Tatbestand ZUSÄTZLICH zu Art. 6(1)-Rechtsgrundlage (EuGH C-60/22). Weite Auslegung durch EuGH.' },
        { id:'l5', art:'Art. 5(1)(b), 6(4)', title:'Zweckbindung & Zweckänderung', desc:'Daten nur für festgelegte, eindeutige, legitime Zwecke erhoben. Keine inkompatible Weiterverarbeitung. Privilegierte Zwecke (Archiv, Forschung, Statistik) gelten als vereinbar (Art. 5(1)(b), Art. 89). Art. 6(4): Kompatibilitätsprüfung für sonstige Änderungen.' },
        { id:'b1', art:'§26 BDSG', title:'Beschäftigtendatenschutz (§26 BDSG)', desc:'Personenbezogene Daten von Beschäftigten dürfen nur für Zwecke des Beschäftigungsverhältnisses verarbeitet werden, soweit dies erforderlich ist (§26 Abs. 1 BDSG). Einwilligungen von Beschäftigten werden aufgrund des Machtungleichgewichts besonders streng geprüft — die Stellung des Beschäftigten im Unternehmen ist zu berücksichtigen. Zur Aufdeckung von Straftaten gelten strenge Voraussetzungen: dokumentierte tatsächliche Anhaltspunkte, keine überwiegenden Beschäftigteninteressen, Verhältnismäßigkeit. Beschäftigtenrechte (Art. 17, 18, 20, 21 DSGVO) können eingeschränkt werden, soweit für Beschäftigungszwecke erforderlich (§26 Abs. 5 BDSG).' },
        { id:'b6', art:'§28 BDSG', title:'Datenverarbeitung für Forschung & Statistik (§28 BDSG)', desc:'Personenbezogene Daten dürfen für wissenschaftliche, historische Forschungszwecke oder statistische Zwecke ohne Einwilligung verarbeitet werden, wenn: (1) die Verarbeitung für diese Zwecke erforderlich ist; und (2) die Interessen des Verantwortlichen die der betroffenen Person erheblich überwiegen. Angemessene Schutzmaßnahmen gem. Art. 89 Abs. 1 DSGVO sind zu treffen, insbesondere Pseudonymisierung, sofern die Forschungszwecke mit pseudonymisierten Daten erreichbar sind. Betroffenenrechte aus Art. 15, 16, 18 und 21 DSGVO sind eingeschränkt, soweit sie die Forschungs-/Statistikzwecke unmöglich machen oder ernsthaft beeinträchtigen würden.' }
      ]},
      { id:'roles', title:'Rollen & Verantwortlichkeiten', sub:'Art. 4, 26, 28–29', items:[
        { id:'o1', art:'Art. 4 Nr. 7, 26', title:'Verantwortlicher & gemeinsam Verantwortliche', desc:'Verantwortlicher entscheidet über Zwecke und Mittel (Art. 4 Nr. 7). Gemeinsam Verantwortliche müssen Pflichten transparent verteilen (Art. 26). Funktionelles Konzept — beurteilt pro Verarbeitungsvorgang.' },
        { id:'o2', art:'Art. 4 Nr. 8, 28', title:'Auftragsverarbeiter & Art. 28-Vertrag', desc:'Auftragsverarbeiter verarbeitet nur auf dokumentierte Weisung (Art. 29). Art. 28-Vertrag regelt: Gegenstand, Dauer, Art, Zweck, Daten, Pflichten (Sicherheit, Subunternehmer, Betroffenenrechte, Löschung/Rückgabe, Audits).' },
        { id:'o3', art:'Art. 4 Nr. 9–10', title:'Empfänger & Dritter', desc:'Interne Datenflüsse sind kartiert: Empfänger = jeder, der Daten erhält (Art. 4 Nr. 9); Dritter = jede Stelle außer betroffener Person, Verantwortlichem, Auftragsverarbeiter (Art. 4 Nr. 10).' },
        { id:'o4', art:'Art. 26, 28, 29', title:'Mehrparteien-Verarbeitungs-Governance', desc:'Gemeinsame Verantwortlichkeit erfordert \'Vereinbarung\' (Art. 26(1)). Betroffene kann Rechte gegen jeden Verantwortlichen geltend machen (Art. 26(3)). Subunternehmer brauchen vorherige Genehmigung (Art. 28(2)).' }
      ]},
      { id:'rights', title:'Rechte der betroffenen Person', sub:'Art. 12–23, §22, 31 BDSG', items:[
        { id:'r1', art:'Art. 12–14', title:'Transparenz & Informationspflichten', desc:'Informationen nach Art. 13–14 in präziser, transparenter, verständlicher Form, klare Sprache (Art. 12(1)). Antwort innerhalb 1 Monat (Art. 12(3)). Unentgeltlich (Art. 12(5)). Offensichtlich unbegründete Anträge können abgelehnt werden.' },
        { id:'r2', art:'Art. 15', title:'Auskunftsrecht (Art. 15 DSGVO)', desc:'Betroffene erhalten Bestätigung + Kopie + Infos über Zwecke, Kategorien, Empfänger, Speicherdauer, Rechte, Herkunft, autom. Entscheidungen, Drittland-Garantien. Recht ist nicht unbegrenzt (EuGH C-487/21, FFG).' },
        { id:'r3', art:'Art. 16, 17, 18', title:'Berichtigung, Löschung & Einschränkung', desc:'Unrichtige Daten sind zu berichtigen (Art. 16). Löschung unter Art. 17-Voraussetzungen (Recht auf Vergessenwerden). Einschränkung bei bestrittener Richtigkeit (Art. 18(1)(a)) oder unrechtmäßiger Verarbeitung (Art. 18(1)(c)).' },
        { id:'r4', art:'Art. 20', title:'Datenübertragbarkeit (Art. 20 DSGVO)', desc:'Vom Betroffenen bereitgestellte Daten: Herausgabe in strukturiertem, gängigem, maschinenlesbarem Format. Direktübermittlung zwischen Verantwortlichen wo technisch machbar. Nur bei Einwilligung/Vertrag + automatisierter Verarbeitung.' },
        { id:'r5', art:'Art. 21, 22', title:'Widerspruchsrecht & autom. Entscheidungen', desc:'Widerspruch gegen berechtigtes/öffentliches Interesse einschl. Profiling (Art. 21(1)). Absolutes Widerspruchsrecht bei Direktwerbung (Art. 21(2)–(3)). Autom. Entscheidungen mit Rechtswirkung erfordern Schutzmaßnahmen (Art. 22).' },
        { id:'r6', art:'Art. 23', title:'Beschränkungen der Rechte (Art. 23 DSGVO)', desc:'Unions-/Mitgliedstaatliches Recht kann Art. 12–22-Rechte durch Gesetzgebungsmaßnahme beschränken unter Wahrung des Wesensgehalts, soweit notwendig und verhältnismäßig (Art. 23(1)). Öffnungsklausel.' },
        { id:'b2', art:'§22 BDSG', title:'Automatisierte Einzelentscheidungen (§22 BDSG)', desc:'Automatisierte Entscheidungen einschließlich Profiling unterliegen über Art. 22 DSGVO hinausgehenden Anforderungen. §22 BDSG fordert: Recht auf menschliches Eingreifen, Darlegung des eigenen Standpunkts und Anfechtung der Entscheidung. Entscheidungen dürfen NICHT auf besonderen Datenkategorien nach Art. 9 Abs. 1 DSGVO beruhen, sofern keine angemessenen Schutzmaßnahmen getroffen wurden. Dies ergänzt Art. 22 DSGVO um strengere, deutschlandspezifische Anforderungen.' },
        { id:'b7', art:'§31 BDSG', title:'Scoring & Bonitätsprüfungen (§31 BDSG)', desc:'Die Verwendung von Wahrscheinlichkeitswerten (Scoring) für Entscheidungen über Vertragsverhältnisse ist nur zulässig, wenn: (1) die Vorschriften des Datenschutzrechts eingehalten wurden; (2) die genutzten Daten unter Zugrundelegung eines wissenschaftlich anerkannten mathematisch-statistischen Verfahrens nachweisbar maßgeblich sind; (3) bei Nutzung von Anschriftendaten die betroffene Person unterrichtet wurde; und (4) die Berechnung nicht ausschließlich auf besonderen Datenkategorien oder Anschriftendaten beruht. Dies ist von Art. 22 DSGVO zu unterscheiden und gilt auch bei nicht vollautomatisierten Entscheidungen.' }
      ]},
      { id:'security', title:'Technische & organisatorische Maßnahmen', sub:'Art. 24–25, 32–36, §32, 64 BDSG', items:[
        { id:'s1', art:'Art. 24, 25', title:'Privacy by Design & by Default', desc:'Geeignete TOMs bei Festlegung der Mittel UND zum Zeitpunkt der Verarbeitung (Art. 25(1)). Durch Voreinstellungen nur notwendige Daten (Datenminimierung, Art. 25(2)). Risikobasierter Ansatz; Maßnahmen werden überprüft/aktualisiert (Art. 24(1)).' },
        { id:'s2', art:'Art. 32', title:'Sicherheit der Verarbeitung (Art. 32 DSGVO)', desc:'Geeignete TOMs für risikoadäquates Schutzniveau: Pseudonymisierung/Verschlüsselung (a), Vertraulichkeit/Integrität/Verfügbarkeit/Belastbarkeit (b), rasche Wiederherstellung (c), regelmäßige Überprüfung (d). Stand der Technik & Kosten.' },
        { id:'s3', art:'Art. 33, 34', title:'Meldepflicht & Benachrichtigung bei Verletzungen', desc:'Meldung an Aufsichtsbehörde binnen 72 Stunden (Art. 33(1)). Auftragsverarbeiter meldet unverzüglich an Verantwortlichen (Art. 33(2)). Benachrichtigung Betroffener bei hohem Risiko (Art. 34). Dokumentation aller Verletzungen (Art. 33(5)).' },
        { id:'s4', art:'Art. 35, 36', title:'DSFA & vorherige Konsultation', desc:'DSFA bei Hochrisiko-Verarbeitung: neue Technologien, systematische Bewertung/Profiling, großflächige sensible Daten, systematische Überwachung (Art. 35(1),(3)). Vorherige Konsultation bei verbleibendem hohem Risiko (Art. 36).' },
        { id:'b3', art:'§32 BDSG', title:'Videoüberwachung (§32 BDSG)', desc:'Die Videoüberwachung öffentlich zugänglicher Räume ist nur zulässig: (1) zur Ausübung des Hausrechts; oder (2) zur Wahrnehmung berechtigter, konkret festgelegter Interessen für konkret festgelegte Zwecke — sofern keine überwiegenden Betroffeneninteressen bestehen. Die Überwachung ist durch geeignete Beschilderung zum frühestmöglichen Zeitpunkt erkennbar zu machen (Name + Kontaktdaten des Verantwortlichen). Die Verarbeitung der Überwachungsdaten ist so weit wie möglich einzuschränken.' },
        { id:'b5', art:'§64 BDSG', title:'Konkrete Sicherheitsmaßnahmen (§64 BDSG)', desc:'§64 BDSG konkretisiert die Anforderungen des Art. 32 DSGVO durch einen spezifischen Maßnahmenkatalog: (1) physische Zugangskontrolle zu Systemen und Datenverarbeitungsanlagen; (2) Systemzugangskontrolle; (3) Datenzugangskontrolle (Berechtigungskonzept); (4) Weitergabekontrolle; (5) Eingabekontrolle (nachträgliche Nachvollziehbarkeit); (6) Verfügbarkeitskontrolle (Schutz gegen zufällige Zerstörung/Verlust); und (7) Trennungskontrolle (getrennte Verarbeitung zweckverschiedener Daten). Alle Maßnahmen sind nach dem Stand der Technik umzusetzen.' }
      ]},
      { id:'govern', title:'Rechenschaft & Governance', sub:'Art. 5(2), 24, 30, 37–43, §45 BDSG', items:[
        { id:'g1', art:'Art. 5(2), 24', title:'Rechenschaftspflicht (Art. 5(2) DSGVO)', desc:'Verantwortlicher ist für Einhaltung der Grundsätze verantwortlich UND muss deren Einhaltung nachweisen können. Beweislastumkehr im Streitfall (EuGH C-60/22). Geeignete TOMs entsprechend Risiko, Art, Umfang, Umständen, Zwecken (Art. 24).' },
        { id:'g2', art:'Art. 30', title:'Verarbeitungsverzeichnis (VVT/RoPA)', desc:'Vollständiges VVT (Art. 30(1)): Verantwortlicher/DSB, Zwecke, betroffene Personen/Datenkategorien, Empfänger einschl. Drittländer + Garantien, Löschfristen, Sicherheitsmaßnahmen (Art. 32). Pflicht für < 250 Mitarbeiter eingeschränkt.' },
        { id:'g3', art:'Art. 37–39', title:'Datenschutzbeauftragter (DSB/DPO)', desc:'DSB benannt wo: öffentliche Stelle (a), Kerntätigkeit = umfangreiche systematische Überwachung (b), umfangreiche sensible/Strafdaten (c) (Art. 37(1)). DSB: unabhängig, eingebunden, Anlaufstelle (Art. 38–39). Konzern-DSB möglich (Art. 37(2)).' },
        { id:'g4', art:'Art. 40–43', title:'Verhaltensregeln & Zertifizierung', desc:'Mitgliedstaaten, Behörden, Ausschuss fördern Verhaltensregeln (Art. 40) und Zertifizierung (Art. 42) als Compliance-Nachweis. Zertifizierung freiwillig, transparent, durch akkreditierte Stellen (Art. 43).' },
        { id:'b4', art:'§45 BDSG', title:'DSB-Benennung — erweiterte Pflicht (§45 BDSG)', desc:'Über Art. 37 DSGVO hinaus verlangt das deutsche Recht (§45 BDSG) die Benennung eines Datenschutzbeauftragten (DSB), wenn ständig mindestens 20 Personen mit der automatisierten Verarbeitung beschäftigt werden. Zusätzlich ist ein DSB unabhängig von der Personenzahl zu benennen, wenn die Verarbeitung geschäftsmäßig erfolgt UND einer DSFA nach Art. 35 DSGVO unterliegt. Der DSB genießt besonderen Kündigungsschutz: Abberufung nur entsprechend §626 BGB (außerordentliche Kündigung aus wichtigem Grund).' }
      ]},
      { id:'supervision', title:'Internationale Datenübermittlungen, Aufsicht & Durchsetzung', sub:'Art. 44–59, 77–84', items:[
        { id:'i1', art:'Art. 45', title:'Angemessenheitsbeschlüsse', desc:'Übermittlung zulässig bei Angemessenheitsbeschluss der Kommission für Drittland/Gebiet/Sektor/internationale Organisation (Art. 45(1)). Keine gesonderte Genehmigung. Regelmäßige Überprüfung (Art. 45(3)–(5)).' },
        { id:'i2', art:'Art. 46', title:'Geeignete Garantien (SCC, BCR etc.)', desc:'Ohne Angemessenheitsbeschluss: Standarddatenschutzklauseln (Art. 46(2)(c)), BCR (Art. 47), Verhaltensregeln + Zertifizierung (Art. 46(2)(e)–(f)), Ad-hoc-Klauseln mit Genehmigung (Art. 46(3)). Transfer Impact Assessment erforderlich.' },
        { id:'i3', art:'Art. 49', title:'Ausnahmen für besondere Fälle', desc:'Ohne Angemessenheit/Garantien, Art. 49-Ausnahmen: ausdrückliche Einwilligung nach Risikoaufklärung (a), Vertragserfüllung (b), öffentliches Interesse (d), Rechtsansprüche (e), lebenswichtige Interessen (f). Eng auszulegen; keine wiederholten Übermittlungen.' },
        { id:'i4', art:'Art. 44', title:'Allgemeiner Grundsatz der Datenübermittlung', desc:'Alle Bestimmungen des Kapitels V sind anzuwenden, um das Schutzniveau der DSGVO nicht zu untergraben (Art. 44). Ergänzende Maßnahmen können selbst mit SCCs nötig sein (EuGH Schrems II, C-311/18).' },
        { id:'e1', art:'Art. 51–59', title:'Unabhängige Aufsichtsbehörden', desc:'Jeder Mitgliedstaat hat eine/mehrere unabhängige Behörden (Art. 51). Befugnisse: Untersuchung (Art. 58(1)), Abhilfe — Warnungen, Verweise, Verbote, Geldbußen (Art. 58(2)), Beratung (Art. 58(3)). Federführende Behörde = Hauptniederlassung (One-Stop-Shop, Art. 56).' },
        { id:'e2', art:'Art. 77–79', title:'Beschwerderecht & gerichtlicher Rechtsbehelf', desc:'Betroffene können Beschwerde bei Aufsichtsbehörde einlegen (Art. 77). Gerichtlicher Rechtsbehelf gegen Behörde (Art. 78) und gegen Verantwortlichen/Auftragsverarbeiter (Art. 79). Verfahren am Sitz des Verantwortlichen ODER Wohnsitz der betroffenen Person.' },
        { id:'e3', art:'Art. 82', title:'Schadenersatz & Haftung (Art. 82 DSGVO)', desc:'Materieller/immaterieller Schaden begründet Schadenersatzanspruch. Verantwortlicher haftet, es sei denn nicht verantwortlich. Auftragsverarbeiter haftet nur bei DSGVO-/Weisungsverstößen. Gesamtschuldnerische Haftung (Art. 82(4)).' },
        { id:'e4', art:'Art. 83, 84', title:'Geldbußen (Art. 83 DSGVO)', desc:'Bußgelder bis 20 Mio. EUR oder 4% des weltweiten Jahresumsatzes (höherer Betrag). Zwei-Stufen-System: Art. 83(4) (bis 10 Mio./2%) und Art. 83(5) (bis 20 Mio./4%). Wirksam, verhältnismäßig, abschreckend (Art. 83(1)). Mitgliedstaatliche Sanktionen (Art. 84).' }
      ]}
    ]
  }
};

/* ═══════════════════════════════════════════
   SCANNER KEYWORD PATTERNS — broad general-language matching
   Matches both legal citations AND common privacy-policy phrasing.
   Each entry maps to specific checklist item IDs.
   ═══════════════════════════════════════════ */
const SCAN_PATTERNS = [
  // ── Section I: Technical Implementation ──
  { itemIds:['t1'], sectionId:'tech', articleRef:'Art. 32, §64 BDSG',
    label:{en:'SSL/TLS transport encryption',de:'SSL/TLS-Transportverschlüsselung'},
    en:/\b(SSL|TLS|HTTPS|HSTS|encrypt(ed|ion)|transport\s*layer|secure\s*(connection|transmission|socket|channel|certificate)|data\s*in\s*transit|Let'?s?\s*Encrypt|mixed\s*content|Wildcard\s*cert|SMTP|PGP|GPG|S\/MIME|digital\s*certificate|end\-to\-end\s*encrypt)\b/i,
    de:/\b(SSL|TLS|HTTPS|HSTS|Verschl(ü|ue)sselung|Transportverschlüsselung|sichere\s*(Verbindung|(Ü|UE|UE)bertragung|Daten(ü|ue)bertragung)|Let'?s?\s*Encrypt|Mixed\s*Content|Wildcard\s*Zertifikat|SMTP|PGP|GPG|S\/MIME|digitales\s*Zertifikat|Ende\-zu\-Ende)\b/i },
  { itemIds:['t2'], sectionId:'tech', articleRef:'Art. 28, 29, 32',
    label:{en:'CMS, plugin & server security',de:'CMS-, Plugin- & Server-Sicherheit'},
    en:/\b(CMS|plugin|theme|software\s*updat|security\s*patch|brute.{0,5}force|login\s*(attempt|limit|protect)|access\s*log|IP\s*(pseudonymi|anonymi|mask)|shared\s*host|dedicated\s*server|VPS|firewall|malware|vulnerability\s*(scan|assessment)|server\s*(security|hardening)|admin\s*panel|two.{0,5}factor|2FA)\b/i,
    de:/\b(CMS|Plugin|Theme|Software.{0,5}Update|Sicherheitsupdate|Brute.{0,5}Force|Login.{0,5}(Versuch|Begrenzung|Schutz)|Access.{0,5}Log|IP.{0,5}(Pseudonym|Anonymi|Mask)|Shared\s*Host|dediziert.{0,5}Server|VPS|Firewall|Malware|Schwachstellen|Server.{0,5}(Sicherheit|H(ä|a)rtung)|Admin.{0,5}(Panel|Bereich)|Zwei.{0,5}Faktor|2FA)\b/i },
  { itemIds:['t3'], sectionId:'tech', articleRef:'§25 TTDSG, Art. 7',
    label:{en:'Cookie consent management',de:'Cookie-Einwilligungsmanagement'},
    en:/\b(cookie|consent\s*(banner|management|tool|platform|manager)|opt.{0,2}(in|out)|tracking\s*(consent|preference|technology)|cookie\s*(notice|policy|setting|preference)|dark\s*pattern|prior\s*consent|explicit\s*consent|TTDSG|ePrivacy|essential\s*cookie|non.{0,2}essential\s*cookie|first.{0,2}party\s*cookie|third.{0,2}party\s*cookie)\b/i,
    de:/\b(Cookie|Einwilligung.{0,5}(Banner|Management|Tool|Plattform|Manager)|Opt.{0,2}(in|out)|Tracking.{0,5}(Einwilligung|Pr(ä|a)ferenz|Technologie)|Cookie.{0,5}(Hinweis|Richtlinie|Einstellung|Pr(ä|a)ferenz)|Dark\s*Pattern|vorherige\s*Einwilligung|ausdr(ü|ue)ckliche\s*Einwilligung|TTDSG|ePrivacy|essentiell.{0,5}Cookie|nicht\s*essentiell|Erstanbieter|Drittanbieter)\b/i },
  { itemIds:['t4'], sectionId:'tech', articleRef:'Art. 44–49, Art. 6',
    label:{en:'External services governance',de:'Governance externer Dienste'},
    en:/\b(web\s*font|Google\s*Font|CDN|content\s*delivery|third.{0,2}party\s*(service|provider|tool|integration|script|embed)|external\s*(service|provider|host|tool)|social\s*media\s*(plugin|button|widget|share)|Google\s*Analytics|Matomo|Fathom|Plausible|analytics\s*tool|tracking\s*(tool|pixel|code)|Shariff|2.{0,2}(click|klick)|preview\s*image|map\s*service|Google\s*Maps|OpenStreetMap|video\s*embed|YouTube|Vimeo)\b/i,
    de:/\b(Webfont|Google\s*Font|CDN|Content\s*Delivery|Dritt.{0,2}(dienst|anbieter|tool|integration|script|einbindung)|extern.{0,5}(Dienst|Anbieter|Host|Tool)|Social.{0,5}Media.{0,5}(Plugin|Button|Widget|Share)|Google\s*Analytics|Matomo|Fathom|Plausible|Analytics.{0,5}Tool|Tracking.{0,5}(Tool|Pixel|Code)|Shariff|2.{0,2}Klick|Vorschaubild|Karten.{0,5}Dienst|Google\s*Maps|OpenStreetMap|Video.{0,5}Einbettung|YouTube|Vimeo)\b/i },
  { itemIds:['t5'], sectionId:'tech', articleRef:'Art. 28',
    label:{en:'Data Processing Agreement with web host',de:'Auftragsverarbeitungsvertrag mit Webhoster'},
    en:/\b(data\s*processing\s*agreement|Auftragsverarbeitungsvertrag|AVV|DPA|processor\s*(agreement|contract)|Art\.\s*28|host(ing)?\s*(provider|agreement|contract)|web\s*host|server\s*provider|subcontract(or|ing)|data\s*processing\s*addendum)\b/i,
    de:/\b(Auftragsverarbeitungsvertrag|AVV|Auftragsverarbeiter.{0,10}Vertrag|Art\.\s*28|Host(ing)?.{0,5}(Anbieter|Vertrag|Provider)|Webhoster|Server.{0,5}Anbieter|Unterauftragsverarbeiter|Datenverarbeitungsvertrag)\b/i },

  // ── Section II: Basic Concepts & Scope ──
  { itemIds:['c1'], sectionId:'basics', articleRef:'Art. 4 Nr. 1',
    label:{en:'Definition of personal data',de:'Begriff der personenbezogenen Daten'},
    en:/\b(personal\s*(data|information)|personally\s*identifiable|PII|identif(ied|iable|ying)\s*(natural\s*)?person|personal\s*(details|record)|(what|the)\s*(data|information)\s*we\s*collect|types\s*of\s*(data|information)|categories\s*of\s*(personal\s*)?data|Art\.\s*4\s*(Nr\.?\s*1|Abs\.?\s*1))\b/i,
    de:/\b(personenbezogene\s*(Daten|Informationen)|identifizierbar.{0,10}(nat(ü|ue)rliche\s*)?Person|pers(ö|oe)nliche\s*(Daten|Angaben|Informationen)|(welche|die)\s*(Daten|Informationen).{0,10}(erheben|verarbeiten|sammeln)|Art(en)?\s*(der|von)\s*(Daten|personenbezogenen)|Art\.\s*4\s*(Nr\.?\s*1|Abs\.?\s*1))\b/i },
  { itemIds:['c2'], sectionId:'basics', articleRef:'Art. 2',
    label:{en:'Material scope (Art. 2)',de:'Sachlicher Anwendungsbereich (Art. 2)'},
    en:/\b(scope\s*of\s*(application|this\s*(policy|regulation|notice))|applies\s*to|(automated|automatic)\s*processing|filing\s*system|household\s*(exemption|exception|activity)|personal\s*(use|activity)|law\s*enforcement\s*(purpose|processing)|Art\.\s*2\s*(DSGVO|GDPR))\b/i,
    de:/\b(Anwendungsbereich|Geltungsbereich|gilt\s*f(ü|ue)r|automatisierte\s*Verarbeitung|Dateisystem|Haushaltsausnahme|pers(ö|oe)nliche\s*(T(ä|a)tigkeit|Nutzung)|Strafverfolgung|Art\.\s*2\s*(DSGVO|GDPR))\b/i },
  { itemIds:['c3'], sectionId:'basics', articleRef:'Art. 3',
    label:{en:'Territorial scope (Art. 3)',de:'Räumlicher Anwendungsbereich (Art. 3)'},
    en:/\b(territorial|EU|European\s*(Union|Economic)|establishment|offering\s*(goods|services).{0,10}EU|monitoring\s*(behavio|of).{0,10}EU|(in|within)\s*the\s*(EU|European\s*Union)|data\s*subject.{0,10}(EU|Europe|Union)|Art\.\s*3\s*(DSGVO|GDPR)|applicable\s*law|governing\s*law)\b/i,
    de:/\b(r(ä|a)umlich.{0,10}(Anwendungsbereich|Geltung)|EU|Europ(ä|a)ische\s*Union|Niederlassung|Marktort|Waren\s*oder\s*Dienstleistungen.{0,10}EU|Verhaltensbeobachtung|(in|innerhalb)\s*der\s*EU|Art\.\s*3\s*(DSGVO|GDPR)|anwendbares\s*Recht|Gerichtsstand)\b/i },
  { itemIds:['c4'], sectionId:'basics', articleRef:'Art. 4 Nr. 2',
    label:{en:'Broad concept of processing',de:'Weiter Verarbeitungsbegriff'},
    en:/\b(processing.{0,5}(means|includes|definition|operation)|collect(ion|ing)|record(ing)?|stor(ing|age|e)|(use|using)\s*(of\s*)?(personal\s*)?data|disclos(ure|ing)|shar(ing|e).{0,10}data|eras(ing|ure)|delet(ing|ion).{0,10}data|destr(oying|uction)|anonymi(s|z)(e|ation|ing)|pseudonymi(s|z)(e|ation|ing)|how\s*we\s*(use|process|handle))\b/i,
    de:/\b(Verarbeitung.{0,5}(umfasst|bedeutet|Begriff|jeder\s*Vorgang)|Erheb(en|ung)|Erfass(en|ung)|Speicher(n|ung)|Nutzung|Offenleg(en|ung)|(Ü|UE|UE)bermitt(e)?lung|L(ö|oe)sch(en|ung)|Vernicht(ung|en)|Anonymisierung|Pseudonymisierung|wie\s*wir.{0,10}(nutzen|verarbeiten))\b/i },

  // ── Section III: Principles, Legal Bases & Special Processing ──
  { itemIds:['l1'], sectionId:'lawful', articleRef:'Art. 5(1)',
    label:{en:'Data protection principles',de:'Datenschutzgrundsätze'},
    en:/\b(data\s*protection\s*principles|(process|handle).{0,10}(lawfully|fairly|transparent)|purpose\s*limitation|data\s*minimi(s|z)(e|ation)|(collect|process).{0,10}(only|limited|necessary|adequate|relevant)|(keep|store).{0,10}(accurate|up.{0,5}date|no\s*longer\s*than)|integrity\s*(and|&)\s*confidentiality|appropriate\s*security|Art\.\s*5\s*\(1\)|we\s*(respect|protect|safeguard)\s*your\s*(privacy|data|rights))\b/i,
    de:/\b(Datenschutzgrunds(ä|a)tze|(verarbeiten|Verarbeitung).{0,10}(rechtm(ä|a)(ß|ss)ig|Treu\s*und\s*Glauben|transparent)|Zweckbindung|Datenminimierung|(erheben|verarbeiten).{0,10}(nur|begrenzt|notwendig|angemessen|erheblich)|Richtigkeit|Speicherbegrenzung|Integrit(ä|a)t.*Vertraulichkeit|angemessene\s*Sicherheit|Art\.\s*5\s*Abs\.\s*1|wir\s*(respektieren|sch(ü|ue)tzen)\s*Ihre\s*(Daten|Privatsph(ä|a)re))\b/i },
  { itemIds:['l2'], sectionId:'lawful', articleRef:'Art. 6(1)',
    label:{en:'Legal basis for processing',de:'Rechtsgrundlage für Verarbeitung'},
    en:/\b(legal\s*(basis|bases|ground|grounds)|lawful\s*(basis|ground)|Rechtsgrundlage|we\s*process.{0,10}(based\s*on|under|pursuant)|consent|contract(ual)?\s*(necessity|obligation|performance)|legitimate\s*interest|legal\s*obligation|vital\s*interest|public\s*interest|official\s*authority|Art\.\s*6\s*\(1\)|processing\s*is\s*(necessary|required|based))\b/i,
    de:/\b(Rechtsgrundlage|wir\s*verarbeiten.{0,10}(auf\s*Grundlage|gem(ä|a)(ß|ss)|basierend\s*auf)|Einwilligung|Vertrag(serf(ü|ue)llung|sverh(ä|a)ltnis)|berechtigtes\s*Interesse|rechtliche\s*Verpflichtung|lebenswichtiges\s*Interesse|(ö|oe)ffentliches\s*Interesse|Art\.\s*6\s*Abs\.\s*1|Verarbeitung\s*(ist|erfolgt).{0,10}(erforderlich|notwendig|basierend))\b/i },
  { itemIds:['l3'], sectionId:'lawful', articleRef:'Art. 7, 8',
    label:{en:'Valid consent',de:'Wirksame Einwilligung'},
    en:/\b((freely|freely)\s*given\s*consent|(specific|informed|unambiguous|explicit)\s*consent|withdraw.{0,10}consent|revoke.{0,10}consent|opt.{0,2}out|unsubscribe|right\s*to\s*withdraw|as\s*easy\s*to\s*withdraw|(child|minor|under\s*(16|18|13)).{0,10}consent|parental\s*consent|age\s*of\s*consent|Art\.\s*[78]\s*(DSGVO|GDPR)|Koppelungsverbot|bundling\s*prohibition|no\s*obligation\s*to\s*consent)\b/i,
    de:/\b((freiwillig|ausdr(ü|ue)cklich|informiert|unmissverst(ä|a)ndlich).{0,10}Einwilligung|Einwilligung.{0,10}(widerrufen|zur(ü|ue)ckziehen)|Opt.{0,2}Out|Abmelden|Widerrufsrecht|so\s*einfach\s*wie\s*Erteilung|(Kind|Minderj(ä|a)hrig|unter\s*(16|18|13)).{0,10}Einwilligung|elterliche\s*Einwilligung|Art\.\s*[78]\s*(DSGVO|GDPR)|Koppelungsverbot|keine\s*Verpflichtung\s*zur\s*Einwilligung)\b/i },
  { itemIds:['l4'], sectionId:'lawful', articleRef:'Art. 9',
    label:{en:'Special category data',de:'Besondere Kategorien personenbezogener Daten'},
    en:/\b(special\s*categor.{0,10}(data|personal)|sensitive\s*(personal\s*)?(data|information)|racial|ethnic\s*origin|political\s*(opinion|view|affiliation)|religious\s*(belief|view|affiliation)|philosophical\s*belief|trade\s*union|genetic\s*data|biometric\s*data|health\s*(data|information|record)|medical\s*(data|record|information)|sex\s*(life|ual\s*orientation)|sexual\s*orientation|Art\.\s*9\s*(DSGVO|GDPR)|prohibited\s*processing)\b/i,
    de:/\b(besondere\s*Kategor.{0,10}(Daten|personenbezogen)|sensible\s*(Daten|Informationen)|rassisch|ethnisch.{0,5}Herkunft|politische\s*(Meinung|Ansicht|(Ü|UE|UE)berzeugung)|religi(ö|oe)s.{0,5}(Überzeugung|Ansicht)|Gewerkschaft|genetisch.{0,5}Daten|biometrisch.{0,5}Daten|Gesundheitsdaten|medizinische\s*Daten|Sexualleben|sexuelle\s*Orientierung|Art\.\s*9\s*(DSGVO|GDPR)|Verarbeitungsverbot)\b/i },
  { itemIds:['l5'], sectionId:'lawful', articleRef:'Art. 5(1)(b), 6(4)',
    label:{en:'Purpose limitation & compatible use',de:'Zweckbindung & Zweckänderung'},
    en:/\b(purpose\s*(limitation|specification|specified)|(collected|processed)\s*for.{0,10}(specified|explicit|legitimate)\s*purposes|compatib(le|ility).{0,10}(purpose|use|processing)|further\s*processing|(change|different)\s*(of\s*)?purpose|archiving\s*(purpose|in\s*the\s*public)|research\s*purpose|statistical\s*purpose|Art\.\s*(5\(1\)\(b\)|6\(4\)|89))\b/i,
    de:/\b(Zweckbindung|(erhoben|verarbeitet).{0,10}(festgelegt|eindeutig|legitim).{0,10}Zwecke|kompatibel|Vereinbarkeit.{0,10}Zweck|Weiterverarbeitung|Zweck(ä|a)nderung|Archivzweck|Forschungszweck|statistische\s*Zwecke|Art\.\s*(5\s*Abs\.\s*1\s*lit\.\s*b|6\s*Abs\.\s*4|89))\b/i },
  { itemIds:['b1'], sectionId:'lawful', articleRef:'§26 BDSG',
    label:{en:'Employee data protection',de:'Beschäftigtendatenschutz'},
    en:/\b(employee\s*(data|privacy|protection|personal|information|record)|staff\s*(data|privacy|personal)|worker\s*(data|privacy)|personnel\s*(data|file|record)|employment\s*(relationship|contract|data|purpose)|(HR|human\s*resources).{0,10}(data|processing|privacy)|applicant\s*data|candidate\s*(data|privacy)|§\s*26\s*BDSG)\b/i,
    de:/\b(Besch(ä|a)ftigten(datenschutz|daten)|Arbeitnehmer(datenschutz|daten)|Mitarbeiter.{0,5}(Daten|Datenschutz|Privatsph(ä|a)re)|Personal(daten|akte)|Besch(ä|a)ftigungsverh(ä|a)ltnis|(Personal|HR).{0,10}(Daten|Verarbeitung|Datenschutz)|Bewerber.{0,5}Daten|§\s*26\s*BDSG)\b/i },
  { itemIds:['b6'], sectionId:'lawful', articleRef:'§28 BDSG',
    label:{en:'Research & statistics (§28 BDSG)',de:'Forschung & Statistik (§28 BDSG)'},
    en:/\b((scientific|academic|medical)\s*research|historical\s*research|statistical\s*(purpose|analysis|evaluation|study)|research\s*(data|purpose|project|study)|pseudonymi(s|z)(e|ed|ation).{0,10}(research|data|study)|anonymi(s|z)(e|ed|ation).{0,10}(research|data)|§\s*28\s*BDSG)\b/i,
    de:/\b((wissenschaftlich|akademisch|medizinisch).{0,5}Forschung|historische\s*Forschung|statistische\s*(Zwecke|Auswertung|Analyse|Erhebung)|Forschungs(daten|zweck|projekt|vorhaben)|Pseudonymisierung.{0,10}(Forschung|Daten|Studie)|Anonymisierung.{0,10}(Forschung|Daten)|§\s*28\s*BDSG)\b/i },

  // ── Section IV: Roles & Responsibilities ──
  { itemIds:['o1'], sectionId:'roles', articleRef:'Art. 4 Nr. 7, 26',
    label:{en:'Controller & joint controllers',de:'Verantwortlicher & gemeinsam Verantwortliche'},
    en:/\b((data\s*)?controller|(we|company|organization|organisation).{0,10}(is|are|act as|as)\s*(the\s*)?(data\s*)?controller|responsible\s*(for|party|entity)|(determine|decide).{0,10}(purpose|mean).{0,10}(processing|data)|joint\s*controller|co.{0,2}controller|Art\.\s*4\s*(Nr\.?\s*7|Abs\.?\s*7)|Art\.\s*26)\b/i,
    de:/\b(Verantwortlicher|(wir|Unternehmen|Organisation).{0,10}(ist|sind|als).{0,10}Verantwortlich|verantwortliche\s*Stelle|(entscheidet|bestimmt).{0,10}(Zweck|Mittel).{0,10}Verarbeitung|gemeinsam\s*Verantwortlich|Art\.\s*4\s*(Nr\.?\s*7|Abs\.?\s*7)|Art\.\s*26)\b/i },
  { itemIds:['o2'], sectionId:'roles', articleRef:'Art. 4 Nr. 8, 28',
    label:{en:'Processor & Art. 28 contract',de:'Auftragsverarbeiter & Art. 28-Vertrag'},
    en:/\b((data\s*)?processor|service\s*provider.{0,10}(process|handle|data)|(process|handle).{0,10}(on\s*our\s*behalf|on\s*behalf|for\s*us)|sub.{0,2}processor|data\s*processing\s*agreement|AVV|Art\.\s*4\s*(Nr\.?\s*8|Abs\.?\s*8)|Art\.\s*28)\b/i,
    de:/\b(Auftragsverarbeiter|Dienstleister.{0,10}(verarbeit|Daten)|(verarbeit|Daten).{0,10}(in\s*unserem\s*Auftrag|im\s*Auftrag|f(ü|ue)r\s*uns)|Unterauftragsverarbeiter|Auftragsverarbeitungsvertrag|AVV|Art\.\s*4\s*(Nr\.?\s*8|Abs\.?\s*8)|Art\.\s*28)\b/i },
  { itemIds:['o3'], sectionId:'roles', articleRef:'Art. 4 Nr. 9–10',
    label:{en:'Recipient & third party',de:'Empfänger & Dritter'},
    en:/\b(recipient.{0,10}(data|personal|information)|(disclos|share|transfer|provide|give).{0,10}(data|information|personal).{0,10}(to|with)|third\s*party.{0,10}(data|share|disclos|transfer|access)|who\s*(receives|has\s*access|we\s*share).{0,10}(data|information)|Art\.\s*4\s*(Nr\.?\s*[9]|Nr\.?\s*10|Abs\.?\s*[9]|Abs\.?\s*10))\b/i,
    de:/\b(Empf(ä|a)nger.{0,10}(Daten|personenbezogen)|(offenleg|teil|(ü|ue)bermittel|weitergeb).{0,10}(Daten|Informationen).{0,10}(an|mit)|Dritter.{0,10}(Daten|Offenlegung|(Ü|UE|UE)bermittlung|Zugriff)|wer\s*(Daten|Informationen).{0,10}(erh(ä|a)lt|Zugriff|wir\s*teilen)|Art\.\s*4\s*(Nr\.?\s*[9]|Nr\.?\s*10|Abs\.?\s*[9]|Abs\.?\s*10))\b/i },
  { itemIds:['o4'], sectionId:'roles', articleRef:'Art. 26, 28, 29',
    label:{en:'Multi-party processing governance',de:'Mehrparteien-Verarbeitungs-Governance'},
    en:/\b(joint\s*controllership|co.{0,2}controllership|shared\s*responsibility.{0,10}(data|processing|GDPR)|arrangement.{0,10}(controller|processor|party|between)|(prior|written).{0,10}(authori[s|z]ation|approval|consent).{0,10}(processor|sub.{0,2}processor)|Art\.\s*29)\b/i,
    de:/\b(gemeinsame\s*Verantwortlichkeit|geteilte\s*Verantwortung.{0,10}(Daten|Verarbeitung|DSGVO)|Vereinbarung.{0,10}(Verantwortlich|Auftragsverarbeiter|Partei|zwischen)|(vorherig|schriftlich).{0,10}(Genehmigung|Zustimmung|Einwilligung).{0,10}(Auftragsverarbeiter|Unterauftragsverarbeiter)|Art\.\s*29)\b/i },

  // ── Section V: Data Subject Rights ──
  { itemIds:['r1'], sectionId:'rights', articleRef:'Art. 12–14',
    label:{en:'Transparency & information obligations',de:'Transparenz & Informationspflichten'},
    en:/\b(transparen.{0,10}(information|obligation|processing|policy|notice)|(inform|tell|notify).{0,10}(data\s*subject|you|user|visitor).{0,10}(about|of|regarding).{0,10}(data|processing|personal|collection)|privacy\s*(notice|policy|statement|information)|(clear|plain|simple|easy).{0,10}language|within\s*(one|1)\s*month|free\s*of\s*charge|Art\.\s*1[2-4]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Transparenz|Informationspflicht|(informier|unterricht|mitteil).{0,10}(betroffene|Sie|Nutzer|Besucher).{0,10}((ü|ue)ber|von|bez(ü|ue)glich).{0,10}(Daten|Verarbeitung|Erhebung)|Datenschutzerkl(ä|a)rung|Datenschutzinformation|(klar|einfach|verst(ä|a)ndlich).{0,10}Sprache|innerhalb.{0,10}(einem|1)\s*Monat|unentgeltlich|kostenlos|Art\.\s*1[2-4]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['r2'], sectionId:'rights', articleRef:'Art. 15',
    label:{en:'Right of access',de:'Auskunftsrecht'},
    en:/\b(right\s*(of|to)\s*access|access\s*right|(request|obtain|ask\s*for|get).{0,10}(copy|information|access|confirm).{0,10}(data|personal|information|processing)|subject\s*access\s*request|SAR|(know|learn|find\s*out).{0,10}(what\s*data|what\s*personal|what\s*information).{0,10}(we\s*(have|hold|process|store))|Art\.\s*15\s*(DSGVO|GDPR)|Auskunftsrecht)\b/i,
    de:/\b(Auskunftsrecht|Recht\s*auf\s*Auskunft|(anfragen|verlangen|erhalten|bekommen).{0,10}(Kopie|Auskunft|Information|Best(ä|a)tigung).{0,10}(Daten|personenbezogen|Verarbeitung)|(wissen|erfahren).{0,10}(welche\s*Daten|was).{0,10}(wir|(ü|ue)ber\s*Sie).{0,10}(haben|speichern|verarbeiten)|Art\.\s*15\s*(DSGVO|GDPR))\b/i },
  { itemIds:['r3'], sectionId:'rights', articleRef:'Art. 16, 17, 18',
    label:{en:'Rectification, erasure & restriction',de:'Berichtigung, Löschung & Einschränkung'},
    en:/\b(right\s*to\s*(rectif|correct|update|change|eras|delet|remov|forget|restrict|block|limit)|(correct|update|rectify).{0,10}(inaccurate|wrong|incorrect|outdated).{0,10}(data|information|personal)|(delete|erase|remove).{0,10}(your|personal)?\s*(data|information|account|record)|right\s*to\s*be\s*forgotten|(restrict|limit|block|suspend).{0,10}processing|Art\.\s*1[6-8]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Recht\s*auf\s*(Berichtigung|Korrektur|Aktualisierung|L(ö|oe)schung|Entfernung|Vergessenwerden|Einschr(ä|a)nkung|Sperrung)|(korrigier|berichtig|aktualisier).{0,10}(unrichtig|falsch|veraltet).{0,10}(Daten|Informationen|Angaben)|(l(ö|oe)sch|entfern).{0,10}(Ihre|personenbezogen).{0,10}(Daten|Informationen|Konto)|Recht\s*auf\s*Vergessenwerden|(einschr(ä|a)nk|sperr).{0,10}Verarbeitung|Art\.\s*1[6-8]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['r4'], sectionId:'rights', articleRef:'Art. 20',
    label:{en:'Data portability',de:'Datenübertragbarkeit'},
    en:/\b(data\s*portability|right\s*to\s*portability|(receive|obtain|get|export|download).{0,10}(your\s*)?(data|personal|information).{0,10}(structured|commonly|machine.{0,2}readable|portable|electronic|digital\s*format)|(transfer|move|send|transmit).{0,10}(your\s*)?data.{0,10}(to\s*)?(another|different|other).{0,10}(controller|provider|service|company)|Art\.\s*20\s*(DSGVO|GDPR))\b/i,
    de:/\b(Daten(ü|ue)bertragbarkeit|Recht\s*auf\s*(Ü|UE|UE)bertragbarkeit|(erhalt|bekomm|exportier|herunterlad).{0,10}(Ihre|personenbezogen).{0,10}(Daten|Informationen).{0,10}(strukturiert|g(ä|a)ngig|maschinenlesbar|(ü|ue)bertragbar|elektronisch|digital)|((ü|ue)bertrag|(ü|ue)bermittel|wechsel).{0,10}(Ihre|die)?\s*Daten.{0,10}(zu\s*)?(ander|neu|wechsel).{0,10}(Anbieter|Dienst|Verantwortlich)|Art\.\s*20\s*(DSGVO|GDPR))\b/i },
  { itemIds:['r5'], sectionId:'rights', articleRef:'Art. 21, 22',
    label:{en:'Right to object & automated decisions',de:'Widerspruchsrecht & autom. Entscheidungen'},
    en:/\b(right\s*to\s*object|object(ion)?.{0,10}(processing|data|personal)|opt.{0,2}out.{0,10}(processing|marketing|advertising)|(automated|automatic).{0,10}(decision|processing|profiling|system|algorithm)|human\s*intervention|(legal|significant)\s*effect.{0,10}(automated|decision|processing)|direct\s*marketing|profiling.{0,10}(object|opt|right)|Art\.\s*2[1-2]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Widerspruchsrecht|Recht\s*auf\s*Widerspruch|widersprechen.{0,10}(Verarbeitung|Daten|personenbezogen)|Opt.{0,2}Out.{0,10}(Verarbeitung|Marketing|Werbung)|(automatisiert|automatisch).{0,10}(Entscheidung|Verarbeitung|Profiling|System|Algorithmus)|menschlich.{0,10}(Eingreifen|(Ü|UE|UE)berpr(ü|ue)fung|Entscheidung)|Direktwerbung|Profiling.{0,10}(Widerspruch|Opt|Recht)|Art\.\s*2[1-2]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['r6'], sectionId:'rights', articleRef:'Art. 23',
    label:{en:'Restrictions on rights',de:'Beschränkungen der Rechte'},
    en:/\b(restrict(ion)?.{0,10}(rights|data\s*subject|scope|obligation)|limit(ation)?.{0,10}(rights|exercise)|(national|public|Union|Member\s*State).{0,10}(law|legislation|measure).{0,10}(restrict|limit|derogat)|essence\s*of\s*(fundamental\s*)?rights|necessary\s*and\s*proportionate|(Ö|OE|OE)ffnungsklausel|Art\.\s*23\s*(DSGVO|GDPR))\b/i,
    de:/\b(Beschr(ä|a)nkung.{0,10}(Rechte|Betroffenenrecht|Pflicht)|Einschr(ä|a)nkung.{0,10}(Rechte|Aus(ü|ue)bung)|(national|(ö|oe)ffentlich|Union|Mitgliedstaat).{0,10}(Gesetz|Rechtsvorschrift|Ma(ß|ss)nahme).{0,10}(beschr(ä|a)nk|einschr(ä|a)nk)|Wesensgehalt.{0,10}Grundrecht|notwendig\s*und\s*verh(ä|a)ltnism(ä|a)(ß|ss)ig|(Ö|OE|OE)ffnungsklausel|Art\.\s*23\s*(DSGVO|GDPR))\b/i },
  { itemIds:['b2'], sectionId:'rights', articleRef:'§22 BDSG',
    label:{en:'Automated individual decisions (§22 BDSG)',de:'Automatisierte Einzelentscheidungen (§22 BDSG)'},
    en:/\b(§\s*22\s*BDSG|automated\s*(individual\s*)?decision.{0,10}(BDSG|German|national)|automatisiert.{0,10}Einzelfallentscheidung|scoring.{0,10}(BDSG|German|§\s*22)|human\s*intervention.{0,10}(BDSG|German)|right\s*to\s*contest.{0,10}(automated|decision))\b/i,
    de:/\b(§\s*22\s*BDSG|automatisiert.{0,10}Einzelentscheidung|Scoring.{0,10}(BDSG|§\s*22)|menschlich.{0,10}Eingreifen.{0,10}(BDSG|§\s*22)|Recht\s*auf\s*Anfechtung.{0,10}(automatisiert|Entscheidung)|Standpunkt.{0,10}darlegen)\b/i },
  { itemIds:['b7'], sectionId:'rights', articleRef:'§31 BDSG',
    label:{en:'Scoring & credit checks (§31 BDSG)',de:'Scoring & Bonitätsprüfungen (§31 BDSG)'},
    en:/\b(§\s*31\s*BDSG|scoring|credit\s*(check|assessment|score|rating|report|worthiness)|probability\s*value|mathematical.{0,5}statistical\s*method|Schufa|credit\s*bureau|credit\s*reference|credit\s*agency|risk\s*score|predictive\s*model)\b/i,
    de:/\b(§\s*31\s*BDSG|Scoring|Bonit(ä|a)t(spr(ü|ue)fung|sbewertung|sauskunft|Score)|Kreditw(ü|ue)rdigkeit|Wahrscheinlichkeitswert|mathematisch.{0,5}statistisch|Schufa|Kreditauskunftei|Kreditinstitut|Risikoscore|Prognosemodell)\b/i },

  // ── Section VI: Technical & Organisational Measures ──
  { itemIds:['s1'], sectionId:'security', articleRef:'Art. 24, 25',
    label:{en:'Data protection by design & by default',de:'Privacy by Design & by Default'},
    en:/\b((privacy|data\s*protection)\s*by\s*(design|default)|built.{0,2}in\s*(privacy|data\s*protection)|(privacy|data\s*protection).{0,10}(design|default|integrated|embedded|built|standard)|default\s*settings.{0,10}(privacy|data|personal)|privacy.{0,2}(friendly|preserving|enhancing).{0,5}(setting|design|default)|TOM|technical\s*(and|&)\s*organi(s|z)ational|Art\.\s*2[4-5]\s*(DSGVO|GDPR))\b/i,
    de:/\b((Privacy|Datenschutz)\s*by\s*(Design|Default)|Datenschutz\s*durch\s*Technik|datenschutzfreundlich.{0,5}(Voreinstellung|Gestaltung|Technik)|eingebaut.{0,5}(Datenschutz|Privatsph(ä|a)re)|Voreinstellung.{0,10}(Datenschutz|Daten|Privat)|TOM|technisch.{0,5}(und|&).{0,5}organisatorisch|Art\.\s*2[4-5]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['s2'], sectionId:'security', articleRef:'Art. 32',
    label:{en:'Security of processing',de:'Sicherheit der Verarbeitung'},
    en:/\b((appropriate|adequate|reasonable|suitable).{0,10}(security|technical|organi(s|z)ational).{0,10}measur|(security|protect|safeguard).{0,10}(personal\s*data|data\s*processing|information)|(pseudonymi(s|z)|encrypt|anonymi(s|z)).{0,10}(data|personal|information)|(confidentiality|integrity|availability).{0,10}(data|system|processing|service|information)|penetration\s*test|security\s*audit|ISO\s*27001|Art\.\s*32\s*(DSGVO|GDPR))\b/i,
    de:/\b((geeignet|angemessen|ausreichend).{0,10}(Sicherheit|technisch|organisatorisch).{0,10}Ma(ß|ss)nahm|(sch(ü|ue)tz|sicher).{0,10}(personenbezogen|Datenverarbeitung|Information)|(pseudonymisier|verschl(ü|ue)ssel|anonymisier).{0,10}(Daten|personenbezogen|Information)|(Vertraulichkeit|Integrit(ä|a)t|Verf(ü|ue)gbarkeit).{0,10}(Daten|System|Verarbeitung|Dienst|Information)|Penetrationstest|Sicherheitsaudit|ISO\s*27001|Art\.\s*32\s*(DSGVO|GDPR))\b/i },
  { itemIds:['s3'], sectionId:'security', articleRef:'Art. 33, 34',
    label:{en:'Breach notification & communication',de:'Meldepflicht & Benachrichtigung'},
    en:/\b((data|security|privacy)\s*breach|(security|data)\s*incident|(personal\s*)?data\s*leak|(personal\s*)?data\s*loss|unauthori(s|z)ed\s*access|hack(ing|ed)?|cyber.{0,5}attack|(notif|inform|report|alert).{0,10}(breach|incident|violation|leak|loss)|72\s*hours|supervisory\s*authority.{0,10}(notif|inform|report)|high\s*risk.{0,10}(data\s*subject|individual|person|right)|Art\.\s*3[3-4]\s*(DSGVO|GDPR))\b/i,
    de:/\b((Daten(schutz)?|Sicherheit).{0,5}(Verletzung|Vorfall|Leck|Panne)|(Sicherheit|Daten).{0,5}(Vorfall|Zwischenfall)|Datenleck|Datenverlust|unbefugt.{0,5}Zugriff|Hack(er)?.{0,5}(Angriff|attacke)|Cyber.{0,5}(Angriff|Attacke)|(meld|informier|bericht|alarmier).{0,10}(Verletzung|Vorfall|Versto(ß|ss)|Leck|Verlust)|72\s*Stunden|Aufsichtsbeh(ö|oe)rde.{0,10}(meld|informier|benachrichtig)|hohes\s*Risiko.{0,10}(betroffen|Person|Recht)|Art\.\s*3[3-4]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['s4'], sectionId:'security', articleRef:'Art. 35, 36',
    label:{en:'DPIA & prior consultation',de:'DSFA & vorherige Konsultation'},
    en:/\b(DPIA|PIA|data\s*protection\s*impact\s*assessment|privacy\s*impact\s*assessment|DSFA|Folgenabsch(ä|a)tzung|(high\s*)?risk\s*assessment.{0,10}(data|processing|privacy)|(new\s*technology|new\s*system|new\s*process).{0,10}(risk|impact|assessment|privacy|data)|systematic.{0,10}(monitoring|evaluation|assessment|profiling)|large.{0,5}scale.{0,10}(processing|monitoring|data)|prior\s*consultation|Art\.\s*3[5-6]\s*(DSGVO|GDPR))\b/i,
    de:/\b(DSFA|Datenschutz.{0,5}Folgenabsch(ä|a)tzung|DPIA|PIA|Risiko.{0,5}(Analyse|Bewertung|Beurteilung).{0,10}(Daten|Verarbeitung|Datenschutz)|(neue\s*Technolog|neue\s*System|neue\s*Verfahren).{0,10}(Risiko|Auswirkung|Bewertung|Datenschutz)|systematisch.{0,10}((Ü|UE|UE)berwachung|Bewertung|Beurteilung|Profiling)|umfangreich.{0,10}(Verarbeitung|(Ü|UE|UE)berwachung|Daten)|vorherige\s*Konsultation|Art\.\s*3[5-6]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['b3'], sectionId:'security', articleRef:'§32 BDSG',
    label:{en:'Video surveillance (§32 BDSG)',de:'Videoüberwachung (§32 BDSG)'},
    en:/\b(§\s*32\s*BDSG|video\s*(surveillance|monitoring|recording|camera|system)|CCTV|camera\s*(surveillance|monitoring|system)|public.{0,5}(space|area|place|premises).{0,10}(camera|video|surveillance|monitor)|Hausrecht|(surveillance|monitoring).{0,10}sign(age|s))\b/i,
    de:/\b(§\s*32\s*BDSG|Video(ü|ue)berwachung|Video(aufzeichnung|system|kamera|(ü|ue)berwachungsanlage)|Kamera(ü|ue)berwachung|(ö|oe)ffentlich.{0,5}(Raum|Bereich|Platz|Gel(ä|a)nde).{0,10}(Kamera|Video|(Ü|UE|UE)berwach)|Hausrecht|Hinweisschild.{0,10}(Video|Kamera|(Ü|UE|UE)berwach)|Beschilderung.{0,10}(Video|Kamera))\b/i },
  { itemIds:['b5'], sectionId:'security', articleRef:'§64 BDSG',
    label:{en:'Specific security measures (§64 BDSG)',de:'Konkrete Sicherheitsmaßnahmen (§64 BDSG)'},
    en:/\b(§\s*64\s*BDSG|(physical|system|data|transmission|input|availability|separation)\s*access\s*control|access\s*control\s*(system|concept|policy|procedure|log)|audit\s*trail|Ma(ß|ss)nahmenkatalog|TOM.{0,5}(catalogue|catalog|list)|state\s*of\s*the\s*art.{0,10}security|Stand\s*der\s*Technik.{0,10}Sicherheit)\b/i,
    de:/\b(§\s*64\s*BDSG|(physisch|System|Daten|Weitergabe|Eingabe|Verf(ü|ue)gbarkeit|Trenn).{0,5}(Zugriffs|Zugangs).{0,5}kontrolle|Zugangskontrolle|Zugriffskontrolle|Berechtigungskonzept|(Pr(ü|ue)f|Audit).{0,5}(protokoll|nachweis|pfad)|Ma(ß|ss)nahmenkatalog|TOM.{0,5}(Katalog|Liste)|Stand\s*der\s*Technik.{0,10}Sicherheit)\b/i },

  // ── Section VII: Accountability & Governance ──
  { itemIds:['g1'], sectionId:'govern', articleRef:'Art. 5(2), 24',
    label:{en:'Accountability',de:'Rechenschaftspflicht'},
    en:/\b(accountability|Rechenschaft(spflicht)?|(demonstrat|prove|show|document).{0,10}compliance|(we|controller|company|organization).{0,10}(are|is)\s*(responsible|accountable|liable).{0,10}(for|under)|burden\s*of\s*proof|(compliance|data\s*protection)\s*(documentation|evidence|record|proof)|Art\.\s*5\s*\(2\)|Art\.\s*24\s*(DSGVO|GDPR))\b/i,
    de:/\b(Rechenschaft(spflicht)?|(nachweis|beweis|dokumentier|beleg).{0,10}(Einhaltung|Compliance|Konformit(ä|a)t)|(wir|Verantwortlich|Unternehmen|Organisation).{0,10}(sind|ist).{0,10}(verantwortlich|rechenschaftspflichtig).{0,10}(f(ü|ue)r|gem(ä|a)(ß|ss))|Beweislast|(Compliance|Datenschutz).{0,5}(Dokumentation|Nachweis|Aufzeichnung|Beleg)|Art\.\s*5\s*Abs\.\s*2|Art\.\s*24\s*(DSGVO|GDPR))\b/i },
  { itemIds:['g2'], sectionId:'govern', articleRef:'Art. 30',
    label:{en:'Record of Processing Activities (RoPA)',de:'Verarbeitungsverzeichnis (VVT)'},
    en:/\b(record\s*of\s*processing\s*activities|RoPA|VVT|Verarbeitungsverzeichnis|processing\s*(register|inventory|record|catalogue|log|overview|list)|data\s*inventory|data\s*mapping|data\s*flow\s*(map|diagram|chart|documentation)|(document|record|list|register|catalogue).{0,10}(processing\s*activit|data\s*process|personal\s*data)|Art\.\s*30\s*(DSGVO|GDPR))\b/i,
    de:/\b(Verarbeitungsverzeichnis|VVT|RoPA|Verarbeitungs(ü|ue)bersicht|Dateninventar|Datenfluss(diagramm|plan|dokumentation|karte|(Ü|UE|UE)bersicht)|(dokumentier|aufzeichn|auflist|verzeichn|katalogisier).{0,10}(Verarbeitungst(ä|a)tigkeit|Datenverarbeitung|personenbezogen)|Art\.\s*30\s*(DSGVO|GDPR))\b/i },
  { itemIds:['g3'], sectionId:'govern', articleRef:'Art. 37–39',
    label:{en:'Data Protection Officer (DPO/DSB)',de:'Datenschutzbeauftragter (DSB/DPO)'},
    en:/\b(data\s*protection\s*officer|DPO|privacy\s*officer|chief\s*privacy|Datenschutzbeauftragter|DSB|(appoint|designat|name|nominate|mandat).{0,10}(DPO|data\s*protection\s*officer|privacy\s*officer|Datenschutzbeauftragt)|(contact|reach).{0,10}(DPO|data\s*protection\s*officer|privacy\s*officer|Datenschutzbeauftragt)|Art\.\s*3[7-9]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Datenschutzbeauftragter|DSB|(bestell|benenn|ernenn|beauftrag).{0,10}(DSB|Datenschutzbeauftragt)|(Kontakt|erreich|Ansprechpartner).{0,10}(DSB|Datenschutzbeauftragt)|(ö|oe)ffentliche\s*Stelle.{0,10}(DSB|Datenschutzbeauftragt)|Konzern.{0,5}(DSB|Datenschutzbeauftragt)|Art\.\s*3[7-9]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['g4'], sectionId:'govern', articleRef:'Art. 40–43',
    label:{en:'Codes of conduct & certification',de:'Verhaltensregeln & Zertifizierung'},
    en:/\b(code\s*of\s*conduct|Verhaltensregel|Verhaltenskodex|certification\s*(mechanism|body|scheme|program|process)|(data\s*protection|privacy)\s*(seal|mark|certif)|accreditation|Akkreditierung|ISO\s*27701|GDPR\s*(certif|seal|code)|Art\.\s*4[0-3]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Verhaltensregel|Verhaltenskodex|Zertifizierung(smechanismus|sstelle|sprogramm|sverfahren)?|(Datenschutz|Privacy).{0,5}(Siegel|Pr(ü|ue)fzeichen|Zertifikat)|Akkreditierung|ISO\s*27701|DSGVO.{0,5}(Zertif|Siegel|Kodex)|Art\.\s*4[0-3]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['b4'], sectionId:'govern', articleRef:'§45 BDSG',
    label:{en:'DPO designation — extended (§45 BDSG)',de:'DSB-Benennung — erweitert (§45 BDSG)'},
    en:/\b(§\s*45\s*BDSG|(20|twenty|zwanzig).{0,10}(person|employee|staff|worker|people|Mitarbeiter|Besch(ä|a)ftigte).{0,10}(DPO|DSB|data\s*protection\s*officer|Datenschutzbeauftragt)|DPO.{0,10}(mandatory|obligatory|required|must).{0,10}(BDSG|German|national)|(dismiss|fire|terminat).{0,10}(DPO|DSB|Datenschutzbeauftragt)|(§|§)\s*626\s*BGB|K(ü|ue)ndigungsschutz.{0,10}(DSB|Datenschutzbeauftragt))\b/i,
    de:/\b(§\s*45\s*BDSG|(20|zwanzig).{0,10}(Person|Mitarbeiter|Besch(ä|a)ftigte|Arbeitnehmer|Angestellte).{0,10}(DSB|Datenschutzbeauftragt)|DSB.{0,10}(Pflicht|verpflichtend|muss|erforderlich).{0,10}(BDSG|deutsch|national)|(Abberufung|K(ü|ue)ndigung|Entlassung).{0,10}(DSB|Datenschutzbeauftragt)|(§|§)\s*626\s*BGB|K(ü|ue)ndigungsschutz.{0,10}(DSB|Datenschutzbeauftragt))\b/i },

  // ── Section VIII: International Transfers, Supervision & Enforcement ──
  { itemIds:['i1'], sectionId:'supervision', articleRef:'Art. 45',
    label:{en:'Adequacy decisions',de:'Angemessenheitsbeschlüsse'},
    en:/\b(adequacy\s*decision|Angemessenheitsbeschluss|adequate\s*level\s*of\s*protection|angemessenes\s*Schutzniveau|(transfer|data).{0,10}(adequate|safe|approved).{0,10}(country|third|nation|jurisdiction)|Commission\s*(adequacy|decision|finding)|EU.{0,5}US\s*(Privacy\s*Shield|Data\s*Privacy|Safe\s*Harbor)|Art\.\s*45\s*(DSGVO|GDPR))\b/i,
    de:/\b(Angemessenheitsbeschluss|angemessenes\s*Schutzniveau|((Ü|UE|UE)bermittlung|Daten).{0,10}(angemessen|sicher|genehmigt).{0,10}(Land|Drittland|Staat|Jurisdiktion)|Kommission.{0,10}(Angemessenheit|Beschluss|Feststellung)|EU.{0,5}US\s*(Privacy\s*Shield|Data\s*Privacy|Safe\s*Harbor)|Art\.\s*45\s*(DSGVO|GDPR))\b/i },
  { itemIds:['i2'], sectionId:'supervision', articleRef:'Art. 46',
    label:{en:'Appropriate safeguards (SCC, BCR)',de:'Geeignete Garantien (SCC, BCR)'},
    en:/\b(standard\s*(data\s*protection\s*)?(contractual\s*)?clauses|SCC|Standard(datenschutz|vertrags)klausel|binding\s*corporate\s*rules|BCR|(appropriate|suitable|adequate)\s*safeguards|geeignete\s*Garantie|transfer\s*impact\s*assessment|TIA|supplementary\s*measures|erg(ä|a)nzende\s*Ma(ß|ss)nahmen|Schrems\s*II|Art\.\s*4[6-7]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Standarddatenschutzklausel|Standardvertragsklausel|SCC|Binding\s*Corporate\s*Rules|BCR|geeignete\s*Garantie|Transfer\s*Impact\s*Assessment|TIA|erg(ä|a)nzende\s*Ma(ß|ss)nahmen|Schrems\s*II|Art\.\s*4[6-7]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['i3'], sectionId:'supervision', articleRef:'Art. 49',
    label:{en:'Derogations for specific situations',de:'Ausnahmen für besondere Fälle'},
    en:/\b(Art\.\s*49\s*(DSGVO|GDPR)|derogation|Ausnahme.{0,10}((Ü|UE|UE)bermittlung|transfer|Drittland)|(explicit|express)\s*consent.{0,10}(transfer|third\s*country|international)|contract\s*necessity.{0,10}(transfer|third\s*country)|(public\s*interest|vital\s*interest|legal\s*claim).{0,10}(transfer|third\s*country|derogation)|not\s*repetitive|nicht\s*wiederholt)\b/i,
    de:/\b(Art\.\s*49\s*(DSGVO|GDPR)|Ausnahme.{0,10}((Ü|UE|UE)bermittlung|Transfer|Drittland)|ausdr(ü|ue)cklich.{0,10}Einwilligung.{0,10}((Ü|UE|UE)bermittlung|Transfer|Drittland)|Vertragserf(ü|ue)llung.{0,10}((Ü|UE|UE)bermittlung|Transfer)|((ö|oe)ffentlich|lebenswichtig|Rechtsanspruch).{0,10}((Ü|UE|UE)bermittlung|Transfer|Ausnahme)|nicht\s*wiederholt)\b/i },
  { itemIds:['i4'], sectionId:'supervision', articleRef:'Art. 44',
    label:{en:'General transfer principle',de:'Allgemeiner Grundsatz der Datenübermittlung'},
    en:/\b(Art\.\s*44\s*(DSGVO|GDPR)|international\s*(data\s*)?transfer|cross.{0,2}border\s*(data\s*)?(transfer|flow|transmission|exchange)|transfer.{0,10}(third\s*country|international|abroad|overseas|outside|foreign)|(data|personal).{0,10}(transfer|send|transmit|flow).{0,10}(third\s*country|international|abroad|overseas|outside|foreign)|Chapter\s*V|Kapitel\s*V|level\s*of\s*protection\s*not\s*undermined)\b/i,
    de:/\b(Art\.\s*44\s*(DSGVO|GDPR)|international.{0,5}(Daten(ü|ue)bermittlung|Datentransfer)|grenz(ü|ue)berschreitend.{0,5}(Daten(ü|ue)bermittlung|Datentransfer|Datenfluss)|(Ü|UE|UE)bermittlung.{0,10}(Drittland|international|Ausland|au(ß|ss)erhalb|fremd)|(Daten|personenbezogen).{0,10}((ü|ue)bermittel|send|transferier).{0,10}(Drittland|international|Ausland|au(ß|ss)erhalb)|Kapitel\s*V|Schutzniveau\s*nicht\s*untergraben)\b/i },
  { itemIds:['e1'], sectionId:'supervision', articleRef:'Art. 51–59',
    label:{en:'Independent supervisory authorities',de:'Unabhängige Aufsichtsbehörden'},
    en:/\b(supervisory\s*authority|data\s*protection\s*authority|DPA|(privacy|data)\s*regulator|Aufsichtsbeh(ö|oe)rde|(privacy|data\s*protection)\s*commissioner|BayLfD|BfDI|EDSA|EDPB|one.{0,2}stop.{0,2}shop|lead\s*authority|federf(ü|ue)hrend|(enforcement|investigat|corrective)\s*power|Art\.\s*5[1-9]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Aufsichtsbeh(ö|oe)rde|Datenschutzbeh(ö|oe)rde|Datenschutzaufsicht|(Landes|Bundes).{0,5}(Datenschutz)?beauftragt|BayLfD|BfDI|EDSA|EDPB|One.{0,2}Stop.{0,2}Shop|federf(ü|ue)hrend.{0,5}(Aufsichtsbeh(ö|oe)rde|Beh(ö|oe)rde)|(Durchsetzung|Untersuchung|Abhilfe).{0,5}Befugnis|Art\.\s*5[1-9]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['e2'], sectionId:'supervision', articleRef:'Art. 77–79',
    label:{en:'Right to complain & judicial remedy',de:'Beschwerderecht & gerichtlicher Rechtsbehelf'},
    en:/\b(right\s*to\s*(lodge|file|make|submit).{0,10}complaint|Beschwerderecht|(complaint|complain).{0,10}(supervisory|data\s*protection|authority|regulator|DPA)|judicial\s*remedy|effective\s*remedy|gerichtlich.{0,5}Rechtsbehelf|(sue|legal\s*action|litigation|court).{0,10}(data|privacy|GDPR|personal)|Art\.\s*7[7-9]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Beschwerderecht|Recht\s*auf\s*Beschwerde|(Beschwerde|beschwer).{0,10}(Aufsichtsbeh(ö|oe)rde|Datenschutzbeh(ö|oe)rde|Regulierungsbeh(ö|oe)rde)|gerichtlich.{0,5}Rechtsbehelf|wirksamer\s*Rechtsbehelf|(klag|Rechtsweg|Gericht|Prozess).{0,10}(Daten|Datenschutz|DSGVO|personenbezogen)|Art\.\s*7[7-9]\s*(DSGVO|GDPR))\b/i },
  { itemIds:['e3'], sectionId:'supervision', articleRef:'Art. 82',
    label:{en:'Compensation & liability',de:'Schadenersatz & Haftung'},
    en:/\b((compensation|damages|indemnif).{0,10}(data|privacy|GDPR|personal|processing)|Schaden(s)?ersatz|Haftung|liability.{0,10}(data|privacy|GDPR|processing|controller|processor)|(material|non.{0,2}material|pecuniary|non.{0,2}pecuniary).{0,10}(damage|harm|loss|injury)|materiell.{0,10}immateriell.{0,10}Schaden|joint\s*and\s*several|gesamtschuldnerisch|Art\.\s*82\s*(DSGVO|GDPR))\b/i,
    de:/\b(Schaden(s)?ersatz|Haftung|(Entsch(ä|a)digung|Kompensation).{0,10}(Daten|Datenschutz|DSGVO|personenbezogen|Verarbeitung)|(materiell|immateriell).{0,10}Schaden|gesamtschuldnerisch|(Verantwortlich|Auftragsverarbeiter).{0,10}haftet|Anspruch.{0,10}(Schaden|Entsch(ä|a)digung|Haftung)|Art\.\s*82\s*(DSGVO|GDPR))\b/i },
  { itemIds:['e4'], sectionId:'supervision', articleRef:'Art. 83, 84',
    label:{en:'Administrative fines',de:'Geldbußen'},
    en:/\b((administrative\s*)?fine|Geldbu(ß|ss)e|Bu(ß|ss)geld|penalt(y|ies)|sanction.{0,10}(GDPR|data\s*protection|privacy)|(20|10)\s*(million|Mio).{0,10}(EUR|€|Euro)|(4|2)\s*%?.{0,10}(turnover|revenue|Jahresumsatz)|(effective|proportionate|dissuasive).{0,10}(fine|penalty|sanction)|Art\.\s*8[3-4]\s*(DSGVO|GDPR))\b/i,
    de:/\b(Geldbu(ß|ss)e|Bu(ß|ss)geld|Strafe|Sanktion.{0,10}(DSGVO|Datenschutz)|(20|10)\s*(Million|Mio).{0,10}(EUR|€|Euro)|(4|2)\s*%?.{0,10}(Umsatz|Jahresumsatz)|(wirksam|verh(ä|a)ltnism(ä|a)(ß|ss)ig|abschreckend).{0,10}(Geldbu(ß|ss)e|Bu(ß|ss)geld|Strafe|Sanktion)|Art\.\s*8[3-4]\s*(DSGVO|GDPR))\b/i }
];

/* Build a flat lookup: itemId → item object (across both languages, EN is source) */
function buildItemMap() {
  const map = {};
  I18N.en.sections.forEach(function(sec) {
    sec.items.forEach(function(item) {
      map[item.id] = item;
    });
  });
  return map;
}
const ITEM_MAP = buildItemMap();
