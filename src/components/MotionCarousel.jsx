'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MotionCarousel = ({ images, contentItems, onActiveImageChange, initialIndex = 0 }) => {
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
  const gap = 24;
  const { wrap } = gsap.utils;

  const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

  const safeGetWidth = () => {
    if (!itemRefs.current[0]) return null;
    return itemRefs.current[0].clientWidth || null;
  };

  const safeDispose = (scroll) => {
    const items = itemRefs.current.filter(Boolean);
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
    touchStartX.current = e.clientX || e.touches[0].clientX;
    isDragging.current = true;
    menuRef.current?.classList.add('is-dragging');
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || e.touches[0].clientX;
    scrollY.current += (currentX - touchStartX.current) * 2.5;
    touchStartX.current = currentX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    menuRef.current?.classList.remove('is-dragging');
  };

  const handleExternalIndexChange = (e) => {
    const { index } = e.detail;
    if (index >= 0 && index < contentItems.length) {
      // Calculate where this index should be positioned
      const targetX = -(index * (itemWidth.current + gap));
      scrollY.current = targetX;
      
      // Update the last active index
      lastActiveIndex.current = index;
      
      // Immediately apply the change
      y.current = targetX;
      safeDispose(y.current);

      gsap.to(itemRefs.current.filter(Boolean), {
        skewX: -120 * 0.5,
        rotate: 120 * 0.01,
        scale: 1 - Math.min(100, Math.abs(120)) * 0.003,
        overwrite: true,
      });
    }
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    let frameId;

    const render = () => {
      frameId = requestAnimationFrame(render);

      y.current = lerp(y.current, scrollY.current, 0.1);
      safeDispose(y.current);

      const scrollSpeed = y.current - oldScrollY.current;
      oldScrollY.current = y.current;

      gsap.to(itemRefs.current.filter(Boolean), {
        skewX: -scrollSpeed * 0.5,
        rotate: scrollSpeed * 0.01,
        scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003,
        overwrite: true,
      });

      const center = window.innerWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, i) => {
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
        // Pass the full content object along with the image URL and index
        const imageUrl = contentItems[closestIndex].image;
        const content = contentItems[closestIndex];
        onActiveImageChange?.(imageUrl, closestIndex, content);
      }
    };

    const waitUntilReady = () => {
      const allMounted = itemRefs.current.every(Boolean);
      const width = safeGetWidth();

      if (!allMounted || !width) {
        requestAnimationFrame(waitUntilReady);
        return;
      }

      itemWidth.current = width;
      menuWidth.current = menu.clientWidth;
      wrapWidth.current = contentItems.length * (itemWidth.current + gap);

      safeDispose(0);
      
      // Trigger initial active content
      if (initialIndex >= 0 && initialIndex < contentItems.length) {
        const imageUrl = contentItems[initialIndex].image;
        const content = contentItems[initialIndex];
        onActiveImageChange?.(imageUrl, initialIndex, content);
      }
      
      render();
    };

    requestAnimationFrame(waitUntilReady);

    menu.addEventListener('touchstart', handleTouchStart);
    menu.addEventListener('touchmove', handleTouchMove);
    menu.addEventListener('touchend', handleTouchEnd);
    menu.addEventListener('mousedown', handleTouchStart);
    menu.addEventListener('mousemove', handleTouchMove);
    menu.addEventListener('mouseleave', handleTouchEnd);
    menu.addEventListener('mouseup', handleTouchEnd);
    menu.addEventListener('selectstart', () => false);
    window.addEventListener('setCarouselIndex', handleExternalIndexChange);

    const handleResize = () => {
      const width = safeGetWidth();
      if (!width) return;
      itemWidth.current = width;
      menuWidth.current = menu.clientWidth;
      wrapWidth.current = contentItems.length * (itemWidth.current + gap);
      safeDispose(y.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      menu.removeEventListener('touchstart', handleTouchStart);
      menu.removeEventListener('touchmove', handleTouchMove);
      menu.removeEventListener('touchend', handleTouchEnd);
      menu.removeEventListener('mousedown', handleTouchStart);
      menu.removeEventListener('mousemove', handleTouchMove);
      menu.removeEventListener('mouseleave', handleTouchEnd);
      menu.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [contentItems, initialIndex, onActiveImageChange]);

  itemRefs.current = [];

  return (
    <div
      ref={menuRef}
      className="relative w-full h-[30vh] rounded-4xl overflow-hidden cursor-grab"
    >
      <div className="absolute top-0 left-0 w-full h-full flex">
        {contentItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className="absolute top-0 left-0 w-[30vw] h-full overflow-hidden"
          >
            <figure className="absolute w-full h-full pointer-events-none select-none rounded-4xl">
              <img
                src={item.image}
                alt={item.title}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

MotionCarousel.displayName = 'MotionCarousel';

export default MotionCarousel;