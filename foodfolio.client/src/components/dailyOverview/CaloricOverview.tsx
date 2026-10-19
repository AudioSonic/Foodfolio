import "./CaloricOverview.css"
import type { DailyGoals } from "../../modals/DailyGoalsModal";

type ConsumedNutrition = Pick<DailyGoals, "calories" | "protein" | "carbohydrates" | "fat">;
type CaloricOverviewProps = { goals: DailyGoals; consumed: ConsumedNutrition; onEditGoals: () => void };

function CaloricOverview({ goals, consumed, onEditGoals }: CaloricOverviewProps){
    const progress = (value: number, goal: number) => goal > 0 ? Math.min(100, value / goal * 100) : 0;
    const formatCalories = (value: number) => Math.round(value).toLocaleString("de-DE");
    const formatMacro = (value: number) => (Math.round(value * 10) / 10).toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    });
    return(
        <div className="nutrition-card">
            <div className="card-header">
                <h2>Tagesübersicht</h2>
                <button className="edit-goals-button" type="button" onClick={onEditGoals}>Ziele bearbeiten</button>
            </div>

            <div className="card-content">

                <div className="calorie-section">
                    <div className="calorie-chart" style={{ background: `conic-gradient(var(--color-primary) 0deg ${progress(consumed.calories, goals.calories) * 3.6}deg, #e9e9e9 ${progress(consumed.calories, goals.calories) * 3.6}deg 360deg)` }}>
                        <div className="calorie-center">
                            <strong>{formatCalories(consumed.calories)}</strong>
                            <span>/ {formatCalories(goals.calories)} kcal</span>
                        </div>
                    </div>
                </div>

                <div className="nutrition-section">

                    <div className="remaining">
                        <span>Verbleibend</span>
                        <strong>{formatCalories(Math.max(0, goals.calories - consumed.calories))} <small>kcal</small></strong>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Protein</span>
                            <span>{formatMacro(consumed.protein)} / {formatMacro(goals.protein)} g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress protein" style={{ width: `${progress(consumed.protein, goals.protein)}%` }}></div>
                        </div>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Kohlenhydrate</span>
                            <span>{formatMacro(consumed.carbohydrates)} / {formatMacro(goals.carbohydrates)} g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress carbs" style={{ width: `${progress(consumed.carbohydrates, goals.carbohydrates)}%` }}></div>
                        </div>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Fett</span>
                            <span>{formatMacro(consumed.fat)} / {formatMacro(goals.fat)} g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress fat" style={{ width: `${progress(consumed.fat, goals.fat)}%` }}></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CaloricOverview
