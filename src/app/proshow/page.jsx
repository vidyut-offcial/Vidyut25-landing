'use client';

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/blur";
import { TextFade } from "@/components/FadeUp";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { motion } from "framer-motion";

const Proshow = () => {
    const images =[
            "/pro_output/photo1.webp",
        "/pro_output/photo2.webp",
        "/pro_output/photo3.webp",
        "/pro_output/photo4.webp",
        "/pro_output/photo5.webp",
        "/pro_output/photo6.webp",
        "/pro_output/photo7.webp",
        "/pro_output/photo8.webp",
        "/pro_output/photo9.webp",
        "/pro_output/photo10.webp",
        "/pro_output/photo11.webp",
        "/pro_output/photo12.webp",
        "/pro_output/photo13.webp",
        "/pro_output/photo14.webp",
        "/pro_output/photo15.webp",
        "/pro_output/photo16.webp",
        "/pro_output/photo17.webp",
        "/pro_output/photo18.webp",
        "/pro_output/photo19.webp",
        "/pro_output/photo20.webp",
        "/pro_output/photo1.webp",
        "/pro_output/photo2.webp",
        "/pro_output/photo3.webp",
        "/pro_output/photo4.webp",
        "/pro_output/photo5.webp",
        "/pro_output/photo6.webp",
        "/pro_output/photo7.webp",
        "/pro_output/photo8.webp",
        "/pro_output/photo9.webp",
        "/pro_output/photo10.webp",
        "/pro_output/photo11.webp",
        "/pro_output/photo4.webp",
        "/pro_output/photo5.webp",
        "/pro_output/photo6.webp",
        "/pro_output/photo7.webp",
        "/pro_output/photo8.webp",
        "/pro_output/photo9.webp",
        "/pro_output/photo10.webp",
        "/pro_output/photo11.webp",
        "/pro_output/photo12.webp",
        "/pro_output/photo13.webp",
        "/pro_output/photo14.webp",
        "/pro_output/photo15.webp",
        "/pro_output/photo16.webp",
        "/pro_output/photo17.webp",
        "/pro_output/photo18.webp",
        "/pro_output/photo19.webp",
        "/pro_output/photo20.webp",
        "/pro_output/photo1.webp",
        "/pro_output/photo2.webp",
        "/pro_output/photo3.webp",
        "/pro_output/photo4.webp",

];

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-[100vh] relative overflow-hidden bg-black">
            {/* Logo Section */}
            <div
                className="
                    absolute z-40
                    bottom-1/7
                    sm:top-1/2 bottom-0 sm:bottom-[50vh]
                    left-1/2 sm:left-[5vw]
                    transform -translate-x-1/2 sm:translate-x-0
                    flex flex-col items-center sm:items-start justify-center
                    space-y-4 pointer-events-none
                    text-center sm:text-left
                    text-5xl
                    sm:pb-20 sm:pt-0 pb-5 pt-10 sm:space-y-8
                    sm:relative sm:z-40
                    sm:opacity-100
                "
            >
                <GradualSpacing
                    text="Revel'25"
                />
                <TextFade direction="up" className="pt-0">
                    <div className="
                        text-zinc-300
                        text-[clamp(1rem,2vw,1.2rem)]
                        font-medium
                        tracking-wide
                        mt-5.5
                        max-w-5xl sm:max-w-3xl  /* Increased text width for mobile */
                        drop-shadow-md
                    ">
                        Three nights of rhythm, revelry, and raw energy await you! Immerse yourself in a whirlwind of pulsating beats and pure excitement as Vidyut Revel '25 blurs the line between art and magic. This isn’t just an event—it’s an experience.
                    </div>
                </TextFade>
                <a
                    href="https://vidyut.ulsav.com/e/revel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-block
                        bg-amber-400
                        hover:bg-amber-500
                        text-black
                        font-semibold
                        text-sm
                        px-6
                        py-3
                        rounded-lg
                        shadow-lg
                        transition-all
                        duration-300
                        pointer-events-auto
                    "
                >
                    Get your tickets now
                </a>
            </div>

            {/* Gradient overlay for mobile view */}
            <div className="absolute top-0 left-0 h-full w-full z-10 pointer-events-none">
                <div className="absolute top-0 sm:h-[20vh] h-1/4 w-full bg-gradient-to-b from-black to-transparent" />
                <div className="absolute top-0 left-0 h-full w-1/2 sm:w-[150vh] bg-gradient-to-r from-black via-black/80 via-40% to-transparent to-90%" />
                <div className="absolute bottom-0 sm:h-[60vh] h-1/2 w-full bg-gradient-to-t from-black to-transparent " />
            </div>

            {/* Marquee Section */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
            >
                <ThreeDMarquee images={images} className="opacity-60" />
            </motion.div>
        </div>
    );
};

export default Proshow;
