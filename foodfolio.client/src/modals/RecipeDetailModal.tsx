import { useState } from "react";
import type { Recipe } from "../types/recipe";
import type { RecipeFormData } from "../types/RecipeFormData";
import RecipeModal from "./RecipeModal";
import "./RecipeDetailModal.css";
import { apiRequest, ApiError } from "../services/api";

type Props = { recipe: Recipe; onClose: () => void; onSaved: (recipe: Recipe) => void; onDeleted: () => void };

function RecipeDetailModal({ recipe, onClose, onSaved, onDeleted }: Props) {
    const [portions, setPortions] = useState(Math.max(1, recipe.servings));
    const [editing, setEditing] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const safePortions = Math.max(1, portions);
    const perPortion = { calories: recipe.calories / safePortions, protein: recipe.protein / safePortions, carbohydrates: recipe.carbohydrates / safePortions, fat: recipe.fat / safePortions };
    async function save(updated: RecipeFormData) {
        setBusy(true); setError("");
        try {
            await apiRequest<void>(`/api/recipes/${recipe.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...updated, id: recipe.id }) });
            const refreshed = await apiRequest<Recipe>(`/api/recipes/${recipe.id}`);
            onSaved(refreshed); setEditing(false);
        } catch (e) { setError(e instanceof ApiError ? e.message : "Das Rezept konnte nicht gespeichert werden."); }
        finally { setBusy(false); }
    }
    async function remove() {
        if (!window.confirm(`Rezept „${recipe.name}“ wirklich löschen?`)) return;
        setBusy(true); setError("");
        try { await apiRequest<void>(`/api/recipes/${recipe.id}`, { method: "DELETE" }); onDeleted(); }
        catch (e) { setError(e instanceof ApiError ? e.message : "Das Rezept konnte nicht gelöscht werden."); setBusy(false); }
    }
    if (editing) return <RecipeModal recipe={recipe} onClose={() => setEditing(false)} onSave={save} />;
    return <div className="recipe-detail-overlay" onClick={e => e.target === e.currentTarget && onClose()}><article className="recipe-detail-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-detail-title">
        <header><h2 id="recipe-detail-title">{recipe.name}</h2><button type="button" onClick={onClose} aria-label="Schließen">×</button></header>
        {error && <p className="recipe-detail-error" role="alert">{error}</p>}
        {recipe.imageUrl && <img className="recipe-detail-image" src={recipe.imageUrl} alt="" />}
        {recipe.description && <p>{recipe.description}</p>}
        {recipe.category && <p><strong>Kategorie:</strong> {recipe.category}</p>}
        <div className="recipe-detail-portions" aria-label="Portionsauswahl"><span>Portionen</span><button type="button" disabled={portions <= 1} onClick={() => setPortions(value => Math.max(1, value - 1))} aria-label="Eine Portion weniger">−</button><output>{portions}</output><button type="button" onClick={() => setPortions(value => value + 1)} aria-label="Eine Portion mehr">+</button></div>
        <section><h3>Zutaten</h3><ul>{recipe.ingredients.map((i, index) => <li key={`${i.food.id}-${index}`}>{i.quantity} {i.unit?.name ?? ""} {i.food.name}</li>)}</ul></section>
        <section><h3>Zubereitung</h3><ol>{(recipe.steps ?? []).slice().sort((a, b) => a.order - b.order).map(step => <li key={step.id}>{step.instruction}</li>)}</ol></section>
        <section><h3>Nährwerte pro Portion</h3><div className="recipe-detail-nutrition"><div><strong>{Math.round(perPortion.calories)} kcal</strong><span>Kalorien</span></div><div><strong>{Math.round(perPortion.protein * 10) / 10} g</strong><span>Protein</span></div><div><strong>{Math.round(perPortion.carbohydrates * 10) / 10} g</strong><span>Kohlenhydrate</span></div><div><strong>{Math.round(perPortion.fat * 10) / 10} g</strong><span>Fett</span></div></div><p className="recipe-detail-total">Gesamt: {Math.round(recipe.calories)} kcal · {Math.round(recipe.protein * 10) / 10} g Protein · {Math.round(recipe.carbohydrates * 10) / 10} g Kohlenhydrate · {Math.round(recipe.fat * 10) / 10} g Fett</p></section>
        <footer><button type="button" className="recipe-detail-edit" disabled={busy} onClick={() => setEditing(true)}>Bearbeiten</button><button type="button" className="recipe-detail-delete" disabled={busy} onClick={remove}>Löschen</button></footer>
    </article></div>;
}
export default RecipeDetailModal;
