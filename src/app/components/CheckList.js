import React, { useState } from "react";

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

export default function CheckList({ toggleFunction, handleSubmit, initialPreferences, isDarkMode }) {
  const categories = {
    restrictions: [
      "vegan", "vegetarian", "gluten-free", "dairy-free", "keto", "paleo",
    ],
    allergies: [
      "peanuts", "tree nuts", "milk", "eggs", "soy", "wheat", "fish", "shellfish",
    ],
    goals: [
      "weight loss", "muscle gain", "heart health", "diabetes management", "energy boost",
    ],
  };

  const [state, setState] = useState(initialPreferences || {
    selectedRestrictions: [],
    selectedAllergies: [],
    selectedGoals: [],
  });
  const [previousState, setPreviousState] = useState(initialPreferences || {
    selectedRestrictions: [],
    selectedAllergies: [],
    selectedGoals: [],
  });
  const [openSections, setOpenSections] = useState({
    restrictions: false,
    allergies: false,
    goals: false,
  });

  const handleArrayChange = (category, item, isChecked) => {
    setState((prevState) => ({
      ...prevState,
      [category]: isChecked
        ? [...prevState[category], item]
        : prevState[category].filter((i) => i !== item),
    }));
  };

  const handleCancel = () => {
    setState(previousState);
    toggleFunction();
  };

  const handleSave = () => {
    console.log("Saving preferences:", state);
    setPreviousState(state);
    handleSubmit(state);
    toggleFunction();
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([categoryName, items]) => (
        <div key={categoryName} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection(categoryName)}
            className={`w-full p-4 text-left font-semibold flex justify-between items-center ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
            }`}
          >
            <span className="capitalize">{categoryName}</span>
            {openSections[categoryName] ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          {openSections[categoryName] && (
            <div className={`p-4 space-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {items.map((item) => (
                <label key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state[`selected${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`].includes(item)}
                    onChange={(e) =>
                      handleArrayChange(
                        `selected${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`,
                        item,
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  <span className={isDarkMode ? 'text-white' : 'text-black'}>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-4">
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