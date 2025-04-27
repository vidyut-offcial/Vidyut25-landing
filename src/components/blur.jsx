'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export const BlurIn = ({ children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <motion.h2
            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 2.2 }}
            className="text-4xl text-center sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-tight"
        >
            {children}
        </motion.h2>
    );
};
