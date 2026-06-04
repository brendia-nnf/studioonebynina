'use client';

import { useEffect, useRef } from 'react';
import { initLenis, destroyLenis } from '@/lib/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const lenis = initLenis();

    return () => {
      if (lenis) {
        destroyLenis();
        initialized.current = false;
      }
    };
  }, []);

  return <>{children}</>;
}
