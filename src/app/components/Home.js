import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import logo from '../../../public/assets/logoK.png';
import { handleAsk } from './chatbotLogic';

export default function Home({ user, onLogout }) {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await handleAsk(inputText);
      setResponse(result);
      setInputText('');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('An error occurred while processing your request.');
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
            Hello! I'm Krrish, your chef and nutritionist chatbot
          </h1>
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="logo"
              width={256}
              height={256}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">What's on your mind?</h2>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me anything about nutrition or recipes..."
              className="w-full p-4 text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none shadow-md bg-gray-100"
              rows={2}
              style={{ minHeight: '3rem', maxHeight: '150px', overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-3 shadow-lg"
            >
              Ask
            </button>
          </div>
          {response && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Krrish's Response:</h3>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
