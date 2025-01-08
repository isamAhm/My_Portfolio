import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
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

export function NavLinks({ className = '', onClick }: NavLinksProps) {
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
            className="text-hover-effect text-gray-300 transition-colors hover:text-blue-400"
            onClick={onClick}
          >
            {label}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
