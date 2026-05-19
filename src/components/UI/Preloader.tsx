import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  return (
    <motion.div
  className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
  initial={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="relative flex flex-col items-center">
    
    {/* Main Logo Animation */}
    <motion.div
      className="relative mb-8 flex items-center justify-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      {/* Outer Ring */}
      <motion.div
        className="absolute w-32 h-32 border-4 border-primary-500/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute w-24 h-24 border-4 border-secondary-500/50 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow Background */}
      <motion.div
        className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* AI GIF Logo */}
      <motion.img
        src="public/images/ai animation.gif"
        alt="AI Logo"
        className="relative w-24 h-24 object-contain z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>

    {/* Animated Dots */}
    <div className="flex space-x-2 mb-6">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-primary-500 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Loading Text */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.h3
        className="text-xl font-semibold text-white mb-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Great Things Take Shape Here
      </motion.h3>

      <motion.p
        className="text-gray-300 text-sm"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        Booting Up...
      </motion.p>
    </motion.div>

    {/* Progress Bar */}
    <div className="w-64 h-1 bg-gray-700 rounded-full mt-6 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
        }}
      />
    </div>

    {/* Floating Particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 2) * 40}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
</motion.div>
  );
};

export default Preloader;