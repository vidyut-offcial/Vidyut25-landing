'use client';

import { useState, useEffect, useRef } from 'react';
import MotionCarousel from './MotionCarousel';
import Image from 'next/image';
import gsap from 'gsap';

const contentItems = [
  {
    id: '01',
    title: 'Commuter',
    image: 'https://images.unsplash.com/photo-1595265677860-9a3168007dc0?auto=format&fit=crop&w=800&q=60',
    description: 'An insurance salesman gets caught up in a criminal conspiracy during his daily commute home that puts him and everyone around him in danger.',
  },
  {
    id: '02',
    title: 'Television',
    image: 'https://images.unsplash.com/photo-1594786118579-95ba90c801ec?auto=format&fit=crop&w=800&q=60',
    description: 'When a television show predicts the future with alarming accuracy, a detective must race against time to prevent a catastrophe.',
  },
  {
    id: '03',
    title: 'Stranger',
    image: 'https://images.unsplash.com/photo-1509339022327-1e1e25360a41?auto=format&fit=crop&w=800&q=60',
    description: 'A group of friends encounter a mysterious entity in their small town, leading to a series of supernatural events.',
  },
  {
    id: '04',
    title: 'King Kong',
    image: 'https://images.unsplash.com/photo-1525417071002-5ee4e6bb44f7?auto=format&fit=crop&w=800&q=60',
    description: 'A film crew discovers a colossal ape on a remote island and brings him back to civilization, with catastrophic consequences.',
  },
  {
    id: '05',
    title: 'Apes',
    image: 'https://images.unsplash.com/photo-1594072702031-f0e2a602dd2c?auto=format&fit=crop&w=800&q=60',
    description: 'In a world where apes have evolved to possess human-like intelligence, the struggle for dominance begins.',
  },
  {
    id: '06',
    title: 'Deep Water',
    image: 'https://images.unsplash.com/photo-1592989819277-a3aafa40c66a?auto=format&fit=crop&w=800&q=60',
    description: 'A deep-sea exploration team encounters an ancient creature that threatens their mission and their lives.',
  },
];

export default function EventsSection() {
  const [activeContent, setActiveContent] = useState(contentItems[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const bgImageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const indicatorsRef = useRef(null);

  const handleActiveContentChange = (imageUrl, index, content) => {
    if (content && !isTransitioning && index !== activeIndex) {
      console.log("Changing to index:", index);
      setActiveIndex(index);
      setIsTransitioning(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveContent(content);
          setIsTransitioning(false);
          
          gsap.fromTo(contentRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }
      });
      
      tl.to(contentRef.current, { 
        opacity: 0, 
        y: -20, 
        duration: 0.4, 
        ease: "power2.in" 
      });
      
      tl.to(bgImageRef.current, { 
        scale: 1.05, 
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.7,
        ease: "power2.inOut" 
      }, "<");
      
      tl.to(bgImageRef.current, { 
        scale: 1, 
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out" 
      }, "<");
      
      if (indicatorsRef.current) {
        const indicators = [...indicatorsRef.current.children];
        indicators.forEach((indicator, i) => {
          if (i === index) {
            gsap.to(indicator, { backgroundColor: "#FFFFFF", scale: 1, duration: 0.3 });
          } else {
            gsap.to(indicator, { backgroundColor: "rgba(255,255,255,0.3)", scale: 0.75, duration: 0.3 });
          }
        });
      }
    }
  };

  const handleManualIndexChange = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      console.log("Manual change to index:", index);
      
      const content = contentItems[index];
      handleActiveContentChange(content.image, index, content);
      
      if (window) {
        const customEvent = new CustomEvent('setCarouselIndex', { 
          detail: { index }
        });
        window.dispatchEvent(customEvent);
      }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    
    gsap.fromTo(
      bgImageRef.current,
      { scale: 1.1, filter: "blur(5px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
    );
    
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
    
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    
    const handleSetCarouselIndex = (e) => {
      console.log("Custom event received", e.detail);
    };
    
    window.addEventListener('setCarouselIndex', handleSetCarouselIndex);
    
    return () => {
      window.removeEventListener('setCarouselIndex', handleSetCarouselIndex);
    };
  }, []);

  return (
    <section
      id="events-section"
      className="h-screen w-screen select-none bg-black relative flex flex-col items-center justify-center overflow-hidden"
    >
      <div 
        ref={bgImageRef}
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src={activeContent.image}
          alt="Background"
          fill
          className="object-cover"
          draggable={false}
          priority
        />
      </div>

      <div 
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,_black_10%,_transparent_40%),linear-gradient(to_bottom,_black_10%,_transparent_40%),linear-gradient(to_left,_black_1%,_transparent_40%),linear-gradient(to_right,_black_1%,_transparent_40%)]" 
      />

      <div 
        ref={contentRef}
        className="absolute left-16 top-1/3 z-20 max-w-2xl text-white"
      >
        <div className="flex items-center mb-2">
          <span className="text-8xl font-bold text-white/50 mr-2">{activeContent.id}</span>
          <h1 className="text-8xl font-bold">{activeContent.title}</h1>
        </div>
        
        <p className="text-white/80 mb-6 pr-10 text-2xl">{activeContent.description}</p>
        
        <div className="flex items-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-2xl py-2 px-6 rounded-lg flex items-center transform hover:scale-105 transition-all cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Register
          </button>
          <button className="border border-white/50 text-2xl text-white hover:bg-white/10 py-2 px-4 rounded-lg transform hover:scale-105 transition-all cursor-pointer">
            + All Events
          </button>
        </div>
      </div>

      <div 
        ref={indicatorsRef}
        className="absolute bottom-36 left-16 z-20 flex space-x-3"
      >
        {contentItems.map((_, i) => (
          <div 
            key={i}
            onClick={() => handleManualIndexChange(i)}
            className={`w-10 h-1 cursor-pointer rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-white scale-100' : 'bg-white/30 scale-75 hover:bg-white/50'
            }`}
          ></div>
        ))}
      </div>

      <div className="absolute bottom-20 right-0 z-20 w-1/2">
        <MotionCarousel 
          ref={carouselRef}
          images={contentItems.map(item => item.image)} 
          contentItems={contentItems}
          onActiveImageChange={handleActiveContentChange}
          initialIndex={activeIndex}
        />
      </div>
    </section>
  );
}