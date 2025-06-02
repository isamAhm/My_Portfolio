import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experiences' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

// Allowed characters for the randomization effect
const allowedCharacters = ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'];

// Function to return a random character
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
  return allowedCharacters[randomIndex];
}

// Function to create an event handler for hover effects
function createEventHandler() {
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

export function NavLinks({ className = '', onClick }: NavLinksProps) {
  const { theme } = useTheme();

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
    <ul className={`flex items-center gap-8 ${className}`}>
      {links.map(({ href, label }) => (
        <motion.li key={href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <a
            href={href}
            className={`text-hover-effect transition-colors hover:text-blue-400 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700 hover:text-blue-900 max-md:text-white'
            }`}
            onClick={onClick}
          >
            {label}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
