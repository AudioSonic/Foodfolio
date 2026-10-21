import type { Recipe } from "./recipe";

export type MealPlanRecipe = {
    recipe: Recipe;
    amount: number;
    unit: "portion" | "g";
}
