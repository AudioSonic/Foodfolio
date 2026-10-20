import type { MealPlanItem } from "../types/MealPlan";

export type DailyNutrition = {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};

export function calculateDailyNutrition(items: MealPlanItem[]): DailyNutrition {
    return items.reduce((total, item) => ({
        calories: total.calories + (Number.isFinite(item.calories) ? item.calories : 0),
        protein: total.protein + (Number.isFinite(item.protein) ? item.protein : 0),
        carbohydrates: total.carbohydrates + (Number.isFinite(item.carbohydrates) ? item.carbohydrates : 0),
        fat: total.fat + (Number.isFinite(item.fat) ? item.fat : 0)
    }), { calories: 0, protein: 0, carbohydrates: 0, fat: 0 });
}
