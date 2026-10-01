import "./RecipeLibrary.css"
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../types/Recipe";
import { useEffect, useState } from "react";
import RecipeModal from "../../modals/RecipeModal";

function RecipeLibrary() {
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [filteredList, setFilteredList] = useState<Recipe[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
      async function LoadRecipes(){
        try{
          const response = await fetch("https://localhost:7077/api/recipes");

          if(!response.ok){
            console.error("Fehler beim Laden der Rezepte");
            return;
          }

          const recipes = await response.json();
          setRecipeList(recipes);

          setFilteredList(recipes);
      }

      catch(error){
        console.error("Fehler beim Laden der Rezepte", error);
        }
      }
        LoadRecipes();
  },[]);

  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  return (
    <section className="food-selector">
      <h2>Rezeptbibliothek</h2>
      <div className="category-selection">
        <button 
          className={`btn food-selector-button ${selectedCategory === "Alle" ? "active" : ""}`} 
          onClick={() => {
            setFilteredList(recipeList);
            setSelectedCategory("Alle");
          }}>Alle Rezepte</button>
        
        <button 
          className={`btn food-selector-button ${selectedCategory === "Frühstück" ? "active" : ""}`}
          onClick={() => {
            setFilteredList(recipeList.filter(recipe => recipe.category === "Frühstück"));
            setSelectedCategory("Frühstück");}}>Frühstück</button>
        
        <button 
          className={`btn food-selector-button ${selectedCategory === "Mittagessen" ? "active" : ""}`}
          onClick={() => {
            setFilteredList(recipeList.filter(recipe => recipe.category === "Mittagessen"));
            setSelectedCategory("Mittagessen");}}>Mittagessen</button>
        
        <button 
          className={`btn food-selector-button ${selectedCategory === "Abendessen" ? "active" : ""}`}
          onClick={() => {
            setFilteredList(recipeList.filter(recipe => recipe.category === "Abendessen"));
            setSelectedCategory("Abendessen");}}>Abendessen</button>
        
        <button 
          className={`btn food-selector-button ${selectedCategory === "Snack" ? "active" : ""}`}
          onClick={() => {
            setFilteredList(recipeList.filter(recipe => recipe.category === "Snack"));
            setSelectedCategory("Snack");}}>Snack</button>
      </div>

      <div className="recipe-overview">
        {filteredList.map(recipe => 
          <RecipeCard recipe={recipe}/>
        )}

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
