import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase";
import Navbar from "./Navbar";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import logo from "../../../public/assets/logoK.png";
import moonIcon from "./moon.svg";
import sunIcon from "./sun.svg";
import CheckList from "./CheckList";
import History from "./History";
import { handleAsk } from "./chatbotLogic";
import LoadingAnimation from "./LoadingAnimation";

export default function Home({ user, onLogout }) {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [showCheckList, setShowCheckList] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    selectedRestrictions: [],
    selectedAllergies: [],
    selectedGoals: [],
  });

  useEffect(() => {
    console.log("Home component mounted");
    if (user) {
      // Fetch the chat history from Firestore when the component mounts
      fetchChatHistory();
    }
  }, [user]);

  const fetchChatHistory = async () => {
    try {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setChatHistory(docSnap.data().chatHistory || []);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  const toggleChecklist = () => {
    setShowCheckList(!showCheckList);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting with preferences:", preferences);
      const result = await handleAsk(inputText, preferences);
      setResponse(result);

      const newEntry = {
        date: new Date(),
        question: inputText,
        answer: result,
      };

      // Add to chat history
      setChatHistory((prevHistory) => [newEntry, ...prevHistory]);

      // Save the new chat entry to Firestore
      const docRef = doc(firestore, "users", user.uid);
      await updateDoc(docRef, {
        chatHistory: arrayUnion(newEntry),
      });

      setInputText("");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError("An error occurred while processing your request.");
    }finally{
      setLoading(false)
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePreferencesSubmit = (data) => {
    setPreferences(data);
    console.log("Preferences updated in Home component:", data);
  };

  const handleDelete = async (item) => {
    const docRef = doc(firestore, 'users', user.uid)
    try {
      await updateDoc(docRef, {
        chatHistory: []
      });
      fetchChatHistory()
      console.log('chatHistory deleted successfully');
    } catch (error) {
      console.error('Error deleting field: ', error);
    }
    
  };

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar onLogout={onLogout} />
      <div className="flex justify-end p-4">
        <button onClick={toggleDarkMode} className="focus:outline-none">
          <Image
            src={isDarkMode ? moonIcon : sunIcon}
            alt={isDarkMode ? "Dark Mode" : "Light Mode"}
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl font-bold mb-8">
            Hello, {user?.email || "Guest"}! I'm Krrish, your chef and
            nutritionist chatbot
          </h1>
          <div className="flex justify-center mb-8">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold">What's on your mind?</h2>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me anything about nutrition or recipes..."
              className={`w-full p-4 text-lg ${
                isDarkMode
                  ? "text-gray-100 bg-gray-800 border-gray-600"
                  : "text-gray-900 bg-gray-100 border-gray-300"
              } rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-md`}
              rows={3}
              style={{
                minHeight: "6rem",
                maxHeight: "12rem",
                overflowY: "auto",
              }}
            />
            <div className="flex justify-between w-full">
              <button
                onClick={toggleChecklist}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Set Preferences
              </button>
              <button
                onClick={()=>{
                  handleSubmit()
                  setLoading(true)
                }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Ask
              </button>
            </div>
          </div>
          {loading && (<LoadingAnimation/>)}
          {response && (
            <div
              className={`mt-8 p-6 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-200 text-black"
              } shadow-xl`}
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                Krrish's Response:
              </h3>
              <div className="text-left text-lg">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
      {showCheckList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-8 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } max-w-2xl w-full`}
          >
            <CheckList
              toggleFunction={toggleChecklist}
              handleSubmit={handlePreferencesSubmit}
              initialPreferences={preferences}
            />
          </div>
        </div>
      )}
      <History chatHistory={chatHistory} deleteHistoryFunction={handleDelete}/>
    </div>
  );
}
