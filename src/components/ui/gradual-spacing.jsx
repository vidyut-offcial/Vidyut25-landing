'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

export function GradualSpacing({ text = 'Gradual Spacing' }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <div className="flex flex-wrap  sm:gap-2 w-full text-center">
            <AnimatePresence>
                {text.split('').map((char, i) => (
                    <motion.span
                        ref={ref}
                        key={i}
                        initial={{ opacity: 0, x: -18 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        exit="hidden"
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white font-nexa"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}
