import { motion } from 'framer-motion';
import { LangBar } from './skill-Bar';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const langs = [
  { name: 'Amharic', proficiency: 100, level: 'Native' },
  { name: 'English', proficiency: 95, level: 'Fluent' },
  { name: 'Afan Oromo', proficiency: 60, level: 'Intermediate' },
  { name: 'Arabic', proficiency: 30, level: 'Beginner' },
];



function LanguageSection() {
  const {theme} = useTheme()
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          
          
          className="text-left mb-16"
        >
          <h2 className={`text-4xl font-bold mb-6  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Languages</h2>
          <p className={`text-xl  ${ theme === 'dark' ? 'text-gray-300' : 'text-gray-950'}`}>
            Language proficiency and expertise
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-2xl">
          {langs.map((lang, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              
            >
              <LangBar
                name={lang.name}
                proficiency={lang.proficiency}
                level={lang.level}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSection;
