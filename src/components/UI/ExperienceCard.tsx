import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <motion.div
      className="mb-10 ml-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
        <div className="w-3 h-3 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
      </span>
      <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
          <time className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {experience.duration}
          </time>
        </div>
        <h4 className="text-md font-medium text-primary-600 dark:text-primary-400 mb-3">{experience.company}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{experience.description}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;