import { useRef, useState } from 'react';
import { ProjectCard } from './project-card';
import { VideoModal } from './video-modal';
import { Github, ExternalLink, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Project Assets
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
import videotry from '../assets/video.mp4';
import dashvideo from '../assets/dash.mp4';
import skycastvideo from '../assets/skycast.mp4';
import portgovideo from '../assets/portgo.mp4';
import gridlockvideo from '../assets/gridlock.mp4';
import jdvideo from '../assets/jd.mp4';
import fizzoravideo from '../assets/fizzora.webm';
import fizzora from '../assets/fizzora.png';
import streambox3 from '../assets/streambox_home.png';
// import streamboxvideo from '../assets/streambox.webm';

interface Project {
  title: string;
  description: string;
  modalDescription?: string;
  image: string;
  tags: string[];
  href: string;
  githubHref?: string;
  videoUrl?: string;
}

interface DetailProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  videoUrl?: string;
  onPlayClick: () => void;
}

interface VideoData {
  videoUrl: string;
  title: string;
  tags: string[]; // Add this line
  description: string;
  
}

const projects: Project[] = [
  {
    title: 'StreamBox',
    description: 'A movie and show streaming platform.',
    modalDescription: 'StreamBox is a comprehensive streaming platform that allows users to watch movies and shows with a user-friendly interface. It features a robust backend with Node.js and Express, and a dynamic frontend built with React.', // Modal description
    image: streambox1,
    tags: ['React', 'Node.js', 'Express', 'Postgresql'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/StreamBox_movies_and_shows_review_website',
    videoUrl: videotry,
  },
  {
    title: 'PortGo',
    description: 'A platform for a company that creates websites.',
    modalDescription: 'PortGo is a feature-rich platform designed for a company specializing in website creation. It provides an intuitive interface where users can browse services, explore templates, and request custom website development. Built with a modern tech stack including TypeScript, React, and Tailwind CSS for the frontend, and Node.js for the backend, PortGo ensures smooth performance and scalability. The platform offers seamless navigation, interactive UI components, and a responsive design to enhance the user experience',
    image: portgo,
    tags: ['TypeScript', 'React', 'tailwindcss', 'Node.js'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/username/repository',
    videoUrl: portgovideo,
  },
  {
    title: 'SkyCast',
    description: 'A weather forecast web-app.',
    modalDescription: 'SkyCast is a dynamic weather forecast web application that provides real-time weather updates and weekly forecasts. Leveraging React for a seamless UI, and Node.js with Express for backend services, the app fetches accurate weather data from the OpenWeatherMap API. Users can view details such as temperature, humidity, wind speed, and air quality. MongoDB is used for storing user preferences and search history, enhancing personalization. The platform is optimized for both desktop and mobile users.',
    image: skycast,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/SkyCast_weather_app',
    videoUrl: skycastvideo,
  },
  {
    title: 'Fizzora',
    description: 'A sample soda drink landing page.',
    modalDescription: 'A sample soda drink landing page designed to showcase a refreshing beverage. The project emphasizes a clean and modern design, utilizing next.js for interactive components and Tailwind CSS for responsive styling. The landing page features vibrant visuals, engaging animations, and clear calls to action, providing an inviting experience for users. It serves as a template for beverage brands looking to establish an online presence with a focus on aesthetics and user engagement.',
    image: fizzora,
    tags: ['TypeScript', 'next.js', 'tailwindcss', 'Node.js'],
    href: 'https://isamahm.github.io/Fizzora_sample/',
    githubHref: 'https://github.com/isamAhm/fizzora_sample',
    videoUrl: fizzoravideo,
  },
  {
    title: 'Tic Tac Toe',
    description: 'A Tic Tac Toe game website.',
    modalDescription: 'Gridlock is a modern take on the classic Tic Tac Toe game with enhanced AI-driven gameplay. The game is built using JavaScript and React, incorporating Machine Learning algorithms to strengthen the AI opponent, making matches more challenging. The UI is styled with Tailwind CSS, ensuring a clean and responsive design. The game also features a winning highlight mechanism, multiplayer support, and a draw detection system for a well-rounded experience.',
    image: tictactoe,
    tags: ['JavaScript', 'React', 'Machine-Learning', 'tailwindcss', 'Node.js'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/Gridlock_tic_tac_toe_game',
    videoUrl: gridlockvideo,
  },
  {
    title: 'Dash',
    description: 'A Stop watch websites.',
    modalDescription: 'Dash is a sleek and minimalistic stopwatch web application designed for precise time tracking. Developed with JavaScript and React, it offers a smooth, interactive experience with start, pause, reset, and lap time functionalities. The interface is crafted using Tailwind CSS, ensuring an elegant and user-friendly design. Dash is lightweight and optimized for fast performance, making it ideal for tracking activities, workouts, or study sessions.',
    image: dash,
    tags: ['JavaScript', 'React', 'tailwindcss'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/Dash_Stopwatch',
    videoUrl: dashvideo,
  },
  {
    title: 'StreamBox-V2',
    description: 'A movie and show streaming platform version-2.',
    modalDescription: 'StreamBox-V2 is the second iteration of a comprehensive movie and show streaming platform, currently in development. This version is built with Next.js for enhanced performance, server-side rendering, and seamless navigation. The backend is powered by Node.js, Express, and MongoDB, ensuring efficient data handling and scalability. The platform aims to offer a rich collection of entertainment content where users can browse movies and shows, view detailed descriptions, and stream content effortlessly. It also includes personalized recommendations, an advanced search filter, and a scalable database structure to support future expansions.',
    image: streambox2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/streambox_reactjs',
    videoUrl: videotry,
  },
  {
    title: 'JD',
    description: 'A sample aesthetic website',
    modalDescription: 'JD is a visually appealing sample aesthetic website that showcases elegant UI design and smooth navigation. Built with React, Node.js, Express, and MongoDB, the platform demonstrates clean architecture and user-friendly layouts. The project serves as an inspiration for modern web design, emphasizing aesthetic appeal, typography, and fluid animations.',
    image: jd2,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/username/repository',
    videoUrl: jdvideo,
  },
  {
    title: 'IsamDev.',
    description: 'This is my personal Portfolio.',
    modalDescription: 'IsamDev. is my personal portfolio website, showcasing my projects, skills, and professional journey. Built using React and TypeScript for a structured and scalable codebase, the backend is powered by Node.js and Express. The site features interactive animations, and a responsive design that adapts across all devices. It reflects my expertise in modern web development technologies.',
    image: portfolio,
    tags: ['React', 'Node.js', 'Express', 'TypeScript'],
    href: 'https://www.isamahmed.duckdns.org/',
    githubHref: 'https://github.com/isamAhm/My_Portfolio',
    videoUrl: videotry,
  },
  {
    title: 'Snapscape',
    description: 'A sample website for inspiration, inspired by Pinterest.',
    modalDescription: 'Snapscape is a visually captivating image-sharing platform inspired by Pinterest, designed for users to explore, upload, and share high-quality content. Built with Next.js and TypeScript for a modern and efficient frontend, the backend is powered by Node.js and Express, ensuring seamless performance. The platform enables users to upload images, create collections, and engage with a beautifully curated feed. With a responsive and intuitive UI, Snapscape delivers an optimal experience across all devices, making it an ideal space for digital inspiration and creativity.',
    image: snapscape,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://404-beryl.vercel.app/',
    githubHref: 'https://github.com/isamAhm/snapscape_next.js',
    videoUrl: videotry,
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { theme } = useTheme();

  return (
    <section ref={sectionRef} className="min-h-screen bg-transparent py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-black'
          }`}>Other Personal Projects</h2>
          <p className={`text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-black'
          }`}>
            A showcase of my other work and personal projects
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:-mb-48">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              onPlayClick={() => {
                if (project.videoUrl) {
                  setSelectedVideo({
                    videoUrl: project.videoUrl,
                    title: project.title,
                    description: project.modalDescription || project.description, // Use modalDescription if available
                    tags: project.tags,
                  });
                } else {
                  console.warn(`No video URL for project: ${project.title}`);
                }
              }}
            />
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        tags={selectedVideo?.tags}
        description={selectedVideo?.description}
      />
    </section>
  );
};

export const ProjectDetails = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { theme } = useTheme();

  return (
    <div id="projects" className={`min-h-screen bg-transparent  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="space-y-8">
          <DetailProjectCard
            title="StreamBox"
            description="StreamBox is a comprehensive movie and TV show streaming platform designed to deliver a smooth and engaging user experience. It features a dynamic, responsive frontend built with Next.js, offering fast navigation and server-side rendering for optimal performance. The backend is powered by Node.js, MongoDB, and Prisma, providing a scalable and efficient infrastructure for content management, user authentication, and seamless streaming."
            image={streambox3}
            technologies={['Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Prisma']}
            liveUrl="https://streambox-final-streaming.vercel.app/home"
            githubUrl="https://github.com/isamAhm/"
            videoUrl={videotry}
            onPlayClick={() => setSelectedVideo({
              videoUrl: videotry,
              title: 'StreamBox',
              description: 'StreamBox is a comprehensive movie and TV show streaming platform designed to deliver a smooth and engaging user experience. It features a dynamic, responsive frontend built with Next.js, offering fast navigation and server-side rendering for optimal performance. The backend is powered by Node.js, MongoDB, and Prisma, providing a scalable and efficient infrastructure for content management, user authentication, and seamless streaming.',
              tags: ['Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Prisma'],
            })}
          />
          
          <DetailProjectCard
            title="Efoyat Doctor's Appointment"
            description="A modern web-based platform designed to streamline doctor-patient interactions through an efficient appointment booking and management system. Unlike traditional methods, where appointments are often scheduled in-person visits, Efoyta allows patients to book appointments online from anywhere at their convenience. Doctors can manage their schedules, request lab checkups, and receive results digitally. Patients also receive their lab results through the platform, ensuring seamless communication and better patient care."
            image={efoyta}
            technologies={['React.js', 'Node.js', 'Redux', 'Express.js', 'MongoDB']}
            liveUrl="https://efoyta.vercel.app/"
            githubUrl="https://github.com/isamAhm/Efoyta_Doctors_Appointment"
            videoUrl={videotry}
            onPlayClick={() => setSelectedVideo({
              videoUrl: videotry,
              title: "Efoyat Doctor's Appointment",
              description: 'Efoyta is a modern web-based platform designed to streamline doctor-patient interactions through an efficient appointment booking and management system. Unlike traditional methods, where appointments are often scheduled in-person visits, Efoyta allows patients to book appointments online from anywhere at their convenience. Doctors can manage their schedules, request lab checkups, and receive results digitally. Patients also receive their lab results through the platform, ensuring seamless communication and better patient care.',
              tags: ['React.js', 'Node.js', 'Redux', 'Express.js', 'MongoDB'],
            })}
          />
          

          <DetailProjectCard
            title="HireSmart - ML-Powered Resume Screening"
            description="An intelligent resume screening platform designed to streamline the recruitment process. It helps employers efficiently filter and evaluate candidate applications by automating the screening process. By leveraging machine learning models and advanced algorithms, HireSmart quickly identifies the most suitable candidates based on their resumes and job requirements, saving valuable time and resources for hiring managers."
            image={hiresmart}
            technologies={['React.js', 'Node.js', 'JavaScript', 'OpenAI API']}
            liveUrl="https://hire-smart-v1.vercel.app/"
            githubUrl="https://github.com/isamAhm/HireSmart_Frontend"
            videoUrl={videotry}
            onPlayClick={() => setSelectedVideo({
              videoUrl: videotry,
              title: 'HireSmart - ML-Powered Resume Screening',
              description: 'HireSmart leverages machine learning to automate resume screening, analyzing resumes against job requirements and scoring candidates. It is an intelligent resume screening platform designed to streamline the recruitment process. It helps employers efficiently filter and evaluate candidate applications by automating the screening process. By leveraging machine learning models and advanced algorithms, HireSmart quickly identifies the most suitable candidates based on their resumes and job requirements, saving valuable time and resources for hiring managers.',
              tags: ['React.js', 'Node.js', 'JavaScript', 'OpenAI API'],
            })}
          />
          
          <DetailProjectCard
            title="Cultural Restaurant Management"
            description="A mobile app for a table reservation solution designed specifically for a local Ethiopian cultural restaurant. The project aims to simplify the process of managing table reservations and food ordering while offering a user-friendly experience for both administrators and customers. The system ensures smooth booking, enhances operational efficiency, and facilitates easy management of tables. With secure authentication and an intuitive interface, the system meets the unique needs of the restaurant while maintaining simplicity and efficiency, providing a complete dining experience."
            image={mobile}
            technologies={['Flutter', 'Express', 'REST', 'Node.js', 'MongoDB', 'Swift', 'Dart']}
            liveUrl="https://404-beryl.vercel.app/"
            githubUrl="https://github.com/FikreyohanesAbera/flutter-2024-proj"
            videoUrl={videotry}
            onPlayClick={() => setSelectedVideo({
              videoUrl: videotry,
              title: 'Cultural Restaurant Management',
              description: 'A mobile app for a table reservation solution designed specifically for a local Ethiopian cultural restaurant. The project aims to simplify the process of managing table reservations and food ordering while offering a user-friendly experience for both administrators and customers. The system ensures smooth booking, enhances operational efficiency, and facilitates easy management of tables. With secure authentication and an intuitive interface, the system meets the unique needs of the restaurant while maintaining simplicity and efficiency, providing a complete dining experience.',
              tags: ['Flutter', 'Express', 'REST', 'Node.js', 'MongoDB', 'Swift', 'Dart'],
            })}
          />
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        description={selectedVideo?.description}
        tags={selectedVideo?.tags}
      />
    </div>
  );
};

const DetailProjectCard = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  onPlayClick,
}: DetailProject) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <div 
      className={`flex max-md:-mt-96 flex-col md:flex-row gap-6 rounded-xl overflow-hidden border border-spacing-60 border-blue-950 hover:border-blue-500/30 transition-all duration-300 group relative transform-gpu hover:shadow-blue-950 hover:shadow-lg ${theme === 'dark' ? 'bg-transparent' : 'bg-gradient-to-br from-white via-blue-200 to-white backdrop-blur-md'}`}
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
        <div className={`absolute inset-y-0 right-0 w-1/3  ${theme === 'dark' ? 'bg-gradient-to-l from-[#030711] to-transparent' : 'bg-gradient-to-l from-gray-500/20 to-transparent'} `}></div>
      </div>

      {/* Content */}
      <div className="md:w-2/3 p-6 space-y-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className={` text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 bg-blue-500/10  rounded-md text-xs border border-blue-500/20 ${theme === 'dark' ? 'text-blue-300' : 'text-black'}`}
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
            className={`inline-flex items-center px-3 py-1.5 bg-blue-500/20  rounded-lg hover:bg-blue-500/30 transition-colors text-sm border border-blue-500/30 ${theme === 'dark' ? 'text-blue-300' : 'text-black'}`}
          >
            Live Demo <ExternalLink size={14} className="ml-1.5" />
          </a>
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1.5 bg-gray-700/50  rounded-lg hover:bg-gray-700/70 transition-colors text-sm border border-gray-600/30 ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}
          >
            Code <Github size={14} className="ml-1.5" />
          </a>
          <button 
            onClick={onPlayClick}
            className={`inline-flex items-center px-3 py-1.5 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors text-sm border border-purple-500/30 ${ theme === 'dark' ? 'text-purple-300' : 'text-black'}`}
          >
            Watch Demo <Play size={14} className="ml-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;