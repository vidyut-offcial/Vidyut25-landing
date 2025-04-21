"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ThreeDMarquee } from "./ThreeDMarquee";
import BgVideoSection from "./BgVideoSection";

const images = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

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

export default function HeroSection({ onSectionChange }) {
  return (
    <section
      id="hero-section"
      className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center py-18"
    >
      {/* 🔥 Marquee as background */}
      <div className="absolute inset-0 z-0 ">
        <ThreeDMarquee
          images={images}
          sectionIndex={0}
          onSectionChange={onSectionChange}
          nextSectionId={"idea-section"}
          className="absolute inset-0 opacity-40 z-0"
        />

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* 🔼 Foreground Content */}
      <div className="z-10 flex flex-col items-center justify-center gap-10 xs:gap-12">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center" id="hero-title">
            <h2
              data-text="VIDYUT"
              className="glitch-off text-[120px] xs:text-[160px] md:text-[200px] font-frontage-bold"
            >
              VIDYUT
            </h2>
            <h2
              id="hero-title-glitch"
              data-text="VIDYUT"
              className="glitch absolute top-0 left-0 text-[120px] xs:text-[160px] md:text-[200px] font-frontage-bold"
            >
              VIDYUT
            </h2>
          </div>

          <h3 className="text-2xl xs:text-3xl md:text-4xl font-frontage-regular uppercase">
            National Level Multifest
          </h3>
        </div>

        <div className="flex flex-col items-center gap-10 xs:gap-12">
          <p className="text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl font-frontage-regular text-foreground">
            COMING SOON
          </p>
          <div id="hero-countdown">
            <Countdown targetDate={new Date([2025, 5, 23])} />
          </div>
        </div>
      </div>
    </section>
  );
}