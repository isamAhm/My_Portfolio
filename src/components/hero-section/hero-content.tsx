import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react';
import { Code, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useFollowCursor } from '../hooks/useFollowCursor';

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 700px", "end 200px"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['50%', '50%']);

  useFollowCursor(ref, { proximity: 300 });

  useEffect(() => {
    const chars = document.querySelectorAll('.char');

    const hoverColors = [
      '#3b82f6', // Blue
      '#10b981', // Green
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#f97316', // Orange
      '#ec4899', // Pink
      '#84cc16', // Lime
      '#f59e0b', // Amber
    ];

    chars.forEach((char, index) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.innerHTML = `
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 20l7 -12h-14z"></path>
      `;
      svg.style.position = 'absolute';
      svg.style.top = '-1.5rem';
      svg.style.left = '50%';
      svg.style.transform = 'translateX(-50%)';
      svg.style.opacity = '0';
      svg.style.pointerEvents = 'none';
      char.appendChild(svg);

      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          color: hoverColors[index % hoverColors.length],
          letterSpacing: '0.1em',
          duration: 0.3,
        });
        gsap.to(svg, {
          opacity: 1,
          y: -10,
          duration: 0.3,
        });
      });

      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          color: 'inherit',
          letterSpacing: '0em',
          duration: 0.3,
        });
        gsap.to(svg, {
          opacity: 0,
          y: 0,
          duration: 0.3,
        });
      });
    });

    return () => {
      chars.forEach((char) => {
        char.removeEventListener('mouseenter', () => {});
        char.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  useEffect(() => {
    const texts = [
      'Software Engineer',
      'Web Developer',
      'Full-Stack Developer',
      'مبدع', // Arabic word
      'Creative Coder',
      'Code Artisan',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (dynamicTextRef.current) {
        gsap.to(dynamicTextRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            currentIndex = (currentIndex + 1) % texts.length;
            const newText = texts[currentIndex];

            // Check if the text is in Arabic
            const isArabic = /[\u0600-\u06FF]/.test(newText);

            // Apply the appropriate class
            if (isArabic) {
              dynamicTextRef.current.classList.add('font-lemonada');
              dynamicTextRef.current.classList.remove('font-zenDots');
            } else {
              dynamicTextRef.current.classList.add('font-zenDots');
              dynamicTextRef.current.classList.remove('font-lemonada');
            }

            // Update the text content
            dynamicTextRef.current.textContent = newText;

            // Fade in the new text
            gsap.to(dynamicTextRef.current, {
              opacity: 0.6,
              duration: 0.5,
              ease: 'power2.in',
            });
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative z-10 text-center max-md:-mt-64"
      style={{ opacity, y }}
    >
      <h1 className="font-fira-code text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-relaxed">
        {/* Emoji with a different style */}
        <span className="text-white">🚀</span>
        {/* Apply text-gradient only to "Isam Ahmed" */}
        <span className="bg-gradient-to-br from-black via-gray-900 to-black bg-clip-text text-transparent">
          {' Isam Ahmed'.split('').map((char, i) => (
            <span key={i} className="char inline-block relative">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </h1>
      <span
        ref={dynamicTextRef}
        className="opacity-0 text-gray-500 hover:tracking-widest transition-all ease-in-out duration-500 home-hero-subheading text-3xl font-zenDots change"
        
      >
        Software Engineer
      </span>
      <p className="mt-6 font-fira-code text-sm sm:text-base text-gray-400">
      Crafting digital experiences that bring your vision to life. <br/> I translate ideas into clean, efficient code, building the future of your online presence.
      </p>
      <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <a href="#projects">
          <Button size="lg" className="group min-w-44">
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-hover-effect">View Projects</span>
              <Code className="transition-transform group-hover:rotate-12" />
            </span>
          </Button>
        </a>
        <a href="#contact">
          <Button variant="secondary" size="lg" className="group min-w-44">
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-hover-effect">Contact Me</span>
              <Mail className="transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </a>
      </div>
      <div className="mt-12 flex justify-center gap-6">
        <a
          href="https://github.com/isamAhm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-white"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/isam-ahmed-b0b980306"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-white"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </motion.div>
  );
}