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
    const tapTextRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

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
        fadeDuration = isMobile ? 1000 : 2000,
        holdDuration = isMobile ? 8000 : 15000
    ) => {
        return new Promise((resolve) => {
            sound.fade(0, 1, fadeDuration, id);
            
            const onEnd = () => {
                sound.off('end', onEnd);
                if (element) {
                    gsap.to(element, {
                        opacity: 0,
                        duration: fadeDuration / 1000,
                        ease: "power2.out",
                    });
                }
                resolve();
            };

            sound.once('end', onEnd);
            
            setTimeout(() => {
                sound.off('end', onEnd);
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

    const fadeInSecond = (element, sound, id, fadeDuration = isMobile ? 1000 : 2000) => {
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
                if (sound.state() === 'loaded') {
                    const id = sound.play();
                    resolve({ sound, id });
                } else {
                    sound.once('load', () => {
                        const id = sound.play();
                        resolve({ sound, id });
                    });
                }
            }
        });
    };

    useEffect(() => {
        if (!hasStarted) {
            startSequence();
        }
    }, []);

    const startSequence = async () => {
        if (hasStarted) return;
        setHasStarted(true);

        try {
            // Start thunder sound and terminal animation
            const { sound: thunderSound, id: thunderId } = await playSound(howlerOneRef);
            await fadeInThenOut(thunderSound, thunderId, terminalRef.current);

            const { sound: secondSound, id: secondId } = await playSound(howlerTwoRef);
            await fadeInSecond(logoRef.current, secondSound, secondId);

            await new Promise((resolve) => setTimeout(resolve, isMobile ? 1500 : 3000));
            gsap.to(tapTextRef.current, {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
            });

            await playSound(howlerThreeRef);
        } catch (error) {
            console.error("Error in audio sequence:", error);
            gsap.to(logoRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
            <ReactHowler
                src="/sounds/thunder.mp3"
                playing={false}
                html5={true}
                ref={howlerOneRef}
                volume={1}
                preload={true}
            />

            <ReactHowler
                src="/sounds/rock.mp3"
                playing={false}
                html5={true}
                ref={howlerTwoRef}
                volume={1}
                preload={true}
            />

            <ReactHowler
                src="/sounds/metal.mp3"
                playing={false}
                html5={true}
                ref={howlerThreeRef}
                volume={1}
                preload={true}
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
                        className="w-[80vw] max-w-[800px] h-auto object-contain cursor-pointer"
                        src={Logo}
                        alt="Vidyut Logo"
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 80vw, 800px"
                    />
                </button>
                <p
                    ref={tapTextRef}
                    className="text-white text-lg md:text-xl mt-4 opacity-0 transition-opacity duration-1000"
                >
                    Tap to view
                </p>
            </div>
        </div>
    );
};

export default PostLoading;