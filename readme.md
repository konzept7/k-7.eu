
# k-7.eu

Aufbau einer Firmenwebsite inklusive eines Content Management Systems (CMS).

Als CMS wurde Strapi gewählt.

Das Projekt befindet sich im Status: **Grundauftrag abeschlossen**

## Änderungshistorie

Diese Änderungshistorie bezieht sich ausschließlich auf die readme-Datei. Alle Details zum Changelog entnehmen Sie bitte dem Absatz 'Update- und Freigabeprozess'.


| Version | Datum | Autor | Bemerkung |
| ------- | ----- | ----- | --------- |
| 1.0.0 | 2.2.2023 | FB | Ersterstellung |

Änderungen in dieser Datei sind ebenfalls der git-Historie zu entnehmen.

Es ist Aufgabe der ändernden Person, Projektbeteiligte über etwaige Änderungen zu informieren. Dies betrifft insbesondere Änderungen hinsichtlich Lasten- und Pflichtenheft.

## Risikoeinteilung TISAX

Einstufung: **Normal**

- [x] Dieses Projekt ist ausschließlich für Mitarbeiter der IBS GnbH bestimmt
- [ ] Dieses Projekt verarbeitet *und* speichert Kundendaten
- [ ] Dieses Projekt verarbeitet *und* speichert Zahlungsdsaten
- [x] Es gibt über das Internet erreichbare Schnittstellen

Die Einstufung wird folgendermaßen begründet:

Die gespeicherten Daten sind sowieso zur Veröffentlichung gedacht. -> Datenverlust/Offenlegung hat keine Auswirkungen

Manipulation von Daten könnte Unternehmensreputation beeinträchtigen. Begrenztes Risiko. Tritt selten auf.

Potenzielle Gefahren:
- Passwortverlust von Admin oder Content Creator

## Ziel und Verwendung

Aufbau einer Firmenwebsite inklusive eines Content Management Systems (CMS).

Als CMS wurde Strapi gewählt.

### Auftraggeber

Das Projekt wurde in Auftrag gegeben von:

**K7-Konzept Karlsruhe GmbH**

### Beteiligte Personen

| Rolle                                   | Person                   |
| --------------------------------------- | ------------------------ |
| Projektverantwortlicher | Frank Bielecke |
| Verantwortlicher Informationssicherheit | Frank Bielecke |
| Ansprechpartner Auftraggeber | Frank Bielecke |
| Tester | Frank Bielecke |
| Verantwortlicher Git | Frank Bielecke |
| Support | Frank Bielecke |
| Verantwortlicher Dokumentation | Frank Bielecke |


### Stundenbudget

Für den Abschluss des Projektes sind 0 Stunden veranschlagt. Dies beinhaltet:
- [x] Projektleitung und -management
- [x] Softwareentwicklung
- [ ] Testing
- [x] Dokumentation
- [x] Software-Wartung
- [x] Support

## Voraussetzungen



### Voraussetzungen für den Betrieb

#### Betrieb der Software

Browser

#### Betriebssysteme

keine

#### Testing

- npm
- Cloud-Firewall sperrt Zugriff auf CMS außerhalb der Büro-Räumlichkeiten

## Installation und Deployment

keine Installation notwendig



### Installation Testumgebung



``` shell
npm ci
npm run dev
```

### Installation Entwicklungsumgebung

Node > 16
Code editor
Zugriff auf CMS

``` shell
npm ci
npm run dev
```

### Update- und Freigabeprozess

- [x] Die hier beschriebenen Prozesse triggern einen automatisierten Release.

Commit/Pull request im master-Branch

master-Branch ist protected in GitHub und erfordert Code Review durch anderen Entwickler



### Nutzung von Fremdsoftware
package.json

## Checkliste

- [x] Machbarkeit geprüft
- [ ] Lastenheft erstellt
- [ ] Kostenplan erstellt
- [ ] Kundenseitige Kosten wurden kalkuliert und weitergegeben
- [ ] Verbesserungsvorschläge eingeholt
- [ ] Verbesserungsvorschläge eingearbeitet
- [x] Dokumentation erstellt
- [x] Lauffähige Version erstellt, die alle gewünschten Features enthält
- [ ] Auf Zielsystemen installiert
- [ ] Bedienungsanleitung erstellt
- [x] Alle Secrets separiert von Projektstruktur



  