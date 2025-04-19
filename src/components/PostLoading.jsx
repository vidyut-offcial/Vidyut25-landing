import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function preloadAssets(assets, onProgress) {
  let loaded = 0;

  const updateProgress = () => {
    loaded++;
    onProgress(Math.floor((loaded / assets.length) * 100));
  };

  return Promise.all(
    assets.map((asset) => {
      if (asset.type === "image") {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = asset.src;
          img.onload = img.onerror = () => {
            updateProgress();
            resolve();
          };
        });
      } else if (asset.type === "audio") {
        return new Promise((resolve) => {
          const audio = new Audio();
          audio.src = asset.src;
          audio.onloadeddata = () => {
            updateProgress();
            resolve();
          };
          audio.onerror = () => {
            updateProgress();
            resolve();
          };
        });
      } else if (asset.type === "json" || asset.type === "other") {
        return fetch(asset.src)
          .then((res) => res.ok ? res.json() : {})
          .catch(() => {})
          .finally(() => {
            updateProgress();
          });
      } else {
        // fallback
        updateProgress();
        return Promise.resolve();
      }
    })
  );
}


export default function PostLoading({ isPlaying, togglePlayPause, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const promptRef = useRef(null);

  const assets = [
    { type: "other", src: "/models/spaceship.glb" },
    { type: "audio", src: "/audio/woof.mp3" },
    { type: "audio", src: "/audio/reveal.mp3" },
  ];

  useEffect(() => {
    // Initial dot pulse
    const pulse = gsap.to(dotRef.current, {
      scale: 1.4,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });
  
    // Preload assets
    preloadAssets(assets, setProgress).then(() => {
      pulse.kill();
      gsap.to(dotRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setIsReady(true);
          gsap.to(promptRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    });
  
    const handleKeyDown = (e) => {
      if (e.code === "Space" && isReady) completeEntry();
    };
  
    let touchStartY = 0;
  
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
  
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 50 && isReady) {
        // swipe up
        completeEntry();
      }
    };
  
    const completeEntry = () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
          if (onComplete) onComplete();
        },
      });
    };
  
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isReady, onComplete]);  

  return (
    <div
      ref={containerRef}
      className="absolute cursor-none top-0 left-0 w-full h-screen bg-black text-white flex items-center justify-center z-[999] select-none"
    >
      <div className="flex flex-col items-center gap-10">
        <div ref={dotRef} className="w-4 h-4 bg-white rounded-full" />
        <p
          ref={promptRef}
          className={`text-xl tracking-widest uppercase ${
            isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          {typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
            ? "Swipe up to Enter"
            : "Press Spacebar to Enter"}
        </p>
      </div>

      {!isReady && (
        <div className="absolute bottom-6 right-6 text-sm text-white/60 font-mono tracking-widest">
          {progress}%
        </div>
      )}
    </div>
  );
}
