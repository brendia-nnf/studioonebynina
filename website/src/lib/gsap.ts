'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Default animation settings
export const defaultEase = 'power3.out';
export const smoothEase = 'power2.inOut';

// Animation presets
export const animations = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: defaultEase },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: defaultEase },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1, duration: 0.8, ease: defaultEase },
  },
  slideInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: defaultEase },
  },
  slideInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: defaultEase },
  },
  heroTextReveal: {
    from: { opacity: 0, y: 100, clipPath: 'inset(100% 0 0 0)' },
    to: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out' },
  },
  staggerUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: defaultEase },
  },
};

// Create a scroll-triggered animation
export const createScrollTrigger = (
  element: string | Element,
  animation: keyof typeof animations,
  options?: ScrollTrigger.Vars
) => {
  const preset = animations[animation];

  return gsap.fromTo(element, preset.from, {
    ...preset.to,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  });
};

// Parallax effect for images
export const createParallax = (
  element: string | Element,
  speed: number = 0.5,
  options?: ScrollTrigger.Vars
) => {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options,
    },
  });
};

// Split text animation helper
export const splitTextAnimation = (
  element: Element,
  type: 'chars' | 'words' | 'lines' = 'words'
) => {
  const text = element.textContent || '';
  let items: string[] = [];

  switch (type) {
    case 'chars':
      items = text.split('');
      break;
    case 'words':
      items = text.split(' ');
      break;
    case 'lines':
      items = text.split('\n');
      break;
  }

  element.innerHTML = items
    .map((item, i) => `<span class="split-item" style="display: inline-block; overflow: hidden;"><span class="split-inner" data-index="${i}">${item}${type === 'words' ? '&nbsp;' : ''}</span></span>`)
    .join('');

  return element.querySelectorAll('.split-inner');
};

// Hover scale animation
export const hoverScale = (element: Element, scale: number = 1.05) => {
  const tl = gsap.timeline({ paused: true });

  tl.to(element, {
    scale,
    duration: 0.4,
    ease: smoothEase,
  });

  element.addEventListener('mouseenter', () => tl.play());
  element.addEventListener('mouseleave', () => tl.reverse());

  return tl;
};

// Magnetic button effect
export const magneticEffect = (element: Element, strength: number = 0.3) => {
  const bounds = element.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove as EventListener);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove as EventListener);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Refresh ScrollTrigger (call after layout changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Kill all ScrollTriggers (cleanup)
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export { gsap, ScrollTrigger };
