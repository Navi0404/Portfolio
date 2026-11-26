import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// One stop on the education circuit: a chip-style node on the trace plus its card.
export interface EducationStop {
  key: string;
  period: string;
  title: string;
  place: string;
  location?: string;
  tag: string;
  Icon: LucideIcon;
  current?: boolean;
}

interface EducationCardProps {
  stop: EducationStop;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ stop, index }) => {
  const { Icon, current } = stop;

  return (
    <motion.li
      className="relative flex lg:flex-col lg:items-center gap-5 lg:gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* chip node on the trace */}
      <div className="relative z-10 shrink-0">
        {current && <span className="absolute inset-0 rounded-lg bg-primary-500/40 animate-ping" />}
        <div
          className={`relative w-10 h-10 rounded-lg border-2 flex items-center justify-center ${
            current
              ? 'bg-primary-500 border-primary-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-400'
          }`}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
          {/* chip pins */}
          <span className="absolute -top-1.5 left-2 right-2 flex justify-between" aria-hidden="true">
            <i className="w-0.5 h-1 bg-current opacity-50" />
            <i className="w-0.5 h-1 bg-current opacity-50" />
            <i className="w-0.5 h-1 bg-current opacity-50" />
          </span>
          <span className="absolute -bottom-1.5 left-2 right-2 flex justify-between" aria-hidden="true">
            <i className="w-0.5 h-1 bg-current opacity-50" />
            <i className="w-0.5 h-1 bg-current opacity-50" />
            <i className="w-0.5 h-1 bg-current opacity-50" />
          </span>
        </div>
      </div>

      {/* card */}
      <div
        className={`flex-1 w-full min-w-0 rounded-xl border p-5 transition-colors duration-300 ${
          current
            ? 'border-primary-400/70 bg-primary-50 dark:bg-primary-500/10'
            : 'border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/70 hover:border-primary-300 dark:hover:border-primary-500/50'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <time className="font-mono text-xs font-medium text-primary-600 dark:text-primary-400 tabular-nums">{stop.period}</time>
          <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{stop.tag}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-white">{stop.title}</h3>
        <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300">
          {stop.place}
          {stop.location && <span className="text-gray-400 dark:text-gray-500"> · {stop.location}</span>}
        </p>
      </div>
    </motion.li>
  );
};

export default EducationCard;
