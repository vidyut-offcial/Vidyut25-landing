import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function PostLoading({ isPlaying, togglePlayPause, onComplete }) {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const audioButtonRef = useRef(null);
  const crossRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 1 });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(dotRef.current, {
      scale: 1.4,
      duration: 0.6,
      ease: "power1.inOut",
    });

    const timer = setTimeout(() => {
      tl.kill();
      gsap.to(dotRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setIsReady(true);
          gsap.to(
            promptRef.current,
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        },
      });
    }, 2200);

    const handleKeyDown = (e) => {
      if (e.code === "Space" && isReady) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
            if (onComplete) onComplete();
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      tl.kill();
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
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
          Press Spacebar to Enter
        </p>
      </div>
    </div>
  );
}
