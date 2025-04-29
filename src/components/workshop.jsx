'use client';

import React, {useEffect, useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import {motion, useInView} from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import {GlareCard} from "@/components/ui/glare-card";
import {GradualSpacing} from "@/components/ui/gradual-spacing";

const images = [
    '/images/fly-high-drone.png',
    '/images/quantum-computing.png',
    '/images/silicon-to-circuits.png',
    '/images/tech-turf-robo-soccer.png',
    '/images/warr.jpg',
];

const SwiperCoverflow = () => {
    const [backgroundImage, setBackgroundImage] = useState('/images/galaxy-space-textured-background.jpg');
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (swiperRef.current) {
                swiperRef.current.update();
            }
        });

        const container = document.querySelector('.swiper');
        if (container) observer.observe(container);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="relative w-screen h-screen transition-all duration-500 ease-in-out overflow-hidden "
            style={{
                backgroundImage: `url(${encodeURI(backgroundImage)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh', width: '100vw'
            }}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full bg-black opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-30" />
            </div>
            {/* Vignette Overlay */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center z-20">
                <GradualSpacing text="Discover the Events" />

                <button className="bg-slate-800 no-underline mt-10 group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>{`View More`}</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M10.75 8.75L14.25 12L10.75 15.25"
                            ></path>
                        </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                </button>
            </div>

            {/* Swiper */}
            <div className="relative z-10 w-screen h-screen">
                <div className="absolute bottom-1/7 left-1/2 -translate-x-1/2 w-full max-w-7xl ">
                    <Swiper
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        loop
                        slidesPerView={3}
                        initialSlide={Math.floor(images.length / 2)} // ADD THIS LINE
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 200,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="w-full"
                    >

                    {images.map((src, i) => (
                            <SwiperSlide key={i} className="flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setBackgroundImage(src);
                                        swiperRef.current?.slideToLoop(i);
                                    }}
                                >
                                    <GlareCard
                                        className={`relative w-[320px] h-[400px] overflow-hidden rounded-2xl transition-all duration-300 ${
                                            activeIndex === i ? 'grayscale-0' : 'grayscale opacity-90'
                                        }`}
                                    >
                                        {activeIndex === i ?(
                                            <div className="absolute z-10 bottom-0 left-0 right-0">
                                                <div className="w-full h-100 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-1">
                                                        <span className="text-xl font-semibold p-3 mb-1 text-white">
                                                          Qubits Unleashed: Quantum Computing Workshop
                                                        </span>
                                                    <button className=" w-1/3 bg-yellow-300  m-3  mb-5 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition ">
                                                        Register
                                                    </button>
                                                </div>
                                            </div>


                                        ):''
                                        }
                                        <Image
                                            src={src}
                                            alt={`Slide ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                    </GlareCard>
                                </motion.div>


                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default SwiperCoverflow;
