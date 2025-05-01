import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const HeroSection = () => {
    const [scrolled, setScrolled] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrolled(position > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97]
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97],
                delay: 0.6
            }
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
        tap: { scale: 0.98 }
    };

    const backgroundVariants = {
        hidden: { scale: 1.05, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.16, 0.77, 0.47, 0.97] }
        }
    };

    const carVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.16, 0.77, 0.47, 0.97], delay: 0.5 }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 0.3,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.16, 0.77, 0.47, 0.97],
                delay: 1.5
            }
        }
    };

    return (
        <div ref={ref} className="relative w-full h-[100vh]  bg-black overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/smoke.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                initial="hidden"
                animate={controls}
                variants={backgroundVariants}
            />

            <motion.div
                className="absolute inset-0 flex items-center justify-center z-5 bottom-[300px]"
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, scale: 1.2 },
                    visible: {
                        opacity: 0.1,
                        scale: 1,
                        transition: {
                            duration: 2,
                            ease: [0.16, 0.77, 0.47, 0.97],
                            delay: 1
                        }
                    }
                }}
            >
                <span
                    className="font-frontage-bold hover:text-transparent text-[60px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] leading-none pointer-events-none select-none mix-blend-lighten transition-all duration-500 text-white"
                >
                    VIDYUT
                </span>
            </motion.div>

            {/* Content container */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 sm:px-10 sm:items-end md:px-16 lg:px-24 pt-28 sm:pt-40 md:pt-56">
                <motion.h1
                    className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 relative group transition-all duration-500 text-center sm:text-right min-h-[60px] sm:min-h-[80px] md:min-h-[100px] leading-tight tracking-tight sm:mt-[150px]"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <span className="text-white transition-all duration-500 group-hover:blur-[1px]">
                        Auto
                    </span>
                    <span className="text-white transition-all duration-500 ml-3 group-hover:scale-105">
                        Expo
                    </span>
                </motion.h1>


            </div>

            <div className="absolute bottom-0 left-1/2 sm:top-1/8 transform -translate-x-1/2 w-[90%] sm:w-11/12 md:w-full z-10">
                <motion.img
                    src="/images/CarBG.png"
                    alt="Car"
                    className="w-full object-contain"
                    initial="hidden"
                    animate={controls}
                    variants={carVariants}
                />
            </div>

            <div className="absolute bottom-0 h-36 w-full z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,1)_28%,rgba(141,196,204,0)_100%)]" />
            <div className="absolute top-0 h-1/2 w-full z-10 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_18%,rgba(141,196,204,0)_100%)]" />
        </div>
    );
};

export default HeroSection;
