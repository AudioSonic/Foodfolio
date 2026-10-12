export type RecipeFormData = {
    name: string;
    description: string;
    category: string;
    servings: number;
    imageUrl: string;
    source?: string;
    sourceUrl?: string;
    steps: {
        id?: number;
        order: number;
        instruction: string;
    }[];
    ingredients: {
        foodId: number;
        quantity: number;
        unitId: number;
    }[];
};
