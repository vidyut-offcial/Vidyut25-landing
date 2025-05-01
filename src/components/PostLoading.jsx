import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ReactHowler from "react-howler";
import TerminalStartup from "@/components/TerminalStarup";
import Image from "next/image";
import Logo from "../../public/images/logo_enhanced.png";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return isMobile;
}

const PostLoading = ({ setRevel }) => {
    const logoRef = useRef(null);
    const terminalRef = useRef(null);
    const howlerOneRef = useRef();
    const howlerTwoRef = useRef();
    const howlerThreeRef = useRef();

    const [hasInteracted, setHasInteracted] = useState(false);
    const [sequenceStarted, setSequenceStarted] = useState(false);
    const [showEnterButton, setShowEnterButton] = useState(false);
    const isMobile = useIsMobile();

    const startFade = () => {
        setRevel(true);
        gsap.to(logoRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });
    };

    const fadeInThenOut = (
        sound,
        id,
        element = null,
        fadeDuration = 2000,
        holdDuration = 10000
    ) => {
        return new Promise((resolve) => {
            sound.fade(0, 1, fadeDuration, id);
            setTimeout(() => {
                sound.fade(1, 0, fadeDuration, id);
                if (element) {
                    gsap.to(element, {
                        opacity: 0,
                        duration: fadeDuration / 1000,
                        ease: "power2.out",
                    });
                }
                setTimeout(resolve, fadeDuration);
            }, fadeDuration + holdDuration);
        });
    };

    const fadeInSecond = (element, sound, id, fadeDuration = 2000) => {
        return Promise.all([
            element
                ? gsap.to(element, {
                    opacity: 1,
                    duration: fadeDuration / 1000,
                    ease: "power2.out",
                })
                : Promise.resolve(),

            new Promise((resolve) => {
                sound.fade(0, 1, fadeDuration, id);
                setTimeout(resolve, fadeDuration);
            }),
        ]);
    };

    const playSound = (ref) => {
        return new Promise((resolve) => {
            const sound = ref.current?.howler;
            if (sound) {
                const id = sound.play();
                resolve({ sound, id });
            }
        });
    };

    const startSequence = async () => {
        if (sequenceStarted) return;
        setSequenceStarted(true);
        
        // Start thunder sound
        const { sound: thunderSound, id: thunderId } = await playSound(howlerOneRef);
        await fadeInThenOut(thunderSound, thunderId, terminalRef.current, 2000, 10000);

        const { sound: secondSound, id: secondId } = await playSound(howlerTwoRef);
        await fadeInSecond(logoRef.current, secondSound, secondId, 2000);
        
        await new Promise((resolve) => setTimeout(resolve, 3000));
        
        const { sound: thirdSound, id: thirdId } = await playSound(howlerThreeRef);
    };

    useEffect(() => {
        // Check if we should show the enter button (mobile and no interaction yet)
        setShowEnterButton(isMobile && !hasInteracted);
        
        // Start sequence automatically on desktop if not started
        if (!isMobile && !sequenceStarted && !hasInteracted) {
            setHasInteracted(true);
            startSequence();
        }
    }, [isMobile, hasInteracted, sequenceStarted]);

    const handleStart = () => {
        if (!sequenceStarted) {
            setHasInteracted(true);
            startSequence();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
            {showEnterButton && (
                <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
                    <button
                        onClick={handleStart}
                        className="text-white px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                    >
                        Enter
                    </button>
                </div>
            )}

            <ReactHowler
                src="/sounds/thunder.mp3"
                playing={false}
                html5={true}
                ref={howlerOneRef}
                volume={1}
            />

            <ReactHowler
                src="/sounds/rock.mp3"
                playing={false}
                html5={true}
                ref={howlerTwoRef}
                volume={1}
            />

            <ReactHowler
                src="/sounds/metal.mp3"
                playing={false}
                html5={true}
                ref={howlerThreeRef}
                volume={1}
            />

            <div ref={terminalRef} className="z-20">
                <TerminalStartup />
            </div>

            <div
                ref={logoRef}
                className="z-30 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-1000"
            >
                <button 
                    className="flex items-center justify-center" 
                    onClick={startFade}
                    aria-label="Continue"
                >
                    <Image
                        className="w-[400px] sm:w-[800px] h-auto object-contain cursor-pointer"
                        src={Logo}
                        alt="Vidyut Logo"
                        priority
                        quality={100}
                    />
                </button>
            </div>
        </div>
    );
};

export default PostLoading;