"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const startupLines = [
    "Initiating core protocols...",
    "Fetching neural substrates...",
    "Calibrating quantum cache...",
    "Verifying model integrity...",
    "Spooling tensor cores...",
    "Establishing low-latency grid...",
    "Loading interdimensional drivers...",
    "Synchronizing deep memory nodes...",
    "Igniting entropy stabilizers...",
    "Deploying auto-scaling shards...",
    "setting up pipelines...",
    "Compiling temporal heuristics...",
    "Activating recursive feedback loop...",
    "Decrypting biosynthetic schema...",
    "Injecting hyperspace credentials...",
    "Cascading zero-trust firewalls...",
    "Linking bio-cyber interfaces...",
    "Initiating sentience limiter...",
    "Assembling cognitive mesh...",
    "downloading 3d model...",
    "setting up scene",
    "finishing up...."
];

export default function TerminalStartup() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex < startupLines.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
            }, 500); // Delay before switching to next line
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex]);

    return (
        <div className=" sm:p-6 mb-20 rounded-lg shadow-lg min-h-[70vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentLineIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-white sm:text-xl text-center sm:font-frontage-bold font-mono tracking-widest whitespace-nowrap"
                    style={{
                        filter: "blur(0px)",
                        textShadow: "0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6)",
                    }}
                >
                    {startupLines[currentLineIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
