import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import orb from '../../assets/theorb-removebg-preview.png';

export function ParallaxOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 300px", "end start"], // Start earlier with 50px offset
  });
  
  const y = useTransform(scrollYProgress, [0, 0.4], ['0%', '100%']); // Adjust range for earlier start
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);   // Match y timing
  const opacity = useTransform(scrollYProgress, [0, 0.2], [5, 0]);   // Fade out earlier
  
  return (
    <motion.div 
      ref={ref}
      className="absolute top-1/3 bottom-0 -translate-x-1/2 -translate-y-1/2 w-96 z-20 max-md:hidden"
      style={{ y, scale, opacity }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full" />
        <img
          src={orb}
          alt="Glowing Orb"
          className="relative w-full h-1/4 top-[40%] object-contain scale-[4.5]"
        />
      </div>
    </motion.div>
  );
}