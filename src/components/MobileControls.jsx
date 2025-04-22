import React, { useState, useEffect } from "react";
import { mobileControlEvents } from "./useControls";

export const MobileControls = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                 ("ontouchstart" in window) ||
                 (navigator.maxTouchPoints > 0));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  if (!isMobile) return null;
  
  const handleTouchStart = (action) => {
    mobileControlEvents.dispatch(action, true);
  };
  
  const handleTouchEnd = (action) => {
    mobileControlEvents.dispatch(action, false);
  };
  
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center">
      {/* Left controls - Steering */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <button 
            className="bg-gray-800 text-white p-4 rounded-full opacity-60 text-lg"
            onTouchStart={() => handleTouchStart('steerLeft')}
            onTouchEnd={() => handleTouchEnd('steerLeft')}
          >
            ◀
          </button>
          <button 
            className="bg-gray-800 text-white p-4 rounded-full opacity-60 text-lg"
            onTouchStart={() => handleTouchStart('steerRight')}
            onTouchEnd={() => handleTouchEnd('steerRight')}
          >
            ▶
          </button>
        </div>
        <button 
          className="bg-yellow-600 text-white p-2 rounded-md opacity-60 text-sm"
          onTouchStart={() => handleTouchStart('reset')}
          onTouchEnd={() => handleTouchEnd('reset')}
        >
          RESET
        </button>
      </div>
      
      {/* Right controls - Acceleration */}
      <div className="flex gap-4">
        <button 
          className="bg-red-600 text-white p-4 rounded-full opacity-60 text-lg"
          onTouchStart={() => handleTouchStart('brake')}
          onTouchEnd={() => handleTouchEnd('brake')}
        >
          ▼
        </button>
        <button 
          className="bg-green-600 text-white p-4 rounded-full opacity-60 text-lg"
          onTouchStart={() => handleTouchStart('accelerate')}
          onTouchEnd={() => handleTouchEnd('accelerate')}
        >
          ▲
        </button>
      </div>
      
      {/* Camera toggle button */}
      <button 
        className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-md opacity-60"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }))}
      >
        📷
      </button>
    </div>
  );
};