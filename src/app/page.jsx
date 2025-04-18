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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {title: "2024", thumbnail: "/images/thumbnail.avif", link: "/2024"},
  {title: "2023", thumbnail: "/images/thumbnail.avif", link: "/2023"},
  {title: "2022", thumbnail: "/images/thumbnail.avif", link: "/2022"},
  {title: "2021", thumbnail: "/images/thumbnail.avif", link: "/2021"},
]

export default function Home() {
  const [typeIt, setTypeIt] = useState(false);
  const spaceshipRef = useRef(null);
  const mainRef = useRef(null);

// Fix the transitHero function to run only once
function transitHero() {
  const tl = gsap.timeline({
    onComplete: () => {
      // Set a flag to prevent this from running again
      localStorage.setItem('transitionComplete', 'true');
    }
  });

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
    }, "-=0.5");
}

// Completely revise the scroll animations for smoother transitions
useEffect(() => {
  if (!spaceshipRef.current) return;
  
  // Reset any existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Define the sections for spaceship animations
  const sections = [
    { id: "#hero-section", name: "hero" },
    { id: "#idea-section", name: "idea" },
    { id: "#about-section", name: "about" },
    { id: "#past-section", name: "past" },
    { id: "#events-section", name: "events" },
    { id: "#workshop-section", name: "workshop" },
    { id: "#proshow-section", name: "proshow" },
    { id: "#carshow-section", name: "carshow" }
  ];
  
  // Base position and rotation for the spaceship
  const basePosition = { x: -2.5, y: 0, z: 0 };
  const baseRotation = { x: 0, y: -Math.PI / 2, z: 0 };
  
  // Create a master timeline for all animations
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: self => {
        // Console log for debugging
        // console.log("Scroll progress:", self.progress.toFixed(3));
      }
    }
  });
  
  // Add animation sequences for each section with defined keyframes
  // This ensures animations play out completely while scrolling through a section
  
  // Hero section - gentle hover
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + 1,
    y: basePosition.y + 0.5,
    z: basePosition.z,
    duration: 0.5,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y + 0.1,
    z: baseRotation.z,
    duration: 0.5,
    ease: "none"
  }, "<");
  
  // Idea section - orbit pattern
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + 4,
    y: basePosition.y + 2,
    z: basePosition.z - 2,
    duration: 0.8,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x + 0.2,
    y: baseRotation.y - 0.5,
    z: baseRotation.z + 0.1,
    duration: 0.8,
    ease: "none"
  }, "<");
  
  // About section - wide flyby
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x - 6,
    y: basePosition.y - 1,
    z: basePosition.z + 3,
    duration: 0.8,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x - 0.1,
    y: baseRotation.y + 0.8,
    z: baseRotation.z + Math.PI, // Full roll
    duration: 0.8,
    ease: "none"
  }, "<");
  
  // Past section - time travel zoom
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x,
    y: basePosition.y + 1,
    z: basePosition.z - 8, // Way back
    duration: 0.5,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x + 0.5,
    y: baseRotation.y + Math.PI, // Flipped
    z: baseRotation.z,
    duration: 0.5,
    ease: "none"
  }, "<");
  
  // Events section - high-speed zigzag
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + 5,
    y: basePosition.y + 3,
    z: basePosition.z + 2,
    duration: 0.4,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x - 0.3,
    y: baseRotation.y - 0.2,
    z: baseRotation.z + 0.4,
    duration: 0.4,
    ease: "none"
  }, "<");
  
  // Events section - continue zigzag
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x - 5,
    y: basePosition.y - 3,
    z: basePosition.z - 2,
    duration: 0.4,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x + 0.3,
    y: baseRotation.y + 0.2,
    z: baseRotation.z - 0.4,
    duration: 0.4,
    ease: "none"
  }, "<");
  
  // Workshop section - construction movements
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x - 2,
    y: basePosition.y + 2,
    z: basePosition.z + 1,
    duration: 0.6,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x + 0.3,
    y: baseRotation.y - 0.3,
    z: baseRotation.z + 0.2,
    duration: 0.6,
    ease: "none"
  }, "<");
  
  // ProShow section - dramatic circular movement
  let radius = 6; // Larger radius for more noticeable movement
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + radius * Math.cos(0),
    y: basePosition.y + radius * Math.sin(0),
    z: basePosition.z - 3,
    duration: 0.25,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y + Math.PI * 0.5,
    z: baseRotation.z,
    duration: 0.25,
    ease: "none"
  }, "<");
  
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + radius * Math.cos(Math.PI * 0.5),
    y: basePosition.y + radius * Math.sin(Math.PI * 0.5),
    z: basePosition.z - 3,
    duration: 0.25,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y + Math.PI,
    z: baseRotation.z,
    duration: 0.25,
    ease: "none"
  }, "<");
  
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + radius * Math.cos(Math.PI),
    y: basePosition.y + radius * Math.sin(Math.PI),
    z: basePosition.z - 3,
    duration: 0.25,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y + Math.PI * 1.5,
    z: baseRotation.z,
    duration: 0.25,
    ease: "none"
  }, "<");
  
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + radius * Math.cos(Math.PI * 1.5),
    y: basePosition.y + radius * Math.sin(Math.PI * 1.5),
    z: basePosition.z - 3,
    duration: 0.25,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y + Math.PI * 2,
    z: baseRotation.z,
    duration: 0.25,
    ease: "none"
  }, "<");
  
  // CarShow section - racing maneuvers with larger movements
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x + 8, // Increased range
    y: basePosition.y + 1,
    z: basePosition.z - 3,
    duration: 0.3,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x + 0.1,
    y: baseRotation.y - 0.4,
    z: baseRotation.z - 0.3,
    duration: 0.3,
    ease: "none"
  }, "<");
  
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x - 8, // Increased range
    y: basePosition.y - 1,
    z: basePosition.z + 3,
    duration: 0.3,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x - 0.1,
    y: baseRotation.y + 0.4,
    z: baseRotation.z + 0.3,
    duration: 0.3,
    ease: "none"
  }, "<");
  
  // Return to base position at the end
  masterTimeline.to(spaceshipRef.current.position, {
    x: basePosition.x,
    y: basePosition.y,
    z: basePosition.z,
    duration: 0.4,
    ease: "none"
  });
  masterTimeline.to(spaceshipRef.current.rotation, {
    x: baseRotation.x,
    y: baseRotation.y,
    z: baseRotation.z,
    duration: 0.4,
    ease: "none"
  }, "<");
  
  // Add a constant subtle floating animation regardless of scroll
  // This adds a nice organic feel to the spaceship
  const floatAnimation = gsap.timeline({
    repeat: -1,
    yoyo: true
  });
  
  floatAnimation
    .to(spaceshipRef.current.position, {
      y: "+=0.2",
      duration: 2,
      ease: "sine.inOut"
    })
    .to(spaceshipRef.current.position, {
      y: "-=0.2",
      duration: 2,
      ease: "sine.inOut"
    });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    floatAnimation.kill();
  };
}, [typeIt, spaceshipRef]);

  return (
    <main ref={mainRef} className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <NavBar />
      <div className="fixed flex items-center justify-center top-0 left-0 z-[-10]">
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
                gsap.to("#typit", {
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