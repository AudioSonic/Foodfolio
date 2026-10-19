import RecipeForm from "../components/recipes/RecipeForm";
import type { RecipeFormHandle } from "../components/recipes/RecipeForm";
import type { RecipeFormData } from "../types/RecipeFormData";
import "./RecipeModal.css";
import { useEffect, useRef } from "react";
import type { Recipe } from "../types/Recipe";

type RecipeModalProps = {
    onClose: () => void;
    onSave: (recipe: RecipeFormData) => void;
    recipe?: Recipe;
};

function RecipeModal({ onClose, onSave, recipe }: RecipeModalProps) {
    const recipeFormRef = useRef<RecipeFormHandle>(null);
    function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    return (
        <div className="recipe-modal-overlay" onClick={handleOverlayClick}>
            <div className="recipe-modal">
                <div className="recipe-modal-header">
                    <h2>{recipe ? "Rezept bearbeiten" : "Neues Rezept erstellen"}</h2>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="recipe-modal-content">
                    <RecipeForm ref={recipeFormRef} onSave={onSave} initialRecipe={recipe} />
                </div>
                <div className="save-recipe-container">
                    <button
                        type="button"
                        className="btn create-recipe-button"
                        onClick={() => recipeFormRef.current?.save()}
                    >
                        {recipe ? "Änderungen speichern" : "Rezept speichern"}
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default RecipeModal;
