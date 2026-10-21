import "./PortionSelector.css";
import type { Recipe } from "../types/recipe";
import { useState } from "react";

type PortionSelectorProps = {
    recipe: Recipe;
    onConfirm: (amount: number) => void;
    onCancel: () => void;
};

function PortionSelector({
    recipe,
    onConfirm,
    onCancel
}: PortionSelectorProps) {
    const [amount, setAmount] = useState(1);

    return (
        <div className="portion-selector-overlay">
            <div className="portion-selector">
                <div className="portion-selector-header">
                    <div>
                        <span className="portion-selector-eyebrow">Rezept einplanen</span>
                        <h2>{recipe.name}</h2>
                    </div>
                    <button className="portion-close-button" type="button" onClick={onCancel} aria-label="Modal schließen">×</button>
                </div>

                <p className="portion-selector-description">Wie viele Portionen möchtest du einplanen?</p>

                <div className="portion-input">
                    <button className="portion-stepper-button"
                        type="button"
                        onClick={() => setAmount(current => current - 1)}
                        disabled={amount <= 1}
                    >
                        −
                    </button>

                    <span className="portion-stepper-value">{amount}</span>

                    <button className="portion-stepper-button"
                        type="button"
                        onClick={() => setAmount(current => current + 1)}
                    >
                        +
                    </button>
                </div>

                <div className="portion-actions">
                    <button className="portion-cancel-button" type="button" onClick={onCancel}>
                        Abbrechen
                    </button>

                    <button className="portion-confirm-button"
                        type="button"
                        onClick={() => onConfirm(amount)}
                    >
                        Hinzufügen
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PortionSelector;
