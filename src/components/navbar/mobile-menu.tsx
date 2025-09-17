import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLinks } from './nav-links';
import my_cv from '../../assets/Isam_Ahmed_Resume.pdf';
import { useTheme } from '@/context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const { theme } = useTheme();
  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className={` focus:outline-none z-50 relative ${theme === 'dark' ? 'text-white' : 'text-black'}`} // Added z-50 and relative
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 pt-20 z-40 bg-black/60 backdrop-blur-md overflow-y-auto"
          >
            <div className="p-4">
              <NavLinks
                className="flex flex-col items-center gap-6"
                onClick={onToggle}
              />
              <div className="flex justify-center items-center">
                <a
                  href={my_cv}
                  download="IsamAhmed_CV.pdf"
                  className="block mt-6 w-10/12 sm:w-2/4 items-center text-center px-4 py-3 text-base font-medium text-white bg-gradient-to-br from-red-500/30 to-blue-800/30 backdrop-blur-lg shadow-md rounded-md ease-in-out duration-300 hover:text-blue-900 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}