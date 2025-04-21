import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="border-b border-gray-800 pb-4">
      <button
        className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </span>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300 pb-4">{answer}</p>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const faqItems = [
    {
      question: "What is Vidyut?",
      answer: "Vidyut is India's largest national-level inter-collegiate Multifest hosted at Amrita Vishwa Vidyapeetham, Amritapuri Campus. It's a 3-day event packed with workshops, competitions, and cultural showcases."
    },
    {
      question: "When is Vidyut?",
      answer: "Vidyut '25 is scheduled for May 23, 24 & 25, 2025."
    },
    {
      question: "Where is Vidyut '25 held?",
      answer: "At Amrita Vishwa Vidyapeetham, Amritapuri Campus, Clappana PO, Kollam, Kerala."
    },
    {
      question: "Can anyone participate?",
      answer: "Yes, students from across the country can register and participate in various events."
    },
  ];
  return (
    <div className="space-y-2">
      {faqItems.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};