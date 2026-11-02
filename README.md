# Foodfolio

Foodfolio ist eine persönliche Webanwendung zur Planung von Mahlzeiten, Verwaltung von Rezepten und Lebensmitteln sowie zur automatischen Erstellung einer Einkaufsliste. Die Anwendung verbindet ein React-Frontend mit einer ASP.NET-Core-Web-API und einer SQLite-Datenbank.

> Hinweis: Frontend und Backend liegen in getrennten Projektordnern. Diese README liegt im Repository-Stammverzeichnis und beschreibt das gesamte System.

## Funktionen

### Dashboard und Tagesplanung

- Tagesübersicht für ein ausgewähltes Datum
- Planung von Frühstück, zwei Snacks, Mittagessen und Abendessen
- Rezepte per Drag-and-drop auf eine Mahlzeit ziehen
- Einzelne Lebensmittel direkt zu einer Mahlzeit hinzufügen
- Portionsgrößen und Mengen bearbeiten oder Einträge entfernen
- Automatische Berechnung von Kalorien, Eiweiß, Kohlenhydraten und Fett
- Frei definierbare Tagesziele, lokal im Browser gespeichert

[Screenshot des Dashboards mit Tagesplan, Mahlzeitenkarten und Nährwertübersicht]

### Rezeptverwaltung

Rezepte können angelegt, angezeigt, bearbeitet und gelöscht werden. Unterstützt werden Name, Beschreibung, Bild, Portionen, Kategorie, Quelle, Quell-URL, Zutaten, Einheiten und nummerierte Zubereitungsschritte. Gesamtwerte und Werte pro Portion werden automatisch berechnet. In der Detailansicht kann die Portionsgröße angepasst werden.

[Screenshot der Rezeptbibliothek mit Rezeptkarten und Such-/Filterbereich]

[Screenshot des Rezeptformulars mit Zutatenliste, Portionen und Zubereitungsschritten]

[Screenshot der Rezeptdetailansicht mit angepasster Portionsgröße und Nährwerten]

### Lebensmittelverwaltung

Lebensmittel enthalten Name, optionalen Markennamen, Kalorien, Eiweiß, Kohlenhydrate, Fett sowie eine Referenzmenge in Gramm oder Millilitern. Zusätzlich können bis zu drei individuelle Einheiten wie „1 Stück“ oder „1 Becher“ gepflegt werden.

- Lebensmittel erstellen, bearbeiten und löschen
- Suche und Auswahl beim Erstellen eines Rezepts
- Validierung positiver Mengen und gültiger Einheiten
- Prüfung der Kompatibilität von Gewichts- und Volumeneinheiten

[Screenshot der Lebensmittelübersicht mit Nährwertangaben]

[Screenshot des Dialogs „Neues Lebensmittel erstellen“ mit individuellen Einheiten]

### Wochenplanung und Einkaufsliste

- Wochenbezogene Planung von Rezepten und einzelnen Lebensmitteln
- Automatische Einkaufsliste aus der Planung
- Zusammenfassung gleicher Lebensmittel und Hochrechnung auf Portionszahlen
- Wechsel zwischen vorheriger und nächster Woche
- Artikel abhaken und erledigte Artikel ein-/ausblenden
- Erledigungsstatus wochenbezogen im `localStorage` gespeichert

[Screenshot des Wochenplans mit mehreren geplanten Rezepten]

[Screenshot der automatisch gruppierten Einkaufsliste mit abgehakten Artikeln]

### Kategorien und Oberfläche

In den Einstellungen können Rezeptkategorien erstellt, umbenannt und gelöscht werden. Beim Löschen bleiben die Rezepte erhalten; lediglich ihre Kategorie wird entfernt.

Die Sidebar bietet Bereiche für Dashboard, Wochenplan, Rezepte, Lebensmittel, Einkaufszettel, Profil und Einstellungen. Die Oberfläche ist komponentenbasiert und verwendet eigene Dialoge für Rezepte, Lebensmittel, Portionen und Tagesziele.

[Screenshot der Kategorieverwaltung in den Einstellungen]

[Screenshot der vollständigen Anwendung mit geöffneter Sidebar-Navigation]

## Technischer Aufbau

### Frontend

- React 19, TypeScript und Vite
- Eigenes CSS ohne UI-Framework
- Komponenten für Layout, Tagesübersicht, Rezeptbibliothek, Rezeptkarten und Dialoge
- API-Hilfsfunktionen in `src/services/api.ts`
- Nährwertberechnung in `src/services/nutrition.ts`
- Typdefinitionen in `src/types`

### Backend

- ASP.NET Core auf .NET 10
- Entity Framework Core mit SQLite
- REST-Endpunkte unter `/api`
- Automatische Datenbankmigration beim Start
- CORS für lokale Entwicklung und GitHub Pages
- OpenAPI in der Entwicklungsumgebung

| Bereich | Endpunkt | Zweck |
| --- | --- | --- |
| Lebensmittel | `/api/foods` | Lebensmittel verwalten |
| Rezepte | `/api/recipes` | Rezepte und Zutaten verwalten |
| Einheiten | `/api/units` | Einheiten abrufen |
| Kategorien | `/api/categories` | Rezeptkategorien verwalten |
| Mahlzeitenplanung | `/api/meal-plan` | Tagesplanung verwalten |
| Einkaufsliste | `/api/shopping-list` | Einkaufsliste für einen Zeitraum berechnen |

### Datenmodell

Das zentrale Modell besteht aus `Food`, `Unit`, `Recipe`, `RecipeIngredient`, `RecipeStep`, `MealPlanItem` und `Category`. Standardmäßig werden Gramm, Kilogramm, Milliliter und Liter sowie Kategorien für Frühstück, Mittagessen, Abendessen und Snacks angelegt.

## Lokale Entwicklung

Voraussetzungen: .NET 10 SDK sowie Node.js und npm.

```bash
npm install
npm run dev
```

Im Ordner `Foodfolio.Server`:

```bash
dotnet restore
dotnet run
```

Beim Start wird `foodfolio.db` automatisch über Entity-Framework-Migrationen aktualisiert.

Verfügbare Frontend-Befehle:

```bash
npm run dev       # Entwicklungsserver mit Hot Reload
npm run build     # TypeScript prüfen und Produktions-Build erzeugen
npm run lint      # ESLint ausführen
npm run preview   # Produktions-Build lokal anzeigen
```

Für die lokale Entwicklung bleibt `VITE_API_BASE_URL` leer. Vite verwendet dann den Proxy zum lokalen ASP.NET-Backend.

## Deployment

Das Frontend kann über GitHub Pages veröffentlicht werden. Dafür muss die Repository-Variable `VITE_API_BASE_URL` auf eine öffentlich erreichbare HTTPS-Adresse der API zeigen. Backend und SQLite-Datenbank müssen separat betrieben werden.

Die API muss HTTPS verwenden, die GitHub-Pages-Domain in der CORS-Konfiguration erlauben und die SQLite-Datenbank persistent speichern. Im Produktivbetrieb darf das Frontend nicht auf eine ausschließlich lokale API-Adresse zeigen.

## Aktueller Projektstand

Die Kernfunktionen für Dashboard, Tagesplanung, Rezeptbibliothek, Lebensmittelverwaltung, Nährwertberechnung, Kategorien und Einkaufszettel sind vorhanden. Die Navigation enthält zusätzlich Seiten für Wochenplan, Rezepte und Profil; einzelne davon sind derzeit noch schlanke Einstiegsseiten bzw. Platzhalter, während zugehörige Funktionen bereits über Dashboard-Komponenten und Dialoge erreichbar sind.

Eine Benutzerverwaltung, Authentifizierung und serverseitige Profileinstellungen sind aktuell nicht Bestandteil des Projekts. Tagesziele und der Erledigungsstatus der Einkaufsliste werden lokal im Browser gespeichert.

