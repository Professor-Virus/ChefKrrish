import * as React from "react";
import { useState, useEffect } from "react";

export default function CheckList({ toggleFunction, handleSubmit, initialPreferences }) {
  const restrictions = [
    "vegan",
    "vegetarian",
    "gluten-free",
    "dairy-free",
    "keto",
    "paleo",
  ];
  const commonAllergies = [
    "peanuts",
    "tree nuts",
    "milk",
    "eggs",
    "soy",
    "wheat",
    "fish",
    "shellfish",
  ];
  const goals = [
    "weight loss",
    "muscle gain",
    "heart health",
    "diabetes management",
    "energy boost",
  ];
  const initialState = {
    selectedRestrictions: [],
    selectedAllergies: [],
    selectedGoals: [],
  };

  // State management
  const [state, setState] = useState(initialPreferences || initialState);
  const [previousState, setPreviousState] = useState(initialPreferences || initialState);

  // Changes the respective array, when checked on the checklist
  const handleArrayChange = (category, item, isChecked) => {
    setState((prevState) => {
      const updatedArray = isChecked
        ? [...prevState[category], item]
        : prevState[category].filter((i) => i !== item);

      return {
        ...prevState,
        [category]: updatedArray,
      };
    });
  };

  // If canceled sets the state to previous state
  const handleCancel = () => {
    setState(previousState);
    toggleFunction();
  };

  // If saved, will update the preferences in the parent component
  const handleSave = () => {
    console.log("Saving preferences:", state);
    setPreviousState(state);
    handleSubmit(state);
    toggleFunction();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Restrictions</h3>
        <div className="space-y-2">
          {restrictions.map((restriction) => (
            <label key={restriction} className="flex items-center">
              <input
                type="checkbox"
                checked={state.selectedRestrictions.includes(restriction)}
                onChange={(e) =>
                  handleArrayChange(
                    "selectedRestrictions",
                    restriction,
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              {restriction}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Common Allergies</h3>
        <div className="space-y-2">
          {commonAllergies.map((allergy) => (
            <label key={allergy} className="flex items-center">
              <input
                type="checkbox"
                checked={state.selectedAllergies.includes(allergy)}
                onChange={(e) =>
                  handleArrayChange(
                    "selectedAllergies",
                    allergy,
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              {allergy}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Goals</h3>
        <div className="space-y-2">
          {goals.map((goal) => (
            <label key={goal} className="flex items-center">
              <input
                type="checkbox"
                checked={state.selectedGoals.includes(goal)}
                onChange={(e) =>
                  handleArrayChange("selectedGoals", goal, e.target.checked)
                }
                className="mr-2"
              />
              {goal}
            </label>
          ))}
        </div>
      </div>
      <div className="col-span-3 flex justify-between mt-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}