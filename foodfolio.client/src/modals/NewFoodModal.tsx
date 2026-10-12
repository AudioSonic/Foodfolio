import type { CreateFoodData, Food } from "../types/Food";
import type { Unit } from "../types/Unit";
import "./NewFoodModal.css";
import { useEffect, useState } from "react";

type NewFoodModalProps = {
    onClose: () => void;
    onCreateFood: (food: Food) => void;
    food?: Food;
    onUpdateFood?: (food: Food) => void;
};


function NewFoodModal({ onClose, onCreateFood, food, onUpdateFood }: NewFoodModalProps) {
    const [name, setName] = useState(food?.name ?? "");
    const [brandName, setBrandName] = useState(food?.brandName ?? "");
    const [referenceAmount, setReferenceAmount] = useState(food?.referenceAmount ?? 100);
    const [referenceUnit, setReferenceUnit] = useState(food?.referenceUnit ?? "g");
    const [units, setUnits] = useState<Unit[]>(food?.units ?? []);
    const [unitValueInputs, setUnitValueInputs] = useState<Record<number, string>>({});

    const [calories, setCalories] = useState(food ? String(food.calories) : "");
    const [protein, setProtein] = useState(food ? String(food.protein) : "");
    const [carbs, setCarbs] = useState(food ? String(food.carbohydrates) : "");
    const [fats, setFats] = useState(food ? String(food.fat) : "");
    
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
        const foodData: CreateFoodData = {
            name,
            brandName: brandName || undefined,
            calories: Number.parseFloat(calories) || 0,
            protein: Number.parseFloat(protein) || 0,
            carbohydrates: Number.parseFloat(carbs) || 0,
            fat: Number.parseFloat(fats) || 0,
            referenceAmount,
            referenceUnit,
            units: units.map((unit, index) => ({
                ...unit,
                value: Number.parseFloat((unitValueInputs[index] ?? String(unit.value)).replace(",", ".")) || 0
            }))
        };
        try{
            const response = await fetch(food ? `/api/foods/${food.id}` : "/api/foods",{
                method: food ? "PUT" : "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(food ? { ...foodData, id: food.id } : foodData)
            })

            if(!response.ok){
                console.error("Fehler beim Speichern des Lebensmittels");
                return;
            }

            if (food) {
                onUpdateFood?.({ ...food, ...foodData });
            } else {
                const savedFood = await response.json();
                onCreateFood(savedFood);
            }
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
                    <h2>{food ? "Lebensmittel bearbeiten" : "Neues Lebensmittel erstellen"}</h2>

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
                                onChange={(event) => setCalories(event.target.value)}
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
                                onChange={(event) => setProtein(event.target.value)}
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
                                onChange={(event) => setCarbs(event.target.value)}
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
                                onChange={(event) => setFats(event.target.value)}
                                placeholder="z. B. 30g"
                            />
                        </div>

                        <button 
                            type="button"
                            className="btn btn-optional-units"
                            onClick={() => {if(units.length < 3) setUnits([...units, {name: "", value: 0, foodId: 0, id: 0}])}}
                        >+ Optionale Einheiten</button>
                        </div>

                        {
                            units.map((unit, index) => 
                                <div key={index}>
                                    <input
                                        className="optional-unit-name"
                                        placeholder="z.B. 1 Stück"
                                        value={unit.name}
                                        onChange={(event) =>
                                            setUnits(
                                                units.map((currentUnit, currentIndex) =>
                                                    currentIndex === index
                                                        ? { ...currentUnit, name: event.target.value }
                                                        : currentUnit
                                                )
                                            )
                                        }
                                    />
                                    
                                    <input
                                        className="optional-unit-value"
                                        placeholder="z.B. 30g"
                                        type="text"
                                        inputMode="decimal"
                                        value={unitValueInputs[index] ?? (unit.value ? String(unit.value).replace(".", ",") : "")}
                                        onChange={(event) => setUnitValueInputs(current => ({ ...current, [index]: event.target.value }))}
                                        onBlur={() => {
                                            const parsedValue = Number.parseFloat((unitValueInputs[index] ?? "").replace(",", "."));
                                            setUnits(current => current.map((currentUnit, currentIndex) =>
                                                currentIndex === index && !Number.isNaN(parsedValue)
                                                    ? { ...currentUnit, value: parsedValue }
                                                    : currentUnit
                                            ));
                                        }}
                                    />
                                </div>
                            )
                        }
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
                            {food ? "Änderungen speichern" : "Lebensmittel speichern"}
                        </button>

                    </div>
            </div>
        </div>
    );
}

export default NewFoodModal;
