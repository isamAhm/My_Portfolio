import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollParallaxOptions {
  speed?: number;
}

export function useScrollParallax(
  ref: React.RefObject<HTMLElement>,
  { speed = 1 }: UseScrollParallaxOptions = {}
) {
  const triggerRef = useRef<ScrollTrigger>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // duration: 0 — scroll-driven animations must be instant, no easing lag
        gsap.set(element, { y: self.progress * 100 * speed });
      },
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [speed]);
}
