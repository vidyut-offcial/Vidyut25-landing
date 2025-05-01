'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

export function GradualSpacing({ text = 'Gradual Spacing' }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });
    return (
        <div className="flex space-x-1 justify-center font-nexa">
            <AnimatePresence>
                {text.split('').map((char, i) => (
                    <motion.p
                        ref={ref}
                        key={i}
                        initial={{ opacity: 0, x: -18 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        exit="hidden"
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-4xl text-center sm:text-4xl font-bold  md:text-9xl md:leading-[4rem] "
                    >
                        {char === ' ' ? <span>&nbsp;</span> : char}
                    </motion.p>
                ))}
            </AnimatePresence>
        </div>
    );
}