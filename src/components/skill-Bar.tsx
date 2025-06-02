import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface SkillBarProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface LangBarProps {
  name: string;
  proficiency: number;
  level: string;
}

export const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  const { theme } = useTheme()
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className={` mr-2 ${ theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>{icon}</div>
        <span className={`font-semibold  ${ theme === 'dark' ? 'text-gray-300' : 'text-gray-950' }`}>{name}</span>
        <span className={`ml-auto  ${ theme === 'dark' ? 'text-gray-400' : 'text-gray-900'}`}>{level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-300/10' : 'bg-gray-300'} `}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-blue-700 rounded-full"
        />
      </div>
    </div>
  );
};

export const LangBar: React.FC<LangBarProps> = ({ name, proficiency, level }) => {
  const {theme} = useTheme()
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className={` ${ theme === 'dark' ? 'text-white' : 'text-gray-950' }`}>{name}</span>
        <span className={`${ theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>{level}</span>
      </div>
      <div className={`h-2 rounded-full  ${theme === 'dark' ? 'bg-gray-300/10' : 'bg-gray-300'} `}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-blue-700 rounded-full"
        />
      </div>
    </div>
  );
};
