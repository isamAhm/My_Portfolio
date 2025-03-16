import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="text-blue-400 mr-2">{icon}</div>
        <span className="font-semibold text-gray-200">{name}</span>
        <span className="ml-auto text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-300/10 rounded-full overflow-hidden">
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
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white">{name}</span>
        <span className="text-green-400">{level}</span>
      </div>
      <div className="h-2 bg-gray-300/10 rounded-full">
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
