import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { socialLinks } from '../../data';
import SocialIcon from '../UI/SocialIcon';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-16 md:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
      </div>
      
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -30, 0],
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
            <pattern id="hero-pattern-left" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-500" />
              <circle cx="20" cy="20" r="6" fill="currentColor" className="text-secondary-500" opacity="0.4" />
              <path d="M8 20 L32 20 M20 8 L20 32" stroke="currentColor" strokeWidth="0.5" className="text-accent-500" />
              <circle cx="8" cy="8" r="2" fill="currentColor" className="text-primary-500" />
              <circle cx="32" cy="8" r="2" fill="currentColor" className="text-secondary-500" />
              <circle cx="8" cy="32" r="2" fill="currentColor" className="text-accent-500" />
              <circle cx="32" cy="32" r="2" fill="currentColor" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 30, 0],
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
            <pattern id="hero-pattern-right" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-500" />
              <circle cx="20" cy="20" r="6" fill="currentColor" className="text-secondary-500" opacity="0.4" />
              <path d="M8 20 L32 20 M20 8 L20 32" stroke="currentColor" strokeWidth="0.5" className="text-accent-500" />
              <circle cx="8" cy="8" r="2" fill="currentColor" className="text-primary-500" />
              <circle cx="32" cy="8" r="2" fill="currentColor" className="text-secondary-500" />
              <circle cx="8" cy="32" r="2" fill="currentColor" className="text-accent-500" />
              <circle cx="32" cy="32" r="2" fill="currentColor" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Hero Elements */}
      <motion.div 
        className="absolute top-20 right-16 w-20 h-20 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -25, 0],
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
        className="absolute bottom-20 left-16 w-16 h-16 opacity-20 dark:opacity-20 pointer-events-none"
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
        className="absolute top-1/2 right-20 w-12 h-12 opacity-20 dark:opacity-20 pointer-events-none"
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
      
      {/* Main Content */}
      <div className="container-custom relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
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
              I’m a passionate AI developer focused on building intelligent and engaging applications with modern technologies and clean, efficient code.
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
          
          <motion.div 
            className="relative h-[500px] w-full flex items-center justify-center hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              <motion.div
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
                animate={{
                  y: [0, 30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
                animate={{
                  y: [30, 0, 30],
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
                animate={{
                  y: [0, 30, 0],
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="relative z-10 w-full aspect-square bg-transparent rounded-lg p-8 flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary-500"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-secondary-500"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent-500"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                </svg>
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