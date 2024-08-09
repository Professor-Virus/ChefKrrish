import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This should be set in your environment variables
});

export async function handleAsk(inputText) {
    try {
        // Retrieve relevant information from the user
        const userData = retrieveUserData(inputText);
        // Augment the retrieved information with additional data
        const augmentedData = augmentUserData(userData);
        // Generate personalized recommendations using OpenAI
        const generatedText = await generateText(inputText, augmentedData);
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
function retrieveUserData(inputText) {
  return {
    dietaryRestrictions: parseDietaryRestrictions(inputText),
    foodAllergies: parseFoodAllergies(inputText),
    healthGoals: parseHealthGoals(inputText),
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
  return {
    foodPreferences: analyzeFoodPreferences(userData),
    nutritionalDeficiencies: analyzeNutritionalDeficiencies(userData),
    healthTrends: analyzeHealthTrends(userData),
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
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });
  
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
  return `As a chef and personal nutritionist, please provide advice for a person with the following characteristics:
  
  Input: "${inputText}"
  Dietary Restrictions: ${augmentedData.foodPreferences.join(', ')}
  Food Allergies: ${augmentedData.foodAllergies.join(', ')}
  Health Goals: ${augmentedData.healthTrends.join(', ')}
  Potential Nutritional Deficiencies: ${augmentedData.nutritionalDeficiencies.join(', ')}
  
  Based on this information, provide personalized nutritional advice, recipe suggestions, or answer their question.`;
}

function postProcessModelOutput(modelOutput) {
  // Remove any incomplete sentences at the end
  const lastSentenceEnd = modelOutput.lastIndexOf('.');
  return modelOutput.substring(0, lastSentenceEnd + 1).trim();
}