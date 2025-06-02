import { useEffect, useState } from 'react';
import { NavLinks } from './nav-links';
import { MobileMenu } from './mobile-menu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Code2, Sun, Moon } from 'lucide-react';
import my_cv from '../../assets/Isam_Ahmed_Resume.pdf';
import { useTheme } from '../../context/ThemeContext';

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

  return function handleHoverEvent(e: Event) {
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
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-gradient-to-b from-black via-black/80 to-black/0' 
            : 'bg-gradient-to-b from-white via-white/80 to-white/0'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className={`flex items-center gap-2 text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            } z-50`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-700' : 'text-blue-600'}`} />
            IsamDev.
          </motion.a>

          
            <NavLinks className="hidden md:flex hover:text-blue-950 z-50" />
            <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-800 hover:text-blue-600' 
                  : 'text-gray-900 hover:bg-gray-100 hover:text-blue-600'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href={my_cv}
              download="IsamAhmed_CV.pdf"
              className={`download-cv hidden md:block px-4 py-2 ml-4 text-md font-fira-code ${
                theme === 'dark' 
                  ? 'text-white hover:text-blue-700' 
                  : 'text-gray-900 hover:text-blue-600'
              } bg-gradient-to-br ${
                theme === 'dark'
                  ? 'from-red-500/30 to-blue-800/30'
                  : 'from-red-500/30 to-blue-800/30 hover:bg-gray-700'
              } backdrop-blur-lg rounded-md ease-in-out duration-300 focus:outline-none`}
            >
              Download CV
            </a>
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
