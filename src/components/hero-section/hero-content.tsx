import { memo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { Code, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useFollowCursor } from '../hooks/useFollowCursor';
import { useTheme } from '../../context/ThemeContext';

// Static — defined once, never recreated
const HOVER_COLORS = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899', '#84cc16', '#f59e0b'];
const TEXTS = ['Software Engineer', 'Web Developer', 'Full-Stack Developer', 'مبدع', 'Creative Coder', 'Code Artisan'];
const NAME_CHARS = ' Isam Ahmed'.split('');

export const HeroContent = memo(function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 700px', 'end 200px'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['50%', '50%']);

  useFollowCursor(ref, { proximity: 300 });

  // Char hover effect — attach once, clean up properly
  useEffect(() => {
    const chars = Array.from(document.querySelectorAll<HTMLElement>('.char'));
    const svgs: SVGSVGElement[] = [];
    const cleanups: Array<() => void> = [];

    chars.forEach((char, index) => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.innerHTML = `<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 20l7 -12h-14z"></path>`;
      Object.assign(svg.style, { position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', opacity: '0', pointerEvents: 'none' });
      char.appendChild(svg);
      svgs.push(svg);

      const onEnter = () => {
        gsap.to(char, { color: HOVER_COLORS[index % HOVER_COLORS.length], letterSpacing: '0.1em', duration: 0.3 });
        gsap.to(svg, { opacity: 1, y: -10, duration: 0.3 });
      };
      const onLeave = () => {
        gsap.to(char, { color: 'inherit', letterSpacing: '0em', duration: 0.3 });
        gsap.to(svg, { opacity: 0, y: 0, duration: 0.3 });
      };

      char.addEventListener('mouseenter', onEnter);
      char.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        char.removeEventListener('mouseenter', onEnter);
        char.removeEventListener('mouseleave', onLeave);
        svg.remove();
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []); // run once — chars don't change

  // Rotating text — interval only
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      const el = dynamicTextRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0, duration: 0.5, ease: 'power2.out',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % TEXTS.length;
          const newText = TEXTS[currentIndex];
          const isArabic = /[\u0600-\u06FF]/.test(newText);
          el.classList.toggle('font-lemonada', isArabic);
          el.classList.toggle('font-zenDots', !isArabic);
          el.textContent = newText;
          gsap.to(el, { opacity: 0.6, duration: 0.5, ease: 'power2.in' });
        },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div ref={ref} className="relative z-10 text-center max-md:-mt-64" style={{ opacity, y }}>
      <h1 className="font-fira-code text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-relaxed">
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>🚀</span>
        <span className={theme === 'dark' ? 'text-[#55ACEE] opacity-80' : 'text-gray-900'}>
          {NAME_CHARS.map((char, i) => (
            <span key={i} className="char inline-block relative">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </h1>
      <span
        ref={dynamicTextRef}
        className={`hover:tracking-widest transition-all ease-in-out duration-500 home-hero-subheading text-3xl font-zenDots change ${theme === 'dark' ? 'text-gradient opacity-0' : 'text-gray-950'
          }`}
      >
        Software Engineer
      </span>
      <p className={`mt-6 font-fira-code text-lg sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-900'}`}>
        Crafting digital experiences that bring your vision to life. <br className="max-sm:hidden" />
        I translate ideas into clean, efficient code, building the future of your online presence.
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
        <a href="https://github.com/isamAhm" target="_blank" rel="noopener noreferrer" title="GitHub"
          className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/isam-ahmed-b0b980306" target="_blank" rel="noopener noreferrer" title="LinkedIn"
          className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <Linkedin size={24} />
        </a>
      </div>
    </motion.div>
  );
});
