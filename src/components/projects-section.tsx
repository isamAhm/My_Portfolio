import { useRef } from 'react';
import { ProjectCard } from './project-card';
import streambox1 from '../assets/streambox1.png';
import streambox2 from '../assets/streambox2.png';
import dash from '../assets/dash.png';
import skycast from '../assets/skycast.png';
import portgo from '../assets/portgo.png';
import tictactoe from '../assets/tictactoe.png';
import jd2 from '../assets/jd2.png';
import portfolio from '../assets/portfolio.png';
import snapscape from '../assets/snap.png';

const projects = [
  {
    title: 'StreamBox',
    description: 'A movie and show streaming plateform.',
    image: streambox1,
    tags: ['React', 'Node.js', 'Express', 'Postgresql'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'PortGo',
    description: 'A plateform for a company that creates websites.',
    image: portgo,
    tags: ['TypeScript', 'React', 'tailwindcss', 'Node.js'],
    href: 'https://github.com/yourusername/ai-chat-app',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'SkyCast',
    description: 'A weather forcast web-app.',
    image: skycast,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'Tic Tac Toe',
    description: 'A Tic Tac Toe game website.',
    image: tictactoe,
    tags: ['JavaScript', 'React', 'Machine-Learning', 'tailwindcss', 'Node.js'],
    href: 'https://github.com/yourusername/ai-chat-app',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'Dash',
    description: 'A Stop watch websites.',
    image: dash,
    tags: ['JavaScript', 'React', 'tailwindcss'],
    href: 'https://github.com/yourusername/ai-chat-app',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'StreamBox-V2',
    description: 'A movie and show streaming platform version-2.',
    image: streambox2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'JD',
    description: 'A sample aesthetic website',
    image: jd2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'IsamDev.',
    description: 'This is my personal Portfolio.',
    image: portfolio,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'Snapscape',
    description: 'A sample website for inspiration, inspired by Pinterest.',
    image: snapscape,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/yourusername/ecommerce-platform',
    githubHref: "https://github.com/username/repository"
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="max-md:-mt-96 min-h-screen bg-transparent py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:-mb-48">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}