import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';
import { services } from '../../data';
import ServiceCard from '../UI/ServiceCard';

const AboutSection: React.FC = () => {
  const strengths = [
    'AI Systems Architect',
    'Building Smarter Solutions',
    'Building Future-Ready Systems',
    'Team collaborator',
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-pattern-left" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
              <circle cx="17.5" cy="17.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <circle cx="17.5" cy="17.5" r="4" fill="currentColor" className="text-secondary-500" opacity="0.3" />
              <path d="M17.5 5 L17.5 30 M5 17.5 L30 17.5" stroke="currentColor" strokeWidth="0.3" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-pattern-right" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
              <circle cx="17.5" cy="17.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <circle cx="17.5" cy="17.5" r="4" fill="currentColor" className="text-secondary-500" opacity="0.3" />
              <path d="M17.5 5 L17.5 30 M5 17.5 L30 17.5" stroke="currentColor" strokeWidth="0.3" className="text-accent-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating About Elements */}
      <motion.div 
        className="absolute top-20 right-16 w-16 h-16 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-20 left-16 w-12 h-12 opacity-20 dark:opacity-20 pointer-events-none"
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
        <div className="w-full h-full border-2 border-accent-500 transform rotate-45"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/2 right-20 w-8 h-8 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-primary-500 rounded-lg"></div>
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
            My AI Journey
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my journey, passion for AI, and the intelligent solutions I build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Haripreeth working"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 py-3 px-5 rounded-lg shadow-lg">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-primary-600 dark:text-primary-400">3+</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Years of Experience</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get to Know Me
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I’m a passionate AI & Software Engineer with 3+ years of experience building intelligent and scalable applications. I specialize in Agentic AI, Multi-Agent Systems, RAG, and MCP, creating impactful solutions with modern technologies and clean, maintainable code.            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I’ve worked with modern AI technologies and frameworks, focusing on Agentic AI, Multi-Agent Systems, RAG, and MCP to build intelligent and scalable solutions with clean, efficient code.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary-500" />
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </div>
              ))}
            </div>

            <a
              href="https://drive.google.com/file/d/1IUsBBSbTFPX1XUHcmd-aw0fLwR_ZHrhP/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Download size={16} className="mr-2" />
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Solutions I Provide
          </motion.h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;