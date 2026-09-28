import "./RecipeCard.css"
import type { Recipe } from "../../types/Recipe";

type RecipeCardProps = {
  recipe: Recipe
}

function RecipeCard({recipe}: RecipeCardProps) {
  
  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData(
        "application/json",
        JSON.stringify(recipe)
    );
  }

  return (
    <div className="recipe-card" draggable onDragStart={handleDragStart}>
      <img src={recipe.imageUrl}/>
      <div className="recipe-card-information">
        <div className="recipe-card-header">
          <span className="recipe-card-title">{recipe.name}</span>
          <span className="recipe-card-calories">{recipe.calories} kcal</span>
        </div>
        
        <div className="macro-overview">
          <div className="macro">
            <span className="macro-value">{recipe.protein} g</span>
            <span className="macro-title">Protein</span>
          </div>

          <div className="macro">
            <span className="macro-value">{recipe.carbohydrates} g</span>
            <span className="macro-title">Kohlenhydrate</span>
          </div>

          <div className="macro">
            <span className="macro-value">{recipe.fat} g</span>
            <span className="macro-title">Fett</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default RecipeCard;