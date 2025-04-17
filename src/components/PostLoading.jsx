import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Power, Shield, Wifi, Activity, Zap } from 'lucide-react';
import gsap from 'gsap';
import SpaceShipModel from '@/models/SpaceShipModel';

export default function PostLoading() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [shields, setShields] = useState(85);
  const [power, setPower] = useState(92);
  const [systemStatus, setSystemStatus] = useState("STANDBY");
  const [targetLocked, setTargetLocked] = useState(false);
  
  const hudRef = useRef(null);
  const centerHudRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const scanLineRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(hudRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    );
    
    tl.fromTo(centerHudRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    tl.fromTo([leftPanelRef.current, rightPanelRef.current], 
      { x: (i) => i === 0 ? -50 : 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out" }
    );
    
    tl.fromTo(bottomPanelRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out" }
    );
    
    gsap.to(scanLineRef.current, {
      y: "100%", 
      duration: 4, 
      repeat: -1, 
      ease: "none",
      yoyo: true
    });
    
    const elements = document.querySelectorAll('.blink-slow');
    elements.forEach(el => {
      gsap.to(el, {
        opacity: 0.4,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    const randomizeGauges = () => {
      setShields(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setPower(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 3)));
    };
    
    const gaugeInterval = setInterval(randomizeGauges, 2000);
    
    return () => clearInterval(gaugeInterval);
  }, []);
  
  const toggleMute = () => {
    setMuted(prev => !prev);
    
    gsap.fromTo(
      ".mute-button", 
      { scale: 0.8 }, 
      { scale: 1, duration: 0.3, ease: "back.out" }
    );
  };
  
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  
  const enterWebsite = () => {
    setSystemStatus("INITIALIZING");
    
    const tl = gsap.timeline();
    
    tl.to(".enter-button", {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.in"
    });
    
    tl.to(".enter-button", {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
    
    tl.to(hudRef.current, {
      filter: "brightness(1.5)",
      duration: 0.3,
      yoyo: true,
      repeat: 3
    });
    
    tl.call(() => setSystemStatus("ACTIVATED"));
    
    setTimeout(() => {
      setTargetLocked(true);
    }, 3000);
  };

  return (
    <div 
      ref={hudRef}
      className="relative w-full h-screen bg-transparent text-blue-neon font-mono overflow-hidden flex items-center justify-center"
    >
      <div 
        ref={scanLineRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-neon to-transparent opacity-5 z-10 pointer-events-none"
        style={{ transform: 'translateY(-100%)' }}
      ></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,200,100,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <div 
        ref={leftPanelRef}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-start gap-6 border-l-2 border-blue-neon pl-3"
      >
        <div className="flex flex-col">
          <div className="text-xs mb-1">POWER SYSTEMS</div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="blink-slow" />
            <div className="w-32 h-3 bg-surface-alt relative">
              <div 
                className="h-full bg-blue-neon"
                style={{ width: `${power}%` }}
              ></div>
            </div>
            <span className="text-sm">{Math.round(power)}%</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-xs mb-1">SHIELD STATUS</div>
          <div className="flex items-center gap-2">
            <Shield size={18} className={shields < 80 ? "text-yellow-500" : ""} />
            <div className="w-32 h-3 bg-surface-alt relative">
              <div 
                className={`h-full ${shields < 80 ? "bg-yellow-500" : "bg-blue-neon"}`}
                style={{ width: `${shields}%` }}
              ></div>
            </div>
            <span className="text-sm">{Math.round(shields)}%</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-xs mb-1">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <Activity size={18} className={systemStatus === "ACTIVATED" ? "text-blue-neon blink-slow" : ""} />
            <span className="text-sm">{systemStatus}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-xs mb-1">NETWORK</div>
          <div className="flex items-center gap-2">
            <Wifi size={18} className="blink-slow" />
            <span className="text-sm">CONNECTED</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={centerHudRef}
        className="relative w-2/3 h-2/3 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="w-8 h-px bg-blue-neon"></div>
              <div className="rotate-45 text-xl mx-2">∧</div>
              <div className="w-8 h-px bg-blue-neon"></div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="w-8 h-px bg-blue-neon"></div>
              <div className="rotate-225 text-xl mx-2">∧</div>
              <div className="w-8 h-px bg-blue-neon"></div>
            </div>
            
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <div className="h-8 w-px bg-blue-neon"></div>
              <div className="rotate-90 text-xl my-2">&lt;</div>
              <div className="h-8 w-px bg-blue-neon"></div>
            </div>
            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
              <div className="h-8 w-px bg-blue-neon"></div>
              <div className="rotate-270 text-xl my-2">&gt;</div>
              <div className="h-8 w-px bg-blue-neon"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute flex items-center justify-center pointer-events-none">
          <div className="relative w-24 h-24">
            <div className="absolute left-1/2 top-0 w-px h-8 bg-blue-neon transform -translate-x-1/2"></div>
            <div className="absolute left-1/2 bottom-0 w-px h-8 bg-blue-neon transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 h-px w-8 bg-blue-neon transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 h-px w-8 bg-blue-neon transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-1/2 w-4 h-4 border-2 border-blue-neon rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          </div>
        </div>
        
        <div className="absolute left-16 top-1/2 transform -translate-y-1/2 flex flex-col items-end pointer-events-none">
          <div className="text-xs">240</div>
          <div className="text-xs my-2">220</div>
          <div className="text-xs">200</div>
          <div className="h-16 w-2 bg-blue-neon bg-opacity-20 relative mt-2">
            <div className="absolute bottom-0 w-full bg-blue-neon" style={{height: '70%'}}></div>
          </div>
          <div className="text-xs mt-2">180</div>
          <div className="text-xs">160</div>
        </div>
        
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="text-xs mb-1 text-center">SPEED</div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-xs">5</div>
            <div className="w-16 h-1 bg-blue-neon"></div>
            <div className="rotate-45 text-xl blink-slow">∧</div>
            <div className="w-16 h-1 bg-blue-neon"></div>
            <div className="text-xs">10</div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center pointer-events-none">
          <div className="text-xs mr-4">08</div>
          <div className="w-16 h-1 bg-blue-neon"></div>
          <div className="mx-2 flex items-center">
            <div>&gt;=O=&lt;</div>
          </div>
          <div className="w-16 h-1 bg-blue-neon"></div>
          <div className="text-xs ml-4">09</div>
        </div>
        
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col items-start pointer-events-none">
          <div className="text-xs">045</div>
          <div className="h-16 w-2 bg-blue-neon bg-opacity-20 relative mt-2">
            <div className="absolute bottom-0 w-full bg-blue-neon" style={{height: '40%'}}></div>
          </div>
          <div className="text-xs mt-2">035</div>
        </div>
        
        <div className="absolute top-6 right-16 pointer-events-none">
          <div className="text-xs mb-1">A/THR</div>
          <div className="text-xs">40 ON</div>
          <div className="text-xs blink-slow">100</div>
        </div>
        
        <div className="absolute bottom-0 left-0 text-xs pointer-events-none">
          <div>VOR1</div>
          <div>CRL</div>
          <div>5.4 NM</div>
        </div>
        
        <div className="absolute bottom-0 right-0 text-xs pointer-events-none">
          <div className="blink-slow">QNH 1002</div>
        </div>
        
        {targetLocked && (
          <div className="absolute flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border border-red-500 rounded-full animate-pulse"></div>
            <div className="absolute text-red-500 text-xs">TARGET LOCKED</div>
          </div>
        )}
      </div>
      
      <div 
        ref={rightPanelRef}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-end gap-6 border-r-2 border-blue-neon pr-3"
      >
        <div className="flex flex-col items-end">
          <div className="text-xs mb-1">AUDIO SYSTEMS</div>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={handleVolumeChange}
              className="w-32 accent-blue-neon"
              disabled={muted}
            />
            <button 
              onClick={toggleMute} 
              className="mute-button flex items-center justify-center w-8 h-8 bg-surface-alt hover:bg-surface-alt rounded-sm transition-all"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
          <div className="text-xs mt-1">{muted ? "MUTED" : `VOL: ${volume}%`}</div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs mb-1">POWER CONTROL</div>
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-alt hover:bg-surface-alt border border-blue-neon transition-all"
          >
            <Power size={20} className="text-blue-neon" />
          </button>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs mb-1">COORDINATES</div>
          <div className="text-sm">LAT: 34°22'15"N</div>
          <div className="text-sm">LON: 127°18'40"W</div>
          <div className="text-sm blink-slow">ALT: 12,450 FT</div>
        </div>
      </div>
      
      <div 
        ref={bottomPanelRef}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="text-xs mb-2">SYSTEM ACCESS</div>
        <button 
          onClick={enterWebsite}
          className="enter-button flex items-center justify-center bg-surface-alt border border-blue-neon px-8 py-2 hover:bg-surface-alt transition-all"
        >
          <span className="text-sm mr-2">INITIALIZE SEQUENCE</span>
          <div className="w-4 h-4 bg-blue-neon animate-pulse rounded-full"></div>
        </button>
        <div className="text-xs mt-2 blink-slow">{"<"} PRESS TO ENTER {">"}</div>
      </div>
    </div>
  );
}
