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
            opacity: 0.3, // Make it semi-transparent since it's in the background
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.16, 0.77, 0.47, 0.97],
                delay: 1.5 // Appears after other animations
            }
        }
    };

    return (
        <div ref={ref} className="relative w-full h-[1000px] bg-black overflow-hidden">

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
            >

            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />

            {/* Logo in the background */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-5 ml-[800px] mb-[300px]"
                initial="hidden"
                animate={controls}
                variants={{
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
                }}
            >
                <img
                    src="/images/logo.svg"
                    alt="Logo"
                    className="w-[800px] h-auto mix-blend-lighten opacity-30"
                />
            </motion.div>

            {/* Content container */}
            <div className="relative z-20 h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 pt-[15%]">

                <motion.h1
                    className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 relative"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    Auto<span className="text-blue-400">show</span>
                </motion.h1>

                <motion.p
                    className="text-gray-300 text-lg md:text-2xl lg:text-3xl max-w-2xl mb-8 relative"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    Experience the future of automotive excellence
                </motion.p>

                <motion.button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-all relative z-30"
                    variants={buttonVariants}
                    initial="hidden"
                    animate={controls}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Explore Vehicles
                </motion.button>
            </div>

            {/* Car with separate vignette */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-full z-10">
                <motion.img
                    src="/images/CarBG.png"
                    alt="Car"
                    className="w-full object-contain"
                    initial="hidden"
                    animate={controls}
                    variants={carVariants}
                />
            </div>
        </div>
    );
};

export default HeroSection;