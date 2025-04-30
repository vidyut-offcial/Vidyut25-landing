"use client";


import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AboutSection from "@/components/AboutSection";
import IdeaSection from "@/components/IdeaSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const Home = () => {
    const [showSpaceship, setShowSpaceship] = useState(true);
    const [isSpaceshipMounted, setIsSpaceshipMounted] = useState(true);
    const spaceshipRef = useRef(null);
    const mainRef = useRef(null);
    const [playOne, setPlayOne] = useState(false);
    const [playTwo, setPlayTwo] = useState(false);
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
        startReveal()
    },[])

    return (
        <>
            <main   className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
                {/*<div id="model" className="fixed flex items-center justify-center top-0 left-0 z-[100] pointer-events-none">*/}
                {/*  {isSpaceshipMounted && showSpaceship && <SpaceShipModel ref={spaceshipRef} />}*/}
                {/*</div>*/}
                {/*<PostLoading onComplete={transitHero} />*/}
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

                    <section id="faq">
                        <FAQSection />
                    </section>

                    <Footer />

                </div>
            </main>

        </>
    )
}

export default Home