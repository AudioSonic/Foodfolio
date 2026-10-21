import "./RecipeLibrary.css"
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../types/recipe";
import { useCallback, useEffect, useState } from "react";
import RecipeModal from "../../modals/RecipeModal";
import RecipeDetailModal from "../../modals/RecipeDetailModal";
import { apiRequest, ApiError } from "../../services/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecipes = useCallback(async () => {
    try {
      setRecipeList(await apiRequest<Recipe[]>("/api/recipes"));
    } catch (error) { setError(error instanceof ApiError ? error.message : "Fehler beim Laden der Rezepte."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiRequest<Recipe[]>("/api/recipes")
      .then(recipes => { if (!cancelled) setRecipeList(recipes); })
      .catch(error => { if (!cancelled) setError(error instanceof ApiError ? error.message : "Fehler beim Laden der Rezepte."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        setCategories(await apiRequest<RecipeCategory[]>("/api/categories"));
      } catch (error) {
        setError(error instanceof ApiError ? error.message : "Fehler beim Laden der Kategorien.");
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

      {error && <p role="alert" className="form-error">{error}</p>}
      <div className="recipe-overview">
        {loading ? <p>Rezepte werden geladen …</p> : filteredList.map(recipe =>
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
                await apiRequest<Recipe>("/api/recipes", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(recipe)
                });
                await loadRecipes();
                setIsRecipeModalOpen(false);
              } catch(error) {
                setError(error instanceof ApiError ? error.message : "Das Rezept konnte nicht gespeichert werden.");
              }
        }}
    />
  )}
    </section>
  );
}



export default RecipeLibrary;
