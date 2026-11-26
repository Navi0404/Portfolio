import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [company, location] = experience.company.split(',').map((part) => part.trim());
  const isCurrent = /present/i.test(experience.duration);

  return (
    <motion.div
      className="relative pl-10 md:pl-0 md:grid md:grid-cols-[180px_1fr] md:gap-10 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Timeline dot */}
      <span
        className={`absolute left-[7px] md:left-[187px] top-1.5 w-[11px] h-[11px] rounded-full ring-4 ring-white dark:ring-gray-900 ${
          isCurrent ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        {isCurrent && <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-60" />}
      </span>

      {/* Left: dates */}
      <div className="mb-2 md:mb-0 md:text-right">
        <time className="text-sm font-medium text-gray-500 dark:text-gray-400 tabular-nums">{experience.duration}</time>
        {isCurrent && (
          <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400">Current</div>
        )}
      </div>

      {/* Right: role */}
      <div className="md:pl-10">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
        <p className="mt-1 text-base font-medium text-primary-600 dark:text-primary-400">
          {company}
          {location && <span className="text-gray-500 dark:text-gray-400 font-normal"> · {location}</span>}
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">{experience.description}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
