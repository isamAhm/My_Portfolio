import React from 'react';
import {
    Code2, Briefcase,
    Figma, Palette, Pen, Layout, Smartphone,
    MonitorSmartphone as ReactIcon, Monitor, Database, Server,
    Terminal, GitBranch, Container as Docker, Cloud,
    FlaskConical as TestTube, Cpu, FileCode, Coffee,
    Binary as Python, Blocks, Boxes,
    Github,
    CloudCog
  } from 'lucide-react';

function TechnicalSkillSection() {
  return (
    <div className='bg-transparent'>
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-white">Technologies</h2>
          </div>
          <p className='text-xl mb-8'>Here are the technologies I am proficient in:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: "UI Design",
                icon: <Palette className="w-6 h-6 text-purple-600" />,
                skills: [
                  { name: "Figma", icon: <Figma className="w-4 h-4" /> },
                  { name: "Adobe XD", icon: <Pen className="w-4 h-4" /> },
                  { name: "Sketch", icon: <Layout className="w-4 h-4" /> },
                  { name: "UI/UX Principles", icon: <Smartphone className="w-4 h-4" /> },
                  { name: "Wireframing", icon: <Layout className="w-4 h-4" /> }
                ]
              },
              {
                category: "Frontend Development",
                icon: <Monitor className="w-6 h-6 text-blue-600" />,
                skills: [
                  { name: "React.js", icon: <ReactIcon className="w-4 h-4" /> },
                  { name: "NextJs", icon: <ReactIcon className="w-4 h-4" /> },
                //   { name: "Vue.js", icon: <Code2 className="w-4 h-4" /> },
                //   { name: "Angular", icon: <Code2 className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "JavaScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "HTML", icon: <Layout className="w-4 h-4" /> },
                  { name: "CSS", icon: <Layout className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layout className="w-4 h-4" /> },
                  { name: "Bootstrap", icon: <Layout className="w-4 h-4" /> },
                  { name: "BULMA", icon: <Layout className="w-4 h-4" /> },
                  { name: "SASS", icon: <FileCode className="w-4 h-4" /> }
                ]
              },
              {
                category: "Backend Development",
                icon: <Server className="w-6 h-6 text-green-600" />,
                skills: [
                  { name: "Node.js", icon: <Terminal className="w-4 h-4" /> },
                  { name: "Express.js", icon: <Server className="w-4 h-4" /> },
                //   { name: "NestJS", icon: <Terminal className="w-4 h-4" /> },
                  { name: "GraphQL", icon: <Blocks className="w-4 h-4" /> },
                  { name: "REST APIs", icon: <Server className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <Server className="w-4 h-4" /> },
                  { name: "JavaScript", icon: <Server className="w-4 h-4" /> },
                //   { name: "Microservices", icon: <Boxes className="w-4 h-4" /> }
                ]
              },
              {
                category: "Mobile App Development",
                icon: <Smartphone className="w-6 h-6 text-orange-600" />,
                skills: [
                //   { name: "React Native", icon: <ReactIcon className="w-4 h-4" /> },
                  { name: "Flutter", icon: <Smartphone className="w-4 h-4" /> },
                //   { name: "iOS (Swift)", icon: <Terminal className="w-4 h-4" /> },
                  { name: "Kotlin", icon: <Terminal className="w-4 h-4" /> },
                //   { name: "Expo", icon: <Smartphone className="w-4 h-4" /> }
                ]
              },
              {
                category: "Databases",
                icon: <Database className="w-6 h-6 text-red-600" />,
                skills: [
                  { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
                  { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
                //   { name: "Redis", icon: <Database className="w-4 h-4" /> },
                  { name: "MySQL", icon: <Database className="w-4 h-4" /> },
                  { name: "Firebase", icon: <Cloud className="w-4 h-4" /> },
                  { name: "Prisma", icon: <Database className="w-4 h-4" /> },
                  { name: "Ejs", icon: <Database className="w-4 h-4" /> }
                ]
              },
              {
                category: "Programming Languages",
                icon: <FileCode className="w-6 h-6 text-indigo-600" />,
                skills: [
                  { name: "JavaScript", icon: <Coffee className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "Python", icon: <Python className="w-4 h-4" /> },
                  { name: "Java", icon: <Coffee className="w-4 h-4" /> },
                  { name: "C++", icon: <Cpu className="w-4 h-4" /> },
                //   { name: "Go", icon: <Terminal className="w-4 h-4" /> }
                ]
              },
              {
                category: "Tools & Others",
                icon: <Briefcase className="w-6 h-6 text-gray-600" />,
                skills: [
                  { name: "Git", icon: <GitBranch className="w-4 h-4" /> },
                  { name: "Github", icon: <Github className="w-4 h-4" /> },
                  { name: "Vercel", icon: <Cloud className="w-4 h-4" /> },
                //   { name: "Docker", icon: <Docker className="w-4 h-4" /> },
                //   { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
                //   { name: "CI/CD", icon: <GitBranch className="w-4 h-4" /> },
                //   { name: "Jest", icon: <TestTube className="w-4 h-4" /> },
                //   { name: "Kubernetes", icon: <Boxes className="w-4 h-4" /> }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-transparent hover:shadow-blue-950 hover:shadow-lg text-white border border-blue-700 p-6 rounded-xl transition-shadow hover:-translate-y-1 hover:scale-[101%] hover:ease-in-out hover:transition-transform hover:duration-500">
                <div className="flex items-center gap-2 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-950/20 text-blue-600 rounded-lg text-sm font-medium"
                    >
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TechnicalSkillSection;
