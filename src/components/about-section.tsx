import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { FloatingKeywords } from './floating-keywords';
import { ProfileImage } from './profile-image';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={contentRef} className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-4xl font-bold text-white font-fira-code">About Me</h2>
            <p className="text-lg text-gray-300">
              Hey there, I'm Isam Ahmed, a passionate software engineer with a love for creating elegant solutions to complex problems. 
              With expertise in modern web technologies and a keen eye for design, I build applications that 
              not only function flawlessly but also provide exceptional user experiences.
            </p>
            <p className="text-lg text-gray-300">
              My journey in software development has led me to work with cutting-edge technologies and 
              collaborate with talented teams on innovative projects.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <ProfileImage />
          </div>
          <FloatingKeywords />
        </div>
      </div>
    </section>
  );
}