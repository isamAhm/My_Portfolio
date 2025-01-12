import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLinks } from './nav-links';
import my_cv from '../../assets/Isam_Ahmed_CV.pdf';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full bg-black/10 backdrop-blur-md"
          >
            <div className="p-4">
              <NavLinks
                className="flex flex-col items-center gap-4"
                onClick={onToggle}
              />
              <div className="flex justify-center items-center">
                <a
                  href={my_cv} 
                  download="IsamAhmed_CV.pdf"
                  className="block mt-4 w-2/4 items-center text-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-red-500/30 to-blue-800/30 backdrop-blur-lg shadow-md rounded-md ease-in-out duration-300 hover:text-blue-700 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
