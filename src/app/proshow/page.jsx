'use client';

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/blur";
import { TextFade } from "@/components/FadeUp";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { motion } from "framer-motion";

const Proshow = () => {
    const images = [
        "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
        "https://assets.aceternity.com/animated-modal.png",
        "https://assets.aceternity.com/animated-testimonials.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
        "https://assets.aceternity.com/github-globe.png",
        "https://assets.aceternity.com/glare-card.png",
        "https://assets.aceternity.com/layout-grid.png",
        "https://assets.aceternity.com/flip-text.png",
        "https://assets.aceternity.com/hero-highlight.png",
        "https://assets.aceternity.com/carousel.webp",
        "https://assets.aceternity.com/placeholders-and-vanish-input.png",
        "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
        "https://assets.aceternity.com/signup-form.png",
        "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
        "https://assets.aceternity.com/spotlight-new.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
        "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
        "https://assets.aceternity.com/tabs.png",
        "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
        "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
        "https://assets.aceternity.com/glowing-effect.webp",
        "https://assets.aceternity.com/hover-border-gradient.png",
        "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
        "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
        "https://assets.aceternity.com/macbook-scroll.png",
        "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
        "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
        "https://assets.aceternity.com/multi-step-loader.png",
        "https://assets.aceternity.com/vortex.png",
        "https://assets.aceternity.com/wobble-card.png",
        "https://assets.aceternity.com/world-map.webp",
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
         sm:top-1/4 bottom-[50vh]
        left-1/2 sm:left-[5vw]
        transform -translate-x-1/2 sm:translate-x-0
        flex flex-col items-center sm:items-start justify-center
        space-y-4 pointer-events-none
        text-center sm:text-left
        text-5xl
    "
            >
                <GradualSpacing
                    text="REVEL 25"
                    className="
            text-white
            text-[clamp(2.5rem,10vw,6rem)]
            font-extrabold
            drop-shadow-xl
            leading-tight
        "
                />
                <TextFade direction="up" className="pt-0 pb-5">
                    <div className="
            text-zinc-300
            text-[clamp(1.2rem,5vw,2rem)]
            font-medium
            tracking-wide
            max-w-lg
            drop-shadow-md
        ">
                        coming soon...
                    </div>
                </TextFade>
            </div>



            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 h-full w-full z-10 pointer-events-none">
                <div className="absolute top-0 left-0 h-full sm:w-full bg-gradient-to-r from-black via-black/90 to-transparent" />
                <div className="absolute bottom-0 sm:h-[30vh] h-full w-full bg-gradient-to-t from-black to-transparent" />
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
