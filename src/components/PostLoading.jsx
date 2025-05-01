import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ReactHowler from "react-howler";
import TerminalStartup from "@/components/TerminalStarup";
import Image from "next/image";
import Logo from "../../public/images/logo_enhanced.png";

const PostLoading = ({ setRevel }) => {
    const logoRef = useRef(null);
    const terminalRef = useRef(null);
    const howlerOneRef = useRef();
    const howlerTwoRef = useRef();
    const howlerThreeRef = useRef();
    const [hasStarted, setHasStarted] = useState(false);
    const [showEnterButton, setShowEnterButton] = useState(false);
    const tapTextRef = useRef(null);


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

    useEffect(() => {
        const checkScreenSize = () => {
            const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
            setShowEnterButton(!isLargeScreen);

            if (isLargeScreen) {
                startSequence();
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const startSequence = async () => {
        if (hasStarted) return;
        setHasStarted(true);
        setShowEnterButton(false);

        // Start thunder sound and terminal animation
        const { sound: thunderSound, id: thunderId } = await playSound(howlerOneRef);
        await fadeInThenOut(thunderSound, thunderId, terminalRef.current, 2000, 10000);

        const { sound: secondSound, id: secondId } = await playSound(howlerTwoRef);
        await fadeInSecond(logoRef.current, secondSound, secondId, 2000);

        await new Promise((resolve) => setTimeout(resolve, 3000));
        gsap.to(tapTextRef.current, {
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
        });
    

        const { sound: thirdSound, id: thirdId } = await playSound(howlerThreeRef);
    };

    const handleStart = () => {
        startSequence();
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
                className="z-30 absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-1000"
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
                <p
                    ref={tapTextRef}
                    className="text-white text-xl mt-4 opacity-0 transition-opacity duration-1000"
                >
                    Tap to view
                </p>
            </div>

        </div>
    );
};

export default PostLoading;