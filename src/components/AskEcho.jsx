import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const AskEcho = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the AI prompt submission
    console.log('Question submitted:', question);
    // Reset the input field
    setQuestion('');
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <p className="text-gray-300 mb-4">
        Have a question? Ask Echo, our AI assistant, and get instant answers.
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-300"
          aria-label="Send question"
        >
          <Send size={20} />
        </button>
      </form>
      <div className="mt-4 text-xs text-gray-400">
        Powered by Echo AI. Your data is secure and private.
      </div>
    </div>
  );
};