'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = 'Prije',
  afterLabel = 'Poslije',
  className,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(50);
  const [isDragging, setIsDragging] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateVisuals = useCallback((percentage: number) => {
    if (sliderRef.current) {
      sliderRef.current.style.left = `${percentage}%`;
    }
    if (beforeRef.current) {
      beforeRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    positionRef.current = percentage;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use RAF for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      updateVisuals(percentage);
    });
  }, [updateVisuals]);

  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  }, [updatePosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientX);
  }, [handleStart]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  useEffect(() => {
    // Set initial position
    updateVisuals(50);
  }, [updateVisuals]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, updatePosition]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className={cn(
        'relative aspect-[3/4] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none',
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          draggable={false}
        />
        <span className="absolute bottom-4 right-4 bg-charcoal-900/80 text-white px-3 py-1 rounded-full text-label-md uppercase tracking-wider">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped) */}
      <div
        ref={beforeRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-[clip-path]"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          draggable={false}
        />
        <span className="absolute bottom-4 left-4 bg-charcoal-900/80 text-white px-3 py-1 rounded-full text-label-md uppercase tracking-wider">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Line */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none will-change-[left]"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center',
            isDragging && 'scale-110'
          )}
          style={{ transition: isDragging ? 'none' : 'transform 0.2s' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-charcoal-800"
          >
            <path
              d="M8 5L5 12L8 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 5L19 12L16 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
