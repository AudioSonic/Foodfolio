import "./MealTypeCard.css"
import type { Recipe } from "../../types/Recipe"
import type { MealPlanRecipe } from "../../types/MealPlanRecipe"
import { useState } from "react";

type MealTypeCardProps = {
    imgSrc: string;
    title: string;
    recipes: MealPlanRecipe[];
    onRecipeDrop: (recipe: Recipe) => void;
    onRemoveRecipe: (recipeIndex: number) => void;
}

function MealTypeCard({
    imgSrc,
    title,
    recipes,
    onRecipeDrop,
    onRemoveRecipe
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
    {recipes.map((mealRecipe, index) => (
        <div className="meal-recipe" key={index}>
            <img src={mealRecipe.recipe.imageUrl} />

            <div className="meal-recipe-info">
                <span className="meal-recipe-name">
                    {mealRecipe.recipe.name}
                </span>

                <span className="meal-recipe-amount">
                    {mealRecipe.amount}{" "}
                    {mealRecipe.amount === 1 ? "Portion" : "Portionen"}
                </span>
            </div>

                <button
                    type="button"
                    onClick={() => onRemoveRecipe(index)}
                >
                    ×
                </button>
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
            </div>
        </div>
    )
}

export default MealTypeCard;