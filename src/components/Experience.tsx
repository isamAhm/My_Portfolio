import { Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Experience() {
  const { theme } = useTheme();
  const experiences = [
    {
      role: "Forward Development Engineer & Lead Full Stack Developer",
      company: "Flozi",
      period: "Feb 2025 – Present",
      location: "Remote",
      description: "Led end-to-end development of scalable web applications, overseeing frontend and backend architecture, feature implementation, and deployment.",
      achievements: [
        "Managed technical decisions, code quality, and performance optimization across the stack.",
        "Oversaw frontend and backend architecture and feature implementation.",
        "Led deployment pipelines and ensured production-grade reliability."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Neue World",
      period: "Nov 2024 – Present",
      location: "Remote / United Arab Emirates",
      description: "Developed a Framer Marketplace plugin that enhances design quality, system consistency, and accessibility.",
      achievements: [
        "Implemented automated analysis and validation features aligned with platform standards.",
        "Improved performance and ensured marketplace readiness.",
        "Contributed to design system consistency and accessibility improvements."
      ]
    },
    {
      role: "Solutions Architect and Full Stack Developer",
      company: "Elsewedy Electric",
      period: "May 2025 – Present",
      location: "Hybrid / Addis Ababa",
      description: "Led the end-to-end design and development of a secure biometric time management system.",
      achievements: [
        "Integrated facial recognition and fingerprint authentication across desktop and web applications.",
        "Architected a secure and scalable biometric data pipeline.",
        "Ensured cross-platform compatibility between desktop and web interfaces."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Platform Technologies",
      period: "Feb 2023 – Dec 2024",
      location: "Addis Ababa",
      description: "Collaborated as a Full Stack Developer and Lead Front-end Developer within a dynamic team.",
      achievements: [
        "Developed a freelance marketplace platform from the ground up.",
        "Helped finalize and ship an e-commerce website.",
        "Led frontend architecture decisions and code quality standards."
      ]
    },
    {
      role: "Web Developer",
      company: "Ministry of Innovative Technology (MinT)",
      period: "Feb, 2023 - May 2024",
      location: "Addis Ababa, Ethiopia",
      description: "Joined a team of developers to contribute to web hosting solutions for my internship.",
      achievements: [
        "Monitored server performance, uptime, and traffic to ensure smooth operation.",
        "Deploying websites and web applications on web servers, ensuring seamless launch and scaling.",
        "Improving website speed and performance through caching, and other techniques."
      ]
    },
    {
      role: "UI/UX Designer and Full Stack Developer",
      company: "Freelance",
      period: "Jan, 2023 - 2024",
      location: "Addis Ababa, Ethiopia",
      description: "Worked as both UI/UX Designer and Full Stack Developer by designing and developing modern, clean, and user-friendly web applications, prioritizing usability and accessibility.",
      achievements: [
        "Built RESTful APIs.",
        "Designed clean and user-friendly interfaces.",
        "Ensured design consistency."
      ]
    }
  ];

  return (
    <div id='experience'>
      <section className="pt-16 pb-20 px-4 md:px-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Professional Experience</h2>
          </div>

          <div className="relative space-y-8">
            {/* Animated Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.3
              }}
              className="absolute left-4 md:left-1/2 h-[95%] w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2 top-4"
              style={{ originY: 0 }}
            >
              <div className="absolute inset-0 bg-blue-500/30 blur-sm"></div>
            </motion.div>

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.15,
                  ease: "easeOut"
                }}
                className={`backdrop-blur-md z-10 border border-blue-700 p-6 rounded-xl transition-all duration-300 relative group hover:shadow-xl hover:shadow-blue-950/30 ml-8 md:ml-0 ${theme === 'dark' ? '' : 'bg-gradient-to-br from-white via-blue-200 to-white'}`}
              >
                {/* Timeline Bullet */}
                <div className="absolute -left-0 md:-left-0 top-6 w-8 h-8 flex items-center justify-center transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-[6px] group-hover:scale-125 transition-all duration-300 relative">
                    <div className="absolute inset-0 animate-pulse bg-blue-500 rounded-full opacity-30"></div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>{experience.role}</h3>
                    <p className={`text-blue-400 font-medium mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>{experience.company}</p>
                  </div>
                  <div className={`flex mt-2 md:mt-0 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>
                    <p className={` px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300 ' : 'bg-blue-900 text-white '} `}>
                      {experience.period}
                    </p>
                    <p className='text-sm px-3 content-center'>| {experience.location}</p>
                  </div>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-black'
                  } mb-4`}>{experience.description}</p>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Experience;