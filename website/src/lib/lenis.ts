'use client';

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return null;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Integrate with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Use GSAP ticker for Lenis
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const destroyLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

export const scrollTo = (
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    lock?: boolean;
    onComplete?: () => void;
  }
) => {
  if (!lenisInstance) return;

  lenisInstance.scrollTo(target, options);
};

export const stopScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export { Lenis };
