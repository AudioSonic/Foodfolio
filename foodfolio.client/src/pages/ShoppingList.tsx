import { useEffect, useMemo, useState } from "react";
import "./ShoppingList.css";

type Item = { foodId: number; foodName: string; unit: string; quantity: number; category: string };
function monday(date: Date) { const value = new Date(date); const day = value.getDay() || 7; value.setDate(value.getDate() - day + 1); value.setHours(0, 0, 0, 0); return value; }
function key(date: Date) { return date.toISOString().slice(0, 10); }

function ShoppingList() {
  const [week, setWeek] = useState(() => monday(new Date()));
  const [items, setItems] = useState<Item[]>([]);
  const [doneByWeek, setDoneByWeek] = useState<Record<string, Record<string, boolean>>>(() => JSON.parse(localStorage.getItem("foodfolio.shopping-done") || "{}"));
  const [showDone, setShowDone] = useState(false);
  const [error, setError] = useState("");
  const end = useMemo(() => { const value = new Date(week); value.setDate(value.getDate() + 6); return value; }, [week]);
  const storageKey = "foodfolio.shopping-done." + key(week);
  const done = doneByWeek[storageKey] ?? {};
  const itemKey = (item: Item) => item.foodId + ":" + item.unit;

  useEffect(() => {
    fetch("/api/shopping-list?from=" + key(week) + "&to=" + key(end))
      .then(response => response.ok ? response.json() : Promise.reject(new Error("Einkaufszettel konnte nicht geladen werden.")))
      .then(setItems)
      .catch(e => setError(e instanceof Error ? e.message : "Einkaufszettel konnte nicht geladen werden."));
  }, [week, end]);

  const grouped = useMemo(() => items.reduce<Record<string, Item[]>>((groups, item) => { (groups[item.category] ??= []).push(item); return groups; }, {}), [items]);
  const openCount = items.filter(item => !done[itemKey(item)]).length;
  const doneCount = items.filter(item => done[itemKey(item)]).length;

  function toggle(item: Item) {
    const next = { ...done, [itemKey(item)]: !done[itemKey(item)] };
    const all = { ...doneByWeek, [storageKey]: next };
    setDoneByWeek(all);
    localStorage.setItem("foodfolio.shopping-done", JSON.stringify(all));
  }

  function changeWeek(offset: number) {
    setWeek(value => { const next = new Date(value); next.setDate(next.getDate() + offset * 7); return next; });
  }

  return <main className="shopping-list-page">
    <header className="shopping-page-header">
      <div><h1>Einkaufszettel</h1><p>Automatisch aus deiner Wochenplanung generiert.</p></div>
      <div className="shopping-week-picker">
        <button type="button" aria-label="Vorherige Woche" onClick={() => changeWeek(-1)}>‹</button>
        <span>{week.toLocaleDateString("de-DE")} – {end.toLocaleDateString("de-DE")}</span>
        <button type="button" aria-label="Nächste Woche" onClick={() => changeWeek(1)}>›</button>
      </div>
    </header>

    {error && <p role="alert" className="shopping-error">{error}</p>}
    <section className="shopping-summary">
      <div className="shopping-summary-card"><strong>{openCount}</strong><span>Artikel offen</span></div>
      <div className="shopping-summary-card completed"><strong>{doneCount}</strong><span>Artikel erledigt</span></div>
    </section>

    <section className="shopping-list-card">
      <label className="shopping-show-done"><input type="checkbox" checked={showDone} onChange={event => setShowDone(event.target.checked)} /> Erledigte anzeigen</label>
      {Object.entries(grouped).map(([category, categoryItems]) => {
        const visibleItems = categoryItems.filter(item => showDone || !done[itemKey(item)]);
        if (visibleItems.length === 0) return null;
        return <section className="shopping-group" key={category}><h2>{category}</h2>{visibleItems.map(item => <label className={"shopping-item " + (done[itemKey(item)] ? "done" : "")} key={itemKey(item)}><input type="checkbox" checked={!!done[itemKey(item)]} onChange={() => toggle(item)} /><span>{item.foodName}</span><strong>{Math.round(item.quantity * 100) / 100} {item.unit}</strong></label>)}</section>;
      })}
      {!items.some(item => showDone || !done[itemKey(item)]) && <p className="shopping-empty">Für diese Woche sind keine offenen Zutaten eingeplant.</p>}
    </section>
  </main>;
}
export default ShoppingList;
