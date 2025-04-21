import React, { useState } from 'react';
import { clsx } from 'clsx';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border-b border-zinc-700">
      <button
        className="w-full py-5 px-4 flex justify-between items-center focus:outline-none group"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className={clsx(isOpen && 'border-b border-zinc-700', 'w-full text-left')}>
          <span className="text-lg font-semibold text-zinc-100 mb-3 pt-4 block">
            {question}
          </span>
        </div>

        {/* Icon - assuming you're using Remix Icons */}
        <span
          className={clsx(
            isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
            'text-2xl w-5 h-5 text-zinc-400 transition-all duration-300'
          )}
        />
      </button>

      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 pt-0 pb-5 text-white">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
