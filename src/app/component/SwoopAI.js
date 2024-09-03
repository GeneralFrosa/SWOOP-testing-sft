"use client";

import React, { useState } from 'react';

const SwoopAI = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = async () => {
    if (chatInput.trim() !== '') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: chatInput }),
        });

        if (response.ok) {
          const data = await response.json();
          setChatMessages([...chatMessages, data.reply]);
          setChatInput('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-[20px] shadow-lg overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold text-green-500">SWOOP AI</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {/* You can replace this icon with any other you prefer */}
            <span className="text-gray-600">👤</span>
          </div>
        </header>
        <nav className="flex justify-start border-b">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'analysis'
                ? 'text-black border-b-2 border-purple-500'
                : 'text-gray-400'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'chat'
                ? 'text-black border-b-2 border-purple-500'
                : 'text-gray-400'
            }`}
          >
            Chat
          </button>
        </nav>
        <main className="p-4">
          {activeTab === 'analysis' ? (
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-500 animate-pulse">analysing....</p>
            </div>
          ) : (
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <p key={index} className="text-gray-500">
                    {msg}
                  </p>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleSendMessage}
                  className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SwoopAI;
