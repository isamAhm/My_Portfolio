import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import orb from '../../assets/theorb-removebg-preview.png';

export function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100px", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div 
      ref={ref}
      className="absolute inset-0 z-0 max-md:hidden"
      style={{ scale, opacity }}
    >
      <div className="absolute bottom-0 inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <img
        src={orb}
        alt="Space"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}