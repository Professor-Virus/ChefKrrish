import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "../../../public/assets/logoK.png";
import { handleAsk } from "./chatbotLogic";
import CheckList from "./CheckList";

export default function Home({ user, onLogout }) {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [showCheckList, setShowCheckList] = useState(false);
  const [submittedData, setSubmittedData] = useState("");

  // Function to handle data from child component
  // This function is given to checklist and will set our submittedata to the rescrictions
  const handleDataSubmit = (data) => {
    setSubmittedData(data);
    console.log("Data received from child:", data);
  };
  useEffect(()=>console.log(submittedData), [submittedData])

  useEffect(() => {
    // This will help catch any errors during initial render
    console.log("Home component mounted");
  }, []);

  const toggleChecklist = (value) =>{
    setShowCheckList()
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await handleAsk(inputText);
      setResponse(result);
      setInputText("");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError("An error occurred while processing your request.");
    }
  };

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar onLogout={onLogout} />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            Hello, {user?.email || "Guest"}! I'm Krrish, your chef and
            nutritionist chatbot
          </h1>
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="logo"
              width={256}
              height={256}
              className="rounded-full shadow-lg"
            />
            {showCheckList && (<CheckList 
            toggleFunction={() =>toggleChecklist(false)}
            handleSubmit={handleDataSubmit}/>)
            }
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">What's on your mind?</h2>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me anything about nutrition or recipes..."
              className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <div
            className="flex justify-between">
            <button
            onClick={()=>{
              setShowCheckList(true)
            }}
            className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-2">
              Set Preferences
            </button>
            <button
              onClick={handleSubmit}
              className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
            >
              Ask
            </button>
            </div>
          </div>
          {response && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Krrish's Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
