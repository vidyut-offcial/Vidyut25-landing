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
        <div ref={ref} className="relative w-full h-[1300px] bg-black overflow-hidden">
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


            <motion.div
                className="absolute inset-0 flex items-center justify-center z-5 bottom-[750px]"

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
  className="font-frontage-bold hover:text-transparent text-[300px] leading-none pointer-events-none select-none mix-blend-lighten transition-all duration-500 text-white"
  style={{
    WebkitTextStroke: '2px white',
    textShadow: `
      0 0 5px white,
      0 0 10px white,
      0 0 20px white,
      0 0 40px white
    `,
  }}
>
  VIDYUT
</span>


            </motion.div>

            {/* Content container */}
            <div className="relative z-20 h-full flex flex-col items-end justify-center px-8 md:px-16 lg:px-24 pt-[20%]">
                <motion.h1
                    className="font-bold text-5xl md:text-7xl lg:text-8xl mb-8 relative group transition-all duration-500  text-right h-[80px]"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {/* AUTO part */}
                    <span
                        className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent transition-all duration-500"
                    >
                        Auto
                    </span>

                    {/* SHOW part */}
                    <span
                        className="bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent transition-all duration-500 ml-2"
                    >
                        Show
                    </span>
                </motion.h1>

                <motion.div
                    className="w-fit "
                    variants={buttonVariants}
                    initial="hidden"
                    animate={controls}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <button className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-[20px] text-lg font-semibold shadow-lg transition-all duration-300 mr-[10px]">
                        Explore Vehicles
                    </button>
                </motion.div>
            </div>


            <div className="absolute bottom-1/8 left-1/2 transform -translate-x-1/2 w-11/12 md:w-full z-10">
                <motion.img
                    src="/images/CarBG.png"
                    alt="Car"
                    className="w-full object-contain"
                    initial="hidden"
                    animate={controls}
                    variants={carVariants}
                />
            </div>
            <div className="absolute bottom-0 h-1/2 w-full z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,1)_28%,rgba(141,196,204,0)_100%)]" />
            <div className="absolute top-0 h-1/6 w-full z-10 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_18%,rgba(141,196,204,0)_100%)]" />


        </div>
    );
};

export default HeroSection;