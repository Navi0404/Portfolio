import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ScanEye, AppWindow, Server, LucideIcon } from 'lucide-react';
import { Service } from '../../types';

// Each service card opens with a small live demo of that kind of work.

/* ---------- AI & Agentic Systems: an agent dispatching to its tools ---------- */
const AgentsVisual: React.FC = () => {
  const center = { x: 100, y: 60 };
  const tools = [
    { x: 34, y: 24, label: 'plan', delay: 0 },
    { x: 166, y: 24, label: 'RAG', delay: 0.5 },
    { x: 34, y: 96, label: 'tools', delay: 1 },
    { x: 166, y: 96, label: 'LLM', delay: 1.5 },
  ];
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
      {tools.map((t) => (
        <g key={t.label}>
          <line x1={center.x} y1={center.y} x2={t.x} y2={t.y} className="stroke-gray-300 dark:stroke-gray-700" strokeWidth={1.2} />
          <path
            d={`M${center.x} ${center.y} L${t.x} ${t.y}`}
            pathLength={100}
            className="pipeline-pulse svc-anim fill-none stroke-primary-500"
            strokeWidth={2.2}
            strokeLinecap="round"
            style={{ animationDelay: `${t.delay}s` }}
          />
          <rect x={t.x - 20} y={t.y - 10} width={40} height={20} rx={5} strokeWidth={1.2} className="fill-white stroke-gray-300 dark:fill-gray-800 dark:stroke-gray-600" />
          <text x={t.x} y={t.y + 3.5} textAnchor="middle" className="fill-gray-700 dark:fill-gray-200" style={{ font: '500 9px Inter, sans-serif' }}>
            {t.label}
          </text>
        </g>
      ))}
      <circle cx={center.x} cy={center.y} r={16} className="fill-primary-500/15 stroke-primary-500" strokeWidth={1.5} />
      <circle cx={center.x} cy={center.y} r={16} className="svc-ring svc-anim fill-none stroke-primary-400" strokeWidth={1} />
      <text x={center.x} y={center.y + 3} textAnchor="middle" className="fill-primary-600 dark:fill-primary-300" style={{ font: '600 8.5px Inter, sans-serif' }}>
        agent
      </text>
    </svg>
  );
};

/* ---------- Computer Vision: a scan line with detections appearing ---------- */
const VisionVisual: React.FC = () => (
  <div className="relative w-full h-full" aria-hidden="true">
    {/* simple scene */}
    <div className="absolute left-[22%] bottom-0 flex flex-col items-center">
      <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />
      <span className="mt-1 w-9 h-12 rounded-t-xl bg-gray-300 dark:bg-gray-600" />
    </div>
    <div className="absolute right-[12%] bottom-2">
      <span className="block w-14 h-5 ml-4 rounded-t-lg bg-gray-300 dark:bg-gray-600" />
      <span className="block w-24 h-6 rounded-md bg-gray-300 dark:bg-gray-600" />
    </div>
    {/* detections */}
    <div className="svc-box svc-anim absolute left-[calc(22%-8px)] bottom-0 w-[3.25rem] h-[5.25rem] border-2 border-primary-500 rounded-sm">
      <span className="absolute -top-4 -left-0.5 px-1 rounded-sm bg-primary-500 text-white font-mono text-[9px] leading-4 whitespace-nowrap">person 0.97</span>
    </div>
    <div className="svc-box svc-anim absolute right-[calc(12%-6px)] bottom-1 w-[7.25rem] h-[3.6rem] border-2 border-emerald-500 rounded-sm" style={{ animationDelay: '0.6s' }}>
      <span className="absolute -top-4 -left-0.5 px-1 rounded-sm bg-emerald-500 text-white font-mono text-[9px] leading-4 whitespace-nowrap">car 0.92</span>
    </div>
    {/* scan line */}
    <span className="svc-scan svc-anim absolute inset-x-0 top-0 h-px bg-primary-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]" />
  </div>
);

/* ---------- Web Development: a page assembling itself ---------- */
const WebVisual: React.FC = () => {
  const block = 'svc-build svc-anim origin-left rounded bg-gray-300 dark:bg-gray-600';
  return (
    <div className="w-[82%] h-[82%] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden flex flex-col" aria-hidden="true">
      <div className="flex gap-1 px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        ))}
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-1.5">
        <span className={`${block} h-2.5 w-2/3`} style={{ animationDelay: '0s' }} />
        <span className={`${block} h-1.5 w-11/12 opacity-70`} style={{ animationDelay: '0.25s' }} />
        <span className="svc-build svc-anim origin-left h-3.5 w-12 rounded bg-primary-500" style={{ animationDelay: '0.5s' }} />
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          {[0.75, 0.9, 1.05].map((d) => (
            <span key={d} className={`${block} h-6`} style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- API & Backend: a live request log ---------- */
const LOG = [
  ['POST', '/v1/agents/run', '200', '182ms'],
  ['GET', '/v1/projects', '200', '24ms'],
  ['POST', '/auth/token', '201', '41ms'],
  ['GET', '/v1/search?q=rag', '200', '63ms'],
  ['PUT', '/v1/jobs/sync', '202', '12ms'],
  ['GET', '/health', '200', '3ms'],
];
const ApiVisual: React.FC = () => (
  <div className="relative w-full h-full overflow-hidden px-3 [mask-image:linear-gradient(transparent,#000_20%,#000_80%,transparent)]" aria-hidden="true">
    <div className="svc-log svc-anim font-mono text-[10.5px] leading-6">
      {[...LOG, ...LOG].map(([method, path, code, ms], i) => (
        <div key={i} className="flex gap-2 whitespace-nowrap">
          <span className="w-9 text-primary-600 dark:text-primary-400">{method}</span>
          <span className="flex-1 min-w-0 truncate text-gray-600 dark:text-gray-300">{path}</span>
          <span className="text-emerald-600 dark:text-emerald-400">{code}</span>
          <span className="w-10 text-right text-gray-400 dark:text-gray-500">{ms}</span>
        </div>
      ))}
    </div>
  </div>
);

const visuals: Record<string, { Visual: React.FC; Icon: LucideIcon }> = {
  agents: { Visual: AgentsVisual, Icon: Bot },
  vision: { Visual: VisionVisual, Icon: ScanEye },
  web: { Visual: WebVisual, Icon: AppWindow },
  api: { Visual: ApiVisual, Icon: Server },
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { Visual, Icon } = visuals[service.icon] ?? visuals.agents;

  return (
    <motion.div
      className="group h-full flex flex-col rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/70 overflow-hidden transition-colors duration-300 hover:border-primary-400 dark:hover:border-primary-500/60"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-36 flex items-center justify-center border-b border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-900/60 bg-[radial-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:14px_14px]">
        <Visual />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start gap-2.5 mb-2">
          <Icon className="w-5 h-5 mt-0.5 shrink-0 text-primary-500" aria-hidden="true" />
          <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">{service.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{service.description}</p>
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span key={tag} className="text-xs rounded-md px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-700/70 dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
