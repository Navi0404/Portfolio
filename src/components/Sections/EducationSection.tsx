import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data';
import EducationCard from '../UI/EducationCard';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 30, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="education-pattern-left" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary-500" />
              <path d="M5 10 L15 10 M10 5 L10 15" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#education-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -30, 0],
          x: [0, -10, 0]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="education-pattern-right" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary-500" />
              <path d="M5 10 L15 10 M10 5 L10 15" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#education-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Academic Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 12, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-primary-500 rounded-lg transform rotate-12"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 w-12 h-12 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-secondary-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/2 right-20 w-8 h-8 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-full h-full bg-accent-500 transform rotate-45"></div>
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and educational background that shaped my career.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;