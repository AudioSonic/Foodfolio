import type { Unit } from "./Unit";

export type Food = {
    id: number;
    name: string;
    brandName?: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    referenceAmount: number;
    referenceUnit: string;
    units: Unit[];
};

export type CreateFoodData = {
    name: string;
    brandName?: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    referenceAmount: number;
    referenceUnit: string;
    units: Unit[];
}