import { Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

function Experience() {
  const experiences = [
    {
      role: "Full Stack Developer",
      company: "Platform Technologies PLC",
      period: "Feb, 2025 - Present",
      location: "Addis Ababa, Ethiopia",
      description: "Contributed as a Full Stack and Frontend Developer. Collaborated with a dynamic team to deliver impactful projects.",
      achievements: [
        "Implemented essential features based on user requirements, enhancing functionality and user experience.",
        "Conducted thorough testing to identify and resolve issues, improving the overall software performance.",
        "Played a key role in refining software to make it production-ready, ensuring high quality and efficiency."
      ]
    },
    {
      role: "Web Developer",
      company: "Ministry of Innovative Technology(MinT)",
      period: "Feb, 2025 - Present",
      location: "Addis Ababa, Ethiopia",
      description: "Joined a team of developers to contribute to web hosting solutions for my internship.",
      achievements: [
        "Monitored server performance, uptime, and traffic to ensure smooth operation",
        "Deploying websites and web applications on web servers, ensuring seamless launch and scaling.",
        " Improving website speed and performance through caching, and other techniques."
      ]
    },
    {
      role: "UI/UX Designer and Full Stack Developer",
      company: "Freelance",
      period: "Jan, 2024 - Present",
      location: "Addis Ababa, Ethiopia",
      description: "Worked as both UI/UX Designer and Full Stack Developer by designing and developing modern, clean, and user-friendly web applications, prioritizing usability and accessibility.",
      achievements: [
        "Built RESTful APIs",
        "Designed clean and user-friendly interfaces",
        "Ensured design consistency"
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Prodigy Info Tech",
      period: "Jun - Jul, 2024",
      location: "Addis Ababa, Ethiopia",
      description: "Developed and maintained full-stack web applications, completing a one-month internship.",
      achievements: [
        "Built RESTful APIs and Integrated third-party api services",
        "Designed a clean user interface and Ensured design consistency",
        "Developed and maintained full-stack applications using React.js, Next.js, Node.js, PostgreSQL, and Mongodb."
        // "Improved application performance by 50% through caching",
        // "Integrated third-party services that automated key business processes"
      ]
    }
  ];

  return (
    <div id='experience'>
      <section className="pt-16 pb-20 px-4 md:px-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
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
                className="backdrop-blur-md z-10 border border-blue-700 p-6 rounded-xl transition-all duration-300 relative group hover:shadow-xl hover:shadow-blue-950/30 ml-8 md:ml-0"
              >
                {/* Timeline Bullet */}
                <div className="absolute -left-0 md:-left-0 top-6 w-8 h-8 flex items-center justify-center transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-[6px] group-hover:scale-125 transition-all duration-300 relative">
                    <div className="absolute inset-0 animate-pulse bg-blue-500 rounded-full opacity-30"></div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                    <p className="text-blue-400 font-medium mt-1">{experience.company}</p>
                  </div>
                  <div className="flex text-blue-300 mt-2 md:mt-0">
                      <p className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full text-sm">
                        {experience.period}
                      </p>
                      <p className='text-sm px-3 content-center'>| {experience.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{experience.description}</p>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{achievement}</span>
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