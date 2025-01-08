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
        const progress = self.progress;
        gsap.to(element, {
          y: progress * 100 * speed,
          duration: 0.5,
          ease: 'none',
        });
      },
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [speed]);
}