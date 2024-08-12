# Chef/Nutritionist Chatbot Web App

This project is a collaborative effort between three developers to create a web application that integrates Firebase Authentication, Firestore, and OpenAI's API to deliver a personalized chatbot experience focused on dietary and nutritional guidance. The app allows users to sign up or log in, set dietary preferences, and interact with a chatbot that offers personalized recommendations based on these preferences.

## Features

- **User Authentication:** 
  - Secure sign-up and login using Google or email.
  - Users' credentials and preferences are securely stored using Firebase Authentication.

- **User Preferences:** 
  - Set and update dietary restrictions, allergies, and health goals.
  - Customize the chatbot's recommendations based on these preferences.

- **Chatbot Interaction:** 
  - Engage in a conversation with a personalized chatbot.
  - Receive tailored dietary advice, meal suggestions, and nutritional information.
  - The chatbot leverages the OpenAI API to generate responses.

- **Chat History:** 
  - View past interactions with the chatbot.
  - Option to delete specific entries or clear the entire chat history.

- **Dark Mode:** 
  - Toggle between light and dark modes for a comfortable user experience.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend:**
  - [Firebase Authentication](https://firebase.google.com/products/auth)
  - [Firestore Database](https://firebase.google.com/products/firestore)

- **API:**
  - [OpenRouter API](https://openrouter.ai/models/meta-llama/llama-3.1-8b-instruct:free)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/chef-nutritionist-chatbot.git
cd chef-nutritionist-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

- Create a Firebase project.
- Enable Firebase Authentication (Google and Email/Password) and Firestore.
- Add your Firebase configuration to a `.env.local` file in the root directory:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Set Up Openrouter

- Obtain your Openrouter API key.
- Add your Openrouter configuration to the `.env.local` file:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_openrouter_api_key
```

### 5. Run the Development Server

```bash
npm run dev
```

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- **`components/`**: Contains reusable React components.
- **`pages/`**: Contains Next.js pages for routing.
- **`firebase.js`**: Firebase configuration and initialization.
- **`ChatBotLogic.js`**: Logic for interacting with the OpenAI API.
- **`styles/`**: Contains global styles and Tailwind CSS configuration.

## Key Files

- **`page.js`**: Main page component handling user authentication and routing.
- **`LoginForm.js`**: Component for user login and signup.
- **`ChatMessage.js`**: Component for displaying chat messages.
- **`CheckList.js`**: Component for setting user preferences.
- **`Navbar.js`**: Navigation bar component.
- **`History.js`**: Component for displaying chat history.
- **`Home.js`**: Home page component with chat interface and preferences.
- **`ChatBotLogic.js`**: Functions for handling chatbot logic and OpenAI API interaction.

## Usage

After setting up the application, users can sign up or log in to their accounts, set their dietary preferences, and interact with the chatbot to receive personalized nutritional advice. The chatbot's responses are based on the user’s dietary information, making each interaction unique and tailored to the user's needs.

## Contribution

This project was a collaborative effort between three developers. We worked together to create a seamless user experience that integrates cutting-edge technologies to provide users with a personalized nutritional assistant.

  - [Aayush Koirala](https://www.linkedin.com/in/aayush-koirala-aa3a46222/)
  - [Aman Chhetri](https://www.linkedin.com/in/aman-chh/)
  - [Muhammad Bilal](https://www.linkedin.com/in/muhammad-bilal-221609231/)
