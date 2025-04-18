"use client";

import AboutSection from "@/components/AboutSection";
import CarShowSection from "@/components/CarShowSection";
import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import IdeaSection from "@/components/IdeaSection";
import NavBar from "@/components/NavBar";
import { PastSection } from "@/components/PastSection";
import PostLoading from "@/components/PostLoading";
import ProShowSection from "@/components/ProShowSection";
import WorkshopSection from "@/components/WorkshopSection";
import SpaceShipModel from "@/models/SpaceShipModel";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const products = [
  {title: "2024", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2023", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2022", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2021", thumbnail: "/images/thumbnail.avif", link: "/2024"},
]

export default function Home() {
  const [typeIt, setTypeIt] = useState(false);
  const spaceshipRef = useRef(null);

  function transitHero() {
    const tl = gsap.timeline();

    tl.set("#post-loading", {display: "none"})
    .call(() => {
      setTypeIt(true);
    })
    .to({}, { duration: 5 })
    .to(spaceshipRef.current.position, {
      x: 30,
      duration: 2,
      ease: "power2.inOut",
    })
    .to("#hero-section", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }, "<")
    .set(spaceshipRef.current.rotation, { y: -Math.PI / 2, duration: 0 })
    .to(spaceshipRef.current.position, { 
      x: -2.5,
      duration: 2,
      ease: "power2.inOut",
     }, "-=0.5")
  }
  

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <NavBar />
      <div className="fixed flex items-center justify-center top-0 left-0 z-0">
        <SpaceShipModel ref={spaceshipRef} stars={true} />
      </div>
      <PostLoading onComplete={transitHero} />
      <div className="h-full w-full">
        <div id="typit" className="h-screen w-full fixed top-0 flex items-center justify-center">
          {typeIt && <TypeAnimation
            sequence={[
              'You are now entering "VIDYUT" dimension!',
              1000,
              '',
              () => {
                gsap.to("typit", {
                  opacity: 0,
                  onComplete: () => {
                    setTypeIt(false);
                  }
                })
              }
            ]}
            wrapper="span"
            speed={50}
            className="text-foreground font-frontage-bold text-xl"
          />}
        </div>
        <HeroSection />
        <IdeaSection />
        <AboutSection />
        <PastSection products={products} />
        <EventsSection />
        <WorkshopSection />
        <ProShowSection />
        <CarShowSection />
      </div>
    </main>
  );
}
