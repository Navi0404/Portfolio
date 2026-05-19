import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data';
import ProjectCard from '../UI/ProjectCard';

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  // Define main categories
  // const mainCategories = ['all','Artificial Intelligence', 'frontend', 'backend', 'fullstack', 'mobile'];
  
  const filteredProjects = filter === 'all'
    ? projects
    : filter === 'frontend' || filter === 'backend' || filter === 'fullstack' || filter === 'mobile' || filter === 'Artificial Intelligence'
    ? projects.filter(project => 
        project.category === filter || 
        (project.id <= 3) // First 3 projects appear in all tabs
      )
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="projects-pattern-left" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="20" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <rect x="8" y="8" width="14" height="2" fill="currentColor" className="text-primary-500" />
              <rect x="8" y="12" width="10" height="1" fill="currentColor" className="text-secondary-500" />
              <rect x="8" y="15" width="12" height="1" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-5 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          x: [0, -5, 0]
        }}
        transition={{ 
          duration: 11, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="projects-pattern-right" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="20" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <rect x="8" y="8" width="14" height="2" fill="currentColor" className="text-primary-500" />
              <rect x="8" y="12" width="10" height="1" fill="currentColor" className="text-secondary-500" />
              <rect x="8" y="15" width="12" height="1" fill="currentColor" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Project Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-24 h-16 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -12, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg transform -rotate-12"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 w-16 h-16 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-full h-full border-4 border-accent-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/2 left-16 w-12 h-12 opacity-10 dark:opacity-20 pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 45, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-secondary-500 transform rotate-45"></div>
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">My Projects</h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore a selection of my recent work and projects.
          </p>
        </motion.div>
        
        {/* <div className="flex justify-center mb-10 overflow-x-auto py-2">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
                  filter === category
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No projects match the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;