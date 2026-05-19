import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data';
import SkillBar from '../UI/SkillBar';

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'other', name: 'Other' },
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skills-pattern-left" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="5" height="5" fill="currentColor" className="text-primary-500" />
              <rect x="5" y="5" width="3" height="3" fill="currentColor" className="text-secondary-500" />
              <rect x="15" y="5" width="3" height="3" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skills-pattern-right" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="5" height="5" fill="currentColor" className="text-primary-500" />
              <rect x="5" y="5" width="3" height="3" fill="currentColor" className="text-secondary-500" />
              <rect x="15" y="5" width="3" height="3" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Tech Elements */}
      <motion.div 
        className="absolute top-16 right-16 w-20 h-20 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-full h-full border-4 border-primary-500 rounded-lg transform rotate-45"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-16 left-16 w-14 h-14 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/3 left-10 w-10 h-10 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 12, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-primary-500 transform rotate-12"></div>
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Technologies I Work With
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I've worked with throughout my career.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {filteredSkills.map((skill, index) => (
            <SkillBar key={index} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;