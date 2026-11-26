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
    <section id="projects" className="section-padding bg-gray-50/70 dark:bg-gray-800/25 relative overflow-hidden">
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