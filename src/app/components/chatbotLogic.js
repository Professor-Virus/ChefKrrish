import OpenAI from 'openai';
import { useState } from 'react';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY, // This should be set in your environment variables
  dangerouslyAllowBrowser: true,
});


export async function handleAsk(inputText, userPreferences) {
  console.log("Received input:", inputText);
  console.log("Received preferences in handleAsk:", userPreferences);

  try {
    // Retrieve relevant information from the user
    const userData = retrieveUserData(inputText, userPreferences);
    console.log("User data after retrieval:", userData);

    // Augment the retrieved information with additional data
    const augmentedData = augmentUserData(userData);
    console.log("Augmented data:", augmentedData);

    // Generate personalized recommendations using OpenAI
    const prompt = createPrompt(inputText, augmentedData);
    console.log("Generated prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      
    });
    
    const generatedText = completion.choices[0].message.content;
    console.log("Generated response:", generatedText);

    return generatedText;
  } catch (error) {
    console.error("Error during handleAsk:", error);
    return "Sorry, an error occurred while generating a response.";
  }
}


/**
 * Retrieve relevant information from the user.
 *
 * @param {string} inputText - User input text.
 * @returns {object} User data with dietary needs and preferences.
 */
function retrieveUserData(inputText, userPreferences = { selectedRestrictions: [], selectedAllergies: [], selectedGoals: [] }) {
  console.log("User preferences received in retrieveUserData:", userPreferences);
  return {
    dietaryRestrictions: userPreferences.selectedRestrictions,
    foodAllergies: userPreferences.selectedAllergies,
    healthGoals: userPreferences.selectedGoals,
    favoriteFoods: parseFavoriteFoods(inputText),
  };
}




/**
 * Augment user data with additional information.
 *
 * @param {object} userData - User data with dietary needs and preferences.
 * @returns {object} Augmented user data with additional information.
 */
function augmentUserData(userData) {
  console.log("Augmenting user data:", userData);
  return {
    foodPreferences: userData.dietaryRestrictions,
    foodAllergies: userData.foodAllergies,
    healthTrends: userData.healthGoals,
    nutritionalDeficiencies: analyzeNutritionalDeficiencies(userData),
  };
}

/**
 * Generate personalized recommendations using the Llama 3.1 8B model.
 *
 * @param {string} inputText - User input text.
 * @param {object} augmentedData - Augmented user data with additional information.
 * @returns {Promise<string>} Generated text with personalized recommendations.
 */
async function generateText(inputText, augmentedData) {
    const prompt = createPrompt(inputText, augmentedData);
    console.log("This is the prompt")
    console.log(prompt)
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [{ role: "user", content: inputText }],
    });
    
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content;
  }
  

// Helper functions to parse user input text
function parseDietaryRestrictions(inputText) {
  const restrictions = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'];
  return restrictions.filter(restriction => inputText.toLowerCase().includes(restriction));
}

function parseFoodAllergies(inputText) {
  const commonAllergies = ['peanuts', 'tree nuts', 'milk', 'eggs', 'soy', 'wheat', 'fish', 'shellfish'];
  return commonAllergies.filter(allergy => inputText.toLowerCase().includes(allergy));
}

function parseHealthGoals(inputText) {
  const goals = ['weight loss', 'muscle gain', 'heart health', 'diabetes management', 'energy boost'];
  return goals.filter(goal => inputText.toLowerCase().includes(goal));
}

function parseFavoriteFoods(inputText) {
  // This is a simplified implementation. In a real-world scenario, you'd use a more sophisticated NLP approach.
  const foodWords = inputText.toLowerCase().split(' ').filter(word => word.length > 3);
  return foodWords.slice(0, 3); // Return up to 3 potential favorite foods
}

// Helper functions to analyze user data
function analyzeFoodPreferences(userData) {
  // Simplified implementation
  return [...userData.favoriteFoods, ...userData.dietaryRestrictions];
}

function analyzeNutritionalDeficiencies(userData) {
  // Simplified implementation
  const potentialDeficiencies = {
    'vegan': ['B12', 'Iron', 'Calcium'],
    'vegetarian': ['B12', 'Iron'],
    'dairy-free': ['Calcium', 'Vitamin D'],
  };

  return userData.dietaryRestrictions.flatMap(restriction => potentialDeficiencies[restriction] || []);
}

function analyzeHealthTrends(userData) {
  // Simplified implementation
  return userData.healthGoals;
}

function createPrompt(inputText, augmentedData) {
  console.log("Creating prompt with augmented data:", augmentedData);

  const dietaryRestrictions = augmentedData.foodPreferences.length > 0
    ? augmentedData.foodPreferences.join(', ')
    : 'No specific dietary restrictions.';

  const foodAllergies = augmentedData.foodAllergies.length > 0
    ? augmentedData.foodAllergies.join(', ')
    : 'No food allergies.';

  const healthGoals = augmentedData.healthTrends.length > 0
    ? augmentedData.healthTrends.join(', ')
    : 'No specific health goals.';

  const nutritionalDeficiencies = augmentedData.nutritionalDeficiencies.length > 0
    ? augmentedData.nutritionalDeficiencies.join(', ')
    : 'No known nutritional deficiencies.';

  const prompt = `As a chef and personal nutritionist, please provide advice for a person with the following characteristics:

  Input: "${inputText}"
  Dietary Restrictions: ${dietaryRestrictions}
  Food Allergies: ${foodAllergies}
  Health Goals: ${healthGoals}
  Potential Nutritional Deficiencies: ${nutritionalDeficiencies}

  Based on this information, provide personalized nutritional advice, recipe suggestions, or answer their question. Ensure to strictly avoid any foods listed in the Food Allergies.`;

  console.log("Generated prompt:", prompt);
  return prompt;
}
  

function postProcessModelOutput(modelOutput) {
  // Remove any incomplete sentences at the end
  const lastSentenceEnd = modelOutput.lastIndexOf('.');
  return modelOutput.substring(0, lastSentenceEnd + 1).trim();
}