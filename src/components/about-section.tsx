import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { FloatingKeywords } from './floating-keywords';
import { ProfileImage } from './profile-image';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: false,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-transparent py-20 max-sm:-mt-72">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={contentRef} className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-4xl font-bold text-white font-fira-code">About Me</h2>
            <div className="text-lg text-gray-300">
              <BubbleText/>
            </div>
            {/* <p className="text-lg text-gray-300">
              
            </p> */}
          </div>
          <div className="order-1 md:order-2">
            <ProfileImage />
          </div>
          <FloatingKeywords />
        </div>
      </div>
    </section>
  );
}



const BubbleText = () => {
  useEffect(() => {
    const spans = document.querySelectorAll(
      ".hover-text span"
    ) as NodeListOf<HTMLSpanElement>;

    spans.forEach((span) => {
      span.addEventListener("mouseenter", function (this: typeof span) {
        this.style.fontWeight = "900";
        this.style.color = "rgb(152, 170, 245)";

        const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
        const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "500";
          leftNeighbor.style.color = "rgb(23, 60, 207)";
        }
        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "500";
          rightNeighbor.style.color = "rgb(23, 60, 207)";
        }
      });

      span.addEventListener("mouseleave", function (this: typeof span) {
        this.style.fontWeight = "100";
        this.style.color = "rgb(224, 224, 224)";

        const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
        const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "100";
          leftNeighbor.style.color = "rgb(224, 224, 224)";
        }

        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "100";
          rightNeighbor.style.color = "rgb(224, 224, 224)";
        }
      });
    });
  }, []);

  return (
    <div>
    <p className="hover-text text-lg text-gray-300">
      <Text>Hey there, I'm Isam Ahmed, a passionate software engineer with a love for creating elegant solutions to complex problems. 
              With expertise in modern web technologies and a keen eye for design, I build applications that 
              not only function flawlessly but also provide exceptional user experiences.</Text>
    </p>
    <br />
    <p className='hover-text text-lg text-gray-300'>
      <Text>My journey in software development has led me to work with cutting-edge technologies and 
      collaborate with talented teams on innovative projects.</Text>
    </p>
    </div>
  );
};

const Text = ({ children }: { children: string }) => {
  return (
    <>
      {children.split("").map((child, idx) => (
        <span
          style={{
            transition: "0.35s font-weight, 0.35s color",
          }}
          key={idx}
        >
          {child}
        </span>
      ))}
    </>
  );
};

