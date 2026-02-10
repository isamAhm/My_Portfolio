import { useRef } from 'react';
import { useFollowCursor } from '../hooks/useFollowCursor';
import { ParallaxOrb } from './parallax-orb';
import { HeroContent } from './hero-content';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useFollowCursor(contentRef, { intensityX: 3 });

  return (
    <section id="home" className="relative min-h-[150vh] w-full overflow-hidden bg-transparent">
      <div
        ref={containerRef}
        className="sticky top-0 mx-auto flex h-screen max-w-7xl flex-col items-center justify-center px-4"
      >
        <ParallaxOrb />
        <div ref={contentRef}>
          <HeroContent />
        </div>
      </div>
    </section>
  );
}