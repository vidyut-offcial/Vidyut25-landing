'use client';

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/blur";
import { TextFade } from "@/components/FadeUp";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { motion } from "framer-motion";
import Image from "next/image";

const Proshow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const dayTitles = ["Day 1", "Day 2", "Day 3"];
    const dayDescriptions = [
        "A night of electrifying performances and unforgettable energy. Let the Revel begin!",
        "The rhythm intensifies—immerse in soulful melodies and dynamic stage vibes.",
        "The grand finale—where energy meets emotion. An explosive end to Revel ‘25!"
    ];

    const marqueeImages = [
        "/pro_output/photo1.webp", "/pro_output/photo2.webp", "/pro_output/photo3.webp",
        "/pro_output/photo4.webp", "/pro_output/photo6.webp", "/pro_output/photo7.webp",
        "/pro_output/photo8.webp", "/pro_output/photo9.webp", "/pro_output/photo10.webp",
        "/pro_output/photo11.webp", "/pro_output/photo12.webp", "/pro_output/photo13.webp",
        "/pro_output/photo14.webp", "/pro_output/photo15.webp", "/pro_output/photo16.webp",
        "/pro_output/photo3.webp", "/pro_output/photo15.webp", "/pro_output/photo17.webp",
        "/pro_output/photo18.webp", "/pro_output/photo7.webp", "/pro_output/photo10.webp",
        "/pro_output/photo19.webp", "/pro_output/photo20.webp", "/pro_output/photo1.webp",
        "/pro_output/photo15.webp", "/pro_output/photo2.webp", "/pro_output/photo3.webp",
        "/pro_output/photo4.webp", "/pro_output/photo5.webp", "/pro_output/photo6.webp",
        "/pro_output/photo7.webp", "/pro_output/photo8.webp", "/pro_output/photo9.webp",
        "/pro_output/photo10.webp", "/pro_output/photo11.webp"
    ];

    const cardImages = [
        "https://vidyut-assets.s3.ap-south-1.amazonaws.com/images/Untitled-2.png",
        "https://vidyut-assets.s3.ap-south-1.amazonaws.com/images/cherionite.jpg",
        "https://vidyut-assets.s3.ap-south-1.amazonaws.com/images/HARICHARAN.png",
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Background */}
            {backgroundImage ? (
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src={backgroundImage}
                        alt="Selected Background"
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
            ) : (
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <ThreeDMarquee images={marqueeImages} className="opacity-60" />
                </motion.div>
            )}

            {/* Title + Description */}
            <div className="absolute z-50 top-1/2 sm:left-[5vw] left-1/2 transform -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 px-6 sm:px-0 w-full sm:w-auto text-center sm:text-left">
                <div className="rounded-xl max-w-2xl mx-auto sm:mx-0 pointer-events-auto">
                    <GradualSpacing
                        key={selectedDay}
                        text={selectedDay !== null ? dayTitles[selectedDay] : "Revel'25"}
                    />
                    <TextFade direction="up" className="pt-6 sm:pt-10">
                        <div className="text-zinc-200 text-[clamp(1rem,4vw,1.2rem)] font-medium tracking-wide drop-shadow-xl leading-snug sm:leading-relaxed">
                            {selectedDay !== null
                                ? dayDescriptions[selectedDay]
                                : "Three nights of rhythm, revelry, and raw energy await you! Immerse yourself in a whirlwind of pulsating beats and pure excitement as Vidyut Revel '25 blurs the line between art and magic. This isn’t just an event—it’s an experience."}
                        </div>
                    </TextFade>
                    <a
                        href="https://vidyut.ulsav.com/e/revel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Get your tickets now
                    </a>
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 h-full w-full z-10 pointer-events-none">
                <div className="absolute top-0 sm:h-[20vh] h-1/4 w-full bg-gradient-to-b from-black to-transparent" />
                <div className="absolute top-0 left-0 h-full w-1/2 sm:w-[150vh] bg-gradient-to-r from-black via-black/80 via-40% to-transparent to-90%" />
                <div className="absolute bottom-0 sm:h-[60vh] h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Cards */}
            <motion.div
                className="absolute bottom-5 w-full px-4 z-30 flex justify-center sm:justify-end gap-4 flex-wrap"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                {cardImages.map((src, index) => (
                    <motion.div
                        key={index}
                        className="relative w-[40vw] sm:w-[200px] aspect-[3/2] sm:aspect-[2/1] rounded-lg overflow-hidden shadow-lg bg-zinc-800 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                            setBackgroundImage(src);
                            setSelectedDay(index);
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Card ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-1 left-1 font-bold text-white text-xs sm:text-sm px-2 py-1 rounded bg-black/50">
                            Day {index + 1}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Proshow;
