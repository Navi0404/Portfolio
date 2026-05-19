import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface NeuronNode { id: number; x: number; y: number; layer: number; active: boolean; pulse: number; }
interface Synapse    { from: number; to: number; weight: number; firing: boolean; progress: number; }
interface Token      { id: number; text: string; color: string; }
interface Orb        { id: number; lx: string; ty: string; r: number; color: string; dur: number; delay: number; }

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const LAYER_SIZES  = [4, 6, 6, 4];
const DURATION_MS  = 3500;
const NODE_COLORS  = ['#60a5fa', '#818cf8', '#a78bfa', '#38bdf8'];

const AI_THOUGHTS = [
  'Sampling probability distributions...',
  'Attending to context vectors...',
  'Normalizing attention weights...',
  'Decoding latent representations...',
  'Backpropagating gradients...',
  'Tokenizing semantic embeddings...',
];

const TOKEN_POOL = [
  { text: '<BOS>',   color: '#a78bfa' },
  { text: 'neural',  color: '#60a5fa' },
  { text: '▸ attn',  color: '#34d399' },
  { text: 'logit',   color: '#f472b6' },
  { text: 'embed',   color: '#38bdf8' },
  { text: 'softmax', color: '#a78bfa' },
  { text: '0.847',   color: '#60a5fa' },
  { text: 'layer_n', color: '#34d399' },
  { text: '<EOS>',   color: '#f472b6' },
];

const ORBS: Orb[] = [
  { id: 0, lx: '8%',  ty: '10%', r: 220, color: '#3730a3', dur: 7,  delay: 0   },
  { id: 1, lx: '72%', ty: '5%',  r: 180, color: '#1e3a5f', dur: 9,  delay: 1.5 },
  { id: 2, lx: '80%', ty: '68%', r: 240, color: '#312e81', dur: 11, delay: 0.8 },
  { id: 3, lx: '2%',  ty: '65%', r: 200, color: '#164e63', dur: 8,  delay: 2   },
  { id: 4, lx: '40%', ty: '2%',  r: 150, color: '#1e1b4b', dur: 6,  delay: 0.3 },
];

/* ─── Build network ─────────────────────────────────────────────────────────── */
function buildNetwork(W: number, H: number) {
  const nodes: NeuronNode[] = [];
  let id = 0;
  const xs = [W * 0.08, W * 0.34, W * 0.65, W * 0.90];
  LAYER_SIZES.forEach((size, layer) => {
    const spacing = H / (size + 1);
    for (let i = 0; i < size; i++) {
      nodes.push({ id: id++, x: xs[layer], y: spacing * (i + 1), layer, active: false, pulse: Math.random() * Math.PI * 2 });
    }
  });
  const synapses: Synapse[] = [];
  for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
    const from = nodes.filter(n => n.layer === l);
    const to   = nodes.filter(n => n.layer === l + 1);
    from.forEach(fn => to.forEach(tn => synapses.push({ from: fn.id, to: tn.id, weight: 0.3 + Math.random() * 0.7, firing: false, progress: 0 })));
  }
  return { nodes, synapses };
}

/* ─── Brain SVG ─────────────────────────────────────────────────────────────── */
const Brain: React.FC<{ pulse: number; size: number }> = ({ pulse, size }) => (
  <svg viewBox="0 0 120 100" width={size} height={size} aria-hidden="true">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="55%">
        <stop offset="0%"   stopColor="#818cf8" stopOpacity={0.25 + 0.15 * Math.sin(pulse)} />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="50" rx="54" ry="46" fill="url(#bg)" />
    <path d="M58,17 C43,15 27,22 21,34 C15,47 17,60 24,68 C31,76 41,79 51,77 C55,76 58,73 58,68Z" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.75" />
    <path d="M62,17 C77,15 93,22 99,34 C105,47 103,60 96,68 C89,76 79,79 69,77 C65,76 62,73 62,68Z" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.75" />
    <path d="M60,15 C58,32 58,52 60,72 C62,52 62,32 60,15" fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M29,38 C35,33 44,36 48,43" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.55" />
    <path d="M25,53 C33,47 43,51 50,57" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.55" />
    <path d="M29,65 C37,61 46,63 52,67" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.4"  />
    <path d="M91,38 C85,33 76,36 72,43" fill="none" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.55" />
    <path d="M95,53 C87,47 77,51 70,57" fill="none" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.55" />
    <path d="M91,65 C83,61 74,63 68,67" fill="none" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.4"  />
    <path d="M52,77 C52,84 56,88 60,88 C64,88 68,84 68,77" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6" />
    {[{cx:38,cy:42},{cx:50,cy:29},{cx:43,cy:61},{cx:82,cy:42},{cx:70,cy:29},{cx:77,cy:61}].map((p,i) => (
      <circle key={i} cx={p.cx} cy={p.cy} r={2.2} fill={i%2===0?'#818cf8':'#60a5fa'} opacity={0.45+0.55*Math.sin(pulse+i*1.1)} />
    ))}
  </svg>
);

/* ─── Circuit background ────────────────────────────────────────────────────── */
const CircuitBg: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{opacity:0.07}}>
    <defs>
      <pattern id="dotsP" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#818cf8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotsP)" />
    {[12,28,50,72,88].map(y=><line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#818cf8" strokeWidth="0.4" strokeDasharray="6 20"/>)}
    {[8,22,50,78,92].map(x=><line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#60a5fa" strokeWidth="0.4" strokeDasharray="4 24"/>)}
    {[[5,5],[95,5],[5,95],[95,95]].map(([x,y],i)=><circle key={i} cx={`${x}%`} cy={`${y}%`} r="4" fill="none" stroke="#818cf8" strokeWidth="0.7"/>)}
  </svg>
);

/* ─── Preloader ─────────────────────────────────────────────────────────────── */
const Preloader: React.FC = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth  : 390);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 844);

  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* responsive derived sizes */
  const isSmall   = vw < 480;
  const isMedium  = vw < 768;
  const contentW  = Math.min(vw - 32, 640);
  const netH      = isSmall ? 110 : isMedium ? 140 : 170;
  const netW      = isSmall ? contentW - 130 : contentW - 160;
  const brainSize = isSmall ? 72 : isMedium ? 88 : 106;
  const brainCardW= isSmall ? 110 : isMedium ? 134 : 150;
  const tokenCount= isSmall ? 5 : 7;

  /* network (rebuilt on size change) */
  const [{ nodes, synapses }, setNetwork] = useState(() => buildNetwork(netW, netH));
  useEffect(() => { setNetwork(buildNetwork(netW, netH)); }, [netW, netH]);

  const [progress,   setProgress]   = useState(0);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [typedText,  setTypedText]  = useState('');
  const [tokens,     setTokens]     = useState<Token[]>([]);
  const [phase,      setPhase]      = useState<'boot'|'run'|'done'>('boot');
  const [tick,       setTick]       = useState(0);
  const rafRef   = useRef<number>(0);
  const startRef = useRef<number|null>(null);

  /* typewriter */
  useEffect(() => {
    const s = AI_THOUGHTS[thoughtIdx]; let i=0; setTypedText('');
    const id = setInterval(()=>{ i++; setTypedText(s.slice(0,i)); if(i>=s.length) clearInterval(id); }, 26);
    return ()=>clearInterval(id);
  }, [thoughtIdx]);
  useEffect(()=>{ const id=setInterval(()=>setThoughtIdx(p=>(p+1)%AI_THOUGHTS.length),1500); return()=>clearInterval(id); },[]);

  /* tokens */
  useEffect(()=>{
    let tid=0;
    const id=setInterval(()=>{ const t=TOKEN_POOL[tid%TOKEN_POOL.length]; setTokens(prev=>[...prev,{id:tid,text:t.text,color:t.color}].slice(-tokenCount)); tid++; },300);
    return()=>clearInterval(id);
  },[tokenCount]);

  /* RAF */
  useEffect(()=>{
    setTimeout(()=>setPhase('run'),300);
    const loop=(ts:number)=>{
      if(!startRef.current) startRef.current=ts;
      const elapsed=ts-startRef.current;
      const pct=Math.min(elapsed/DURATION_MS,1);
      setProgress(pct); setTick(elapsed);
      setNetwork(prev=>{
        const t=elapsed*0.001;
        const nn=prev.nodes.map(n=>({...n,active:Math.sin(t*3+n.pulse)>0.35}));
        const ns=prev.synapses.map(s=>({...s,firing:nn[s.from]?.active??false,progress:(t*1.8+s.weight*3)%1}));
        return{nodes:nn,synapses:ns};
      });
      if(pct<1) rafRef.current=requestAnimationFrame(loop); else setPhase('done');
    };
    rafRef.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);

  const pct        = Math.round(progress*100);
  const brainPulse = tick*0.003;
  const panelGap   = isSmall ? 10 : 14;
  const pad        = isSmall ? 12 : 16;

  /* card style helper */
  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: 'rgba(255,255,255,0.03)',
    border: '0.5px solid rgba(129,140,248,0.22)',
    borderRadius: 14,
    padding: pad,
    ...extra,
  });

  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        width: '100vw', height: '100vh',
        background: '#070810',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CircuitBg />

      {/* Ambient orbs — sized relative to viewport */}
      {ORBS.map(o=>(
        <motion.div key={o.id} style={{
          position:'absolute', borderRadius:'50%',
          width: o.r * (vw/600), height: o.r * (vw/600),
          background: o.color, filter:'blur(70px)', opacity:0.5,
          left:o.lx, top:o.ty, transform:'translate(-10%,-10%)',
          pointerEvents:'none',
        }}
          animate={{scale:[1,1.18,1],opacity:[0.4,0.62,0.4]}}
          transition={{duration:o.dur,repeat:Infinity,delay:o.delay,ease:'easeInOut'}}
        />
      ))}

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #070810 100%)' }} />

      {/* ── Content column — fills screen minus safe padding ── */}
      <div style={{
        position:'relative', display:'flex', flexDirection:'column',
        alignItems:'center', width: contentW,
        gap: panelGap,
      }}>

        {/* ── Row 1: Brand label ─────────────────────── */}
        <motion.div
          initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
          style={{display:'flex',alignItems:'center',gap:10,width:'100%'}}
        >
          <motion.div
            style={{width:8,height:8,borderRadius:'50%',background:'#34d399'}}
            animate={{opacity:[1,0.2,1],scale:[1,1.4,1]}}
            transition={{duration:1.2,repeat:Infinity}}
          />
          <span style={{fontFamily:'monospace',fontSize:isSmall?10:12,color:'#818cf8',letterSpacing:'0.18em'}}>
            AI INFERENCE ENGINE
          </span>
          <span style={{marginLeft:'auto',fontFamily:'monospace',fontSize:isSmall?10:12,color:'#34d399',fontWeight:500}}>
            {String(pct).padStart(3,'0')}%
          </span>
        </motion.div>

        {/* ── Row 2: Brain card + Neural net card ───── */}
        <motion.div
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.55,delay:0.1}}
          style={{display:'flex',gap:panelGap,width:'100%',alignItems:'stretch'}}
        >
          {/* Brain */}
          <div style={{...card({
            width: brainCardW, flexShrink:0,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,
          })}}>
            <Brain pulse={brainPulse} size={brainSize} />
            <div style={{display:'flex',alignItems:'center',gap:5}}>
              <motion.div style={{width:5,height:5,borderRadius:'50%',background:'#34d399'}}
                animate={{opacity:[1,0.2,1]}} transition={{duration:1,repeat:Infinity}} />
              <span style={{fontFamily:'monospace',fontSize:9,color:'#6b7280',letterSpacing:'0.12em'}}>AI CORE</span>
            </div>
          </div>

          {/* Neural net */}
          <div style={{...card({flex:1,minWidth:0,display:'flex',flexDirection:'column'})}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
              <motion.div style={{width:5,height:5,borderRadius:'50%',background:'#818cf8'}}
                animate={{opacity:[1,0.2,1]}} transition={{duration:0.9,repeat:Infinity}} />
              <span style={{fontFamily:'monospace',fontSize:9,color:'#818cf8',letterSpacing:'0.1em'}}>NEURAL NET · LIVE</span>
            </div>
            <svg viewBox={`0 0 ${netW} ${netH}`} width="100%" style={{display:'block',flex:1}} aria-hidden="true">
              {synapses.map((s,i)=>{
                const fn=nodes[s.from],tn=nodes[s.to];
                if(!fn||!tn) return null;
                return (
                  <g key={i}>
                    <line x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
                      stroke={s.firing?'#818cf8':'#1a1a30'}
                      strokeWidth={s.firing?0.9:0.4} strokeOpacity={s.firing?0.7:1} />
                    {s.firing && <circle cx={fn.x+(tn.x-fn.x)*s.progress} cy={fn.y+(tn.y-fn.y)*s.progress} r={2.8} fill="#a78bfa" opacity={0.95}/>}
                  </g>
                );
              })}
              {nodes.map(n=>(
                <g key={n.id}>
                  {n.active&&<circle cx={n.x} cy={n.y} r={10} fill={NODE_COLORS[n.layer]} opacity={0.12}/>}
                  <circle cx={n.x} cy={n.y} r={5}
                    fill={n.active?NODE_COLORS[n.layer]:'#12122a'}
                    stroke={NODE_COLORS[n.layer]} strokeWidth={1} strokeOpacity={n.active?1:0.3}/>
                </g>
              ))}
              {['Input','Hidden','Hidden','Output'].map((lbl,i)=>(
                <text key={i} x={[netW*.08,netW*.34,netW*.65,netW*.90][i]} y={netH-3}
                  textAnchor="middle" fontSize={8} fill="#374151" fontFamily="monospace">{lbl}</text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* ── Row 3: Terminal ────────────────────────── */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25}}
          style={{...card({width:'100%',boxSizing:'border-box'})}}
        >
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:7}}>
            {['#f87171','#fbbf24','#34d399'].map((c,i)=>(
              <div key={i} style={{width:7,height:7,borderRadius:'50%',background:c,opacity:0.75}}/>
            ))}
            <span style={{fontFamily:'monospace',fontSize:9,color:'#4b5563',marginLeft:4,letterSpacing:'0.08em'}}>inference.log</span>
          </div>
          <span style={{fontFamily:'monospace',fontSize:isSmall?10:11,color:'#60a5fa',wordBreak:'break-all'}}>
            {'> '}{typedText}
            <motion.span
              style={{display:'inline-block',width:1,height:isSmall?9:11,background:'#60a5fa',marginLeft:1,verticalAlign:'middle'}}
              animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity,repeatType:'reverse'}}
            />
          </span>
        </motion.div>

        {/* ── Row 4: Token stream ────────────────────── */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
          style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center',width:'100%',minHeight:24}}
        >
          {tokens.map((tok,i)=>(
            <motion.span key={tok.id}
              initial={{opacity:0,y:6,scale:0.8}}
              animate={{opacity:i===tokens.length-1?1:0.3,y:0,scale:1}}
              transition={{duration:0.18}}
              style={{
                fontFamily:'monospace',fontSize:isSmall?10:11,
                color:tok.color,background:`${tok.color}18`,
                border:`0.5px solid ${tok.color}40`,borderRadius:4,padding:'2px 7px',
              }}
            >{tok.text}</motion.span>
          ))}
        </motion.div>

        {/* ── Row 5: Progress ───────────────────────── */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35}}
          style={{width:'100%'}}
        >
          {/* segmented */}
          <div style={{display:'flex',gap:3,marginBottom:6}}>
            {Array.from({length:isSmall?16:24}).map((_,i,arr)=>{
              const filled=i/arr.length<=progress;
              const active=Math.abs(i/arr.length-progress)<0.06;
              return (
                <motion.div key={i}
                  style={{flex:1,height:3,borderRadius:2,
                    background:filled?`hsl(${218+i*5},75%,${active?74:58}%)`:'rgba(255,255,255,0.07)'}}
                  animate={active?{scaleY:[1,2.2,1]}:{}}
                  transition={{duration:0.22}}
                />
              );
            })}
          </div>
          {/* shimmer */}
          <div style={{position:'relative',height:1,background:'rgba(129,140,248,0.1)',borderRadius:1,overflow:'hidden',marginBottom:7}}>
            <div style={{position:'absolute',inset:0,width:`${pct}%`,background:'linear-gradient(90deg,#38bdf8,#818cf8,#f472b6)',borderRadius:1,transition:'width 0.06s linear'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{fontFamily:'monospace',fontSize:isSmall?9:11,color:'rgba(129,140,248,0.45)',letterSpacing:'0.1em'}}>
              {phase==='done'?'● READY':'◌ INFERENCE ENGINE'}
            </span>
            <span style={{fontFamily:'monospace',fontSize:isSmall?9:11,color:'#818cf8',fontWeight:500}}>
              {String(pct).padStart(3,'0')}%
            </span>
          </div>
        </motion.div>

        {/* ── Row 6: Tagline ────────────────────────── */}
        <AnimatePresence>
          {phase!=='boot'&&(
            <motion.p
              initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              transition={{duration:0.45}}
              style={{margin:0,fontFamily:'monospace',fontSize:isSmall?9:11,
                color:'rgba(129,140,248,0.45)',letterSpacing:'0.2em',textAlign:'center'}}
            >
              <motion.span animate={{opacity:[0.35,0.75,0.35]}} transition={{duration:2.8,repeat:Infinity}}>
                GREAT THINGS TAKE SHAPE HERE
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default Preloader;