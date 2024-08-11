import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import logo from '../../../public/assets/logoK.png';
import moonIcon from './moon.svg';
import sunIcon from './sun.svg';
import CheckList from './CheckList';
import { handleAsk } from './chatbotLogic';

export default function Home({ user, onLogout }) {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [showCheckList, setShowCheckList] = useState(false);
  const [submittedData, setSubmittedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to handle data from child component
  const handleDataSubmit = (data) => {
    setSubmittedData(data);
    console.log("Data received from child:", data);
  };

  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  useEffect(() => {
    console.log(submittedData);
  }, [submittedData]);

  const toggleChecklist = () => {
    setShowCheckList(!showCheckList);
  };

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-white text-black'}`}>
      <Navbar onLogout={onLogout} />
      <div className="flex justify-end p-4">
        <button onClick={toggleDarkMode} className="focus:outline-none">
          <Image
            src={isDarkMode ? moonIcon : sunIcon}
            alt={isDarkMode ? 'Dark Mode' : 'Light Mode'}
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            Hello, {user?.email || "Guest"}! I'm Krrish, your chef and nutritionist chatbot
          </h1>
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="logo"
              width={256}
              height={256}
              className="rounded-full shadow-lg"
            />
            {showCheckList && (
              <CheckList 
                toggleFunction={toggleChecklist}
                handleSubmit={handleDataSubmit}
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">What's on your mind?</h2>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me anything about nutrition or recipes..."
              className={`w-full p-4 text-sm ${isDarkMode ? 'text-gray-100 bg-gray-800 border-gray-600' : 'text-gray-900 bg-gray-100 border-gray-300'} rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none shadow-md`}
              rows={2}
              style={{ minHeight: '3rem', maxHeight: '150px', overflowY: 'auto', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowCheckList(true)}
                className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
              >
                Set Preferences
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-3 shadow-lg"
              >
                Ask
              </button>
            </div>
          </div>
          {response && (
            <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-black'}`}>
              <h3 className="text-xl font-bold mb-4 text-center font-rubik">Krrish's Response:</h3>
              <div className="text-left font-roboto-mono">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}