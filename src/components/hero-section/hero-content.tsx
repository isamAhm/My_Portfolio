import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react';
import { Code, Github, Linkedin, Mail } from 'lucide-react';

// Allowed characters for the randomization effect
const allowedCharacters = ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'];

// Function to return a random character
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
  return allowedCharacters[randomIndex];
}

// Function to create an event handler for hover effects
function createEventHandler() {
  let isInProgress = false; // Track if the effect is already running
  const BASE_DELAY = 70; // Delay between text updates

  return function handleHoverEvent(e: MouseEvent) {
    if (isInProgress) {
      return;
    }

    const target = e.target as HTMLElement;
    const text = target.innerText;
    const randomizedText = text.split('').map(getRandomCharacter).join('');

    for (let i = 0; i < text.length; i++) {
      isInProgress = true;

      setTimeout(() => {
        const nextIndex = i + 1;
        target.innerText = `${text.substring(
          0,
          nextIndex
        )}${randomizedText.substring(nextIndex)}`;

        if (nextIndex === text.length) {
          isInProgress = false;
        }
      }, i * BASE_DELAY);
    }
  };
}

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 700px", "end 200px"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['50%', '50%']);

  useEffect(() => {
    // Add hover effect to all elements with the class `.text-hover-effect`
    const elements = document.querySelectorAll('.text-hover-effect');
    elements.forEach((element) => {
      const eventHandler = createEventHandler();
      element.addEventListener('mouseover', eventHandler);
    });

    // Cleanup event listeners on unmount
    return () => {
      elements.forEach((element) => {
        const eventHandler = createEventHandler();
        element.removeEventListener('mouseover', eventHandler);
      });
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative z-10 text-center"
      style={{ opacity, y }}
    >
      <h1 className="text-gradient font-fira-code text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-relaxed">
        {'Software Engineer'.split('').map((char, i) => (
          <span key={i} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <p className="mt-6 font-fira-code text-sm sm:text-base text-gray-400">
        Crafting digital experiences. Code Your Vision, Build the Future!
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
