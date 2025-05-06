import React from 'react';
import { motion } from 'framer-motion';

const organizers = [
    { imageSrc: '/logos/amfoss.png' },
    { imageSrc: '/logos/campervan.png' },
    { imageSrc: '/logos/cisai.jpeg.jpg' },
    { imageSrc: '/logos/Devops.png' },
    { imageSrc: '/logos/nvidia.png' },
    { imageSrc: '/logos/pngwing.png' },
    { imageSrc: '/logos/tbi.png' },
    { imageSrc: '/logos/orofin.png' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const OrganizersGrid = () => {
    return (
        <section className="pt-20 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-5xl font-bold text-black">Meet the Organizers</h2>
                    </div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        The brilliant minds and tireless hands that bring Vidyut '25 to life.
                    </p>
                </div>

                {/* Desktop and Tablet Grid */}
                <div className="hidden sm:flex flex-wrap justify-center gap-10 mb-16">
                    {organizers.map((org, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-center p-6 bg-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group h-40 w-48"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <img
                                src={org.imageSrc}
                                alt={`Organizer ${index + 1}`}
                                className="max-h-32 max-w-[140px] object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="sm:hidden overflow-x-auto pb-6 scrollbar-hide">
                    <div className="inline-flex space-x-6 min-w-full px-4">
                        {organizers.map((org, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center justify-center flex-shrink-0 w-48 h-40 p-6 bg-transparent rounded-xl shadow-md"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={org.imageSrc}
                                    alt={`Organizer ${index + 1}`}
                                    className="max-h-28 max-w-[120px] object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizersGrid;
