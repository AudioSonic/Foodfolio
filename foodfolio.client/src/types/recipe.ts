export type Recipe = {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    servings: number;
    category: "Frühstück" | "Mittagessen" | "Abendessen" | "Snack";

    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}