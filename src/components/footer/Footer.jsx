import React from 'react';
import { FAQSection } from './FAQSection';
import { AskEcho } from '@/components/Ask-Echo';
import { SocialLinks } from './SocialLinks';
import { VidyutLogo } from '../VidyutLogo';

const Footer = () => {
    return (
        <footer className="bg-black/40 backdrop-blur-[8px]  text-white ">
            <div className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex justify-center items-center mb-20">
                    <VidyutLogo />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
                        <FAQSection />
                    </div>

                    <div className="space-y-8">
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold mb-6">Ask Echo</h3>
                            <AskEcho />
                        </div>

                        {/* Mobile View */}
                        <div className="flex flex-col items-center justify-center md:hidden">
                            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
                            <SocialLinks />
                        </div>

                        {/* Desktop and above */}
                        <div className="hidden md:block">
                            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
                            <SocialLinks />
                        </div>

                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} Vidyut2025. All rights reserved.</p>
                    <div className="mt-4 sm:mt-0 flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
