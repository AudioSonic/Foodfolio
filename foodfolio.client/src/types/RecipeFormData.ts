export type RecipeFormData = {
    name: string;
    description: string;
    category: string;
    servings: number;
    imageUrl: string;
    ingredients: {
        foodId: number;
        quantity: number;
        unitId: number;
    }[];
};