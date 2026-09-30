import FoodSelector from "../../modals/FoodSelector";
import type { Food } from "../../types/Food";
import "./RecipeForm.css";
import { forwardRef, useImperativeHandle, useState } from "react";

export type RecipeFormData = {
    name: string;
    description: string;
    category: string;
    servings: number;
    imageUrl: string;
    ingredients: {
        foodId: number;
        quantity: number;
    }[];
};

export type RecipeFormHandle = {
    save: () => void;
};

type RecipeFormProps = {
    onSave: (recipe: RecipeFormData) => void;
};

const RecipeForm = forwardRef<RecipeFormHandle, RecipeFormProps>(function RecipeForm({ onSave }, ref) {
    const [isFoodSelectorOpen, setIsFoodSelectorOpen] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Mittagessen");
    const [servings, setServings] = useState(1);
    const [imageUrl, setImageUrl] = useState("");

    function handleSave() {
        const recipe = {
            name,
            description,
            category,
            servings,
            imageUrl,
            ingredients: selectedFoods.map(food => ({
                foodId: food.id,
                quantity: 0
            }))
        };

        console.log(recipe);
        onSave(recipe);
    }

    useImperativeHandle(ref, () => ({ save: handleSave }), [name, description, category, servings, imageUrl, selectedFoods, onSave]);

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
                        {selectedFoods.map((food, index) => (
                            <div
                                key={food.id}
                                className="ingredient-item"
                            >
                                <div className="ingredient-information">
                                    <span className="ingredient-name">
                                        {food.name}
                                    </span>

                                    {food.brandName && (
                                        <span className="ingredient-brand">
                                            {food.brandName}
                                        </span>
                                    )}
                                </div>

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
                        ))}
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
                    setSelectedFoods(current => [...current, food]);
                    setIsFoodSelectorOpen(false);
    }}
              />
          )}
        </div>
    );
});
export default RecipeForm;
