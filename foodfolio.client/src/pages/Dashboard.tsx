import { useEffect, useState } from "react";
import "./Dashboard.css";

import CaloricOverview from "../components/dailyOverview/CaloricOverview";
import MealsPerDay from "../components/dailyOverview/MealsPerDay";
import RecipeLibrary from "../components/recipes/RecipeLibrary";
import ActiveDateSelect from "../components/ActiveDateSelect";

import type { Recipe } from "../types/Recipe";
import type { MealPlanItem, MealType } from "../types/MealPlan";

import PortionSelector from "../modals/PortionSelector";
import DailyGoalsModal, { type DailyGoals } from "../modals/DailyGoalsModal";
import FoodPlanModal from "../modals/FoodPlanModal";
function getDateKey(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function Dashboard() {
    const [dailyGoals, setDailyGoals] = useState<DailyGoals>({ calories: 1850, protein: 130, carbohydrates: 220, fat: 70 });
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
    const [activeDate, setActiveDate] = useState(() => new Date());
    const [dailyPlan, setDailyPlan] = useState<MealPlanItem[]>([]);
    const [planError, setPlanError] = useState("");
    const [foodMealType, setFoodMealType] = useState<MealType | null>(null);

    const dateKey = getDateKey(activeDate);
    useEffect(() => {
        fetch("/api/meal-plan?date=" + dateKey)
            .then(response => response.ok ? response.json() : Promise.reject(new Error("Der Tagesplan konnte nicht geladen werden.")))
            .then(setDailyPlan)
            .catch(error => setPlanError(error instanceof Error ? error.message : "Der Tagesplan konnte nicht geladen werden."))
    }, [dateKey]);

    const [pendingRecipe, setPendingRecipe] = useState<Recipe | null>(null);
    const [pendingMealType, setPendingMealType] = useState<MealType | null>(null);

    function handleRecipeDrop(recipe: Recipe, mealType: MealType) {
        setPendingRecipe(recipe);
        setPendingMealType(mealType);
    }

    function handlePortionConfirm(amount: number) {
        if (!pendingRecipe || !pendingMealType) {
            return;
        }

        setPlanError("");
        fetch("/api/meal-plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date: dateKey, mealType: pendingMealType, entryType: "recipe", recipeId: pendingRecipe.id, portions: amount }) })
            .then(response => response.ok ? response.json() : response.text().then(message => Promise.reject(new Error(message))))
            .then(() => fetch("/api/meal-plan?date=" + dateKey))
            .then(response => response.json())
            .then(setDailyPlan)
            .catch(error => setPlanError(error instanceof Error ? error.message : "Das Rezept konnte nicht eingeplant werden."));

        setPendingRecipe(null);
        setPendingMealType(null);
    }

    function handleRemoveItem(item: MealPlanItem) {
        fetch("/api/meal-plan/" + item.id, { method: "DELETE" })
            .then(response => { if (!response.ok) throw new Error("Der Eintrag konnte nicht entfernt werden."); setDailyPlan(current => current.filter(currentItem => currentItem.id !== item.id)); })
            .catch(error => setPlanError(error instanceof Error ? error.message : "Der Eintrag konnte nicht entfernt werden."));
    }

    function handleEditItem(item: MealPlanItem) {
        const value = Number(window.prompt(item.entryType === "recipe" ? "Portionsanzahl" : "Menge", String(item.entryType === "recipe" ? item.portions : item.quantity)));
        if (!Number.isFinite(value) || value <= 0) return;
        const body = item.entryType === "recipe" ? { ...item, portions: value } : { ...item, quantity: value };
        fetch("/api/meal-plan/" + item.id, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
            .then(response => response.ok ? response.json() : Promise.reject(new Error("Der Eintrag konnte nicht geändert werden.")))
            .then(updated => setDailyPlan(current => current.map(currentItem => currentItem.id === updated.id ? updated : currentItem)))
            .catch(error => setPlanError(error instanceof Error ? error.message : "Der Eintrag konnte nicht geändert werden."));
    }

    const consumed = dailyPlan.reduce((total, item) => ({
        calories: total.calories + item.calories,
        protein: total.protein + item.protein,
        carbohydrates: total.carbohydrates + item.carbohydrates,
        fat: total.fat + item.fat
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

            {planError && <p role="alert">{planError}</p>}
            <MealsPerDay
                dailyPlan={dailyPlan}
                onRecipeDrop={handleRecipeDrop}
                onRemoveItem={handleRemoveItem}
                onEditItem={handleEditItem}
                onAddFood={setFoodMealType}
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
        {foodMealType && <FoodPlanModal onClose={() => setFoodMealType(null)} onSave={(foodId, quantity, unitId) => {
            fetch("/api/meal-plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date: dateKey, mealType: foodMealType, entryType: "food", foodId, quantity, unitId }) })
                .then(response => response.ok ? response.json() : Promise.reject(new Error("Das Lebensmittel konnte nicht eingeplant werden.")))
                .then(() => fetch("/api/meal-plan?date=" + dateKey))
                .then(response => response.json())
                .then(items => { setDailyPlan(items); setFoodMealType(null); })
                .catch(error => setPlanError(error instanceof Error ? error.message : "Das Lebensmittel konnte nicht eingeplant werden."));
        }} />}

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
