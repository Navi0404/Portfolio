import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data';
import ExperienceCard from '../UI/ExperienceCard';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="experience-pattern-left" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="currentColor" className="text-primary-500" />
              <path d="M20 5 L20 35 M5 20 L35 20" stroke="currentColor" strokeWidth="1" className="text-primary-500" />
              <circle cx="20" cy="5" r="1.5" fill="currentColor" className="text-secondary-500" />
              <circle cx="20" cy="35" r="1.5" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#experience-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -2, 0]
        }}
        transition={{ 
          duration: 13, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="experience-pattern-right" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="currentColor" className="text-primary-500" />
              <path d="M20 5 L20 35 M5 20 L35 20" stroke="currentColor" strokeWidth="1" className="text-primary-500" />
              <circle cx="20" cy="5" r="1.5" fill="currentColor" className="text-secondary-500" />
              <circle cx="20" cy="35" r="1.5" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#experience-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Experience Elements */}
      <motion.div 
        className="absolute top-16 right-20 w-18 h-18 opacity-10 dark:opacity-20 pointer-events-none"
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
        className="absolute bottom-16 left-20 w-14 h-14 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full border-3 border-secondary-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/3 right-10 w-10 h-10 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">My Experience</h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A timeline of my professional journey and career growth.
          </p>
        </motion.div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline center line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 ml-3"></div>
          
          {/* Experience items */}
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;