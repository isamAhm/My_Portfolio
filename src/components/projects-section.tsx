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
import hiresmart from '../assets/hiresmart2.png';
import efoyta from '../assets/efoyta.png';
import mobile from '../assets/mobile1.png';
import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'StreamBox',
    description: 'A movie and show streaming plateform.',
    image: streambox1,
    tags: ['React', 'Node.js', 'Express', 'Postgresql'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/StreamBox_movies_and_shows_review_website"
  },
  {
    title: 'PortGo',
    description: 'A plateform for a company that creates websites.',
    image: portgo,
    tags: ['TypeScript', 'React', 'tailwindcss', 'Node.js'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'SkyCast',
    description: 'A weather forcast web-app.',
    image: skycast,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/SkyCast_weather_app"
  },
  {
    title: 'Tic Tac Toe',
    description: 'A Tic Tac Toe game website.',
    image: tictactoe,
    tags: ['JavaScript', 'React', 'Machine-Learning', 'tailwindcss', 'Node.js'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/Gridlock_tic_tac_toe_game"
  },
  {
    title: 'Dash',
    description: 'A Stop watch websites.',
    image: dash,
    tags: ['JavaScript', 'React', 'tailwindcss'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/Dash_Stopwatch"
  },
  {
    title: 'StreamBox-V2',
    description: 'A movie and show streaming platform version-2.',
    image: streambox2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/streambox_reactjs"
  },
  {
    title: 'JD',
    description: 'A sample aesthetic website',
    image: jd2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/username/repository"
  },
  {
    title: 'IsamDev.',
    description: 'This is my personal Portfolio.',
    image: portfolio,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    href: 'https://www.isamahmed.duckdns.org/',
    githubHref: "https://github.com/isamAhm/My_Portfolio"
  },
  {
    title: 'Snapscape',
    description: 'A sample website for inspiration, inspired by Pinterest.',
    image: snapscape,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: "https://github.com/isamAhm/snapscape_next.js"
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      
      ref={sectionRef} 
      className="min-h-screen bg-transparent py-20"
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


function ProjectDetail() {
  return (
    <div id="projects" className="min-h-screen bg-transparent text-white">

     

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="space-y-8">
          <DetailProjectCard 
            title="HireSmart - ML-Powered Resume Screening"
            description="An intelligent resume screening platform designed to streamline the recruitment process. It helps employers efficiently filter and evaluate candidate applications by automating the screening process. By leveraging machine learning models and advanced algorithms, HireSmart quickly identifies the most suitable candidates based on their resumes and job requirements, saving valuable time and resources for hiring managers."
            image={hiresmart}
            technologies={['React.js', 'Node.js', 'JavaScript', 'OpenAI API']}
            liveUrl="https://404-beryl.vercel.app/"
            githubUrl="https://github.com/isamAhm/HireSmart_Frontend"
          />
          <DetailProjectCard 
            title="Efoyat Doctor's Appointment"
            description="A modern web-based platform designed to streamline doctor-patient interactions through an efficient appointment booking and management system. Unlike traditional methods, where appointments are often scheduled in-person visits, Efoyta allows patients to book appointments online from anywhere at their convenience. Doctors can manage their schedules, request lab checkups, and receive results digitally. Patients also receive their lab results through the platform, ensuring seamless communication and better patient care."
            image={efoyta}
            technologies={['React.js', 'Node.js', 'Redux', 'Express.js', 'MongoDB']}
            liveUrl="https://404-beryl.vercel.app/"
            githubUrl="https://github.com/isamAhm/Efoyta_Doctors_Appointment"
          />
          <DetailProjectCard 
            title="Cultural Restaurant Management"
            description="A mobile app for a table reservation solution designed specifically for a local Ethiopian cultural restaurant. The project aims to simplify the process of managing table reservations and food ordering while offering a user-friendly experience for both administrators and customers. The system ensures smooth booking, enhances operational efficiency, and facilitates easy management of tables. With secure authentication and an intuitive interface, the system meets the unique needs of the restaurant while maintaining simplicity and efficiency, providing a complete dining experience."
            image={mobile}
            technologies={['Flutter', 'Express', 'REST', 'Node.js', 'MongoDB','Swift','Dart']}
            liveUrl="https://404-beryl.vercel.app/"
            githubUrl="https://github.com/FikreyohanesAbera/flutter-2024-proj"
          />
        </div>
      </div>
    </div>
  );
}


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

function DetailProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  liveUrl,
  githubUrl 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex max-md:-mt-96 flex-col md:flex-row gap-6 bg-transparent rounded-xl overflow-hidden border border-spacing-60 border-blue-950 hover:border-blue-500/30 transition-all duration-300 group relative bg-gray-800 transform-gpu hover:shadow-blue-950 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="md:w-1/3 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-64 md:h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#030711] to-transparent"></div>
      </div>

      {/* Content */}
      <div className="md:w-2/3 p-6 space-y-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-md text-xs border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <a 
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm border border-blue-500/30"
          >
            Live Demo <ExternalLink size={14} className="ml-1.5" />
          </a>
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors text-sm border border-gray-600/30"
          >
            Code <Github size={14} className="ml-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;