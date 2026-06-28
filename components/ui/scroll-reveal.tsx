'use client';

import { useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-scale' | 'slide-left' | 'slide-right' | 'fade-in';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
};

export function ScrollReveal({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
  rootMargin = '0px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  const animationConfig: Record<AnimationType, { from: string; to: string }> = {
    'fade-up': {
      from: 'opacity-0 translate-y-6',
      to: 'opacity-100 translate-y-0',
    },
    'fade-down': {
      from: 'opacity-0 -translate-y-6',
      to: 'opacity-100 translate-y-0',
    },
    'fade-scale': {
      from: 'opacity-0 scale-[0.96]',
      to: 'opacity-100 scale-100',
    },
    'slide-left': {
      from: 'opacity-0 translate-x-6',
      to: 'opacity-100 translate-x-0',
    },
    'slide-right': {
      from: 'opacity-0 -translate-x-6',
      to: 'opacity-100 translate-x-0',
    },
    'fade-in': {
      from: 'opacity-0',
      to: 'opacity-100',
    },
  };

  const { from, to } = animationConfig[animation];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? to : from,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

type StaggerRevealProps = {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  animation?: AnimationType;
  threshold?: number;
};

export function StaggerReveal({
  children,
  className,
  staggerDelay = 100,
  animation = 'fade-up',
  threshold = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={cn('contents', className)}>
      {children.map((child, idx) => (
        <ScrollReveal
          key={idx}
          animation={animation}
          delay={idx * staggerDelay}
          once
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
};

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const scrolled = window.scrollY;
    const rate = direction === 'up' ? -speed : speed;
    const position = (rect.top + scrolled) * rate;
    setOffset(position);
  }, [speed, direction]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const transform = direction === 'up'
    ? `translateY(${-offset}px)`
    : `translateY(${offset}px)`;

  return (
    <div
      ref={ref}
      className={cn('gpu-accelerated', className)}
      style={{ transform, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

type MagneticHoverProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticHover({
  children,
  className,
  strength = 0.3,
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={cn('gpu-accelerated', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * -2;
    setTransform({ rotateX, rotateY });
    if (glare) {
      setGlarePosition({ x: x * 100, y: y * 100 });
    }
  }, [maxTilt, glare]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={cn('gpu-accelerated relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15), transparent 60%)`,
            opacity: Math.abs(transform.rotateX) + Math.abs(transform.rotateY) > 0 ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        />
      )}
    </div>
  );
}

type CountUpProps = {
  end: number;
  duration?: number;
  start?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function CountUp({
  end,
  duration = 2000,
  start = 0,
  className,
  prefix = '',
  suffix = '',
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
