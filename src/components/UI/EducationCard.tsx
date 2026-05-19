import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Education } from '../../types';

interface EducationCardProps {
  education: Education;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ education, index }) => {
  const getEducationIcon = (degree: string) => {
    if (degree.includes('B.Tech')) {
      return '🎓';
    } else if (degree.includes('Intermediate')) {
      return '📚';
    } else if (degree.includes('SSC')) {
      return '🏫';
    }
    return '🎓';
  };

  return (
    <motion.div
      className="card p-6 h-full group hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-2xl">
          {getEducationIcon(education.degree)}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={14} />
          <span>{education.duration}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {education.degree}
      </h3>
      
      <h4 className="text-md font-medium text-primary-600 dark:text-primary-400 mb-3">
        {education.institution}
      </h4>
      
      {/* <div className="flex items-center space-x-2 mb-4">
        <Award size={16} className="text-green-500" />
        <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
          {education.grade}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {education.description}
      </p> */}
      
      {/* <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {index === 0 ? 'Latest' : index === education.length - 1 ? 'Foundation' : 'Academic'}
          </span>
          <GraduationCap size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
      </div> */}
    </motion.div>
  );
};

export default EducationCard;