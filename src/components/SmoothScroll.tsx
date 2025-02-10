import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

import { useEffect, useRef } from "react";
import image1 from '../assets/tictactoe.png';
import image2 from '../assets/streambox2.png';
import image3 from '../assets/portgo.png';
import image4 from '../assets/snap.png';

export const SmoothScrollHero = () => {
  return (
    <div className="bg-transparent">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <ProjectText/>
        <Hero />
        
      </ReactLenis>
    </div>
  );
};


const SECTION_HEIGHT = 400;

const Hero: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--section-height", `${SECTION_HEIGHT}px`);
  }, []); // Dependency array should not include SECTION_HEIGHT since it's a constant

  return (
    <div className="relative w-full h-dynamic">
        
      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-transparent" />
    </div>
  );
};

const ProjectText: React.FC = () => {
    
    return (
      <div className="relative">
          <h1 className="text-4xl text-center mt-8 font-fira-code font-bold ">🏖️ Lets see my projects</h1>
        
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-transparent" />
      </div>
    );
  };
  
  export default ProjectText;
  


const ParallaxImages = () => {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-[200px]">
        <ParallaxImg
          src={image1} // Use imported image
          alt="And example of a space launch"
          start={-200}
          end={200}
          className="w-1/3"
        />
        <ParallaxImg
          src={image2} // Use imported image
          alt="An example of a space launch"
          start={200}
          end={-250}
          className="mx-auto w-2/3"
        />
        <ParallaxImg
          src={image3} // Use imported image
          alt="Orbiting satellite"
          start={-200}
          end={200}
          className="ml-auto w-1/3"
        />
        <ParallaxImg
          src={image4} // Use imported image
          alt="Orbiting satellite"
          start={0}
          end={-500}
          className="ml-24 w-5/12"
        />
      </div>
    );
  };

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
}
