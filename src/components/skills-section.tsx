import { motion } from 'framer-motion';
import {
  Code2, Database, Globe, Layout, Server, Smartphone, User, Workflow,
} from 'lucide-react';
import { SkillBar } from './skill-Bar';

const skills = [
  { icon: <Code2 size={20} />, name: 'Frontend Development', level: 95 },
  { icon: <Server size={20} />, name: 'Backend Development', level: 80 },
  { icon: <Database size={20} />, name: 'Database Design', level: 80 },
  { icon: <Layout size={20} />, name: 'UI/UX Design', level: 80 },
  { icon: <User size={20} />, name: 'Full Stack Development', level: 85 },
  { icon: <Globe size={20} />, name: 'Web Services', level: 80 },
  { icon: <Smartphone size={20} />, name: 'Mobile Development', level: 75 },
  { icon: <Workflow size={20} />, name: 'Agile Methodology', level: 85 },
];



export function SkillsSection() {
  return (
    <section className="py-20 bg-transparent" id="skills">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          
          
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">Skills</h2>
          <p className="text-xl text-gray-300">
            Expertise across the full stack of modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              
            >
              <SkillBar
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
