// ChatMessage.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-3xl py-2 px-4 max-w-xs lg:max-w-md ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {isUser ? (
          <p className="text-sm">{message}</p>
        ) : (
          <div className="text-left text-sm">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;