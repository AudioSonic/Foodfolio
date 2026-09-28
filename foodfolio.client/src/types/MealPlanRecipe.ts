import type { Recipe } from "./Recipe";

export type MealPlanRecipe = {
    recipe: Recipe;
    amount: number;
    unit: "portion" | "g";
}