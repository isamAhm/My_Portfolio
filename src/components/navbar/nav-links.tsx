import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
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

// Shared scramble effect — defined once at module level
const ALLOWED = ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'];
function createScramble() {
  let busy = false;
  return (e: Event) => {
    if (busy) return;
    const target = e.target as HTMLElement;
    const original = target.innerText;
    const scrambled = original.split('').map(() => ALLOWED[Math.floor(Math.random() * ALLOWED.length)]).join('');
    for (let i = 0; i < original.length; i++) {
      busy = true;
      setTimeout(() => {
        target.innerText = original.substring(0, i + 1) + scrambled.substring(i + 1);
        if (i === original.length - 1) busy = false;
      }, i * 70);
    }
  };
}

export const NavLinks = memo(function NavLinks({ className = '', onClick }: NavLinksProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.text-hover-effect'));
    // Store handler per element so cleanup removes the exact same reference
    const handlers = elements.map(() => createScramble());
    elements.forEach((el, i) => el.addEventListener('mouseover', handlers[i]));
    return () => elements.forEach((el, i) => el.removeEventListener('mouseover', handlers[i]));
  }, []);

  return (
    <ul className={`flex items-center gap-8 ${className}`}>
      {links.map(({ href, label }) => (
        <motion.li key={href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <a
            href={href}
            className={`text-hover-effect transition-colors hover:text-blue-400 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 hover:text-blue-900 max-md:text-white'
              }`}
            onClick={onClick}
          >
            {label}
          </a>
        </motion.li>
      ))}
    </ul>
  );
});
