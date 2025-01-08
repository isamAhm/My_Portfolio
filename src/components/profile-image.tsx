import { motion } from 'framer-motion';
import Myimage from '../assets/me2.jpg';

export function ProfileImage() {
  return (
    <motion.div
      className="relative w-64 h-64 mx-auto md:mx-0"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
      <img
        src={Myimage}
        alt="Profile"
        className="relative w-full h-full object-cover rounded-full border-4 border-white/10"
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
    </motion.div>
  );
}