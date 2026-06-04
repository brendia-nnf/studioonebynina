'use client';

import { useEffect, useCallback } from 'react';
import { getLenis, scrollTo, stopScroll, startScroll } from '@/lib/lenis';
import type Lenis from 'lenis';

// Hook to access Lenis instance
export function useLenis(callback?: (lenis: Lenis) => void) {
  useEffect(() => {
    const lenis = getLenis();
    if (lenis && callback) {
      const unsubscribe = lenis.on('scroll', callback);
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [callback]);

  return getLenis();
}

// Hook for scroll to functionality
export function useScrollTo() {
  const scrollToElement = useCallback((
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      onComplete?: () => void;
    }
  ) => {
    scrollTo(target, options);
  }, []);

  const scrollToTop = useCallback((duration?: number) => {
    scrollTo(0, { duration: duration || 1.2 });
  }, []);

  const scrollToSection = useCallback((sectionId: string, offset: number = 0) => {
    scrollTo(`#${sectionId}`, { offset });
  }, []);

  return {
    scrollTo: scrollToElement,
    scrollToTop,
    scrollToSection,
  };
}

// Hook to lock/unlock scroll
export function useScrollLock() {
  const lock = useCallback(() => {
    stopScroll();
    document.body.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    startScroll();
    document.body.style.overflow = '';
  }, []);

  return { lock, unlock };
}

// Hook to track scroll progress
export function useScrollProgress(callback: (progress: number) => void) {
  useLenis((lenis) => {
    const progress = lenis.progress || 0;
    callback(progress);
  });
}
