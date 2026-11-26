import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '../../data';
import ExperienceCard from '../UI/ExperienceCard';

const ExperienceSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section-padding bg-transparent relative overflow-hidden">
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
        
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline track + fill that grows as you scroll */}
          <div className="absolute left-3 md:left-[192px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
          <motion.div
            className="absolute left-3 md:left-[192px] top-2 bottom-2 w-px bg-primary-500 origin-top"
            style={{ scaleY: lineProgress }}
          />

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