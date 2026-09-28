import "./PortionSelector.css";
import type { Recipe } from "../types/Recipe";
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
                <h2>{recipe.name}</h2>

                <p>Wie viele Portionen möchtest du einplanen?</p>

                <div className="portion-input">
                    <button
                        type="button"
                        onClick={() => setAmount(current => current - 1)}
                        disabled={amount <= 1}
                    >
                        −
                    </button>

                    <span>{amount}</span>

                    <button
                        type="button"
                        onClick={() => setAmount(current => current + 1)}
                    >
                        +
                    </button>
                </div>

                <div className="portion-actions">
                    <button type="button" onClick={onCancel}>
                        Abbrechen
                    </button>

                    <button
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