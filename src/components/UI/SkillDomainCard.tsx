import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Workflow, Terminal, SlidersHorizontal, Code2, Brain, Database, Server,
  Activity, Cloud, LucideIcon,
} from 'lucide-react';
import { SkillDomain } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  genai: Sparkles,
  agents: Workflow,
  tools: Terminal,
  finetune: SlidersHorizontal,
  code: Code2,
  ml: Brain,
  database: Database,
  backend: Server,
  observability: Activity,
  devops: Cloud,
};

interface SkillDomainCardProps {
  domain: SkillDomain;
  index: number;
}

const SkillDomainCard: React.FC<SkillDomainCardProps> = ({ domain, index }) => {
  const Icon = iconMap[domain.icon] ?? Code2;

  return (
    <motion.div
      className="break-inside-avoid mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 p-5 transition-colors duration-200 hover:border-primary-300 dark:hover:border-primary-500/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
        </span>
        <h3 className="flex-1 text-base font-semibold text-gray-900 dark:text-white">{domain.name}</h3>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">{domain.skills.length}</span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {domain.skills.map((skill) => (
          <li
            key={skill}
            className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700/60 rounded-md px-2.5 py-1"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillDomainCard;
