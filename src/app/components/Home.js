import React from 'react';
import Navbar from './Navbar';
import logo from '../../../public/assets/logoK.png';

export default function Home({ user, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar onLogout={onLogout} />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user.email}!</h1>
          <p className="text-xl mb-4">I'm Krrish, your chatbot!</p>
          <img 
            src={logo} 
            alt="logo" 
            className="w-32 h-32 rounded-full shadow-lg mb-4 justify-center snap-center" 
          />
        </div>
      </div>
    </div>
  );
}