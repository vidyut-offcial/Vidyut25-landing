"use client";

import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import IdeaSection from "@/components/IdeaSection";
import NavBar from "@/components/NavBar";
import PostLoading from "@/components/PostLoading";
import SpaceShipModel from "@/models/SpaceShipModel";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpaceshipContext } from "@/contexts/SpaceShipContext";
import ReactHowler from "react-howler";
import Footer from "@/components/footer/Footer";
import FAQSection from "@/components/FAQSection";
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showSpaceship, setShowSpaceship] = useState(true);
  const [isSpaceshipMounted, setIsSpaceshipMounted] = useState(true);
  const spaceshipRef = useRef(null);
  const mainRef = useRef(null);
  const [playOne, setPlayOne] = useState(false);
  const [playTwo, setPlayTwo] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const howlerOneRef = useRef();
  const howlerTwoRef = useRef();

  const LazyProshow = dynamic(() => import('@/app/proshow/page'), {
    loading: () => <div className="text-center p-4">Loading Proshow...</div>,
    ssr: false,
  });

  const LazyAutoshowSection = dynamic(() => import('@/components/autoshow/AutoshowSection'), {
    loading: () => <div className="text-center p-4">Loading Autoshow...</div>,
    ssr: false,
  });

  const LazySwiperCoverflow = dynamic(() => import('@/components/workshop'), {
    loading: () => <div className="text-center p-4">Loading Workshops...</div>,
    ssr: false,
  });

  const startReveal = () => {
    const tl = gsap.timeline();
    gsap.set("#hero-section", { opacity: 1 });
    gsap.set("#hero-title", { y: 100 });
    gsap.set("#hero-subtitle", { x: -100, opacity: 0, y: 0 });
    gsap.set("#hero-comingsoon", { y: 30, opacity: 0 });
    gsap.set("#hero-countdown", { scale: 0.95, opacity: 0 });

    tl
      .to("#hero-title", {
        duration: 2,
        y: 0,
        ease: "power2.out",
        onComplete: () => {
          gsap.set("#model", { translateY: "100vh", position: "absolute", top: 0, left: 0, zIndex: "-10" });
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

  
  useEffect(() => {

    startReveal();
  },
[]);

  useEffect(() => {
    if (!audioReady) return;

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
  }, [playOne, playTwo, audioReady]);

  function isAudioBlocked() {
    return typeof Howler !== "undefined" && Howler.ctx && Howler.ctx.state === "suspended";
  }

  return (
    
      <main  className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">

        <HeroSection />
        <div id="section-container" className="h-full w-full hidden opacity-0">
          <NavBar />

          <section id="about">
            <AboutSection />
          </section>

          <section id="ideas">
            <IdeaSection />
          </section>

          <section id="proshow">
            <LazyProshow />
          </section>

          <section id="autoshow">
            <LazyAutoshowSection />
          </section>

          <section id="workshop">
            <LazySwiperCoverflow />
          </section>

          {/* <section id="faq">
            <FAQSection />
          </section> */}

          <Footer />

        </div>
      </main>
  );
}