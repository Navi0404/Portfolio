import React, { useEffect, useRef } from 'react';

// Site-wide "Neural Mesh" background: drifting nodes that link up when close,
// brightening and pulling toward the cursor. One fixed canvas behind every section.
const LINK_DIST = 130;
const CURSOR_DIST = 170;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    // Colours follow the site's dark/light toggle (the `dark` class on <html>).
    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.round((W * H) / 13000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
      if (reduceMotion) draw();
    };

    const draw = () => {
      const rgb = isDark ? '59,130,246' : '37,99,235';
      const lineAlpha = isDark ? 0.28 : 0.18;
      const dotAlpha = isDark ? 0.5 : 0.35;
      ctx.clearRect(0, 0, W, H);

      if (!reduceMotion) {
        for (const n of nodes) {
          if (pointer) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            if (dx * dx + dy * dy < CURSOR_DIST * CURSOR_DIST) {
              n.x += dx * 0.003;
              n.y += dy * 0.003;
            }
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      }

      const nearCursor = (n: Node) =>
        !!pointer && (pointer.x - n.x) ** 2 + (pointer.y - n.y) ** 2 < CURSOR_DIST * CURSOR_DIST;

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const aNear = nearCursor(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          let alpha = (1 - Math.sqrt(d2) / LINK_DIST) * lineAlpha;
          if (aNear) alpha *= 2.4;
          ctx.strokeStyle = `rgba(${rgb},${Math.min(alpha, 0.8)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const near = nearCursor(n);
        ctx.fillStyle = `rgba(${rgb},${near ? 0.95 : dotAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.4 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, CURSOR_DIST);
        g.addColorStop(0, `rgba(${rgb},${isDark ? 0.08 : 0.05})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop); // browsers pause rAF in hidden tabs
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointer = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => (pointer = null);

    resize();
    window.addEventListener('resize', resize);
    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      loop();
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />;
};

export default NeuralBackground;
