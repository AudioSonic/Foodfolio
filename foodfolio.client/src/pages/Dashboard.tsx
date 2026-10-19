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
import DailyGoalsModal, { type DailyGoals } from "../modals/DailyGoalsModal";
const mealTypes = ["breakfast", "snack1", "lunch", "snack2", "dinner"] as const;

function createEmptyPlan(): MealPlanEntry[] {
    return mealTypes.map(mealType => ({ mealType, recipes: [] }));
}

function getDateKey(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function Dashboard() {
    const [dailyGoals, setDailyGoals] = useState<DailyGoals>({ calories: 1850, protein: 130, carbohydrates: 220, fat: 70 });
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
    const [activeDate, setActiveDate] = useState(() => new Date());
    const [plansByDate, setPlansByDate] = useState<Record<string, MealPlanEntry[]>>(() => ({
        [getDateKey(new Date())]: createEmptyPlan()
    }));

    const dateKey = getDateKey(activeDate);
    const dailyPlan = plansByDate[dateKey] ?? createEmptyPlan();

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

        setPlansByDate(currentPlans => ({ ...currentPlans, [dateKey]: dailyPlan.map(entry =>
                entry.mealType === pendingMealType
                    ? {
                        ...entry,
                        recipes: [...entry.recipes, mealPlanRecipe]
                    }
                    : entry
            ) }));

        setPendingRecipe(null);
        setPendingMealType(null);
    }

    function handleRemoveRecipe(mealType: MealType, recipeIndex: number) {
    setPlansByDate(currentPlans => ({ ...currentPlans, [dateKey]: dailyPlan.map(entry =>
            entry.mealType === mealType
                ? {
                    ...entry,
                    recipes: entry.recipes.filter(
                        (_, index) => index !== recipeIndex
                    )
                }
                : entry
        ) }));
    }

    const consumed = dailyPlan.flatMap(entry => entry.recipes).reduce((total, mealRecipe) => ({
        calories: total.calories + mealRecipe.recipe.caloriesPerServing * mealRecipe.amount,
        protein: total.protein + mealRecipe.recipe.proteinPerServing * mealRecipe.amount,
        carbohydrates: total.carbohydrates + mealRecipe.recipe.carbohydratesPerServing * mealRecipe.amount,
        fat: total.fat + mealRecipe.recipe.fatPerServing * mealRecipe.amount
    }), { calories: 0, protein: 0, carbohydrates: 0, fat: 0 });

    return (
    <section id="dashboard">

        <div>
            <div className="day-plan">
                <div className="page-title">
                    <h1>Tagesplan</h1>
                    <ActiveDateSelect date={activeDate} onChangeDate={offset => {
                        setActiveDate(current => {
                            const next = new Date(current);
                            next.setDate(next.getDate() + offset);
                            return next;
                        });
                    }} />
                </div>
            </div>

            <MealsPerDay
                dailyPlan={dailyPlan}
                onRecipeDrop={handleRecipeDrop}
                onRemoveRecipe={handleRemoveRecipe}
            />

            <CaloricOverview goals={dailyGoals} consumed={consumed} onEditGoals={() => setIsGoalsModalOpen(true)} />
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

        {isGoalsModalOpen && (
            <DailyGoalsModal
                goals={dailyGoals}
                onClose={() => setIsGoalsModalOpen(false)}
                onSave={goals => {
                    setDailyGoals(goals);
                    setIsGoalsModalOpen(false);
                }}
            />
        )}

    </section>
);}

export default Dashboard;
