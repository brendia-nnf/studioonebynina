'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, animations, createScrollTrigger, createParallax } from '@/lib/gsap';

type AnimationName = keyof typeof animations;

// Hook for basic GSAP animations
export function useGsap<T extends HTMLElement = HTMLElement>(
  animation: AnimationName,
  options?: {
    trigger?: boolean;
    delay?: number;
    scrollTriggerOptions?: ScrollTrigger.Vars;
  }
) {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const preset = animations[animation];

    if (options?.trigger) {
      animationRef.current = createScrollTrigger(
        element,
        animation,
        options.scrollTriggerOptions
      );
    } else {
      animationRef.current = gsap.fromTo(element, preset.from, {
        ...preset.to,
        delay: options?.delay || 0,
      });
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [animation, options?.trigger, options?.delay, options?.scrollTriggerOptions]);

  return elementRef;
}

// Hook for scroll-triggered animations
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  animation: AnimationName,
  scrollTriggerOptions?: ScrollTrigger.Vars
) {
  return useGsap<T>(animation, {
    trigger: true,
    scrollTriggerOptions,
  });
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement = HTMLElement>(
  speed: number = 0.5,
  options?: ScrollTrigger.Vars
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animation = createParallax(element, speed, options);

    return () => {
      animation.kill();
    };
  }, [speed, options]);

  return elementRef;
}

// Hook for staggered animations
export function useStaggerAnimation<T extends HTMLElement = HTMLElement>(
  selector: string,
  options?: {
    trigger?: boolean;
    stagger?: number;
    delay?: number;
    scrollTriggerOptions?: ScrollTrigger.Vars;
  }
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const animationConfig: gsap.TweenVars = {
      ...animations.staggerUp.to,
      stagger: options?.stagger || 0.1,
      delay: options?.delay || 0,
    };

    if (options?.trigger) {
      animationConfig.scrollTrigger = {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...options?.scrollTriggerOptions,
      };
    }

    const animation = gsap.fromTo(elements, animations.staggerUp.from, animationConfig);

    return () => {
      animation.kill();
    };
  }, [selector, options?.trigger, options?.stagger, options?.delay, options?.scrollTriggerOptions]);

  return containerRef;
}

// Hook for timeline animations
export function useTimeline(
  createAnimation: (tl: gsap.core.Timeline, element: HTMLElement) => void,
  options?: {
    paused?: boolean;
    repeat?: number;
    yoyo?: boolean;
  }
) {
  const elementRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    timelineRef.current = gsap.timeline({
      paused: options?.paused ?? false,
      repeat: options?.repeat ?? 0,
      yoyo: options?.yoyo ?? false,
    });

    createAnimation(timelineRef.current, element);

    return () => {
      timelineRef.current?.kill();
    };
  }, [createAnimation, options?.paused, options?.repeat, options?.yoyo]);

  const play = useCallback(() => timelineRef.current?.play(), []);
  const pause = useCallback(() => timelineRef.current?.pause(), []);
  const restart = useCallback(() => timelineRef.current?.restart(), []);
  const reverse = useCallback(() => timelineRef.current?.reverse(), []);

  return {
    ref: elementRef,
    timeline: timelineRef,
    play,
    pause,
    restart,
    reverse,
  };
}
