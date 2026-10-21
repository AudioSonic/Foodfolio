import "./RecipeCard.css"
import type { Recipe } from "../../types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
}

function RecipeCard({recipe, onSelect}: RecipeCardProps) {
  
  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData(
        "application/json",
        JSON.stringify(recipe)
    );

  }

  return (
    <div className="recipe-card" draggable onDragStart={handleDragStart} onClick={() => onSelect?.(recipe)} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} onKeyDown={event => { if (onSelect && (event.key === "Enter" || event.key === " ")) onSelect(recipe); }}>
      <img src={recipe.imageUrl} alt="" />
      <div className="recipe-card-information">
        <div className="recipe-card-header">
          <span className="recipe-card-title">{recipe.name}</span>
          <span className="recipe-card-calories">{Math.round(recipe.caloriesPerServing)} kcal / Portion</span>
        </div>
        
        <div className="macro-overview">
          <div className="macro">
            <span className="macro-value">{Math.round(recipe.proteinPerServing * 10) / 10} g</span>
            <span className="macro-title">Protein</span>
          </div>

          <div className="macro">
            <span className="macro-value">{Math.round(recipe.carbohydratesPerServing * 10) / 10} g</span>
            <span className="macro-title">Kohlenhydrate</span>
          </div>

          <div className="macro">
            <span className="macro-value">{Math.round(recipe.fatPerServing * 10) / 10} g</span>
            <span className="macro-title">Fett</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default RecipeCard;
