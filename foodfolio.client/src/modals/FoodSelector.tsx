import { use, useEffect, useState } from "react";
import "./FoodSelector.css";
import NewFoodModal from "./NewFoodModal";
import type { Food } from "../types/Food";

type FoodSelectorProps = {
    onClose: () => void;
    onSelectFood: (food: Food) => void;
};

function FoodSelector({ onClose, onSelectFood }: FoodSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState<Food[]>([]);

    const [isNewFoodModalOpen, setIsNewFoodModalOpen] = useState(false);
    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    useEffect(() => {
        async function loadFoods() {
        try{
            const response = await fetch("https://localhost:7077/api/foods");

            if(!response.ok){
                console.error("Fehler beim Laden der Lebensmittel");
                return;
            }

            const foods = await response.json();
            setFoods(foods);
        }
        
        catch(error){
            console.error("Fehler beim Laden der Lebensmittel:", error);
        }
    }

    loadFoods();
}, []);
    
    return (
        <div
            className="food-selector-overlay"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="food-selector-modal">

                <div className="food-selector-header">
                    <h2>Zutat hinzufügen</h2>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="food-selector-content">

                    <input
                        type="text"
                        placeholder="Lebensmittel suchen..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    <div className="food-list">
                        {filteredFoods.map(food => (
                            <div
                                key={food.id}
                                className="food-item"
                                onClick={() => onSelectFood(food)}
                            >
                                <div className="food-item-information">
                                    <span className="food-item-name">
                                        {food.name}
                                    </span>

                                    {food.brandName && (
                                        <span className="food-item-brand">
                                            {food.brandName}
                                        </span>
                                    )}
                                </div>

                                <span className="food-item-reference">
                                    {food.referenceAmount} {food.referenceUnit}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="new-food-button"
                        onClick={() => setIsNewFoodModalOpen(true)}
                    >
                        + Neues Lebensmittel erstellen
                    </button>

                </div>
            </div>

            {isNewFoodModalOpen && (
                <NewFoodModal
                    onClose={() => setIsNewFoodModalOpen(false)}
                    onCreateFood={(food) => {
                        setFoods(currentFoods => [...currentFoods, food]);
                        setIsNewFoodModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

export default FoodSelector;
