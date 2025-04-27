'use client';

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/blur";
import { TextFade } from "@/components/FadeUp";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import {GradualSpacing} from "@/components/ui/gradual-spacing";
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
    const [isHovering, setIsHovering] = useState(false);

    // Update mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-black">

            {/* Logo */}
            <div className="absolute z-60   bottom-1/3 left-1/12 inset-0 flex flex-col items-start justify-center pointer-events-none space-y-4 ">
                <GradualSpacing text={'REVEL 25'}></GradualSpacing>
                <TextFade direction="up" className="pt-0 pb-5 flex flex-col justify-center items-center space-y-2">
                    <div className=" relative font-semibold top-3 left-2 tracking-widest prose-p:my-1 md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300 drop-shadow-2xl">
                        coming soon...
                    </div>
                </TextFade>
            </div>
            <div className="absolute bottom-0 h-1/2 w-full z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,1)_28%,rgba(141,196,204,0)_100%)]" />
            <div className="absolute left-0 top-0 h-full w-[900px] z-10 pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,1)_48%,rgba(141,196,204,0)_100%)]" />



            {/* Render the marquee in the background */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="w-full h-full"
            >
                <ThreeDMarquee images={images} className="opacity-50" />
            </motion.div>

        </div>
    );
};

export default Proshow;
