'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'fadeUp' | 'reveal' | 'chars' | 'words';
  delay?: number;
  trigger?: boolean;
}

export function AnimatedText({
  children,
  className,
  as: Tag = 'p',
  animation = 'fadeUp',
  delay = 0,
  trigger = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasAnimated.current) return;

    let ctx: gsap.Context | null = null;

    const runAnimation = () => {
      if (animation === 'chars' || animation === 'words') {
        // Split text into spans
        const text = children;
        const items = animation === 'chars' ? text.split('') : text.split(' ');

        element.innerHTML = items
          .map(
            (item) =>
              `<span class="inline-block overflow-hidden"><span class="split-item inline-block" style="transform: translateY(100%); opacity: 0;">${item}${animation === 'words' ? '&nbsp;' : ''}</span></span>`
          )
          .join('');

        const splitItems = element.querySelectorAll('.split-item');

        ctx = gsap.context(() => {
          if (trigger) {
            gsap.to(splitItems, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: animation === 'chars' ? 0.02 : 0.05,
              ease: 'power3.out',
              delay,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          } else {
            gsap.to(splitItems, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: animation === 'chars' ? 0.02 : 0.05,
              ease: 'power3.out',
              delay,
            });
          }
        });
      } else if (animation === 'reveal') {
        element.style.clipPath = 'inset(100% 0 0 0)';
        element.style.opacity = '0';

        ctx = gsap.context(() => {
          if (trigger) {
            gsap.to(element, {
              clipPath: 'inset(0% 0 0 0)',
              opacity: 1,
              duration: 1.2,
              ease: 'power4.out',
              delay,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          } else {
            gsap.to(element, {
              clipPath: 'inset(0% 0 0 0)',
              opacity: 1,
              duration: 1.2,
              ease: 'power4.out',
              delay,
            });
          }
        });
      } else {
        // fadeUp default
        gsap.set(element, { opacity: 0, y: 40 });

        ctx = gsap.context(() => {
          if (trigger) {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          } else {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay,
            });
          }
        });
      }

      hasAnimated.current = true;
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(runAnimation, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [children, animation, delay, trigger]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
