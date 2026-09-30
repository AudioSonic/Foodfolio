import type { CreateFoodData, Food } from "../types/Food";
import "./NewFoodModal.css";
import { useEffect, useState } from "react";

type NewFoodModalProps = {
    onClose: () => void;
    onCreateFood: (food: Food) => void;
};

function NewFoodModal({ onClose, onCreateFood }: NewFoodModalProps) {
    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [referenceAmount, setReferenceAmount] = useState(100);
    const [referenceUnit, setReferenceUnit] = useState("g");

    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fats, setFats] = useState(0);
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    function handleOverlayClick(
        event: React.MouseEvent<HTMLDivElement>
    ) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    async function handleSave() {
        const newFood: CreateFoodData = {
            name,
            brandName: brandName || undefined,
            calories: calories || 0,
            protein: protein || 0,
            carbohydrates: carbs || 0,
            fat: fats || 0,
            referenceAmount,
            referenceUnit
        };

        try{
            const response = await fetch("https://localhost:7077/api/foods",{
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(newFood)
            })

            if(!response.ok){
                console.error("Fehler beim Speichern des Lebensmittels");
                return;
            }

            const savedFood = await response.json();

            onCreateFood(savedFood);
        }

        catch(error){
            console.error("Fehler beim Speichern des Lebensmittels", error);
        }
    }

    return (
        <div
            className="new-food-modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="new-food-modal">

                <div className="new-food-modal-header">
                    <h2>Neues Lebensmittel erstellen</h2>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="new-food-modal-content">
                    <div className="new-food-form">

                        <div className="form-group">
                            <label htmlFor="food-name">
                                Name
                            </label>

                            <input
                                id="food-name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="z. B. Hähnchenbrust"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="food-brand">
                                Marke
                            </label>

                            <input
                                id="food-brand"
                                type="text"
                                value={brandName}
                                onChange={(event) => setBrandName(event.target.value)}
                                placeholder="Optional"
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label htmlFor="food-reference-amount">
                                    Referenzmenge
                                </label>

                                <input
                                    id="food-reference-amount"
                                    type="number"
                                    min="0"
                                    value={referenceAmount}
                                    onChange={(event) =>
                                        setReferenceAmount(Number(event.target.value))
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="food-reference-unit">
                                    Einheit
                                </label>

                                <select
                                    id="food-reference-unit"
                                    value={referenceUnit}
                                    onChange={(event) =>
                                        setReferenceUnit(event.target.value)
                                    }
                                >
                                    <option value="g">g</option>
                                    <option value="ml">ml</option>
                                    <option value="Stück">Stück</option>
                                </select>
                            </div>

                        <div className="form-group">
                            <label htmlFor="food-calories">
                                Kalorien
                            </label>

                            <input
                                id="food-calories"
                                type="number"
                                value={calories}
                                onChange={(event) => setCalories(Number(event.target.value))}
                                placeholder="z. B. 200"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="food-protein">
                                Proteine
                            </label>

                            <input
                                id="food-protein"
                                type="number"
                                value={protein}
                                onChange={(event) => setProtein(Number(event.target.value))}
                                placeholder="z. B. 30g"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="food-carbs">
                                Kohlenhydrate
                            </label>

                            <input
                                id="food-carbs"
                                type="number"
                                value={carbs}
                                onChange={(event) => setCarbs(Number(event.target.value))}
                                placeholder="z. B. 30g"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="food-fats">
                                Fette
                            </label>

                            <input
                                id="food-fats"
                                type="number"
                                value={fats}
                                onChange={(event) => setFats(Number(event.target.value))}
                                placeholder="z. B. 30g"
                            />
                        </div>


                        </div>

                    </div>
 
                </div>
                    <div className="new-food-modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Abbrechen
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Lebensmittel speichern
                        </button>

                    </div>
            </div>
        </div>
    );
}

export default NewFoodModal;
