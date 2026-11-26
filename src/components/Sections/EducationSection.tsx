import React from 'react';
import { motion } from 'framer-motion';
import { School, Zap, Cpu } from 'lucide-react';
import { education } from '../../data';
import EducationCard, { EducationStop } from '../UI/EducationCard';

const split = (s: string) => s.split(',').map((p) => p.trim());

// Oldest first.
const stopIcons = [School, Zap, Cpu];
const stops: EducationStop[] = [
  ...[...education].reverse().map((e, i) => {
    const [place, location] = split(e.institution);
    const tag = /ssc|secondary/i.test(e.degree) ? 'School' : /diploma/i.test(e.degree) ? 'Diploma · EEE' : 'Degree · EEE';
    return { key: `edu-${e.id}`, period: e.duration.replace(/\s*-\s*/, ' – '), title: e.degree, place, location, tag, Icon: stopIcons[i] ?? Cpu };
  }),
];

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="section-padding bg-gray-50/70 dark:bg-gray-800/25 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From circuits to neural circuits: an Electrical &amp; Electronics foundation that led me to AI.
          </p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* the trace: horizontal on desktop, vertical on mobile, with a current pulse flowing along it */}
          <div className="hidden lg:block absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gray-300 dark:bg-gray-700 overflow-hidden" aria-hidden="true">
            <span className="edu-pulse-x absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          </div>
          <div className="lg:hidden absolute top-5 bottom-5 left-[19px] w-0.5 bg-gray-300 dark:bg-gray-700 overflow-hidden" aria-hidden="true">
            <span className="edu-pulse-y absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary-400 to-transparent" />
          </div>

          <ol className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
            {stops.map((stop, index) => (
              <EducationCard key={stop.key} stop={stop} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;