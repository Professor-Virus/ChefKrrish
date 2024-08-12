// History.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Timestamp } from 'firebase/firestore';

const HistoryItem = ({ date, question, answer, isDarkMode }) => {
  let formattedDate;
  const [isOpen, setIsOpen] = useState(false);
  if(date instanceof Date){
    formattedDate = date.toLocaleString()
  }else if (date instanceof Timestamp){
    formattedDate = date.toDate().toLocaleString()
  }

  return (
    <motion.div
      className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-2`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className={`w-full text-left font-semibold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {formattedDate} - {question.substring(0, 50)}...
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-bold text-xl`}>{question}</p>
            <div className="text-left text-base">
            <p className={`mt-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}><ReactMarkdown>{answer}</ReactMarkdown></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const History = ({ chatHistory, deleteHistoryFunction, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-4 mt-4`}>
      <div className='flex justify-between'>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Chat History</h2>
        <button className='px-2 py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
        onClick={deleteHistoryFunction}
        >Delete History
        </button>
      </div>
      <motion.div layout>
        {chatHistory.map((item, index) => (
          <HistoryItem key={index} {...item} isDarkMode={isDarkMode} />
        ))}
      </motion.div>
    </div>
  );
};

export default History;