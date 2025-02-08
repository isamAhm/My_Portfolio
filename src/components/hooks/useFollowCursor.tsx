import { useEffect } from 'react';
import gsap from 'gsap';

interface UseFollowCursorOptions {
  intensityX?: number;
  intensityY?: number;
  ease?: string;
  duration?: number;
  proximity?: number; // Distance threshold for activation
}

export function useFollowCursor(
  ref: React.RefObject<HTMLElement>,
  {
    intensityX = 10,
    intensityY = 4,
    ease = 'power2.out',
    duration = 0.5,
    proximity = 100, // Default proximity threshold (in pixels)
  }: UseFollowCursorOptions = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Function to detect if the device is touch-enabled or screen is small
    const isTouchOrSmallScreen = () =>
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

    // Early return if touch-based or small screens
    if (isTouchOrSmallScreen()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();

      // Calculate the center of the element
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate the distance between the mouse and the center of the element
      const distanceX = Math.abs(clientX - centerX);
      const distanceY = Math.abs(clientY - centerY);

      // Check if the mouse is within the proximity threshold
      if (distanceX <= proximity && distanceY <= proximity) {
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        gsap.to(element, {
          rotateY: -x * intensityX, // Negate the x value to reverse the rotation direction
          rotateX: y * intensityY,
          duration,
          ease,
          transformPerspective: 200,
        });
      } else {
        // Reset the element's rotation if the mouse is outside the proximity threshold
        gsap.to(element, {
          rotateY: 0,
          rotateX: 0,
          duration,
          ease,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, intensityX, intensityY, ease, duration, proximity]);
}