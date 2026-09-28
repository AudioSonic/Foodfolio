import "./RecipeLibrary.css"
import RecipeCard from "./RecipeCard";
import TestImage from "../../assets/bolognese.jpg"
import type { Recipe } from "../../types/Recipe";

const testRecipe: Recipe = {
    id: 1,
    name: "Hähnchen-Curry",
    description: "Cremiges Hähnchen-Curry",
    imageUrl: TestImage,
    servings: 2,
    category: "Mittagessen",
    calories: 563,
    protein: 37,
    carbohydrates: 42,
    fat: 18
};

function RecipeLibrary() {
  return (
    <section className="food-selector">
      <h2>Rezeptbibliothek</h2>
      <div className="category-selection">
        <button className="btn food-selector-button">Frühstück</button>
        <button className="btn food-selector-button">Mittagessen</button>
        <button className="btn food-selector-button">Abendessen</button>
        <button className="btn food-selector-button">Snack</button>
      </div>

      <div>
        <RecipeCard recipe={testRecipe}/>
      </div>
    </section>
  );
}

export default RecipeLibrary;