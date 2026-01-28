'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with luxurious, weighted scroll feel
    const lenis = new Lenis({
      duration: 1.8,           // Slow, heavy scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,    // Slower wheel response for premium feel
      touchMultiplier: 1.5,    // Slightly faster touch for mobile usability
    });

    lenisRef.current = lenis;

    // RAF loop for smooth updates
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
