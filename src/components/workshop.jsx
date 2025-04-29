'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import { GlareCard } from "@/components/ui/glare-card";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { getAllEvents, domain } from '@/data/data-placeholder';
import {BackgroundBeams} from "@/components/backgroundbeem";

const SwiperCoverflow = () => {
    const router = useRouter();
    const events = getAllEvents();
    const [backgroundImage, setBackgroundImage] = useState('');
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
            className="relative w-screen h-screen transition-all duration-500 ease-in-out overflow-hidden py-20"
            style={{
                backgroundImage: `url(${encodeURI(backgroundImage)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-black opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-30" />
            </div>

            <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center z-20 sm:space-y-10  ">
                <GradualSpacing text="Flagship Events" />
                <button
                    className="bg-slate-800 no-underline mt-10 mb-10 group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                    onClick={() => router.push(domain)}
                >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="relative flex   items-center rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                        <span>View More</span>
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

            <div className="relative z-10 w-screen h-screen">
                <div className="absolute bottom-1/7 left-1/2 -translate-x-1/2 w-full max-w-7xl px-5">



                    <Swiper
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        loop
                        slidesPerView={3}
                        initialSlide={Math.floor(events.length / 2)}
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
                        {events.map((event, i) => (
                            <SwiperSlide key={event.slug} className="flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setBackgroundImage(event.image);
                                        swiperRef.current?.slideToLoop(i);
                                    }}
                                >
                                    <GlareCard
                                        className={`relative w-[320px] h-[400px] sm:w-[350px] sm:h-[400px] xs:w-[240px] xs:h-[320px] overflow-hidden rounded-2xl transition-all duration-300 ${activeIndex === i ? 'grayscale-0' : 'grayscale opacity-90'}`}
                                    >
                                        <div className="relative w-full h-full ">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 300px"
                                                priority={i === Math.floor(events.length / 2)}
                                            />
                                            {/* Title overlay */}
                                            <div className="absolute bottom-4 left-4 text-white font-bold text-lg z-10">{event.title}</div>
                                        </div>
                                    </GlareCard>
                                </motion.div>
                            </SwiperSlide>

                        ))}
                    </Swiper>

                    {/* Register button positioned below the cards */}
                    <motion.div
                        className="w-full flex justify-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 sm:px-8 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 sm:mr-20 mr-0"
                            onClick={() => {
                                router.push(`${domain}${events[activeIndex].slug}`);
                            }}
                        >
                            Register Now
                        </button>
                    </motion.div>
                </div>
            </div>
            {!backgroundImage && (
                <BackgroundBeams/>
            )}
        </div>
    );
};

export default SwiperCoverflow;