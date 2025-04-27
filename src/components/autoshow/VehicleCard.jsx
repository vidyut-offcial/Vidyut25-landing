import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 transform scale-x-[-1] z-0 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `scale(-1, 1) ${scrolled ? 'translateY(-5%)' : 'translateY(0%)'}`,
        }}
      >
        <div className="w-full h-full bg-black opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
        <h1 
          className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 md:mb-6
                    opacity-0 animate-[fadeSlideUp_1s_ease-out_0.2s_forwards]"
        >
          Auto<span className="text-blue-400">show</span>
        </h1>
        
        <p 
          className="text-gray-200 text-xl md:text-2xl lg:text-3xl max-w-md md:max-w-xl lg:max-w-2xl mb-8 md:mb-10
                    opacity-0 animate-[fadeSlideUp_1s_ease-out_0.4s_forwards]"
        >
          Experience the future of automotive excellence
        </p>
        
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md 
                    text-lg font-medium transition-all duration-300 
                    opacity-0 animate-[fadeSlideUp_1s_ease-out_0.6s_forwards]"
        >
          Explore Vehicles
        </button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 
                    animate-bounce opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
        <ChevronDown size={32} className="text-white opacity-80" />
      </div>
    </div>
  );
};

export default HeroSection;