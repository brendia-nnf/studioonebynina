'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, href, hoverable = true, ...props }, ref) => {
    const classes = cn(
      'bg-white rounded-2xl overflow-hidden',
      hoverable && 'transition-all duration-500 ease-smooth hover:shadow-xl hover:-translate-y-1',
      className
    );

    if (href) {
      return (
        <Link href={href} className="block">
          <div ref={ref} className={classes} {...props}>
            {children}
          </div>
        </Link>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

export function CardImage({
  src,
  alt,
  className,
  aspectRatio = 'video',
}: CardImageProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
    </div>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ className, children, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('font-serif text-heading-md text-charcoal-800', className)}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return (
    <p className={cn('font-sans text-body-md text-charcoal-500 mt-2', className)}>
      {children}
    </p>
  );
}
