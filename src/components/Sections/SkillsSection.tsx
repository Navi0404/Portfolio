import React from 'react';
import { motion } from 'framer-motion';
import { skillDomains } from '../../data';
import SkillDomainCard from '../UI/SkillDomainCard';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section-padding bg-transparent relative overflow-hidden">
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
        
        <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6">
          {skillDomains.map((domain, index) => (
            <SkillDomainCard key={domain.name} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;