import { useEffect, useState } from "react";
import NewFoodModal from "../modals/NewFoodModal";
import type { Food } from "../types/Food";
import "./Foods.css";
import { apiRequest, ApiError } from "../services/api";

function Foods(){
    const [foods, setFoods] = useState<Food[]>([]);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        apiRequest<Food[]>("/api/foods")
            .then(setFoods)
            .catch(error => setError(error instanceof ApiError ? error.message : "Lebensmittel konnten nicht geladen werden."))
            .finally(() => setLoading(false));
    }, []);

    async function deleteFood(food: Food) {
        if (!window.confirm(`Möchtest du „${food.name}“ wirklich löschen?`)) return;
        setError("");
        setDeletingId(food.id);
        try {
            await apiRequest<void>(`/api/foods/${food.id}`, { method: "DELETE" });
            setFoods(current => current.filter(item => item.id !== food.id));
        } catch (error) {
            setError(error instanceof ApiError ? error.message : "Das Lebensmittel konnte nicht gelöscht werden.");
        } finally {
            setDeletingId(null);
        }
    }

    return(
        <section className="foods-page">
            <div className="foods-page-header">
                <h1>Lebensmittel</h1>
                <button className="btn foods-add-button" onClick={() => setIsCreateOpen(true)}>+ Lebensmittel hinzufügen</button>
            </div>
            {error && <p role="alert" className="form-error">{error}</p>}
            {loading ? <p className="foods-empty">Lebensmittel werden geladen …</p> : foods.length === 0 ? <p className="foods-empty">Noch keine Lebensmittel gespeichert.</p> : (
                <div className="foods-list">
                    {foods.map(food => <article className="food-list-item" key={food.id}>
                        <div>
                            <h2>{food.name}</h2>
                            {food.brandName && <p>{food.brandName}</p>}
                        </div>
                        <div className="food-list-nutrition">{food.referenceAmount} {food.referenceUnit} · {food.calories} kcal</div>
                        <div className="food-list-actions">
                            <button onClick={() => setSelectedFood(food)}>Bearbeiten</button>
                            <button className="delete-food-button" disabled={deletingId === food.id} onClick={() => deleteFood(food)}>{deletingId === food.id ? "Wird gelöscht …" : "Löschen"}</button>
                        </div>
                    </article>)}
                </div>
            )}
            {(isCreateOpen || selectedFood) && <NewFoodModal
                onClose={() => { setIsCreateOpen(false); setSelectedFood(null); }}
                onCreateFood={(food) => { setFoods(current => [...current, food]); setIsCreateOpen(false); }}
                food={selectedFood ?? undefined}
                onUpdateFood={(food) => { setFoods(current => current.map(item => item.id === food.id ? food : item)); setSelectedFood(null); }}
            />}
        </section>
    )
}

export default Foods
