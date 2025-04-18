"use client";

import SpaceShipModel from "@/models/SpaceShipModel";
import { useEffect, useState } from "react";

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
    <section id="hero-section" className="h-screen opacity-0 w-screen relative flex flex-col items-center gap-20 justify-between py-18 pointer-events-none">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[200px] h-fit font-frontage-bold z-10">
          VIDYUT
        </h2>

        <h3 className="text-4xl font-frontage-regular uppercase z-10">
          National Level Multifest
        </h3>
      </div>

      <div className="flex flex-col gap-10 xs:gap-12 z-10">
        <p className="text-3xl xs:text-4xl lg:text-5xl 2xl:text-6xl font-frontage-regular text-foreground">
          COMING SOON
        </p>
        <Countdown targetDate={new Date([2025, 5, 23])} />
      </div>
    </section>
  );
}
