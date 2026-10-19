import "./RecipeLibrary.css"
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../types/Recipe";
import { useCallback, useEffect, useState } from "react";
import RecipeModal from "../../modals/RecipeModal";
import RecipeDetailModal from "../../modals/RecipeDetailModal";

type RecipeCategory = {
  id: number;
  name: string;
  sortOrder: number;
};

function RecipeLibrary() {
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const loadRecipes = useCallback(async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok) {
        console.error("Fehler beim Laden der Rezepte");
        return;
      }

      const recipes = await response.json();
      setRecipeList(recipes);
    } catch (error) {
      console.error("Fehler beim Laden der Rezepte", error);
    }
  }, []);

  useEffect(() => {
      loadRecipes();
  }, [loadRecipes]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          console.error("Fehler beim Laden der Kategorien");
          return;
        }

        setCategories(await response.json());
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien", error);
      }
    }

    loadCategories();
  }, []);

  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const filteredList = selectedCategory === "Alle"
    ? recipeList
    : recipeList.filter(recipe => recipe.category === selectedCategory);

  return (
    <section className="food-selector">
      <h2>Rezeptbibliothek</h2>
      <div className="category-selection">
        <button 
          className={`btn food-selector-button ${selectedCategory === "Alle" ? "active" : ""}`} 
          onClick={() => {
            setSelectedCategory("Alle");
          }}>Alle Rezepte</button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn food-selector-button ${selectedCategory === category.name ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(category.name);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="recipe-overview">
        {filteredList.map(recipe => 
          <RecipeCard key={recipe.id} recipe={recipe} onSelect={setSelectedRecipe}/>
        )}
      {selectedRecipe && <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} onSaved={updated => { setRecipeList(current => current.map(item => item.id === updated.id ? updated : item)); setSelectedRecipe(updated); }} onDeleted={() => { setRecipeList(current => current.filter(item => item.id !== selectedRecipe.id)); setSelectedRecipe(null); }} />}

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
                const response = await fetch("/api/recipes", {
                  method: "POST", 
                  headers: {"Content-Type": "application/json"}, 
                  body: JSON.stringify(recipe)})

                if(!response.ok){
                  const errorDetails = await response.text();
                  console.error("Fehler beim Speichern des Rezepts.", response.status, errorDetails);
                  return;
                }

                await loadRecipes();
                setIsRecipeModalOpen(false);
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
