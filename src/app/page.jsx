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
import { SpaceshipContext } from "@/contexts/SpaceShipContext";
import ReactHowler from "react-howler";

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
        ease: "power2.out"
      })

      .to("#hero-title", {
        duration: 2,
        y: 0,
        ease: "power2.inOut"
      })

      .to("#hero-subtitle", {
        x: 0,
        opacity: 2,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.5")

      .to("#hero-comingsoon", {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      }, "-=0.8")

      .to("#hero-countdown", {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .set("#section-container", {display: "block"})
  };

  function transitHero() {
    console.log("Called out");

    const interval = setInterval(() => {
      if (spaceshipRef.current) {
        clearInterval(interval);
        const initialScale = spaceshipRef.current.scale;
        const tl = gsap.timeline();

        console.log("Called there");

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
        .call(() => {
          setPlayOne(false);
          setPlayTwo(true);
          startReveal();
        })
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
        }, "<")
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

  useEffect(() => {
    if (!spaceshipRef.current) return;
    
    // Reset any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Base position and rotation for the spaceship
    const basePosition = { x: -2.5, y: 0, z: 0 };
    const baseRotation = { x: 0, y: -Math.PI / 2, z: 0 };
    
    // Create a master timeline for all animations
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Increased scrub value for smoother transitions
        invalidateOnRefresh: true, // Recompute on window resize
        onUpdate: self => {
          // Optional console log for debugging
          // console.log("Scroll progress:", self.progress.toFixed(3));
        },
      }
    });
    
    // Add an initial state to ensure consistency
    masterTimeline.set(spaceshipRef.current.position, {
      x: basePosition.x,
      y: basePosition.y,
      z: basePosition.z
    });
    
    masterTimeline.set(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y,
      z: baseRotation.z
    });
    
    // Add animation segments with improved transitions
    
    // Hero section - gentle hover
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + 1,
      y: basePosition.y + 0.5,
      z: basePosition.z,
      duration: 0.5,
      ease: "power1.inOut" // Added subtle easing within the timeline
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y + 0.1,
      z: baseRotation.z,
      duration: 0.5,
      ease: "power1.inOut"
    }, "<");
    
    // Idea section - orbit pattern
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + 4,
      y: basePosition.y + 2,
      z: basePosition.z - 2,
      duration: 0.8,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x + 0.2,
      y: baseRotation.y - 0.5,
      z: baseRotation.z + 0.1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "<");
    
    // About section - wide flyby
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x - 6,
      y: basePosition.y - 1,
      z: basePosition.z + 3,
      duration: 0.8,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x - 0.1,
      y: baseRotation.y + 0.8,
      z: baseRotation.z + Math.PI, // Full roll
      duration: 0.8,
      ease: "power1.inOut"
    }, "<");
    
    // Past section - time travel zoom
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x,
      y: basePosition.y + 1,
      z: basePosition.z - 8, // Way back
      duration: 0.5,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x + 0.5,
      y: baseRotation.y + Math.PI, // Flipped
      z: baseRotation.z,
      duration: 0.5,
      ease: "power1.inOut"
    }, "<");
    
    // Events section - high-speed zigzag
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + 5,
      y: basePosition.y + 3,
      z: basePosition.z + 2,
      duration: 0.4,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x - 0.3,
      y: baseRotation.y - 0.2,
      z: baseRotation.z + 0.4,
      duration: 0.4,
      ease: "power1.inOut"
    }, "<");
    
    // Events section - continue zigzag
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x - 5,
      y: basePosition.y - 3,
      z: basePosition.z - 2,
      duration: 0.4,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x + 0.3,
      y: baseRotation.y + 0.2,
      z: baseRotation.z - 0.4,
      duration: 0.4,
      ease: "power1.inOut"
    }, "<");
    
    // Workshop section - construction movements
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x - 2,
      y: basePosition.y + 2,
      z: basePosition.z + 1,
      duration: 0.6,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x + 0.3,
      y: baseRotation.y - 0.3,
      z: baseRotation.z + 0.2,
      duration: 0.6,
      ease: "power1.inOut"
    }, "<");
    
    // ProShow section - dramatic circular movement
    let radius = 6; // Larger radius for more noticeable movement
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + radius * Math.cos(0),
      y: basePosition.y + radius * Math.sin(0),
      z: basePosition.z - 3,
      duration: 0.25,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y + Math.PI * 0.5,
      z: baseRotation.z,
      duration: 0.25,
      ease: "power1.inOut"
    }, "<");
    
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + radius * Math.cos(Math.PI * 0.5),
      y: basePosition.y + radius * Math.sin(Math.PI * 0.5),
      z: basePosition.z - 3,
      duration: 0.25,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y + Math.PI,
      z: baseRotation.z,
      duration: 0.25,
      ease: "power1.inOut"
    }, "<");
    
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + radius * Math.cos(Math.PI),
      y: basePosition.y + radius * Math.sin(Math.PI),
      z: basePosition.z - 3,
      duration: 0.25,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y + Math.PI * 1.5,
      z: baseRotation.z,
      duration: 0.25,
      ease: "power1.inOut"
    }, "<");
    
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + radius * Math.cos(Math.PI * 1.5),
      y: basePosition.y + radius * Math.sin(Math.PI * 1.5),
      z: basePosition.z - 3,
      duration: 0.25,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y + Math.PI * 2,
      z: baseRotation.z,
      duration: 0.25,
      ease: "power1.inOut"
    }, "<");
    
    // CarShow section - racing maneuvers with larger movements
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x + 8, // Increased range
      y: basePosition.y + 1,
      z: basePosition.z - 3,
      duration: 0.3,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x + 0.1,
      y: baseRotation.y - 0.4,
      z: baseRotation.z - 0.3,
      duration: 0.3,
      ease: "power1.inOut"
    }, "<");
    
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x - 8, // Increased range
      y: basePosition.y - 1,
      z: basePosition.z + 3,
      duration: 0.3,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x - 0.1,
      y: baseRotation.y + 0.4,
      z: baseRotation.z + 0.3,
      duration: 0.3,
      ease: "power1.inOut"
    }, "<");
    
    // Return to base position at the end
    masterTimeline.to(spaceshipRef.current.position, {
      x: basePosition.x,
      y: basePosition.y,
      z: basePosition.z,
      duration: 0.4,
      ease: "power1.inOut"
    });
    masterTimeline.to(spaceshipRef.current.rotation, {
      x: baseRotation.x,
      y: baseRotation.y,
      z: baseRotation.z,
      duration: 0.4,
      ease: "power1.inOut"
    }, "<");
    
    // Add a constant subtle floating animation regardless of scroll
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
      
    // Handle page navigation snapping - this ensures smooth transitions when jumping to sections
    // Add event listeners for any navigation clicks that might cause scroll position changes
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Ensure spaceship smoothly transitions when navigating
        gsap.to(spaceshipRef.current.position, {
          x: basePosition.x,
          y: basePosition.y,
          z: basePosition.z,
          duration: 1,
          ease: "power2.inOut",
          overwrite: "auto"
        });
        
        gsap.to(spaceshipRef.current.rotation, {
          x: baseRotation.x,
          y: baseRotation.y,
          z: baseRotation.z,
          duration: 1,
          ease: "power2.inOut",
          overwrite: "auto"
        });
      });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
      // Reset spaceship position on navigation
      gsap.to(spaceshipRef.current.position, {
        x: basePosition.x,
        y: basePosition.y,
        z: basePosition.z,
        duration: 1,
        ease: "power2.inOut",
        overwrite: "auto"
      });
      
      gsap.to(spaceshipRef.current.rotation, {
        x: baseRotation.x,
        y: baseRotation.y,
        z: baseRotation.z,
        duration: 1,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      floatAnimation.kill();
      
      // Clean up event listeners
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      window.removeEventListener('popstate', () => {});
    };
  }, [typeIt, spaceshipRef]);

  useEffect(() => {
    // When the page initially loads, check if we need to skip to a specific scroll position
    const handleInitialScroll = () => {
      if (window.location.hash) {
        // If there's a hash in the URL, we'll be jumping to a section
        // Ensure spaceship smoothly animates to that position
        const basePosition = { x: -2.5, y: 0, z: 0 };
        const baseRotation = { x: 0, y: -Math.PI / 2, z: 0 };
        
        gsap.to(spaceshipRef.current.position, {
          x: basePosition.x,
          y: basePosition.y,
          z: basePosition.z,
          duration: 1,
          ease: "power2.inOut",
          overwrite: "auto"
        });
        
        gsap.to(spaceshipRef.current.rotation, {
          x: baseRotation.x,
          y: baseRotation.y,
          z: baseRotation.z,
          duration: 1,
          ease: "power2.inOut",
          overwrite: "auto"
        });
      }
    };
    
    // Run once after component mounts
    if (spaceshipRef.current) {
      // Small delay to ensure DOM is fully ready
      setTimeout(handleInitialScroll, 100);
    }
    
    // Add a listener for the load event
    window.addEventListener('load', handleInitialScroll);
    
    return () => {
      window.removeEventListener('load', handleInitialScroll);
    };
  }, [spaceshipRef]);

  return (
    <SpaceshipContext.Provider value={spaceshipRef}>
      <main ref={mainRef} className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
        <div className="fixed flex items-center justify-center top-0 left-0 z-[100]">
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
          <SpaceShipModel ref={spaceshipRef} stars={true} />
        </div>
        <PostLoading onComplete={transitHero} />
        <HeroSection />
        <div id="section-container" className="h-full w-full hidden">
          <NavBar />
          <IdeaSection />
          <AboutSection />
          <PastSection products={products} />
          <EventsSection />
          <WorkshopSection />
          <ProShowSection />
          <CarShowSection />
        </div>
      </main>
    </SpaceshipContext.Provider>
  );
}