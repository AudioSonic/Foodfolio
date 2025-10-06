# Contributing Guidelines

Dieses Projekt wird von einem Solo-Entwickler geführt.  
Die folgenden Richtlinien beschreiben meinen persönlichen Workflow, damit Dritte nachvollziehen können, wie ich strukturiert arbeite.

---

## Branching & Workflow

### Haupt-Branches
- **main** – enthält ausschließlich stabile, getestete Releases. Hier wird **niemals direkt entwickelt**.
- **develop** – Haupt-Entwicklungszweig. Alle neuen Features, Fixes und Änderungen werden hier integriert.

### Feature-Branches
Für jedes neue Issue wird ein separater Branch erstellt.  
Das Namensschema folgt diesem Format:

```
fix(Bereich): Überschrift/Beschreibung
```

**Beispiel:**
```
fix(UI): Pantry Item Layout korrigiert
feat(Recipe): Importfunktion hinzugefügt
```

Wenn ein bereits gefixtes Problem nachträglich angepasst oder gepatcht werden muss, wird folgendes Format verwendet:
```
fixup(Bereich): Überschrift/Beschreibung
```

---

## Architekturprinzip

Das Projekt folgt strikt dem **MVVM (Model-View-ViewModel)**-Prinzip.  
Dies stellt eine klare Trennung von Logik, Darstellung und Daten sicher und erleichtert langfristige Wartung, Testbarkeit und Erweiterbarkeit.

---

## Commit-Typen

Verwendete Commit-Typen:

- `feat` – Neues Feature
- `fix` – Bugfix
- `fixup` – Nachbesserung eines vorherigen Fixes
- `refactor` – Code-Verbesserung ohne neue Funktion
- `docs` – Änderungen an Dokumentation
- `test` – Tests hinzugefügt oder angepasst
- `chore` – Build-, Tooling- oder Wartungsaufgaben

**Beispiele:**
```
feat(Quest): Boss Quest System implementiert
fix(API): Fehlerhafte Header korrigiert
fixup(UI): Farbwerte in Dark Mode angepasst
docs: CONTRIBUTING.md ergänzt
```

---

## Workflow-Regeln

- Niemals direkt auf `main` arbeiten.  
- `develop` soll **immer stabil und lauffähig** bleiben.  
- Feature-Branches werden nach Fertigstellung in `develop` gemergt.  
- Optional: **Tags** für stabile Releases (z. B. `v1.0.0`).

---

## Versionsschema

Das Projekt verwendet **Semantische Versionierung (SemVer)**:

```
MAJOR.MINOR.PATCH
```

**Beispiele:**
- `1.0.0` – Erstes stabiles Release  
- `1.1.0` – Neue Features ohne Breaking Changes  
- `1.1.1` – Bugfix- oder Wartungsupdate

---

Diese Datei dient weniger zur externen Kollaboration, sondern zur Dokumentation meines persönlichen Entwicklungsprozesses.  
Sie soll nachvollziehbar machen, wie ich strukturiert, versioniert und entwicklungsorientiert arbeite.
