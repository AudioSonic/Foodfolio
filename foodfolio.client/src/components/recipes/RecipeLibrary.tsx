import "./RecipeLibrary.css"
import RecipeCard from "./RecipeCard";
import TestImage from "../../assets/bolognese.jpg"
import type { Recipe } from "../../types/Recipe";
import { useState } from "react";
import RecipeModal from "../../modals/RecipeModal";

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
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

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

      <button
      type="button"
      className="new-recipe-button"
      onClick={() => setIsRecipeModalOpen(true)}
      >
          +
      </button>
      {isRecipeModalOpen && (
    <RecipeModal
        onClose={() => setIsRecipeModalOpen(false)}
        onSave={async (recipe) => 
          {

              try{
                const response = await fetch("https://localhost:7077/api/recipes", {
                  method: "POST", 
                  headers: {"Content-Type": "application/json"}, 
                  body: JSON.stringify(recipe)})

                if(!response.ok){
                  console.error("Fehler beim Speichern des Rezepts.");
                  return;
                }

                setIsRecipeModalOpen(false)
              }

              catch(error){
                console.error("Fehler beim speichern des Rezepts", error);
              }
        }}
    />
  )}
    </section>
  );
}



export default RecipeLibrary;
