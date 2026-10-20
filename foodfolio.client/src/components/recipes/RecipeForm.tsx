import FoodSelector from "../../modals/FoodSelector";
import type { Food } from "../../types/Food";
import type { RecipeFormData } from "../../types/RecipeFormData";
import type { Recipe } from "../../types/Recipe";
import type { Unit } from "../../types/Unit";
import "./RecipeForm.css";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { apiRequest, ApiError } from "../../services/api";



type SelectedIngredient = {
    food: Food;
    quantity: string;
    unitId: number;
};

type RecipeStep = {
    id: number;
    order: number;
    instruction: string;
};

type RecipeCategory = {
    id: number;
    name: string;
    sortOrder: number;
};

export type RecipeFormHandle = {
    save: () => void;
};

type RecipeFormProps = {
    onSave: (recipe: RecipeFormData) => void;
    initialRecipe?: Recipe;
};

const RecipeForm = forwardRef<RecipeFormHandle, RecipeFormProps>(function RecipeForm({ onSave, initialRecipe }, ref) {
    const [isFoodSelectorOpen, setIsFoodSelectorOpen] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<SelectedIngredient[]>(() => initialRecipe?.ingredients.map(i => ({ food: i.food, quantity: String(i.quantity), unitId: i.unitId })) ?? []);
    const [name, setName] = useState(initialRecipe?.name ?? "");
    const [description, setDescription] = useState(initialRecipe?.description ?? "");
    const [category, setCategory] = useState(initialRecipe?.category ?? "");
    const [servings, setServings] = useState(initialRecipe?.servings || 1);
    const [imageUrl, setImageUrl] = useState(initialRecipe?.imageUrl ?? "");
    const [imagePreviewError, setImagePreviewError] = useState(false);
    const [source, setSource] = useState(initialRecipe?.source ?? "");
    const [sourceUrl, setSourceUrl] = useState(initialRecipe?.sourceUrl ?? "");
    const [units, setUnits] = useState<Unit[]>([]);
    const [categories, setCategories] = useState<RecipeCategory[]>([]);
    const [steps, setSteps] = useState<RecipeStep[]>(() => initialRecipe?.steps?.map(step => ({ ...step })) ?? []);
    const [draggedStepIndex, setDraggedStepIndex] = useState<number | null>(null);
    const [loadError, setLoadError] = useState("");

    const handleSave = useCallback(() => {
        const recipe = {
            name,
            description,
            category,
            servings,
            imageUrl,
            source: source || undefined,
            sourceUrl: sourceUrl || undefined,
            steps: steps.map((step, index) => ({
                order: index + 1,
                instruction: step.instruction
            })),
            ingredients: selectedFoods.map(ingredient => ({
                foodId: ingredient.food.id,
                quantity: Number.parseFloat(ingredient.quantity) || 0,
                unitId: ingredient.unitId
            }))
        };

        onSave(recipe);
    }, [name, description, category, servings, imageUrl, source, sourceUrl, selectedFoods, steps, onSave]);

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
                setUnits(await apiRequest<Unit[]>("/api/units"));
            }
            catch(error){
                setLoadError(error instanceof ApiError ? error.message : "Die Einheiten konnten nicht geladen werden.");
            }
        }
        getUnits();

        async function getCategories(){
            try{
                const data = await apiRequest<RecipeCategory[]>("/api/categories");
                setCategories(data);
                setCategory(current => current || data[0]?.name || "");
            }
            catch(error){
                setLoadError(error instanceof ApiError ? error.message : "Die Kategorien konnten nicht geladen werden.");
            }
        }
        getCategories();
    },[]
    )


    useImperativeHandle(ref, () => ({ save: handleSave }), [handleSave]);

    return (
        <div className="recipe-form">

            {loadError && <p role="alert" className="form-error">{loadError}</p>}

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
                    <select id="recipe-category" value={category} onChange={(event) => setCategory(event.target.value)} disabled={categories.length === 0}>
                        {categories.length === 0 && <option value="">Kategorien werden geladen …</option>}
                        {categories.map(recipeCategory => (
                            <option key={recipeCategory.id} value={recipeCategory.name}>
                                {recipeCategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="recipe-source-fields">
                    <div className="form-group">
                        <label htmlFor="recipe-source">Quelle</label>
                        <input id="recipe-source" type="text" value={source} onChange={(event) => setSource(event.target.value)} placeholder="z. B. YouTube" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipe-source-url">Quellen-URL</label>
                        <input id="recipe-source-url" type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://..." />
                    </div>
                </div>
            </div>

            <div className="servings-panel">
                <span className="servings-label">Portionen</span>
                <div className="servings-control">
                    <button type="button" onClick={() => setServings(current => Math.max(1, current - 1))}>−</button>
                    <output aria-live="polite">{servings}</output>
                    <button type="button" onClick={() => setServings(current => current + 1)}>+</button>
                </div>
            </div>

            <div className="image-panel">
                <div className="form-group">
                    <label htmlFor="recipe-image">Bild</label>
                    <input
                        id="recipe-image"
                        type="text"
                        value={imageUrl}
                        onChange={(event) => {
                            setImageUrl(event.target.value);
                            setImagePreviewError(false);
                        }}
                        placeholder="Bild-URL"
                    />
                    {imageUrl.trim() && !imagePreviewError && (
                        <img
                            className="recipe-image-preview"
                            src={imageUrl.trim()}
                            alt="Rezeptvorschau"
                            onError={() => setImagePreviewError(true)}
                        />
                    )}
                    {imageUrl.trim() && imagePreviewError && (
                        <span className="recipe-image-preview-error">
                            Das Bild konnte unter dieser URL nicht geladen werden.
                        </span>
                    )}
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
                        const quantity = event.target.value;

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
            <div className="recipe-steps-panel">
                <div className="ingredients-header"><h3>Zubereitung</h3></div>
                {steps.length === 0 && (
                    <div className="ingredients-empty">
                        <span>Noch keine Zubereitungsschritte hinzugefügt.</span>
                    </div>
                )}
                {steps.length > 0 && <div className="steps-list">
                    {steps.map((step, index) => <div className="recipe-step-item" key={step.id} draggable
                        onDragStart={() => setDraggedStepIndex(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                            if (draggedStepIndex === null || draggedStepIndex === index) return;
                            setSteps(current => {
                                const next = [...current];
                                const [moved] = next.splice(draggedStepIndex, 1);
                                next.splice(index, 0, moved);
                                return next.map((item, itemIndex) => ({ ...item, order: itemIndex + 1 }));
                            });
                            setDraggedStepIndex(null);
                        }}
                        onDragEnd={() => setDraggedStepIndex(null)}>
                        <span className="step-drag-handle" aria-label="Schritt verschieben">⋮⋮</span>
                        <span className="step-number">{index + 1}</span>
                        <textarea value={step.instruction} rows={1} placeholder="Zubereitungsschritt"
                            onChange={(event) => setSteps(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, instruction: event.target.value } : item))}
                            onInput={(event) => { event.currentTarget.style.height = "auto"; event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`; }} />
                        <button type="button" className="remove-step-button" onClick={() => setSteps(current => current.filter((_, itemIndex) => itemIndex !== index))}>×</button>
                    </div>)}
                </div>}
                <button type="button" className="btn add-ingredient-button" onClick={() => setSteps(current => [...current, { id: Date.now(), order: current.length + 1, instruction: "" }])}>+ Schritt hinzufügen</button>
            </div>
          {isFoodSelectorOpen && (
              <FoodSelector
                  onClose={() => setIsFoodSelectorOpen(false)}
                  onSelectFood={(food) => {
                    setSelectedFoods(current => [
                        ...current,
                        {
                            food: food,
                            quantity: "",
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
