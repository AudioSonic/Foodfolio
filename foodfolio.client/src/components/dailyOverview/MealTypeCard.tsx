import "./MealTypeCard.css"
import type { Recipe } from "../../types/recipe"
import type { MealPlanItem } from "../../types/MealPlan"
import { useState } from "react";

type MealTypeCardProps = {
    imgSrc: string;
    title: string;
    items: MealPlanItem[];
    onRecipeDrop: (recipe: Recipe) => void;
    onRemoveItem: (item: MealPlanItem) => void;
    onEditItem: (item: MealPlanItem) => void;
    onAddFood: () => void;
}

function MealTypeCard({
    imgSrc,
    title,
    items,
    onRecipeDrop,
    onRemoveItem, onEditItem, onAddFood
}: MealTypeCardProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragOver(true);
    }

    function handleDragLeave() {
    setIsDragOver(false);
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();

        const recipeData = event.dataTransfer.getData("application/json");
        const recipe: Recipe = JSON.parse(recipeData);

        onRecipeDrop(recipe);
    }

    return (
        <div className="meal-type-card">
            <div className="meal-desc">
                <img src={imgSrc} />
                <span>{title}</span>
            </div>

            <div className="meal-recipes">
    {items.map(item => (
        <div className="meal-recipe" key={item.id}>
            {item.imageUrl && <img src={item.imageUrl} alt="" />}

            <div className="meal-recipe-info">
                <span className="meal-recipe-name">
                    {item.name}
                </span>

                <span className="meal-recipe-amount">
                    {item.entryType === "recipe" ? String(item.portions) + (item.portions === 1 ? " Portion" : " Portionen") : String(item.quantity) + " " + (item.unitName ?? "")}
                </span>
            </div>

                <button className="meal-recipe-remove"
                    type="button"
                    onClick={() => onRemoveItem(item)}
                >
                    ×
                </button>
                <button className="meal-recipe-edit" type="button" onClick={() => onEditItem(item)}>Bearbeiten</button>
            </div>
                ))}

                <div
                    className={`recipe-placeholder ${isDragOver ? "drag-over" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <span>＋ Hier Rezept ablegen</span>
                </div>
                <button type="button" onClick={onAddFood}>+ Lebensmittel</button>
            </div>
        </div>
    )
}

export default MealTypeCard;
