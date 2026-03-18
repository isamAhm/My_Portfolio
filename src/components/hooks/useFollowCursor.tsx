import { useEffect } from 'react';
import gsap from 'gsap';

interface UseFollowCursorOptions {
  intensityX?: number;
  intensityY?: number;
  ease?: string;
  duration?: number;
  proximity?: number;
}

export function useFollowCursor(
  ref: React.RefObject<HTMLElement>,
  {
    intensityX = 10,
    intensityY = 4,
    ease = 'power2.out',
    duration = 0.5,
    proximity = 100,
  }: UseFollowCursorOptions = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip on touch/small screens entirely
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle via rAF — only one update per frame
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        if (Math.abs(clientX - centerX) <= proximity && Math.abs(clientY - centerY) <= proximity) {
          gsap.to(element, {
            rotateY: -((clientX - left) / width - 0.5) * intensityX,
            rotateX: ((clientY - top) / height - 0.5) * intensityY,
            duration,
            ease,
            transformPerspective: 200,
          });
        } else {
          gsap.to(element, { rotateY: 0, rotateX: 0, duration, ease });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [ref, intensityX, intensityY, ease, duration, proximity]);
}
