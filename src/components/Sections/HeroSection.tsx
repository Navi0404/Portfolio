import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { socialLinks } from '../../data';
import SocialIcon from '../UI/SocialIcon';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-16 md:pt-32">
      {/* Main Content */}
      <div className="container-custom relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
                Artifical Intelligence Developer
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
          Building <span className="text-primary-500"> Agentic AI </span> Systems
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I'm a passionate AI developer focused on building intelligent and engaging applications with modern technologies and clean, efficient code.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </motion.div>
            
            <motion.div
              className="mt-10 flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Connect with me:</span>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
                    aria-label={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <SocialIcon icon={link.icon} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glowing background ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 opacity-20 blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating border ring */}
              <motion.div
                className="absolute -inset-4 rounded-2xl border-2 border-dashed border-primary-300 dark:border-primary-600 opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Image container */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/Ai.png"
                  alt="AI Developer"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </motion.div>

              
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator - Fixed at bottom */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center hidden lg:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} className="text-primary-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;