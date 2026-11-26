import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// "Forward Pass" intro: core skills feed a small neural network, signals pulse through
// the hidden layers, and the output neuron lights up as G Navinash. ~2s, skippable.
const INPUTS = ['LLMs', 'RAG', 'Agents', 'MCP'];
const LAYERS = [4, 5, 5, 1];
const T0 = 0.15; // input layer lights up
const STEP = 0.42; // time for a signal to cross one layer
const OUTPUT_AT = T0 + 3 * STEP; // ≈1.41s
const DONE_AT = 2.0; // hand off to the site

interface PreloaderProps {
  onDone: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      finish();
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The intro is always dark, whatever theme the site is in.
    const c = { on: '#60A5FA', onRing: '#BFDBFE', off: '#1E293B', offRing: '#475569', idle: 'rgba(148,163,184,.12)', glow: 'rgba(96,165,250,.9)', label: '#94A3B8', title: '#F9FAFB', dot: '#BFDBFE', edge: '96,165,250' };

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const band = Math.min(H * 0.56, W * 0.9); // vertical spread of each layer
      const top = H / 2 - band / 2;
      const xs = W < 640 ? [0.24, 0.45, 0.64, 0.82] : [0.24, 0.43, 0.61, 0.78];
      const nodes = xs.map((fx, li) =>
        Array.from({ length: LAYERS[li] }, (_, i) => ({
          x: W * fx,
          y: LAYERS[li] === 1 ? H / 2 : top + (band * i) / (LAYERS[li] - 1),
        }))
      );
      const fs = Math.max(12, Math.min(16, W * 0.012));

      // edges + travelling signals
      ctx.lineWidth = 1.2;
      for (let li = 0; li < 3; li++) {
        const p = Math.max(0, Math.min(1, (t - (T0 + li * STEP)) / STEP));
        for (const a of nodes[li]) {
          for (const b of nodes[li + 1]) {
            ctx.strokeStyle = p > 0 ? `rgba(${c.edge},${0.18 + 0.3 * p})` : c.idle;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (p > 0 && p < 1) {
              ctx.fillStyle = c.dot;
              ctx.beginPath();
              ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, 2.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // neurons
      nodes.forEach((layer, li) =>
        layer.forEach((n, i) => {
          const litAt = li === 0 ? i * 0.04 : T0 + li * STEP;
          const on = t >= litAt;
          const r = li === 3 ? 14 : 7;
          ctx.shadowColor = c.glow;
          ctx.shadowBlur = on ? (li === 3 ? 28 : 12) : 0;
          ctx.fillStyle = on ? c.on : c.off;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = on ? c.onRing : c.offRing;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        })
      );

      // labels
      ctx.textBaseline = 'middle';
      ctx.fillStyle = c.label;
      ctx.font = `500 ${fs}px Inter, sans-serif`;
      ctx.textAlign = 'right';
      INPUTS.forEach((label, i) => ctx.fillText(label, nodes[0][i].x - 18, nodes[0][i].y));
      ctx.textAlign = 'center';
      ctx.font = `500 ${fs - 1}px Inter, sans-serif`;
      const headerY = top - Math.max(28, band * 0.12);
      ctx.fillText('input', nodes[0][0].x, headerY);
      ctx.fillText('hidden layers', (nodes[1][0].x + nodes[2][0].x) / 2, headerY);
      ctx.fillText('output', nodes[3][0].x, headerY);

      if (t >= OUTPUT_AT) {
        const o = nodes[3][0];
        ctx.globalAlpha = Math.min(1, (t - OUTPUT_AT) / 0.3);
        ctx.fillStyle = c.title;
        ctx.font = `700 ${Math.max(17, Math.min(28, W * 0.022))}px Poppins, sans-serif`;
        ctx.fillText('G Navinash', o.x, o.y + 40);
        ctx.fillStyle = c.on;
        ctx.font = `400 ${fs - 1}px ui-monospace, "JetBrains Mono", monospace`;
        ctx.fillText('activation 0.99', o.x, o.y + 64);
        ctx.globalAlpha = 1;
      }
    };

    let frame = 0;
    let timeout = 0;
    if (reduceMotion) {
      draw(DONE_AT);
      timeout = window.setTimeout(finish, 900);
    } else {
      const start = performance.now();
      const loop = (now: number) => {
        const t = (now - start) / 1000;
        draw(t);
        if (t >= DONE_AT) finish();
        else frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    // Skip with a click, tap or any key.
    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      role="status"
      aria-label="Loading G Navinash's portfolio"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 tracking-wide">
        Click or press any key to skip
      </span>
    </motion.div>
  );
};

export default Preloader;
