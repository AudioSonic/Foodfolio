import FoodSelector from "../../modals/FoodSelector";
import type { Food } from "../../types/Food";
import type { RecipeFormData } from "../../types/RecipeFormData";
import type { Unit } from "../../types/Unit";
import "./RecipeForm.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";



type SelectedIngredient = {
    food: Food;
    quantity: number;
    unitId: number;
};

export type RecipeFormHandle = {
    save: () => void;
};

type RecipeFormProps = {
    onSave: (recipe: RecipeFormData) => void;
};

const RecipeForm = forwardRef<RecipeFormHandle, RecipeFormProps>(function RecipeForm({ onSave }, ref) {
    const [isFoodSelectorOpen, setIsFoodSelectorOpen] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<SelectedIngredient[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Mittagessen");
    const [servings, setServings] = useState(1);
    const [imageUrl, setImageUrl] = useState("");
    const [units, setUnits] = useState<Unit[]>([]);

    function handleSave() {
        const recipe = {
            name,
            description,
            category,
            servings,
            imageUrl,
            ingredients: selectedFoods.map(ingredient => ({
                foodId: ingredient.food.id,
                quantity: ingredient.quantity,
                unitId: ingredient.unitId
            }))
        };

        onSave(recipe);
    }

    function getAvailableUnits(food: Food){
        const baseUnits = food.referenceUnit === "g" ? ["g", "kg"] : ["ml", "l"];
        return units.filter(unit =>
            (unit.foodId === null && baseUnits.includes(unit.name)) ||
            unit.foodId === food.id
        );
    }

    useEffect(() => {
        async function getUnits(){
            try{
                const response = await fetch("/api/units");
                if(!response.ok){
                    console.error("Fehler beim Laden der Einheiten");
                    return;
                }

                const data = await response.json();
                setUnits(data);
            }
            catch(error){
                console.error("Die Einheiten konnten nicht geladen werden", error)
            }
        }
        getUnits();
    },[]
    )


    useImperativeHandle(ref, () => ({ save: handleSave }), [name, description, category, servings, imageUrl,selectedFoods, onSave]);

    return (
        <div className="recipe-form">

            <div className="recipe-basic-information">
                <h3>Grundinformationen</h3>

                <div className="form-group">
                    <label htmlFor="recipe-name">Titel</label>
                    <input
                        id="recipe-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="z. B. Hähnchen-Curry"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recipe-description">Beschreibung</label>
                    <textarea
                        id="recipe-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Kurze Beschreibung des Rezepts"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recipe-category">Kategorie</label>
                    <select id="recipe-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="Frühstück">Frühstück</option>
                        <option value="Mittagessen">Mittagessen</option>
                        <option value="Abendessen">Abendessen</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="recipe-servings">Portionen</label>
                    <input
                        id="recipe-servings"
                        type="number"
                        min="1"
                        value={servings}
                        onChange={(event) => setServings(Number(event.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recipe-image">Bild</label>
                    <input
                        id="recipe-image"
                        type="text"
                        value={imageUrl}
                        onChange={(event) => setImageUrl(event.target.value)}
                        placeholder="Bild-URL"
                    />
                </div>
            </div>

            <div className="recipe-ingredients">
                <div className="ingredients-header">
                    <h3>Zutaten</h3>
                </div>

                {selectedFoods.length === 0 ? (
                    <div className="ingredients-empty">
                        <span>Noch keine Zutaten hinzugefügt.</span>
                    </div>
                ) : (
                    <div className="ingredients-list">
    {selectedFoods.map((ingredient, index) => {
        return (
            <div
                key={ingredient.food.id}
                className="ingredient-item"
                >
                <div className="ingredient-information">
                    <span className="ingredient-name">
                        {ingredient.food.name}
                    </span>

                    {ingredient.food.brandName && (
                        <span className="ingredient-brand">
                            {ingredient.food.brandName}
                        </span>
                    )}
                </div>

               <input
                    className="ingredient-quantity"
                    type="number"
                    value={ingredient.quantity}
                    onChange={(event) => {
                        const quantity = Number(event.target.value);

                        setSelectedFoods(current =>
                            current.map((item, currentIndex) =>
                                currentIndex === index
                                    ? { ...item, quantity }
                                    : item
                            )
                        );
                    }}
                />

                <select
                    value={ingredient.unitId}
                    onChange={(event) => {
                        const unitId = Number(event.target.value);

                        setSelectedFoods(current =>
                            current.map((item, currentIndex) =>
                                currentIndex === index
                                    ? { ...item, unitId }
                                    : item
                            )
                        );
                    }}
                >
                    {getAvailableUnits(ingredient.food).map(unit => (
                        <option key={unit.id} value={unit.id}>
                            {unit.name}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="remove-ingredient-button"
                    onClick={() => {
                        setSelectedFoods(current =>
                            current.filter((_, currentIndex) => currentIndex !== index)
                        );
                    }}
                    >
                    ×
                </button>
            </div>
                    );
                })}
                </div>
                )}
                            
                <button
                    type="button"
                    className="btn add-ingredient-button"
                    onClick={() => setIsFoodSelectorOpen(true)}
                >
                    + Zutat hinzufügen
                </button>
            </div>
          {isFoodSelectorOpen && (
              <FoodSelector
                  onClose={() => setIsFoodSelectorOpen(false)}
                  onSelectFood={(food) => {
                    setSelectedFoods(current => [
                        ...current,
                        {
                            food: food,
                            quantity: 0,
                            unitId: units.find(unit =>
                                unit.foodId === null &&
                                unit.name === food.referenceUnit
                            )?.id ?? 1
                        }
                    ]);

                    setIsFoodSelectorOpen(false);
                }}
              />
          )}
        </div>
    );
});
export default RecipeForm;
