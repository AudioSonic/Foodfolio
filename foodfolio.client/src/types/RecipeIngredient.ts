import type { Food } from "./Food";
import type { Unit } from "./Unit";

export type RecipeIngredient = {
    food: Food;
    quantity: number;
    unitId: number;
    unit?: Unit;
    normalizedQuantity: number;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};
