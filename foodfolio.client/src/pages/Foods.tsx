import { useEffect, useState } from "react";
import NewFoodModal from "../modals/NewFoodModal";
import type { Food } from "../types/Food";
import "./Foods.css";

function Foods(){
    const [foods, setFoods] = useState<Food[]>([]);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        fetch("/api/foods")
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(setFoods)
            .catch(() => console.error("Lebensmittel konnten nicht geladen werden"));
    }, []);

    async function deleteFood(food: Food) {
        if (!window.confirm(`Möchtest du „${food.name}“ wirklich löschen?`)) return;
        const response = await fetch(`/api/foods/${food.id}`, { method: "DELETE" });
        if (response.ok) setFoods(current => current.filter(item => item.id !== food.id));
    }

    return(
        <section className="foods-page">
            <div className="foods-page-header">
                <h1>Lebensmittel</h1>
                <button className="btn foods-add-button" onClick={() => setIsCreateOpen(true)}>+ Lebensmittel hinzufügen</button>
            </div>
            {foods.length === 0 ? <p className="foods-empty">Noch keine Lebensmittel gespeichert.</p> : (
                <div className="foods-list">
                    {foods.map(food => <article className="food-list-item" key={food.id}>
                        <div>
                            <h2>{food.name}</h2>
                            {food.brandName && <p>{food.brandName}</p>}
                        </div>
                        <div className="food-list-nutrition">{food.referenceAmount} {food.referenceUnit} · {food.calories} kcal</div>
                        <div className="food-list-actions">
                            <button onClick={() => setSelectedFood(food)}>Bearbeiten</button>
                            <button className="delete-food-button" onClick={() => deleteFood(food)}>Löschen</button>
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
