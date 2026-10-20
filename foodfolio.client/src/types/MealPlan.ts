import type { MealPlanRecipe } from "./MealPlanRecipe";

export type MealType =
    | "breakfast"
    | "snack1"
    | "lunch"
    | "snack2"
    | "dinner";

export type MealPlanItem = {
    id: number; date: string; mealType: MealType; entryType: "recipe" | "food";
    recipeId?: number; foodId?: number; portions?: number; quantity?: number; unitId?: number;
    name?: string; imageUrl?: string; unitName?: string;
    calories: number; protein: number; carbohydrates: number; fat: number;
};
