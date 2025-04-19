"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
    <div className="flex md:grid-cols-2 md:grid-rows-2 md:grid 2xl:flex justify-center items-center gap-3 xs:gap-5 md:gap-7">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center justify-center">
          <span className="text-lg xs:text-4xl lg:text-5xl 2xl:text-6xl font-sf">{value}</span>
          <span className="text-[0.5rem] xs:text-sm md:text-base lg:text-lg 2xl:text-lg uppercase font-frontage-regular">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function HeroSection() {

  return (
    <section
      id="hero-section"
      className="h-screen w-screen opacity-0 relative flex flex-col items-center gap-20 justify-center py-18 pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center">
        <div 
          className="flex items-center justify-center"
          id="hero-title"
        >
          <h2
            data-text="VIDYUT"
            className="glitch-off text-[120px] xs:text-[160px] md:text-[200px] h-fit font-frontage-bold z-10"
          >
            VIDYUT
          </h2>
          <h2
            id="hero-title-glitch"
            data-text="VIDYUT"
            className="glitch absolute text-[120px] xs:text-[160px] md:text-[200px] h-fit font-frontage-bold z-10"
          >
            VIDYUT
          </h2>
        </div>

        <h3
          id="hero-subtitle"
          className="text-2xl xs:text-3xl md:text-4xl font-frontage-regular uppercase z-10"
        >
          National Level Multifest
        </h3>
      </div>

      <div className="flex flex-col gap-10 xs:gap-12 z-10">
        <p
          id="hero-comingsoon"
          className="text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl font-frontage-regular text-foreground"
        >
          COMING SOON
        </p>

        <div id="hero-countdown">
          <Countdown targetDate={new Date([2025, 5, 23])} />
        </div>
      </div>
    </section>
  );
}
