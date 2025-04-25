'use client';

import React, { useEffect, useState } from "react";
import { BlurIn } from "@/components/blur";
import { TextFade } from "@/components/FadeUp";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";

const Test = () => {
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
            <div className="absolute bottom-1/7 inset-0 flex flex-col items-center justify-center z-30 pointer-events-none space-y-4 text-center">
                <BlurIn>Revel 25</BlurIn>
                <TextFade direction="up" className="pt-0 pb-5 flex flex-col justify-center items-center space-y-2">
                    <div className="font-semibold prose-p:my-1 md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300 drop-shadow-2xl">
                        coming soon...
                    </div>
                </TextFade>
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full bg-black opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-60" />
            </div>
            {/* Dark Vignette with Mouse Hover Spotlight */}
            <div className="absolute top-0 left-0 w-full h-full">
                {/* Render the marquee in the background */}
                <ThreeDMarquee images={images}/>

                {/* Overlay on top of marquee */}
                <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                        background: 'rgba(3, 3, 3, 0.90)', // Semi-transparent dark overlay
                        zIndex: 10, // higher than the marquee
                        WebkitMaskImage: isHovering
                            ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                            : 'none',
                        maskImage: isHovering
                            ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                            : 'none',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                    }}
                />

                {/* Optional: Spotlight effect on hover */}
                {isHovering && (
                    <div
                        style={{
                            position: 'absolute',
                            top: mousePosition.y - 50,
                            left: mousePosition.x - 150,
                            zIndex: 20, // above both the marquee and overlay
                        }}
                    >
                        {/* You can add spotlight visuals here */}
                    </div>
                )}
            </div>

            {/* You can track mouse hovering with a listener */}
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="absolute inset-0 z-20"
            ></div>
        </div>
    );
};

export default Test;
