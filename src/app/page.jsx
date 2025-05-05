"use client";


import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AccreditationGrid from "@/components/Accredition";
import Footer from "@/components/footer/Footer";
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import PostLoading from "@/components/PostLoading";
import ReactHowler from "react-howler";
import OrganizersGrid from "@/components/Organizers";

const Home = () => {

const [startRevel, setStartRevel] = useState(false);
const howlerRevealRef = useRef();

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
const LazyAboutSection = dynamic(() => import('@/components/AboutSection'), {
        loading: () => <div className="text-center p-4">Loading AboutSection...</div>,
        ssr: false,
    });
const LazyIdeaSection = dynamic(() => import('@/components/IdeaSection'), {
        loading: () => <div className="text-center p-4">Loading IdeaSection...</div>,
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
    const playSound = (ref) => {
        const sound = ref.current?.howler;
        if (sound) {
            const id = sound.play();
            sound.fade(0, 1, 2000, id);
            return { sound, id };
        }
        return null;
    };

    useEffect(() => {
        console.log(startRevel)
        if (startRevel) {
            playSound(howlerRevealRef)
            startReveal()
        }
    },[startRevel]);


    // hai for docker test8
    return (
        <>
            <ReactHowler
                src="https://vidyut-assets.s3.ap-south-1.amazonaws.com/bgms/sounds/reveal.mp3"
                playing={false}
                html5={true}
                ref={howlerRevealRef}
                volume={1}
                onEnd={() => {
                    gsap.to("#hero-title-glitch", {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                }}
            />
            <main   className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
                {!startRevel && (
                    <PostLoading setRevel={setStartRevel} />
                )}
                <HeroSection />
                <div id="section-container" className="h-full w-full hidden opacity-0">
                    <NavBar />

                    <section id="about">
                        <LazyAboutSection />
                    </section>

                    <section id="ideas">
                        <LazyIdeaSection />
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
                    <section>
                        <OrganizersGrid />
                    </section>
                    <section>
                    <AccreditationGrid />
                    </section>
                    <Footer />
                </div>
            </main>
        </>
    )
    // test
}

export default Home