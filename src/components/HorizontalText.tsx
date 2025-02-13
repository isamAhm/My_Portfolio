import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HorizontalText = () => {
  return (
    <div className="bg-transparent">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: isMobile ? ["1 1", "0.7 0"] : ["0.5 0.4", "1 0"], // Different offsets for mobile and desktop
  });

  // Transform the scroll progress into horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  // Single continuous sentence
  const sentence = "Let's create the future, one line of code at a time; turning imagination into reality.";

  return (
    <section ref={targetRef} className="relative h-[100vh] bg-transparent z-10">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex items-center whitespace-nowrap">
          <p className="text-6xl font-black uppercase text-neutral-200 font-zenDots max-md:text-3xl">
            {sentence}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalText;