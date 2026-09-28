import { useState } from "react";
import "./Dashboard.css";

import CaloricOverview from "../components/dailyOverview/CaloricOverview";
import MealsPerDay from "../components/dailyOverview/MealsPerDay";
import RecipeLibrary from "../components/recipes/RecipeLibrary";
import ActiveDateSelect from "../components/ActiveDateSelect";

import type { Recipe } from "../types/Recipe";
import type { MealPlanEntry, MealType } from "../types/MealPlan";
import type { MealPlanRecipe } from "../types/MealPlanRecipe";

import PortionSelector from "../modals/PortionSelector";

function Dashboard() {

    const [dailyPlan, setDailyPlan] = useState<MealPlanEntry[]>([
        {
            mealType: "breakfast",
            recipes: []
        },
        {
            mealType: "snack1",
            recipes: []
        },
        {
            mealType: "lunch",
            recipes: []
        },
        {
            mealType: "snack2",
            recipes: []
        },
        {
            mealType: "dinner",
            recipes: []
        }
    ]);

    const [pendingRecipe, setPendingRecipe] = useState<Recipe | null>(null);
    const [pendingMealType, setPendingMealType] = useState<MealType | null>(null);

    function handleRecipeDrop(recipe: Recipe, mealType: MealType) {
        console.log("Recipe dropped:", recipe, mealType);

        setPendingRecipe(recipe);
        setPendingMealType(mealType);
    }

    function handlePortionConfirm(amount: number) {
        if (!pendingRecipe || !pendingMealType) {
            return;
        }

        const mealPlanRecipe: MealPlanRecipe = {
            recipe: pendingRecipe,
            amount,
            unit: "portion"
        };

        setDailyPlan(currentPlan =>
            currentPlan.map(entry =>
                entry.mealType === pendingMealType
                    ? {
                        ...entry,
                        recipes: [...entry.recipes, mealPlanRecipe]
                    }
                    : entry
            )
        );

        setPendingRecipe(null);
        setPendingMealType(null);
    }

    function handleRemoveRecipe(mealType: MealType, recipeIndex: number) {
    setDailyPlan(currentPlan =>
        currentPlan.map(entry =>
            entry.mealType === mealType
                ? {
                    ...entry,
                    recipes: entry.recipes.filter(
                        (_, index) => index !== recipeIndex
                    )
                }
                : entry
        )
        );
    }

    return (
    <section id="dashboard">

        <div>
            <div className="day-plan">
                <div className="page-title">
                    <h1>Tagesplan</h1>
                    <ActiveDateSelect />
                </div>
            </div>

            <MealsPerDay
                dailyPlan={dailyPlan}
                onRecipeDrop={handleRecipeDrop}
                onRemoveRecipe={handleRemoveRecipe}
            />

            <CaloricOverview />
        </div>

        <RecipeLibrary />

        {pendingRecipe && (
            <PortionSelector
                recipe={pendingRecipe}
                onConfirm={handlePortionConfirm}
                onCancel={() => {
                    setPendingRecipe(null);
                    setPendingMealType(null);
                }}
            />
        )}

    </section>
);}

export default Dashboard;