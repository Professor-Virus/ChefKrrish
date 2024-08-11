import * as React from "react";
// import Box from "@mui/material/Box";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";

export default function CheckList({ toggleFunction, handleSubmit }) {
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
  const [state, setState] = useState(initialState);
  const [previousState, setPreviousState] = useState(initialState);

  //Changes the respective array, when a checked on the checklist
  //Although changes aren't incorporated until save is pressed
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

  //If canceled sets the state to previous state
  const handleCancel = () => {
    setState(previousState);
    // console.log("Cancelled, this is the state being reverted to:");
    // console.log(previousState);
    toggleFunction();
  };

  //If saved, will log the new state as prevstate and the current state
  //It will also call handleSave which will log the changes into, submittedData in Home.js
  const handleSave = () => {
    setPreviousState(state);
    // console.log("Saved, this is the new state:");
    // console.log(state);
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
              />
              {restriction}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Common Allergies</h3>
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
            />
            {allergy}
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2"> Goals</h3>
        {goals.map((goal) => (
          <label key={goal} className="flex items-center">
            <input
              type="checkbox"
              checked={state.selectedGoals.includes(goal)}
              onChange={(e) =>
                handleArrayChange("selectedGoals", goal, e.target.checked)
              }
            />
            {goal}
          </label>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
    
  );
}
