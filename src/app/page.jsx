"use client";

import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import IdeaSection from "@/components/IdeaSection";
import NavBar from "@/components/NavBar";
import PastSection from "@/components/PastSection";
import PostLoading from "@/components/PostLoading";
import SpaceShipModel from "@/models/SpaceShipModel";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpaceshipContext } from "@/contexts/SpaceShipContext";
import ReactHowler from "react-howler";
import MultiEventsSection from "@/components/MultiEventsSection";
import FAQSection from "@/components/FAQSectoin";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showSpaceship, setShowSpaceship] = useState(true);
  const [isSpaceshipMounted, setIsSpaceshipMounted] = useState(true);
  const spaceshipRef = useRef(null);
  const mainRef = useRef(null);
  const [playOne, setPlayOne] = useState(false);
  const [playTwo, setPlayTwo] = useState(false);
  const howlerOneRef = useRef();
  const howlerTwoRef = useRef();

  const startReveal = () => {
    const tl = gsap.timeline();
    gsap.set("#hero-section", { opacity: 1 });
    gsap.set("#hero-title", { y: 100 });
    gsap.set("#hero-subtitle", { x: -100, opacity: 0, y: -50 });
    gsap.set("#hero-comingsoon", { y: 30, opacity: 0 });
    gsap.set("#hero-countdown", { scale: 0.95, opacity: 0 });

    tl
      .to("#hero-title", {
        duration: 2,
        y: 0,
        ease: "power2.out",
        onComplete: () => {
          gsap.set("#model", { translateY: "100vh", position: "absolute", top: 0, left: 0, zIndex: "-10" });
          setIsSpaceshipMounted(false);
        },
      })
      .to("#hero-title", {
        duration: 2,
        y: 0,
        ease: "power2.inOut",
      })
      .to("#hero-subtitle", {
        x: 0,
        opacity: 2,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.5")
      .set("#section-container", { display: "block" })
      .to("#hero-comingsoon", {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to("#section-container", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      }, "-=0.8")
      .to("#hero-countdown", {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
      }, "-=0.8");
  };

  function transitHero() {
    const interval = setInterval(() => {
      if (spaceshipRef.current) {
        clearInterval(interval);
        const initialScale = spaceshipRef.current.scale;
        const tl = gsap.timeline();

        tl
          .call(() => {
            setPlayOne(true);
          })
          .to(spaceshipRef.current.position, {
            x: 2.5,
            y: 2.5,
            z: 2.5,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              setPlayTwo(true);
            },
          })
          .to(spaceshipRef.current.rotation, {
            y: -Math.PI / 8,
            x: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.out",
          }, "<")
          .to(spaceshipRef.current.scale, {
            x: initialScale.x * 0.5,
            y: initialScale.y * 0.5,
            z: initialScale.z * 0.5,
            duration: 1.5,
            ease: "power2.out",
          }, "<")
          .to(spaceshipRef.current.scale, {
            x: initialScale.x * 2.5,
            y: initialScale.y * 2.5,
            z: initialScale.z * 2.5,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              setPlayOne(false);
              startReveal();
            },
          })
          .to(spaceshipRef.current.position, {
            x: 0,
            y: 0,
            z: 1,
            duration: 1.5,
            ease: "power2.out",
          }, "<")
          .to(spaceshipRef.current.rotation, {
            y: Math.PI / 2,
            x: -Math.PI / 2,
            z: 0,
            duration: 1.5,
            ease: "power2.out",
          }, "<")
          .to(spaceshipRef.current.scale, {
            x: initialScale.x,
            y: initialScale.y,
            z: initialScale.z,
            duration: 1.5,
            ease: "power2.out",
          })
          .to(spaceshipRef.current.position, {
            x: 35,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.out",
          }, "<");
      }
    }, 100);

    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (playOne) {
      howlerOneRef.current.play();
    } else {
      howlerOneRef.current.stop();
    }

    if (playTwo) {
      howlerTwoRef.current.play();
    } else {
      howlerTwoRef.current.stop();
    }
  }, [playOne, playTwo]);

  return (
    <SpaceshipContext.Provider value={spaceshipRef}>
      <main ref={mainRef} className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
        <div id="model" className="fixed flex items-center justify-center top-0 left-0 z-[100] pointer-events-none">
          <ReactHowler
            src="/sounds/woof.mp3"
            playing={false}
            html5={true}
            ref={howlerOneRef}
            volume={1}
          />

          <ReactHowler
            src="/sounds/reveal.mp3"
            playing={false}
            html5={true}
            ref={howlerTwoRef}
            volume={1}
            onEnd={() => {
              gsap.to("#hero-title-glitch", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }}
          />
          {isSpaceshipMounted && showSpaceship && <SpaceShipModel ref={spaceshipRef} />}
        </div>
        <PostLoading onComplete={transitHero} />
        <HeroSection />
        <div id="section-container" className="h-full w-full hidden opacity-0">
          <NavBar />
          <IdeaSection />
          <AboutSection />
          <EventsSection />
          <MultiEventsSection />
          <PastSection />
          <FAQSection />
          <Footer />
        </div>
      </main>
    </SpaceshipContext.Provider>
  );
}