# Automation ROI Calculator – Überblick

## Kurze Beschreibung
Die App **My Impact Machine** ist eine Web-App, mit der Coaching-Teilnehmer den Nutzen ihrer Automatisierungsprojekte schnell und visuell darstellen können. Die App dient als unterstützendes Werkzeug zu einer Masterclass in einer Community namens *"Bytes & Budgets Data Heroes"*. In dieser Community lernen Mitarbeiter von Finanzabteilungen, z. B. Buchhaltung, Einkauf, etc. wie sie mit der KNIME Analytics Platform ihre Datenprozesse automatisieren können. Dies geschieht mittels Low-Code-Workflows. Wenn im Folgenden von Workflows die Rede ist, sind damit immer KNIME-Workflows gemeint.

---

## Ziele und Motivation
- Wirkung sichtbar machen: Viele Automationen bleiben unbemerkt, weil der Nutzen nicht klar kommuniziert wird.
- Selbstbewusstsein stärken: Die App hilft Teilnehmern, den eigenen Beitrag zu quantifizieren.
- Anerkennung fördern: Visualisierte Ergebnisse erleichtern es, Vorgesetzte und Kollegen zu überzeugen.
- Masterclass ergänzen: Die App übersetzt Theorie in messbare Praxis und verstärkt die Lerninhalte.

---

## Kernfunktionen
1. Eingabeformular für vorher/nachher-Werte:
   - Workflow-Name & Beschreibung
   - Zeitaufwand vorher/nachher
   - Anzahl betroffener Personen
   - Fehlerquote vorher/nachher (optional)
   - Verarbeitete Datenmengen (optional)
   - Kommentar/Zitat eines Kollegen (optional) als Feedback zum jeweiligen KNIME-Workflow

2. Automatische Berechnung & Visualisierung:
   - Zeitersparnis (absolut & prozentual)
   - Hochrechnung auf Monat/Jahr & Teamgröße
   - Balken- oder Donut-Diagramme
   - Textbasierte Zusammenfassung

3. Export & Teilen:
   - Download als PNG oder PDF
   - Text-Export ins Impact Summary Template

4. Login-Funktion:
   - Nur für registrierte Coaching-Mitglieder zugänglich
   - Schutz vor öffentlichem Zugriff

---

## Besonderheiten
- Gamification:
  - Impact Score
  - Badges für Meilensteine (z. B. „100 Stunden gespart“)
  - Leaderboard (optional anonymisiert)
- Integration in Coaching-Programm möglich
- Persönliche Erfolgsgalerie denkbar (z. B. Verlauf der eigenen Automationen)
- Geringe technische Einstiegshürde für Nutzer

---

## Design & Farben
Die App orientiert sich vollständig an deinen Markenfarben für eine konsistente Nutzererfahrung:

- Textfarbe: Schwarz (`#000000`)
- Primärfarbe / Signature Color: Blau (`#0074D9`)
- Hintergrundfarbe: Weiß (`#ffffff`)

Diese Farben sollten im UI konsequent eingesetzt werden: z. B. für Buttons, Diagramm-Highlights, Fortschrittsbalken und Hervorhebungen.

---

## Technologie Stack

- **Frontend:**  
  React mit TypeScript und Tailwind CSS  
  Für eine performante, moderne und leicht wartbare Nutzeroberfläche.

- **Visualisierung:**  
  Chart.js oder Recharts  
  Für die Darstellung von Zeitersparnis, Skaleneffekten und Impact Scores.

- **Export-Funktion:**  
  Ermöglicht das Erstellen von PDF- oder PNG-Dateien für Präsentationen oder interne Kommunikation.

- **Hosting:**  
  Vercel oder Netlify  
  Für einfache Bereitstellung mit schneller Ladezeit und CI/CD.

- **Backend & Authentifizierung:**  
  Supabase oder Firebase  
  Für sichere Benutzeranmeldung und geschützten Zugang (nur für Coaching-Mitglieder).

---

## Nutzen und Ausblick
- Stärkt das Bewusstsein für Automatisierungsnutzen
- Fördert interne Kommunikation und Akzeptanz von KNIME-Projekten
- Dient als persönlicher Impact Tracker oder Präsentations-Tool
- Langfristig ausbaubar: z. B. mit Workflow-Upload, Erfolgsgalerien, Community-Funktionen
- Positioniert dich als Coach, der nicht nur beibringt, *wie* man automatisiert, sondern auch *wie man es zeigt*
