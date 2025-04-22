import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { mobileControlEvents } from "./useControls";
import { Physics } from "@react-three/cannon";

export function GameWrapper() {
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

  return (
    <div className="relative w-full h-full">
      {/* Three.js Canvas */}
      <Canvas>
        <Physics
          broadphase="SAP"
          gravity={[0, -2.6, 0]}
        >
          <Scene />
        </Physics>  
      </Canvas>
      
      {/* Mobile Controls - Outside of Canvas */}
      {isMobile && <MobileControls />}
    </div>
  );
}

// Separate component for mobile controls
function MobileControls() {
  // Improved touch event handlers with proper preventDefault
  const handleTouchStart = (e, action) => {
    mobileControlEvents.dispatch(action, true);
  };
  
  const handleTouchEnd = (e, action) => {
    mobileControlEvents.dispatch(action, false);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center z-10"
      onContextMenu={preventDefault}
    >
      {/* Left controls - Steering */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <button 
            className="bg-gray-800 text-white p-4 rounded-full opacity-60 text-lg"
            onTouchStart={(e) => handleTouchStart(e, 'steerLeft')}
            onTouchEnd={(e) => handleTouchEnd(e, 'steerLeft')}
            onTouchCancel={(e) => handleTouchEnd(e, 'steerLeft')}
          >
            ◀
          </button>
          <button 
            className="bg-gray-800 text-white p-4 rounded-full opacity-60 text-lg"
            onTouchStart={(e) => handleTouchStart(e, 'steerRight')}
            onTouchEnd={(e) => handleTouchEnd(e, 'steerRight')}
            onTouchCancel={(e) => handleTouchEnd(e, 'steerRight')}
          >
            ▶
          </button>
        </div>
      </div>

      <div>
        <button 
          className="bg-yellow-600 text-white p-2 rounded-md opacity-60 text-sm"
          onTouchStart={(e) => handleTouchStart(e, 'reset')}
          onTouchEnd={(e) => handleTouchEnd(e, 'reset')}
          onTouchCancel={(e) => handleTouchEnd(e, 'reset')}
        >
          RESET
        </button>
      </div>
      
      {/* Right controls - Acceleration */}
      <div className="flex gap-4">
        <button 
          className="bg-red-600 text-white p-4 rounded-full opacity-60 text-lg"
          onTouchStart={(e) => handleTouchStart(e, 'brake')}
          onTouchEnd={(e) => handleTouchEnd(e, 'brake')}
          onTouchCancel={(e) => handleTouchEnd(e, 'brake')}
        >
          ▼
        </button>
        <button 
          className="bg-green-600 text-white p-4 rounded-full opacity-60 text-lg"
          onTouchStart={(e) => handleTouchStart(e, 'accelerate')}
          onTouchEnd={(e) => handleTouchEnd(e, 'accelerate')}
          onTouchCancel={(e) => handleTouchEnd(e, 'accelerate')}
        >
          ▲
        </button>
      </div>
    </div>
  );
}