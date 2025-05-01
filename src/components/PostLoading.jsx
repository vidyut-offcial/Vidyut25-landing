import React, {useEffect, useRef, useState} from "react";
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

const PostLoading = ({setRevel}) => {
    const logoRef = useRef(null);
    const terminalRef = useRef(null);
    const howlerOneRef = useRef();
    const howlerTwoRef = useRef();
    const howlerThreeRef = useRef();

    const [hasInteracted, setHasInteracted] = useState(false);

    const startFade = ()=>{
        console.log("start");
        setRevel(true);
        gsap.to(logoRef, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });
    }
    const playFadeInOut = (
        ref,
        element = null,
        fadeDuration = 2000,
        holdDuration = 10000
    ) => {
        return new Promise((resolve) => {
            const sound = ref.current?.howler;
            if (!sound) return resolve();

            const id = sound.play();
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


    const playAndFadeInWithElement = (ref, element = null, fadeDuration = 2000) => {
        return new Promise((resolve) => {
            const sound = ref.current?.howler;
            if (!sound) return resolve();

            const id = sound.play();

            const fadeAudio = new Promise((res) => {
                sound.fade(0, 1, fadeDuration, id);
                setTimeout(res, fadeDuration);
            });

            const fadeVisual = element
                ? gsap.to(element, {
                    opacity: 1,
                    duration: fadeDuration / 1000,
                    ease: "power2.out",
                })
                : Promise.resolve();

            Promise.all([fadeAudio, fadeVisual]).then(() =>
                resolve({ sound, id })
            );
        });
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

    const startSequence = async () => {
        await playFadeInOut(howlerOneRef, terminalRef.current, 2000, 10000);
        await playAndFadeInWithElement(howlerTwoRef, logoRef.current, 2000);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const {id: thirdId } = playSound(howlerThreeRef);

    };

    const isMobile = useIsMobile();

  useEffect(() => {

    if (!isMobile) {
      startSequence();
    }
  }, [isMobile]);
    const handleStart = () => {
      setHasInteracted(true);
        startSequence();
    };

    // ------------------------------------------------------------------------>
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
  //
  // const handleStart = () => {
  //   setHasInteracted(true);
  //   startSequence().then(() => {
  //     sessionStorage.setItem("hasSeenLoadingScreen", "true");
  //   });
  // };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
            {!hasInteracted && isMobile && (
                <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
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

            {/* Second sound */}
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
                <button className="flex items-center justify-center"
                        onClick={startFade}
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
