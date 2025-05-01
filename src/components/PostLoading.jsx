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
    const soundIds = useRef({
        thunder: null,
        rock: null,
        metal: null
    });

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
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

            if (element) {
                gsap.to(element, {
                    opacity: 1,
                    duration: fadeDuration / 1000,
                    ease: "power2.out",
                });
            }

            setTimeout(() => {
                sound.fade(1, 0, fadeDuration, id);
                if (element) {
                    gsap.to(element, {
                        opacity: 0,
                        duration: fadeDuration / 1000,
                        ease: "power2.out",
                    });
                }

                setTimeout(() => {
                    sound.stop(id);
                    resolve();
                }, fadeDuration);
            }, fadeDuration + holdDuration);
        });
    };

    const fadeInSecond = (
        element,
        sound,
        id,
        fadeDuration = isMobile ? 1000 : 2000
    ) => {
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
                setTimeout(() => {
                    resolve();
                }, fadeDuration);
            }),
        ]);
    };

    const playSound = (ref, soundName) => {
        return new Promise((resolve) => {
            const sound = ref.current?.howler;
            if (sound) {
                if (sound.state() === "loaded") {
                    const id = sound.play();
                    soundIds.current[soundName] = id;
                    resolve({ sound, id });
                } else {
                    sound.once("load", () => {
                        const id = sound.play();
                        soundIds.current[soundName] = id;
                        resolve({ sound, id });
                    });
                }
            } else {
                resolve(null);
            }
        });
    };

    // Clean up all sounds when component unmounts
    useEffect(() => {
        return () => {
            if (howlerOneRef.current?.howler && soundIds.current.thunder) {
                howlerOneRef.current.howler.stop(soundIds.current.thunder);
            }
            if (howlerTwoRef.current?.howler && soundIds.current.rock) {
                howlerTwoRef.current.howler.stop(soundIds.current.rock);
            }
            if (howlerThreeRef.current?.howler && soundIds.current.metal) {
                howlerThreeRef.current.howler.stop(soundIds.current.metal);
            }
        };
    }, []);

    useEffect(() => {
        if (!hasStarted) {
            startSequence();
        }
    }, []);

    const startSequence = async () => {
        if (hasStarted) return;
        setHasStarted(true);

        try {
            // Play thunder sound with terminal animation
            const thunder = await playSound(howlerOneRef, 'thunder');
            if (thunder) {
                await fadeInThenOut(thunder.sound, thunder.id, terminalRef.current);
            }

            // Play rock sound with logo animation
            const rock = await playSound(howlerTwoRef, 'rock');
            if (rock) {
                await fadeInSecond(logoRef.current, rock.sound, rock.id);
                setTimeout(() => rock.sound.stop(rock.id), isMobile ? 2000 : 3000);
            }

            // Show tap text
            await new Promise((res) => setTimeout(res, isMobile ? 1500 : 3000));
            gsap.to(tapTextRef.current, {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
            });

            // Play metal sound in background
            const metal = await playSound(howlerThreeRef, 'metal');
            if (metal) {
                setTimeout(() => metal.sound.stop(metal.id), isMobile ? 5000 : 8000);
            }
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
                onLoad={() => console.log("Thunder sound loaded")}
                onLoadError={(id, err) => console.error("Thunder load error", err)}
            />
            <ReactHowler
                src="/sounds/rock.mp3"
                playing={false}
                html5={true}
                ref={howlerTwoRef}
                volume={1}
                preload={true}
                onLoad={() => console.log("Rock sound loaded")}
                onLoadError={(id, err) => console.error("Rock load error", err)}
            />
            <ReactHowler
                src="/sounds/metal.mp3"
                playing={false}
                html5={true}
                ref={howlerThreeRef}
                volume={1}
                preload={true}
                onLoad={() => console.log("Metal sound loaded")}
                onLoadError={(id, err) => console.error("Metal load error", err)}
            />

            <div ref={terminalRef} className="z-20 opacity-0">
                <TerminalStartup />
            </div>

            <div
                ref={logoRef}
                className="z-30 absolute inset-0 flex flex-col items-center justify-center opacity-0"
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
                    className="text-white text-lg md:text-xl mt-4 opacity-0"
                >
                    Tap to view
                </p>
            </div>
        </div>
    );
};

export default PostLoading;