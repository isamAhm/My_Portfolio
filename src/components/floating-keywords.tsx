import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const keywords = [
  'React', 'TypeScript', 'Node.js', 'Next.js', 'Python', 'Data Mining',
  'Postgresql', 'Web Development', 'Mobile App Dev\'t', 'JavaScript', 'System Design', 'MongoDB', 'MERN', 'PERN', 'SQL'
];

export function FloatingKeywords() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = containerRef.current?.children;
    if (!elements) return;

    Array.from(elements).forEach((el, i) => {
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[400px]">
      {keywords.map((keyword, i) => (
        <div
          key={keyword}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full 
                     bg-gray-800 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 
                     hover:text-white"
          style={{
            transform: `translate(${Math.sin(i) * 100}px, ${Math.cos(i) * 100}px)`,
          }}
        >
          {keyword}
        </div>
      ))}
    </div>
  );
}