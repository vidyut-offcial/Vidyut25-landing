"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BgVideoSection from "./BgVideoSection";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: "--", hours: "--", minutes: "--", seconds: "--" });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
        const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-rows-2 grid-cols-2 md:flex flex-row justify-center items-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 w-full">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center justify-center">
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sf text-white">
            {value}
          </span>
          <span className="text-xs xs:text-sm md:text-base lg:text-lg uppercase font-frontage-regular text-white opacity-90">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function HeroSection({ onSectionChange }) {
  return (
    <section
      id="hero-section"
      className="h-screen w-screen opacity-0 relative flex flex-col items-center justify-center py-8 overflow-hidden pointer-events-none"
    > 
      <BgVideoSection 
        videoSrc={"/videos/asteroid.webm"} 
        nextSectionId={"about-section"}
        sectionIndex={0}
        onSectionChange={onSectionChange}   
      />
      
      <div className="flex flex-col items-center justify-center space-y-2 mb-16 sm:mb-24 md:mb-32">
        <div 
          className="flex items-center justify-center relative"
          id="hero-title"
        >
          <h2
            data-text="VIDYUT"
            className="glitch-off text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] tracking-widest font-frontage-bold z-10 text-white"
          >
            VIDYUT
          </h2>
          <h2
            id="hero-title-glitch"
            data-text="VIDYUT"
            className="glitch absolute text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] tracking-widest font-frontage-bold z-10 text-white"
          >
            VIDYUT
          </h2>
        </div>

        <h3
          id="hero-subtitle"
          className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-frontage-regular uppercase z-10 tracking-wider text-white"
        >
          National Level Multifest
        </h3>
      </div>

      <div className="flex flex-col items-center space-y-10 sm:space-y-14 md:space-y-16 lg:space-y-20 z-10 px-4">
        <p
          id="hero-comingsoon"
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-frontage-regular text-white tracking-widest"
        >
          See you on
        </p>

        {/*<div id="hero-countdown" className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">*/}
        {/*  <Countdown targetDate={new Date(2025, 4, 23)} />*/}
        {/*</div>*/}
        <div id="hero-countdown" className="w-full  flex flex-col items-center justify-center max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <p className="md:text-6xl font-nexa "
             style={{
               letterSpacing: "0.8rem",
             }}

          >
            23 24 25
          </p>
          <p className="text-2xl font-nexa tracking-widest ml-3 mt-5"
             style={{
               letterSpacing: "1rem",
             }}
          >May 2025
          </p>
        </div>
      </div>
    </section>
  );
}