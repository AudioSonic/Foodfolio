import type { MealPlanRecipe } from "./MealPlanRecipe";

export type MealType =
    | "breakfast"
    | "snack1"
    | "lunch"
    | "snack2"
    | "dinner";

export type MealPlanEntry = {
    mealType: MealType;
    recipes: MealPlanRecipe[];
}