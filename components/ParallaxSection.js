'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxSection({ children }) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const sectionTop = rect.top + scrolled;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset
      const scrollPosition = scrolled - sectionTop + windowHeight;
      const parallaxSpeed = 0.5;
      
      if (scrollPosition > 0 && scrollPosition < sectionHeight + windowHeight) {
        setOffset(scrollPosition * parallaxSpeed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div 
        className="transform transition-transform duration-100"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        {children}
      </div>
    </section>
  );
}