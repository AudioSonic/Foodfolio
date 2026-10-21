import { useEffect, useState } from "react";
import "./Settings.css";
import { apiUrl } from "../services/api";

type Category = { id: number; name: string; sortOrder: number };

function Settings() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [error, setError] = useState("");
    async function loadCategories() { const response = await fetch(apiUrl("/api/categories")); if (response.ok) setCategories(await response.json()); }
    useEffect(() => { loadCategories(); }, []);
    async function addCategory() { setError(""); const response = await fetch(apiUrl("/api/categories"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName }) }); if (!response.ok) { setError(await response.text()); return; } setNewName(""); await loadCategories(); }
    async function renameCategory(id: number) { setError(""); const response = await fetch(apiUrl(`/api/categories/${id}`), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: editingName }) }); if (!response.ok) { setError(await response.text()); return; } setEditingId(null); await loadCategories(); }
    async function deleteCategory(category: Category) { if (!window.confirm(`Kategorie „${category.name}“ wirklich löschen? Zugehörige Rezepte bleiben erhalten und erscheinen nur noch unter „Alle Rezepte“.`)) return; setError(""); const response = await fetch(apiUrl(`/api/categories/${category.id}`), { method: "DELETE" }); if (!response.ok) { setError(await response.text()); return; } await loadCategories(); }
    return <main className="settings-page"><h1>Einstellungen</h1><section className="settings-card"><h2>Rezeptkategorien</h2><p className="settings-hint">Verwalte die Kategorien für deine Rezepte.</p><div className="category-create"><input value={newName} onChange={event => setNewName(event.target.value)} placeholder="Neue Kategorie" /><button type="button" onClick={addCategory} disabled={!newName.trim()}>Hinzufügen</button></div><div className="category-list">{categories.map(category => <div className="category-row" key={category.id}>{editingId === category.id ? <input value={editingName} onChange={event => setEditingName(event.target.value)} autoFocus /> : <span>{category.name}</span>}<div className="category-actions">{editingId === category.id ? <button type="button" onClick={() => renameCategory(category.id)}>Speichern</button> : <button type="button" onClick={() => { setEditingId(category.id); setEditingName(category.name); }}>Umbenennen</button>}<button type="button" className="danger" onClick={() => deleteCategory(category)}>Löschen</button></div></div>)}</div>{error && <p className="settings-error">{error}</p>}</section></main>;
}

export default Settings;
