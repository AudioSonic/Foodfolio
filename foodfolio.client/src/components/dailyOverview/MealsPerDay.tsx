import "./MealsPerDay.css"
import MealTypeCard from "./MealTypeCard"
import IconBreakfast from "../../assets/icons/icon_breakfast.svg"
import IconSnack from "../../assets/icons/icon_orange.svg"
import IconLunch from "../../assets/icons/icon_lunch.svg"
import IconDinner from "../../assets/icons/icon_dinner.svg"
import type { Recipe } from "../../types/recipe"
import type { MealPlanItem, MealType } from "../../types/MealPlan";

type MealsPerDayProps = {
    dailyPlan: MealPlanItem[];
    onRecipeDrop: (recipe: Recipe, mealType: MealType) => void;
    onRemoveItem: (item: MealPlanItem) => void;
    onEditItem: (item: MealPlanItem) => void;
    onAddFood: (mealType: MealType) => void;
}

function MealsPerDay({ dailyPlan, onRecipeDrop, onRemoveItem, onEditItem, onAddFood }: MealsPerDayProps) {

return (
    <section id="meals-per-day">

        <MealTypeCard
            title="Frühstück"
            imgSrc={IconBreakfast}
            items={dailyPlan.filter(item => item.mealType === "breakfast")}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "breakfast")
            }
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onAddFood={() => onAddFood("breakfast")}
        />

        <MealTypeCard
            title="Snack 1"
            imgSrc={IconSnack}
            items={dailyPlan.filter(item => item.mealType === "snack1")}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "snack1")
            }
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onAddFood={() => onAddFood("snack1")}
        />

        <MealTypeCard
            title="Mittagessen"
            imgSrc={IconLunch}
            items={dailyPlan.filter(item => item.mealType === "lunch")}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "lunch")
            }
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onAddFood={() => onAddFood("lunch")}
        />

        <MealTypeCard
            title="Snack 2"
            imgSrc={IconSnack}
            items={dailyPlan.filter(item => item.mealType === "snack2")}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "snack2")
            }
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onAddFood={() => onAddFood("snack2")}
        />

        <MealTypeCard
            title="Abendessen"
            imgSrc={IconDinner}
            items={dailyPlan.filter(item => item.mealType === "dinner")}
            onRecipeDrop={(recipe) =>
            onRecipeDrop(recipe, "dinner")
            }
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            onAddFood={() => onAddFood("dinner")}
        />

    </section>
    );
}

export default MealsPerDay;
