import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const CACHE_NAME = 'space-assets-cache-v2'; // Changed cache name to force refresh

async function preloadAssetsWithCache(assets, onProgress) {
  let loaded = 0;
  const totalAssets = assets.length;
  
  // Early exit if no assets
  if (totalAssets === 0) {
    onProgress(100);
    return Promise.resolve();
  }
  
  let cache;
  let cachedUrls = [];
  
  try {
    // Check if cache API is available (with Safari fallback)
    if ('caches' in window) {
      cache = await caches.open(CACHE_NAME);
      cachedUrls = await cache.keys().then(keys => keys.map(k => k.url));
    }
  } catch (error) {
    console.warn("Cache API not available or failed:", error);
  }

  const updateProgress = () => {
    loaded++;
    onProgress(Math.floor((loaded / totalAssets) * 100));
  };

  if (cache) {
    const cachedCount = assets.filter(asset => cachedUrls.includes(asset.src)).length;
    // Immediately report cached assets as loaded
    for (let i = 0; i < cachedCount; i++) {
      updateProgress();
    }
  
    const uncachedAssets = assets.filter(asset => !cachedUrls.includes(asset.src));
    
    if (uncachedAssets.length === 0) {
      return Promise.resolve();
    }
    
    return Promise.all(uncachedAssets.map(loadAsset));
  } else {
    // Fallback without cache
    return Promise.all(assets.map(loadAsset));
  }
  
  function loadAsset(asset) {
    return new Promise((resolve) => {
      if (asset.type === "image") {
        const img = new Image();
        img.src = asset.src;
        img.onload = () => {
          try {
            if (cache) {
              cache.add(asset.src).catch(() => {});
            }
          } catch (e) {
            console.warn("Failed to cache image", e);
          }
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          updateProgress();
          resolve();
        };
      } else if (asset.type === "audio") {
        const audio = new Audio();
        audio.src = asset.src;
        audio.onloadeddata = () => {
          try {
            if (cache) {
              cache.add(asset.src).catch(() => {});
            }
          } catch (e) {
            console.warn("Failed to cache audio", e);
          }
          updateProgress();
          resolve();
        };
        audio.onerror = () => {
          updateProgress();
          resolve();
        };
      } else {
        // For other types, just fetch and don't worry about caching
        fetch(asset.src, { 
          method: 'GET', 
          cache: 'force-cache',
          credentials: 'same-origin'
        })
          .catch(() => {})
          .finally(() => {
            updateProgress();
            resolve();
          });
      }
    });
  }
}

export default function SpaceLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [userTriggeredExit, setUserTriggeredExit] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const starsRef = useRef(null);
  const orbitRef = useRef(null);
  const planetRef = useRef(null);
  const satelliteRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressValueRef = useRef(null);
  const promptRef = useRef(null);
  const loadingTextRef = useRef(null);
  const gsapAnimations = useRef([]);
  const [promptText, setPromptText] = useState("PRESS SPACE TO LAUNCH");

  const assets = [
    { type: "other", src: "/models/spaceship.glb" },
    { type: "other", src: "/models/logo.gltf" },
    { type: "other", src: "/videos/asteroid-dust.webm" },
    { type: "other", src: "/videos/asteroid.webm" },
    { type: "other", src: "/videos/asteroid-planet.webm" },
    { type: "image", src: "/images/rock.png" },
    { type: "image", src: "/images/stars-gif.webp" },
    { type: "image", src: "/images/terrain.png" },
    { type: "audio", src: "/sounds/woof.mp3" },
    { type: "audio", src: "/sounds/reveal.mp3" },
  ];

  useEffect(() => {
    // Check if mobile
    setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const handleProgressUpdate = (value) => {
    setProgress(value);
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${value}%`,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
    if (progressValueRef.current) {
      gsap.to(progressValueRef.current, {
        textContent: value,
        duration: 0.3,
        snap: { textContent: 1 },
        ease: "power1.inOut",
      });
    }
  };

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    setIsReady(true);
    
    if (loadingTextRef.current) {
      gsap.to(loadingTextRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loadingTextRef.current) {
            loadingTextRef.current.textContent = "INITIALIZATION COMPLETE";
            gsap.to(loadingTextRef.current, {
              opacity: 1,
              duration: 0.5
            });
          }
        }
      });
    }
    
    if (promptRef.current) {
      const promptAnimation = gsap.to(promptRef.current, {
        opacity: 1, 
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5
      });
      
      const blinkAnimation = gsap.to(promptRef.current, {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.3
      });
      
      gsapAnimations.current.push(promptAnimation, blinkAnimation);
    }
  };

  const handleUserExit = () => {
    if (userTriggeredExit) return;
    
    setUserTriggeredExit(true);
    
    gsapAnimations.current.forEach(animation => {
      if (animation && animation.kill) animation.kill();
    });
    
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
          
          if (starsRef.current) {
            while (starsRef.current.firstChild) {
              starsRef.current.removeChild(starsRef.current.firstChild);
            }
          }
        }
        
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      },
    });
  };

  useEffect(() => {
    if (starsRef.current) {
      const createStarLayer = (count, size, speed, opacity) => {
        const layer = document.createElement('div');
        layer.className = 'absolute inset-0';
        
        for (let i = 0; i < count; i++) {
          const star = document.createElement('div');
          star.className = 'absolute rounded-full bg-white';
          const starSize = Math.random() * size + 1;
          star.style.width = `${starSize}px`;
          star.style.height = `${starSize}px`;
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.opacity = Math.random() * opacity;
          
          const drift = gsap.to(star, {
            x: `${(Math.random() - 0.5) * 20}px`,
            y: `${(Math.random() - 0.5) * 20}px`,
            duration: 10 + Math.random() * 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          
          const twinkle = gsap.to(star, {
            opacity: Math.random() * opacity * 0.7 + 0.3 * opacity,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          
          gsapAnimations.current.push(drift, twinkle);
          layer.appendChild(star);
        }
        
        starsRef.current.appendChild(layer);
      };
      
      createStarLayer(60, 1.5, 0.2, 0.6);
      createStarLayer(40, 2.5, 0.4, 0.8);
      createStarLayer(20, 3, 0.7, 1);
    }
    
    if (orbitRef.current && satelliteRef.current && planetRef.current) {
      const planetAnimation = gsap.to(planetRef.current, {
        y: "8px",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      const orbitAnimation = gsap.to(satelliteRef.current, {
        rotation: 360,
        transformOrigin: "center",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
      
      gsapAnimations.current.push(planetAnimation, orbitAnimation);
    }
    
    // Add timeout fallback in case loading stalls
    const loadingTimeout = setTimeout(() => {
      if (progress < 100) {
        console.warn("Loading timeout reached - forcing completion");
        handleLoadingComplete();
      }
    }, 15000); // 15 second timeout
    
    preloadAssetsWithCache(assets, handleProgressUpdate)
      .then(() => {
        clearTimeout(loadingTimeout);
        handleLoadingComplete();
      })
      .catch(error => {
        clearTimeout(loadingTimeout);
        console.error("Error preloading assets:", error);
        handleLoadingComplete();
      });
    
    const handleKeyDown = (e) => {
      if ((e.code === "Space" || e.key === " ") && isReady && !userTriggeredExit) {
        e.preventDefault();
        handleUserExit();
      }
    };
    
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const distance = touchStartY - touchEndY;
      const duration = touchEndTime - touchStartTime;
      
      // Check for significant upward swipe (more than 50px) that was quick (less than 500ms)
      if (distance > 50 && duration < 500 && isReady && !userTriggeredExit) {
        handleUserExit();
      }
    };
    
    const handleClick = (e) => {
      if (isReady && !userTriggeredExit) {
        handleUserExit();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    if (containerRef.current) {
      containerRef.current.addEventListener("click", handleClick);
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", handleClick);
      }
      
      clearTimeout(loadingTimeout);
      gsapAnimations.current.forEach(animation => {
        if (animation && animation.kill) animation.kill();
      });
      
      if (starsRef.current) {
        while (starsRef.current.firstChild) {
          starsRef.current.removeChild(starsRef.current.firstChild);
        }
      }
    };
  }, [isReady, userTriggeredExit]);
  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      setPromptText("SWIPE UP");
    }
  }, []);
  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center z-[999] select-none overflow-hidden touch-none"
      style={{ pointerEvents: isReady ? "auto" : "none" }}
    >
      <div ref={starsRef} className="absolute inset-0" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="relative w-48 h-48 mx-auto mb-12">
          <div 
            ref={planetRef}
            className="absolute w-24 h-24 bg-blue-900 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.5), inset -5px -5px 20px rgba(0, 0, 0, 0.6), inset 5px 5px 20px rgba(148, 163, 184, 0.3)",
              background: "radial-gradient(circle at 35% 35%, #3b82f6, #1e3a8a)"
            }}
          />
          
          <div 
            ref={orbitRef}
            className="absolute w-full h-full rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              border: "1px solid rgba(148, 163, 184, 0.2)",
              boxShadow: "0 0 10px rgba(148, 163, 184, 0.1)"
            }}
          />
          
          <div 
            ref={satelliteRef} 
            className="absolute w-full h-full left-0 top-0"
          >
            <div 
              className="absolute w-4 h-4 bg-gray-200 rounded-full"
              style={{ 
                top: "0", 
                left: "calc(50% - 8px)",
                boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
            />
          </div>
        </div>
        
        <div className="px-6">
          <h2 
            ref={loadingTextRef}
            className="text-lg font-light tracking-widest text-center mb-6 text-blue-100"
          >
            SYSTEM INITIALIZATION
          </h2>
          
          <div className="relative h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono text-blue-300 mb-10">
            <div>LOADING ASSETS</div>
            <div>
              <span ref={progressValueRef}>{progress}</span>
              <span>%</span>
            </div>
          </div>
        </div>
      </div>

      <div
          ref={promptRef}
          className="absolute bottom-20 text-center font-light tracking-wider text-blue-100 opacity-0"
      >

        {isMobile ? "SWIPE UP TO CONTINUE" : "PRESS SPACE TO LAUNCH"}

      </div>
    </div>
  );
}