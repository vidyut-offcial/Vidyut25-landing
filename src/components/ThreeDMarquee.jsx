'use client';

import React from 'react';
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({ images, className }) => {
    const chunkSize = Math.ceil(images.length / 6);
    const chunks = Array.from({ length: 6 }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return images.slice(start, start + chunkSize);
    });

    return (
        <div className={cn("mx-auto block overflow-hidden rounded-2xl h-[700px] sm:h-[1000px]", className)}>
            <div className="flex size-full items-center justify-center">

                <div className="w-full sm:w-[1320px] md:w-[1920px] lg:w-[2320px] shrink-0 transform scale-95 sm:scale-75 lg:scale-100 mx-auto">
                    <div
                        className={`
                            relative 
                            grid 
                            grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 
                            gap-4 sm:gap-8 lg:gap-12 
                            items-center justify-center 
                            w-full h-full
                            [transform-style:preserve-3d]
                            transform
                            sm:[transform:rotateX(35deg)_rotateY(-19deg)_rotateZ(20deg)]
                        `}
                    >
                        {chunks.map((subarray, colIndex) => (
                            <motion.div
                                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                                transition={{
                                    duration: colIndex % 2 === 0 ? 10 : 15,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                                key={`${colIndex}-marquee`}
                                className="flex flex-col items-center gap-6"
                            >
                                {subarray.map((image, imageIndex) => (
                                    <div className="relative" key={`${imageIndex}-${image}`}>
                                        <motion.img
                                            whileHover={{
                                                y: -20,
                                                z: 100,
                                                scale: 1.03,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            src={image}
                                            alt={`Image ${imageIndex + 1}`}
                                            className="aspect-[700/800] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                                            width={770}
                                            height={700}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
