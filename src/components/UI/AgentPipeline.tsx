import React, { useEffect, useState } from 'react';

// Live diagram of the kind of agentic AI system I build. Signals pulse along the edges
// in sequence; hovering a step explains it in the status bar.
type NodeId = 'query' | 'orch' | 'retriever' | 'vector' | 'mcp' | 'llm' | 'guard' | 'answer';

interface PipelineNode {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  info: string;
}

const H = 46;

const nodes: PipelineNode[] = [
  { id: 'query', x: 16, y: 157, w: 120, label: 'User query', sub: 'plain language', info: 'A user asks a question in plain language' },
  { id: 'orch', x: 176, y: 157, w: 130, label: 'Orchestrator', sub: 'LangGraph', info: 'LangGraph plans the steps and routes work to the right tools' },
  { id: 'retriever', x: 356, y: 50, w: 120, label: 'Retriever', sub: 'RAG · embeddings', info: 'Semantic search over vector embeddings (RAG)' },
  { id: 'vector', x: 500, y: 50, w: 124, label: 'Vector DB', sub: 'Qdrant · Pinecone', info: 'Knowledge stored in Pinecone, Qdrant, pgvector and Neo4j' },
  { id: 'mcp', x: 356, y: 157, w: 120, label: 'MCP Tools', sub: 'tool calling', info: 'Tool calling over MCP: APIs, databases and real actions' },
  { id: 'llm', x: 356, y: 264, w: 120, label: 'LLM', sub: 'reasoning', info: 'The model reasons over retrieved context and tool results' },
  { id: 'guard', x: 500, y: 172, w: 124, label: 'Guardrails', sub: 'evals · tracing', info: 'Guardrails and evals with RAGAS, DeepEval and Langfuse' },
  { id: 'answer', x: 500, y: 284, w: 124, label: 'Answer', sub: 'grounded', info: 'A grounded, traced, production-ready answer' },
];

// Edge paths, each with the delay (s) at which its pulse starts in the 4s loop.
const edges: { d: string; delay: number }[] = [
  { d: 'M136 180 H176', delay: 0 },
  { d: 'M306 180 H330 V73 H356', delay: 0.5 },
  { d: 'M306 180 H356', delay: 0.5 },
  { d: 'M306 180 H330 V287 H356', delay: 0.5 },
  { d: 'M476 73 H500', delay: 1.0 },
  { d: 'M476 287 H488 V195 H500', delay: 1.0 },
  { d: 'M562 218 V284', delay: 1.5 },
];

// Which nodes light up in each 0.5s slot of the 4s loop (matches the pulses above).
const slots: NodeId[][] = [['query'], ['orch'], ['retriever', 'mcp', 'llm'], ['vector', 'guard'], ['answer'], ['answer'], [], []];

const AgentPipeline: React.FC = () => {
  const [slot, setSlot] = useState(0);
  const [hovered, setHovered] = useState<NodeId | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setSlot((s) => (s + 1) % slots.length), 500);
    return () => window.clearInterval(id);
  }, []);

  const active = new Set<NodeId>(hovered ? [hovered] : slots[slot]);
  const statusNode = nodes.find((n) => n.id === (hovered ?? slots[slot][0] ?? 'answer'))!;

  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/85 shadow-md overflow-hidden">
      {/* window bar */}
      {/* left padding leaves room for the "Years of Experience" badge that overlaps this corner */}
      <div className="flex items-center gap-2 pl-32 sm:pl-36 pr-4 py-2.5 border-b border-gray-200 dark:border-gray-800 text-xs font-mono text-gray-500 dark:text-gray-400">
        <span className="truncate">agent_pipeline.py</span>
        <span className="ml-auto flex items-center gap-1.5 text-green-600 dark:text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          running
        </span>
      </div>

      {/* diagram */}
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 640 360"
          className="w-full min-w-[520px] h-auto block"
          role="img"
          aria-label="Agentic AI pipeline: user query, LangGraph orchestrator, RAG retriever and vector database, MCP tools, LLM, guardrails and evals, grounded answer"
        >
          {edges.map((e, i) => (
            <path key={`e${i}`} d={e.d} className="fill-none stroke-gray-300 dark:stroke-gray-700" strokeWidth={1.5} />
          ))}
          {edges.map((e, i) => (
            <path
              key={`p${i}`}
              d={e.d}
              pathLength={100}
              className="pipeline-pulse fill-none stroke-primary-500 motion-reduce:hidden"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ animationDelay: `${e.delay}s` }}
            />
          ))}

          {nodes.map((n) => {
            const on = active.has(n.id);
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-default"
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={H}
                  rx={8}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    on
                      ? 'fill-primary-50 stroke-primary-500 dark:fill-primary-500/15'
                      : 'fill-white stroke-gray-300 dark:fill-gray-800 dark:stroke-gray-600'
                  }`}
                />
                <circle
                  cx={n.x + 14}
                  cy={n.y + H / 2}
                  r={4}
                  className={`transition-colors duration-300 ${on ? 'fill-primary-500' : 'fill-gray-300 dark:fill-gray-600'}`}
                />
                <text x={n.x + 26} y={n.y + 20} className="fill-gray-900 dark:fill-white" style={{ font: '600 13px Inter, sans-serif' }}>
                  {n.label}
                </text>
                <text x={n.x + 26} y={n.y + 35} className="fill-gray-500 dark:fill-gray-400" style={{ font: '400 10.5px Inter, sans-serif' }}>
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* status line */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-gray-200 dark:border-gray-800 text-xs font-mono">
        <span className="text-primary-600 dark:text-primary-400 shrink-0">›</span>
        <span className="text-gray-900 dark:text-white shrink-0">{statusNode.label}:</span>
        <span className="text-gray-500 dark:text-gray-400 truncate">{statusNode.info}</span>
      </div>
    </div>
  );
};

export default AgentPipeline;
