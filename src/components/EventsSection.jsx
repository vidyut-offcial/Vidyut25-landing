'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const GlowingEffect = ({ spread = 40, glow = true, disabled = false, proximity = 64, inactiveZone = 0.01 }) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      if (distance < proximity) {
        setIsHovering(true);
        ref.current.style.setProperty('--x', `${x}px`);
        ref.current.style.setProperty('--y', `${y}px`);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled, proximity]);

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 z-0 rounded-2xl transition-opacity duration-300 md:rounded-3xl ${isHovering && glow ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: `radial-gradient(${spread}rem circle at var(--x) var(--y), rgba(120, 130, 255, 0.15), transparent ${inactiveZone}%)`
      }}
    />
  );
};

const GridItem = ({ area, icon, title, description, image }) => {
  return (
    <div className={`h-full w-full list-none ${area}`}>
      <div className="relative h-full rounded-2xl bg-[rgba(0,0,0,0.65)] border border-gray-800 p-1 sm:p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-2 sm:gap-3 overflow-hidden rounded-xl p-3 sm:p-4 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 sm:gap-6 md:gap-10">
            <div className="w-fit rounded-lg border border-indigo-600 bg-indigo-900/30 p-1 sm:p-2">
              {icon}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-sans text-base sm:text-xl font-semibold text-balance text-white md:text-2xl line-clamp-2">
                {title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 md:text-base line-clamp-2 sm:line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpaceIcons = {
  rocket: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  ),
  planet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  galaxy: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M8 12a4 4 0 0 1 8 0"></path>
      <path d="M6 12a6 6 0 0 1 12 0"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
    </svg>
  ),
  alien: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M10.203 17.5c-1.44 0-2.234-.957-2.234-2.5V8.217c0-1.055.802-1.826 2.226-1.826s2.195.77 2.195 1.826v6.783c0 1.543-.752 2.5-2.188 2.5v0M12.5 5.5v2c0 1.215.957 2.2 2.56 2.2s2.44-.985 2.44-2.2v-2C17.5 4.814 21 3 21 3s-.974 17-6.5 17S8 3 8 3s3.5 1.814 3.5 2.5Z"></path>
    </svg>
  ),
  asteroid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M14 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-7"></path>
      <path d="M16.5 2.5 21 7"></path>
      <path d="m7.5 14.5 9-9"></path>
      <path d="M14.5 7.5c-.79.06-1.45.73-1.5 1.5-.06.78.6 1.45 1.38 1.5.79.05 1.46-.6 1.5-1.38.05-.8-.6-1.47-1.38-1.62Z"></path>
    </svg>
  ),
};

const contentItems = [
  {
    id: '01',
    title: 'Nebula Explorer',
    image: 'https://images.unsplash.com/photo-1595265677860-9a3168007dc0?auto=format&fit=crop&w=800&q=60',
    description: 'Journey through cosmic dust clouds and witness the birth of new stars in this immersive space adventure.',
    icon: SpaceIcons.rocket
  },
  {
    id: '02',
    title: 'Galactic Transmissions',
    image: 'https://images.unsplash.com/photo-1594786118579-95ba90c801ec?auto=format&fit=crop&w=800&q=60',
    description: 'Decode mysterious signals from deep space that may reveal advanced civilizations and their technologies.',
    icon: SpaceIcons.planet
  },
  {
    id: '03',
    title: 'Cosmic Anomaly',
    image: 'https://images.unsplash.com/photo-1509339022327-1e1e25360a41?auto=format&fit=crop&w=800&q=60',
    description: 'Investigate unexplained phenomena in the cosmos that challenge our understanding of physics and reality.',
    icon: SpaceIcons.star
  },
  {
    id: '04',
    title: 'Titan\'s Shadow',
    image: 'https://images.unsplash.com/photo-1525417071002-5ee4e6bb44f7?auto=format&fit=crop&w=800&q=60',
    description: 'Explore the massive moons of Saturn where ancient secrets and extraterrestrial possibilities await.',
    icon: SpaceIcons.galaxy
  },
  {
    id: '05',
    title: 'First Contact',
    image: 'https://images.unsplash.com/photo-1594072702031-f0e2a602dd2c?auto=format&fit=crop&w=800&q=60',
    description: 'Experience humanity\'s first encounter with an intelligent species from beyond our solar system.',
    icon: SpaceIcons.alien
  },
  {
    id: '06',
    title: 'Asteroid Mining',
    image: 'https://images.unsplash.com/photo-1592989819277-a3aafa40c66a?auto=format&fit=crop&w=800&q=60',
    description: 'Join the interplanetary gold rush as corporations compete for resources hidden within space rocks.',
    icon: SpaceIcons.asteroid
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
      setActiveIndex(index);
      setIsTransitioning(true);
      
      if (!contentRef.current || !bgImageRef.current) {
        setActiveContent(content);
        setIsTransitioning(false);
        return;
      }
      
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveContent(content);
          setIsTransitioning(false);
          
          if (contentRef.current) {
            gsap.fromTo(contentRef.current, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
          }
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
            gsap.to(indicator, { backgroundColor: "#A5B4FC", scale: 1, duration: 0.3 });
          } else {
            gsap.to(indicator, { backgroundColor: "rgba(165, 180, 252, 0.3)", scale: 0.75, duration: 0.3 });
          }
        });
      }
    }
  };

  const handleManualIndexChange = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      const content = contentItems[index];
      handleActiveContentChange(content.image, index, content);
      
      if (typeof window !== 'undefined') {
        const customEvent = new CustomEvent('setCarouselIndex', { 
          detail: { index }
        });
        window.dispatchEvent(customEvent);
      }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    
    if (bgImageRef.current && overlayRef.current && contentRef.current) {
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
    }
    
    const handleSetCarouselIndex = (e) => {};
    
    if (typeof window !== 'undefined') {
      window.addEventListener('setCarouselIndex', handleSetCarouselIndex);
      
      const handleResize = () => {
        if (contentRef.current) gsap.set(contentRef.current, { clearProps: "all" });
        if (bgImageRef.current) gsap.set(bgImageRef.current, { clearProps: "all" });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('setCarouselIndex', handleSetCarouselIndex);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section
      id="events-section"
      className="relative flex min-h-screen w-full flex-col items-center justify-center select-none overflow-hidden bg-black"
    >
      <div 
        ref={bgImageRef}
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}
      >
        <Image
          src={activeContent.image}
          alt="Background"
          fill
          className="object-cover"
          draggable={false}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-black/50 to-black/80"></div>
      </div>

      <div 
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,_black_10%,_transparent_40%),linear-gradient(to_bottom,_black_10%,_transparent_40%)]" 
      />

      <div className="relative z-50 flex h-screen w-screen flex-col px-3 sm:px-4 md:flex-row md:px-8 lg:px-12">
        <div 
          ref={contentRef}
          className="mt-12 sm:mt-16 md:mt-0 flex h-fit md:h-full flex-col items-start justify-center md:max-w-lg lg:max-w-2xl text-foreground"
        >
          <div className="flex items-center mb-1 sm:mb-2">
            <span className="mr-1 text-4xl font-bold text-indigo-500/50 sm:mr-2 sm:text-5xl md:text-4xl lg:text-6xl xl:text-8xl">{activeContent.id}</span>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-4xl lg:text-5xl xl:text-7xl">{activeContent.title}</h1>
          </div>
          
          <p className="mb-4 max-w-full pr-0 text-sm text-indigo-200/80 sm:mb-6 sm:text-base md:pr-10 md:text-lg lg:text-xl">{activeContent.description}</p>
          
          <div className="flex flex-col w-full sm:flex-row sm:flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl py-2 px-4 sm:px-6 rounded-lg flex items-center justify-center transform hover:scale-105 transition-all cursor-pointer sm:w-auto">
              <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Register
            </button>
            <button className="w-full border border-indigo-500/50 text-sm sm:text-base md:text-lg lg:text-xl text-indigo-300 hover:bg-indigo-900/30 py-2 px-4 rounded-lg transform hover:scale-105 transition-all cursor-pointer sm:w-auto">
              + All Events
            </button>
          </div>
          
          <div 
            ref={indicatorsRef}
            className="mt-6 sm:mt-8 flex relative space-x-2 sm:space-x-3"
          >
            {contentItems.map((_, i) => (
              <div 
                key={i}
                onClick={() => handleManualIndexChange(i)}
                className={`h-1 w-6 sm:w-8 md:w-10 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-indigo-400 scale-100' : 'bg-indigo-400/30 scale-75 hover:bg-indigo-400/50'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 -z-10 w-screen pb-12 h-full flex items-end justify-center md:items-center md:w-[50vw] md:pb-0">
          <MotionCarousel
            contentItems={contentItems}
            onActiveImageChange={handleActiveContentChange}
            initialIndex={activeIndex}
          />
        </div>
      </div>
    </section>
  );
}

const MotionCarousel = ({ contentItems, onActiveImageChange, initialIndex = 0 }) => {
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const menuWidth = useRef(0);
  const itemWidth = useRef(0);
  const wrapWidth = useRef(0);
  const scrollY = useRef(0);
  const y = useRef(0);
  const oldScrollY = useRef(0);
  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const lastActiveIndex = useRef(initialIndex);
  const [cardWidth, setCardWidth] = useState('75vw');
  const animationFrameId = useRef(null);
  const isComponentMounted = useRef(true);
  const gap = 16;

  const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

  const safeGetWidth = () => {
    if (!itemRefs.current[0]) return null;
    return itemRefs.current[0].clientWidth || null;
  };

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const safeDispose = (scroll) => {
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0 || itemWidth.current === 0 || wrapWidth.current === 0) return;
    
    gsap.set(items, {
      x: (i) => i * (itemWidth.current + gap) + scroll,
      modifiers: {
        x: (x) => {
          const s = wrap(
            -itemWidth.current - gap,
            wrapWidth.current - itemWidth.current,
            parseInt(x)
          );
          return `${s}px`;
        },
      },
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    isDragging.current = true;
    if (menuRef.current) menuRef.current.classList.add('is-dragging');
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    scrollY.current += (currentX - touchStartX.current) * 2.5;
    touchStartX.current = currentX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (menuRef.current) menuRef.current.classList.remove('is-dragging');
  };

  const handleExternalIndexChange = (e) => {
    if (!isComponentMounted.current) return;
    
    const { index } = e.detail;
    if (index >= 0 && index < contentItems.length && itemWidth.current > 0) {
      const targetX = -(index * (itemWidth.current + gap));
      scrollY.current = targetX;
      
      lastActiveIndex.current = index;
      
      y.current = targetX;
      safeDispose(y.current);

      const items = itemRefs.current.filter(Boolean);
      if (items.length > 0) {
        gsap.to(items, {
          skewX: -80 * 0.5,
          rotate: 80 * 0.01,
          scale: 1 - Math.min(100, Math.abs(120)) * 0.003,
          overwrite: true,
        });
      }
    }
  };

  const updateCardWidth = () => {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    if (width < 640) {
      setCardWidth('85vw');
    } else if (width < 768) {
      setCardWidth('65vw');
    } else if (width < 1024) {
      setCardWidth('45vw');
    } else if (width < 1280) {
      setCardWidth('35vw');
    } else {
      setCardWidth('30vw');
    }
  };

  useEffect(() => {
    isComponentMounted.current = true;
    const menu = menuRef.current;
    if (!menu) return;

    updateCardWidth();

    const render = () => {
      if (!isComponentMounted.current) return;
      animationFrameId.current = requestAnimationFrame(render);

      y.current = lerp(y.current, scrollY.current, 0.1);
      safeDispose(y.current);

      const scrollSpeed = y.current - oldScrollY.current;
      oldScrollY.current = y.current;

      const items = itemRefs.current.filter(Boolean);
      if (items.length > 0) {
        gsap.to(items, {
          skewX: -scrollSpeed * 0.5,
          rotate: scrollSpeed * 0.01,
          scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003,
          overwrite: true,
        });
      }

      if (typeof window !== 'undefined' && items.length > 0) {
        const center = window.innerWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        items.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elCenter = rect.left + rect.width / 2;
          const dist = Math.abs(center - elCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = i;
          }
        });

        if (closestIndex !== lastActiveIndex.current) {
          lastActiveIndex.current = closestIndex;
          const imageUrl = contentItems[closestIndex].image;
          const content = contentItems[closestIndex];
          onActiveImageChange?.(imageUrl, closestIndex, content);
        }
      }
    };

    let waitForElementsTimeout;
    
    const waitUntilReady = () => {
      const allMounted = itemRefs.current.some(Boolean);
      const width = safeGetWidth();

      if (!allMounted || !width) {
        waitForElementsTimeout = setTimeout(waitUntilReady, 100);
        return;
      }

      itemWidth.current = width;
      menuWidth.current = menu.clientWidth;
      wrapWidth.current = contentItems.length * (itemWidth.current + gap);

      safeDispose(0);
      
      if (initialIndex >= 0 && initialIndex < contentItems.length) {
        const imageUrl = contentItems[initialIndex].image;
        const content = contentItems[initialIndex];
        onActiveImageChange?.(imageUrl, initialIndex, content);
      }
      
      render();
    };

    waitUntilReady();

    if (typeof window !== 'undefined') {
      menu.addEventListener('touchstart', handleTouchStart, { passive: true });
      menu.addEventListener('touchmove', handleTouchMove, { passive: true });
      menu.addEventListener('touchend', handleTouchEnd);
      menu.addEventListener('mousedown', handleTouchStart);
      menu.addEventListener('mousemove', handleTouchMove);
      menu.addEventListener('mouseleave', handleTouchEnd);
      menu.addEventListener('mouseup', handleTouchEnd);
      menu.addEventListener('selectstart', () => false);
      window.addEventListener('setCarouselIndex', handleExternalIndexChange);

      const handleResize = () => {
        updateCardWidth();
        const width = safeGetWidth();
        if (!width) return;
        
        itemWidth.current = width;
        menuWidth.current = menu?.clientWidth || 0;
        wrapWidth.current = contentItems.length * (itemWidth.current + gap);
        safeDispose(y.current);
      };

      window.addEventListener('resize', handleResize);
    }

    return () => {
      isComponentMounted.current = false;
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      clearTimeout(waitForElementsTimeout);
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('setCarouselIndex', handleExternalIndexChange);
      }
      
      if (menu) {
        menu.removeEventListener('touchstart', handleTouchStart);
        menu.removeEventListener('touchmove', handleTouchMove);
        menu.removeEventListener('touchend', handleTouchEnd);
        menu.removeEventListener('mousedown', handleTouchStart);
        menu.removeEventListener('mousemove', handleTouchMove);
        menu.removeEventListener('mouseleave', handleTouchEnd);
        menu.removeEventListener('mouseup', handleTouchEnd);
      }
    };
  }, [contentItems, initialIndex, onActiveImageChange]);

  const setItemRef = (el, index) => {
    itemRefs.current[index] = el;
  };

  const carouselHeight = "h-[25vh] sm:h-[28vh] md:h-[35vh] lg:h-[40vh]";

  return (
    <div
      ref={menuRef}
      className={`relative w-full ${carouselHeight} overflow-hidden cursor-grab`}
    >
      <div className="absolute top-0 left-0 w-full h-full flex">
        {contentItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => setItemRef(el, i)}
            className={`absolute top-0 left-0 h-full overflow-hidden`}
            style={{ width: cardWidth }}
          >
            <GridItem
              area=""
              icon={item.icon}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};