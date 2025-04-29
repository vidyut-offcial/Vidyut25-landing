'use client';

import React from 'react';
import { motion } from "motion/react";
import {cn} from "@/lib/utils";

export const ThreeDMarquee = ({ images, className }) => {
    const chunkSize = Math.ceil(images.length / 6);
    const chunks = Array.from({ length: 6 }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return images.slice(start, start + chunkSize);
    });

    return (
        <div className={cn("mx-auto block h-[1000px]  overflow-hidden rounded-2xl max-sm:h-100", className)}>
            <div className="flex size-full items-center justify-center">

                <div className="size-[2320px] shrink-0 scale-100 sm:scale-75 lg:scale-100">
                    <div
                        style={{
                            transform: "rotateX(35deg) rotateY(-19deg) rotateZ(20deg)",
                        }}
                        className="relative top-1/4 left-1/8 grid size-full grid-cols-6 gap-12 transform-3d"
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
                                className="flex flex-col items-start gap-8"
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
