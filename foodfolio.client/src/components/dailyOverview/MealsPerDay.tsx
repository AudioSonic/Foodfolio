import "./MealsPerDay.css"
import MealTypeCard from "./MealTypeCard"
import IconBreakfast from "../../assets/icons/icon_breakfast.svg"
import IconSnack from "../../assets/icons/icon_orange.svg"
import IconLunch from "../../assets/icons/icon_lunch.svg"
import IconDinner from "../../assets/icons/icon_dinner.svg"
import type { Recipe } from "../../types/Recipe"
import type { MealPlanEntry, MealType } from "../../types/MealPlan";

type MealsPerDayProps = {
    dailyPlan: MealPlanEntry[];
    onRecipeDrop: (recipe: Recipe, mealType: MealType) => void;
    onRemoveRecipe: (mealType: MealType, recipeIndex: number) => void;
}

function MealsPerDay({ dailyPlan, onRecipeDrop, onRemoveRecipe }: MealsPerDayProps) {

    const breakfast = dailyPlan.find(
        entry => entry.mealType === "breakfast"
    );

    const snack1 = dailyPlan.find(
        entry => entry.mealType === "snack1"
    );

    const lunch = dailyPlan.find(
        entry => entry.mealType === "lunch"
    );

    const snack2 = dailyPlan.find(
        entry => entry.mealType === "snack2"
    );

    const dinner = dailyPlan.find(
        entry => entry.mealType === "dinner"
    );

return (
    <section id="meals-per-day">

        <MealTypeCard
            title="Frühstück"
            imgSrc={IconBreakfast}
            recipes={breakfast?.recipes ?? []}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "breakfast")
            }
            onRemoveRecipe={(index) => onRemoveRecipe("breakfast", index)}
        />

        <MealTypeCard
            title="Snack 1"
            imgSrc={IconSnack}
            recipes={snack1?.recipes ?? []}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "snack1")
            }
            onRemoveRecipe={(index) => onRemoveRecipe("snack1", index)}
        />

        <MealTypeCard
            title="Mittagessen"
            imgSrc={IconLunch}
            recipes={lunch?.recipes ?? []}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "lunch")
            }
            onRemoveRecipe={(index) => onRemoveRecipe("lunch", index)}
        />

        <MealTypeCard
            title="Snack 2"
            imgSrc={IconSnack}
            recipes={snack2?.recipes ?? []}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "snack2")
            }
            onRemoveRecipe={(index) => onRemoveRecipe("snack2", index)}
        />

        <MealTypeCard
            title="Abendessen"
            imgSrc={IconDinner}
            recipes={dinner?.recipes ?? []}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "dinner")
            }
            onRemoveRecipe={(index) => onRemoveRecipe("dinner", index)}
        />

    </section>
    );
}

export default MealsPerDay;