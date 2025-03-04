import { useEffect, useState } from 'react';
import { NavLinks } from './nav-links';
import { MobileMenu } from './mobile-menu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Code2 } from 'lucide-react';
import my_cv from '../../assets/Isam_Ahmed_CV.pdf';

// Allowed characters for the hover effect randomization
const allowedCharacters = ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'];

// Function to get a random character
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
  return allowedCharacters[randomIndex];
}

// Function to create hover effect event handler
function createHoverEffect() {
  let isInProgress = false;
  const BASE_DELAY = 70;

  return function handleHoverEvent(e: MouseEvent) {
    if (isInProgress) return;

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 400);
  });

  useEffect(() => {
    const button = document.querySelector('.download-cv');
    if (button) {
      const eventHandler = createHoverEffect();
      button.addEventListener('mouseover', eventHandler);

      return () => {
        button.removeEventListener('mouseover', eventHandler);
      };
    }
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300  ${
        isScrolled ? 'bg-gradient-to-b from-black via-black/80 to-black/0 ease-in-out duration-300' : 'bg-transparent ease-in-out duration-300'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold text-white z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="h-6 w-6 text-blue-700" />
            IsamDev.
          </motion.a>

          <NavLinks className="hidden md:flex hover:text-blue-950 z-50" />
          <a
            href={my_cv} // Replace with the actual path to your CV file
            download="IsamAhmed_CV.pdf"
            className="download-cv hidden md:block px-4 py-2 ml-4 text-md font-fira-code text-white hover:text-blue-700 bg-gradient-to-br from-red-500/30 to-blue-800/30 backdrop-blur-lg rounded-md ease-in-out duration-300 focus:outline-none "
          >
            Download CV
          </a>
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </nav>
    </motion.header>
  );
}
