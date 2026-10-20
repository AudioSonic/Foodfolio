import { useState } from "react";
import "./DailyGoalsModal.css";

export type DailyGoals = {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
};

type DailyGoalsModalProps = {
    goals: DailyGoals;
    onSave: (goals: DailyGoals) => void;
    onClose: () => void;
};

function DailyGoalsModal({ goals, onSave, onClose }: DailyGoalsModalProps) {
    const [values, setValues] = useState({
        calories: String(goals.calories),
        protein: String(goals.protein),
        carbohydrates: String(goals.carbohydrates),
        fat: String(goals.fat)
    });

    function updateValue(field: keyof DailyGoals, value: string) {
        setValues(current => ({ ...current, [field]: value }));
    }

    function save() {
        const parsed = Object.values(values).map(value => Number.parseFloat(value.replace(",", ".")));
        if (parsed.some(value => !Number.isFinite(value) || value < 0)) return;
        onSave({
            calories: parsed[0],
            protein: parsed[1],
            carbohydrates: parsed[2],
            fat: parsed[3]
        });
    }

    return (
        <div className="daily-goals-overlay" onClick={event => event.target === event.currentTarget && onClose()}>
            <div className="daily-goals-modal">
                <div className="daily-goals-header">
                    <h2>Tagesziele bearbeiten</h2>
                    <button type="button" onClick={onClose}>×</button>
                </div>

                <div className="daily-goals-fields">
                    <label>Kalorien (kcal)<input type="number" min="0" value={values.calories} onChange={event => updateValue("calories", event.target.value)} /></label>
                    <label>Proteine (g)<input type="number" min="0" value={values.protein} onChange={event => updateValue("protein", event.target.value)} /></label>
                    <label>Kohlenhydrate (g)<input type="number" min="0" value={values.carbohydrates} onChange={event => updateValue("carbohydrates", event.target.value)} /></label>
                    <label>Fette (g)<input type="number" min="0" value={values.fat} onChange={event => updateValue("fat", event.target.value)} /></label>
                </div>

                <div className="daily-goals-actions">
                    <button type="button" onClick={onClose}>Abbrechen</button>
                    <button type="button" className="primary" onClick={save}>Speichern</button>
                </div>
            </div>
        </div>
    );
}

export default DailyGoalsModal;
