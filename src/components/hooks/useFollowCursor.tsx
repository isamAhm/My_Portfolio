import { useEffect } from 'react';
import gsap from 'gsap';

interface UseFollowCursorOptions {
  intensityX?: number;
  intensityY?: number;
  ease?: string;
  duration?: number;
}

export function useFollowCursor(
  ref: React.RefObject<HTMLElement>,
  { 
    intensityX = 5, 
    intensityY = 0.6, 
    ease = 'power2.out', 
    duration = 0.5 
  }: UseFollowCursorOptions = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      gsap.to(element, {
        rotateY: x * intensityX,
        rotateX: -y * intensityY,
        duration,
        ease,
        transformPerspective: 200,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, intensityX, intensityY, ease, duration]);
}
