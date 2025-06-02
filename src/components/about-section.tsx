import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { FloatingKeywords } from './floating-keywords';
import { ProfileImage } from './profile-image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useGSAP(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: false,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-transparent py-20 max-sm:-mt-72">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={contentRef} className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className={`text-4xl font-bold font-fira-code ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>About Me</h2>
            <div className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-950'
            }`}>
              <BubbleText />
            </div>
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

const BubbleText = () => {
  const { theme } = useTheme();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spans = textRef.current?.querySelectorAll('.hover-text span') as NodeListOf<HTMLSpanElement>;

    // Reset all spans to base styles when theme changes
    spans?.forEach((span) => {
      span.style.fontWeight = '100';
      span.style.color = theme === 'dark' ? 'rgb(224, 224, 224)' : 'rgb(33, 11, 11)';
    });

    const handleMouseEnter = (span: HTMLSpanElement) => {
      span.style.fontWeight = '900';
      span.style.color = 'rgb(152, 170, 245)';

      const leftNeighbor = span.previousElementSibling as HTMLSpanElement;
      const rightNeighbor = span.nextElementSibling as HTMLSpanElement;

      if (leftNeighbor) {
        leftNeighbor.style.fontWeight = '500';
        leftNeighbor.style.color = 'rgb(23, 60, 207)';
      }
      if (rightNeighbor) {
        rightNeighbor.style.fontWeight = '500';
        rightNeighbor.style.color = 'rgb(23, 60, 207)';
      }
    };

    const handleMouseLeave = (span: HTMLSpanElement) => {
      span.style.fontWeight = '100';
      span.style.color = theme === 'dark' ? 'rgb(224, 224, 224)' : 'rgb(33, 11, 11)';

      const leftNeighbor = span.previousElementSibling as HTMLSpanElement;
      const rightNeighbor = span.nextElementSibling as HTMLSpanElement;

      if (leftNeighbor) {
        leftNeighbor.style.fontWeight = '100';
        leftNeighbor.style.color = theme === 'dark' ? 'rgb(224, 224, 224)' : 'rgb(33, 11, 11)';
      }
      if (rightNeighbor) {
        rightNeighbor.style.fontWeight = '100';
        rightNeighbor.style.color = theme === 'dark' ? 'rgb(224, 224, 224)' : 'rgb(33, 11, 11)';
      }
    };

    spans?.forEach((span) => {
      span.addEventListener('mouseenter', () => handleMouseEnter(span));
      span.addEventListener('mouseleave', () => handleMouseLeave(span));
    });

    // Cleanup: Remove event listeners when component unmounts or theme changes
    return () => {
      spans?.forEach((span) => {
        span.removeEventListener('mouseenter', () => handleMouseEnter(span));
        span.removeEventListener('mouseleave', () => handleMouseLeave(span));
      });
    };
  }, [theme]);

  return (
    <div ref={textRef}>
      <p className={`hover-text text-lg ${
        theme === 'dark' ? 'text-gray-300' : 'text-black'
      }`}>
        <Text>
          Hey there, I'm Isam Ahmed, a passionate software engineer with a love for creating elegant solutions to complex problems. 
          With expertise in modern web technologies and a keen eye for design, I build applications that 
          not only function flawlessly but also provide exceptional user experiences.
        </Text>
      </p>
      <br />
      <p className={`hover-text text-lg ${
        theme === 'dark' ? 'text-gray-300' : 'text-black'
      }`}>
        <Text>
          My journey in software development has led me to work with cutting-edge technologies and 
          collaborate with talented teams on innovative projects.
        </Text>
      </p>
    </div>
  );
};

const Text = ({ children }: { children: string }) => {
  return (
    <>
      {children.split('').map((child, idx) => (
        <span
          key={idx}
          style={{
            fontWeight: '100', // Explicitly set base font weight
            color: 'inherit', // Inherit from parent to ensure theme consistency
            transition: 'font-weight 0.35s, color 0.35s', // Smooth transitions
          }}
        >
          {child}
        </span>
      ))}
    </>
  );
};