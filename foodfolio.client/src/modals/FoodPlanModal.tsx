import { useEffect, useState } from "react";
import type { Food } from "../types/food";
import type { Unit } from "../types/Unit";
import "./FoodPlanModal.css";
import { apiUrl } from "../services/api";

type Props = { onClose: () => void; onSave: (foodId: number, quantity: number, unitId: number) => void };

export default function FoodPlanModal({ onClose, onSave }: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [foodId, setFoodId] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [unitId, setUnitId] = useState(0);

  useEffect(() => {
    Promise.all([fetch(apiUrl("/api/foods")).then(response => response.json()), fetch(apiUrl("/api/units")).then(response => response.json())])
      .then(([loadedFoods, loadedUnits]) => { setFoods(loadedFoods); setUnits(loadedUnits); if (loadedFoods[0]) setFoodId(loadedFoods[0].id); });
  }, []);

  const food = foods.find(item => item.id === foodId);
  const availableUnits = units.filter(unit =>
    (unit.foodId === null && (food?.referenceUnit === "g" ? ["g", "kg"] : ["ml", "l"]).includes(unit.name)) ||
    unit.foodId === foodId
  );
  const selectedUnitId = unitId || availableUnits[0]?.id || 0;

  return <div className="food-plan-overlay">
    <div className="food-plan-modal" role="dialog" aria-modal="true" aria-labelledby="food-plan-title">
      <header className="food-plan-header">
        <h2 id="food-plan-title">Lebensmittel einplanen</h2>
        <button type="button" className="food-plan-close" onClick={onClose} aria-label="Schließen">×</button>
      </header>
      <div className="food-plan-form">
        <label>Lebensmittel
          <select value={foodId} onChange={event => { setFoodId(Number(event.target.value)); setUnitId(0); }}>
            {foods.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label>Menge
          <input type="number" min="0.01" step="any" value={quantity} onChange={event => setQuantity(event.target.value)} />
        </label>
        <label>Einheit
          <select value={selectedUnitId} onChange={event => setUnitId(Number(event.target.value))}>
            {availableUnits.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
          </select>
        </label>
      </div>
      <footer className="food-plan-actions">
        <button type="button" className="food-plan-cancel" onClick={onClose}>Abbrechen</button>
        <button type="button" className="food-plan-save" onClick={() => { const value = Number(quantity); if (foodId && selectedUnitId && value > 0) onSave(foodId, value, selectedUnitId); }}>Hinzufügen</button>
      </footer>
    </div>
  </div>;
}
