"use client";
import { useEffect, useRef, useState } from "react";

export default function BgVideoSection({ videoSrc, nextSectionId, sectionIndex, onSectionChange }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Observe when the current section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Check if element and all its parents are visible
  useEffect(() => {
    const checkFullVisibility = () => {
      if (!sectionRef.current) return;
      
      // Check the entire parent chain for visibility
      let element = sectionRef.current;
      let isFullyVisible = true;
      
      while (element && isFullyVisible) {
        const styles = window.getComputedStyle(element);
        
        // Check opacity, display, and visibility properties
        isFullyVisible = isFullyVisible && 
          parseFloat(styles.opacity) > 0 && 
          styles.display !== 'none' &&
          styles.visibility !== 'hidden';
        
        // Move up to parent
        element = element.parentElement;
      }
      
      setIsVisible(isFullyVisible);
    };

    // Initial check
    checkFullVisibility();

    // Set up mutation observer for the entire document body
    // This way we catch style changes anywhere in the parent chain
    const observer = new MutationObserver(checkFullVisibility);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: true
    });

    // Periodic check as an additional fallback
    const interval = setInterval(checkFullVisibility, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Play/Pause video based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only play when both in viewport AND fully visible
    if (isInView && isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, isVisible]);

  // Scroll to next section when video is near end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!hasScrolled && video.duration - video.currentTime <= 1.5) {
        setHasScrolled(true);
        const nextSection = document.getElementById(nextSectionId);
        if (nextSection) {
          if (onSectionChange) onSectionChange(sectionIndex + 1);
          nextSection.scrollIntoView({ behavior: "smooth" });

          const scrollObserver = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                video.pause();
                video.currentTime = 0;
                setHasScrolled(false);
                scrollObserver.disconnect();
              }
            },
            { threshold: 0.6 }
          );
          scrollObserver.observe(nextSection);
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [nextSectionId, hasScrolled, sectionIndex, onSectionChange]);

  return (
    <section
      ref={sectionRef}
      className="absolute top-0 left-0 h-full w-full overflow-hidden z-0 pointer-events-none"
    >
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,black,transparent_40%),linear-gradient(to_bottom,black,transparent_40%),linear-gradient(to_left,black,transparent_20%),linear-gradient(to_right,black,transparent_20%)]"
        style={{ mixBlendMode: 'multiply' }}
      />
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute h-full w-full bg-cover object-cover"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
}