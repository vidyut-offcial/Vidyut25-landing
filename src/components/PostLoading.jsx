import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ReactHowler from "react-howler";
import TerminalStartup from "@/components/TerminalStarup";
import Image from "next/image";
import { PlayIcon } from "lucide-react";

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

    const startFade = () => {
        setRevel(true);
        gsap.to(logoRef, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });
    }
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
                }).then()
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
        // Start thunder sound
        const { sound: thunderSound, id: thunderId } = await playSound(howlerOneRef);
        await fadeInThenOut(thunderSound, thunderId, terminalRef.current, 2000, 10000); // 2s fade in, 10s hold, 2s fade out

        const { sound: secondSound, id: secondId } = await playSound(howlerTwoRef);
        await fadeInSecond(logoRef.current, secondSound, secondId, 2000);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { sound: thridSound, id: thirdId } = await playSound(howlerThreeRef);

    };

    const isMobile = useIsMobile();



    // useEffect(() => {
    //   const hasSeenLoading = sessionStorage.getItem("hasSeenLoadingScreen");
    //
    //   if (hasSeenLoading) {
    //     // Skip animation
    //     setRevel(true);
    //   } else {
    //     if (!isMobile) {
    //       setHasInteracted(true);
    //       startSequence().then(() => {
    //         sessionStorage.setItem("hasSeenLoadingScreen", "true");
    //       });
    //     }
    //   }
    // }, [isMobile]);

    const handleStart = () => {
        setHasInteracted(true);
        startSequence().then(() => {
            sessionStorage.setItem("hasSeenLoadingScreen", "true");
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
            {!hasInteracted && (

                <div
                    onClick={handleStart}
                    className="absolute inset-0 z-40 bg-black text-white flex items-center justify-center text-center cursor-pointer select-none"
                >
                    <div className="text-lg font-semibold animate-pulse">
                        Click to Enter the Void
                    </div>
                </div>
            )}



            <ReactHowler
                src={"https://vidyut-assets.s3.ap-south-1.amazonaws.com/bgms/sounds/thunder.mp3"}
                playing={false}
                preload={true}
                html5={true}
                ref={howlerOneRef}
                volume={1}
            />

            {/* Second sound */}
            <ReactHowler
                src="https://vidyut-assets.s3.ap-south-1.amazonaws.com/bgms/sounds/rock.mp3"
                playing={false}
                preload={true}
                html5={true}
                ref={howlerTwoRef}
                volume={1}
            />
            <ReactHowler
                src="https://vidyut-assets.s3.ap-south-1.amazonaws.com/bgms/sounds/metal.mp3"
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
                className="z-30 absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-1000"
            >
                <button className="flex items-center justify-center"
                    onClick={startFade}
                >
                    <Image
                        className="w-[80vw] max-w-[800px] h-auto object-contain cursor-pointer"
                        src={Logo}
                        alt="Vidyut Logo"
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 80vw, 800px"
                    />
                </button>
                <p
                    ref={logoRef}
                    className="mt-8.5 font-nexa"
                >
                    Tap to continue
                </p>
            </div>

        </div>
    );
};

export default PostLoading;
