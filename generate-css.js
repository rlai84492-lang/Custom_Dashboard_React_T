/* Generates public/styles.css — a hand-built Tailwind-style utility layer.
 * (No network access in this environment to run the real Tailwind CLI, so this
 * script produces an equivalent utility-class stylesheet with the same class
 * names/conventions Tailwind would emit for the classes this project uses.)
 */
const fs = require('fs');
const path = require('path');

const spacing = {
  0: '0px', px: '1px', 0.5: '0.125rem', 1: '0.25rem', 1.5: '0.375rem', 2: '0.5rem',
  2.5: '0.625rem', 3: '0.75rem', 3.5: '0.875rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem',
  7: '1.75rem', 8: '2rem', 9: '2.25rem', 10: '2.5rem', 11: '2.75rem', 12: '3rem',
  14: '3.5rem', 16: '4rem', 20: '5rem', 24: '6rem', 28: '7rem', 32: '8rem', 36: '9rem',
  40: '10rem', 44: '11rem', 48: '12rem', 56: '14rem', 64: '16rem', 72: '18rem', 80: '20rem', 96: '24rem',
};

const colors = {
  white: '#ffffff', black: '#000000', transparent: 'transparent', current: 'currentColor',
  slate: { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617' },
  gray: { 50:'#f9fafb',100:'#f3f4f6',200:'#e5e7eb',300:'#d1d5db',400:'#9ca3af',500:'#6b7280',600:'#4b5563',700:'#374151',800:'#1f2937',900:'#111827',950:'#030712' },
  red: { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d' },
  orange: { 50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12' },
  amber: { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f' },
  yellow: { 50:'#fefce8',100:'#fef9c3',200:'#fef08a',300:'#fde047',400:'#facc15',500:'#eab308',600:'#ca8a04' },
  green: { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
  teal: { 50:'#f0fdfa',100:'#ccfbf1',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488' },
  cyan: { 50:'#ecfeff',100:'#cffafe',300:'#67e8f9',400:'#22d3ee',500:'#06b6d4',600:'#0891b2',700:'#0e7490' },
  blue: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
  indigo: { 50:'#eef2ff',100:'#e0e7ff',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca' },
  violet: { 50:'#f5f3ff',100:'#ede9fe',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9' },
  purple: { 50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce' },
  fuchsia: { 50:'#fdf4ff',400:'#e879f9',500:'#d946ef',600:'#c026d3' },
  pink: { 50:'#fdf2f8',100:'#fce7f3',200:'#fbcfe8',300:'#f9a8d4',400:'#f472b6',500:'#ec4899',600:'#db2777',700:'#be185d',800:'#9d174d' },
  rose: { 50:'#fff1f2',100:'#ffe4e6',400:'#fb7185',500:'#f43f5e',600:'#e11d48' },
  emerald: {50:'#ecfdf5',500:'#10b981',600:'#059669'},
};

let css = '';
const rules = [];

function push(selector, decls) {
  rules.push(`${selector}{${decls}}`);
}

// ---------- Base / reset ----------
css += `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-width: 0; border-style: solid; border-color: #e5e7eb; }
html { -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; line-height: 1.5; }
body { min-height: 100vh; -webkit-font-smoothing: antialiased; color: #0f172a; }
h1,h2,h3,h4,h5,h6 { font-size: inherit; font-weight: inherit; }
a { color: inherit; text-decoration: inherit; }
button, input, select, textarea { font-family: inherit; font-size: 100%; font-weight: inherit; line-height: inherit; color: inherit; background: transparent; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; }
img, svg { display: block; vertical-align: middle; max-width: 100%; }
ul, ol { list-style: none; }
table { border-collapse: collapse; border-spacing: 0; width: 100%; }
input::placeholder, textarea::placeholder { color: #94a3b8; opacity: 1; }
:focus-visible { outline: 2px solid #f97316; outline-offset: 2px; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(148,163,184,.5); border-radius: 999px; }
.dark ::-webkit-scrollbar-thumb { background: rgba(100,116,139,.6); }
`;

// ---------- App background (aurora gradient) ----------
css += `
.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 8% 8%, #ffe3c7 0%, transparent 42%),
              radial-gradient(circle at 92% 5%, #dcd6ff 0%, transparent 45%),
              radial-gradient(circle at 6% 92%, #ffd3ec 0%, transparent 45%),
              radial-gradient(circle at 96% 96%, #c8e6ff 0%, transparent 48%),
              linear-gradient(135deg, #fef6f0 0%, #f6f0fb 50%, #eef6fb 100%);
  transition: background .3s ease;
}
.dark .app-shell {
  background: radial-gradient(circle at 8% 8%, #3a1030 0%, transparent 45%),
              radial-gradient(circle at 92% 4%, #241a4a 0%, transparent 45%),
              radial-gradient(circle at 8% 95%, #2a1440 0%, transparent 48%),
              radial-gradient(circle at 96% 92%, #142238 0%, transparent 50%),
              linear-gradient(135deg, #0b0714 0%, #0d0b1c 50%, #08111d 100%);
}
.login-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 10% 10%, #ffdcc0 0%, transparent 40%),
              radial-gradient(circle at 90% 0%, #d9ceff 0%, transparent 45%),
              radial-gradient(circle at 0% 100%, #ffd0ea 0%, transparent 45%),
              radial-gradient(circle at 100% 100%, #cfe8ff 0%, transparent 50%),
              linear-gradient(135deg, #fdf1e8 0%, #f2eafb 50%, #eaf3fb 100%);
}
.dark .login-shell {
  background: radial-gradient(circle at 10% 10%, #3a1030 0%, transparent 42%),
              radial-gradient(circle at 90% 0%, #241a4a 0%, transparent 45%),
              radial-gradient(circle at 0% 100%, #2a1440 0%, transparent 48%),
              radial-gradient(circle at 100% 100%, #142238 0%, transparent 50%),
              linear-gradient(135deg, #0b0714 0%, #0d0b1c 50%, #08111d 100%);
}
.glass {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.6);
}
.dark .glass {
  background: rgba(20,16,36,0.6);
  border: 1px solid rgba(255,255,255,0.08);
}
.glass-solid {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.8);
}
.dark .glass-solid {
  background: rgba(17,14,30,0.86);
  border: 1px solid rgba(255,255,255,0.08);
}
.sidebar-panel {
  background: linear-gradient(180deg, rgba(255,236,220,0.85) 0%, rgba(255,255,255,0.75) 30%);
  backdrop-filter: blur(18px);
  border-right: 1px solid rgba(255,255,255,0.6);
}
.dark .sidebar-panel {
  background: linear-gradient(180deg, rgba(58,16,48,0.55) 0%, rgba(13,10,25,0.85) 30%);
  border-right: 1px solid rgba(255,255,255,0.06);
}
`;

// ---------- Layout utilities ----------
push('.block','display:block'); push('.inline-block','display:inline-block'); push('.inline','display:inline');
push('.flex','display:flex'); push('.inline-flex','display:inline-flex'); push('.grid','display:grid'); push('.hidden','display:none');
push('.table','display:table'); push('.contents','display:contents');
push('.flex-row','flex-direction:row'); push('.flex-row-reverse','flex-direction:row-reverse');
push('.flex-col','flex-direction:column'); push('.flex-col-reverse','flex-direction:column-reverse');
push('.flex-wrap','flex-wrap:wrap'); push('.flex-nowrap','flex-wrap:nowrap');
push('.items-start','align-items:flex-start'); push('.items-center','align-items:center');
push('.items-end','align-items:flex-end'); push('.items-stretch','align-items:stretch'); push('.items-baseline','align-items:baseline');
push('.justify-start','justify-content:flex-start'); push('.justify-center','justify-content:center');
push('.justify-end','justify-content:flex-end'); push('.justify-between','justify-content:space-between');
push('.justify-around','justify-content:space-around'); push('.justify-evenly','justify-content:space-evenly');
push('.self-start','align-self:flex-start'); push('.self-center','align-self:center'); push('.self-end','align-self:flex-end'); push('.self-stretch','align-self:stretch');
push('.flex-1','flex:1 1 0%'); push('.flex-auto','flex:1 1 auto'); push('.flex-initial','flex:0 1 auto'); push('.flex-none','flex:none');
push('.flex-shrink-0','flex-shrink:0'); push('.flex-grow','flex-grow:1'); push('.flex-grow-0','flex-grow:0');
for (let i=1;i<=12;i++){ push(`.grid-cols-${i}`,`grid-template-columns:repeat(${i},minmax(0,1fr))`); }
push('.grid-cols-none','grid-template-columns:none');
for (let i=1;i<=6;i++){ push(`.col-span-${i}`,`grid-column:span ${i} / span ${i}`); }
push('.col-span-full','grid-column:1 / -1');
push('.sticky','position:sticky'); push('.relative','position:relative'); push('.absolute','position:absolute');
push('.fixed','position:fixed'); push('.static','position:static');
push('.inset-0','top:0;right:0;bottom:0;left:0'); push('.-inset-1','top:-.25rem;right:-.25rem;bottom:-.25rem;left:-.25rem');
['top','right','bottom','left'].forEach(dir=>{
  [0,0.5,1,1.5,2,3,4,5,6,8,10,12,'auto'].forEach(v=>{
    const val = v==='auto' ? 'auto' : (spacing[v]!==undefined?spacing[v]:`${v}rem`);
    push(`.${dir==='top'?'top':dir==='right'?'right':dir==='bottom'?'bottom':'left'}-${v}`,`${dir}:${val}`);
  });
});
[0,1,2,3,4,5,10,20,30,40,50].forEach(z=>push(`.z-${z}`,`z-index:${z}`));
push('.overflow-auto','overflow:auto'); push('.overflow-hidden','overflow:hidden');
push('.overflow-visible','overflow:visible'); push('.overflow-scroll','overflow:scroll');
push('.overflow-x-auto','overflow-x:auto'); push('.overflow-y-auto','overflow-y:auto');
push('.overflow-x-hidden','overflow-x:hidden'); push('.overflow-y-hidden','overflow-y:hidden');
push('.whitespace-nowrap','white-space:nowrap'); push('.whitespace-normal','white-space:normal');
push('.truncate','overflow:hidden;text-overflow:ellipsis;white-space:nowrap');
push('.pointer-events-none','pointer-events:none'); push('.pointer-events-auto','pointer-events:auto');
push('.select-none','user-select:none'); push('.cursor-pointer','cursor:pointer'); push('.cursor-not-allowed','cursor:not-allowed'); push('.cursor-default','cursor:default');
push('.visible','visibility:visible'); push('.invisible','visibility:hidden');
push('.isolate','isolation:isolate');

// gap / spacing / sizing
Object.entries(spacing).forEach(([k,v])=>{
  push(`.gap-${k}`,`gap:${v}`);
  push(`.gap-x-${k}`,`column-gap:${v}`);
  push(`.gap-y-${k}`,`row-gap:${v}`);
  push(`.p-${k}`,`padding:${v}`);
  push(`.px-${k}`,`padding-left:${v};padding-right:${v}`);
  push(`.py-${k}`,`padding-top:${v};padding-bottom:${v}`);
  push(`.pt-${k}`,`padding-top:${v}`); push(`.pb-${k}`,`padding-bottom:${v}`);
  push(`.pl-${k}`,`padding-left:${v}`); push(`.pr-${k}`,`padding-right:${v}`);
  push(`.m-${k}`,`margin:${v}`);
  push(`.mx-${k}`,`margin-left:${v};margin-right:${v}`);
  push(`.my-${k}`,`margin-top:${v};margin-bottom:${v}`);
  push(`.mt-${k}`,`margin-top:${v}`); push(`.mb-${k}`,`margin-bottom:${v}`);
  push(`.ml-${k}`,`margin-left:${v}`); push(`.mr-${k}`,`margin-right:${v}`);
});
push('.mx-auto','margin-left:auto;margin-right:auto'); push('.ml-auto','margin-left:auto'); push('.mr-auto','margin-right:auto'); push('.mt-auto','margin-top:auto'); push('.mb-auto', 'margin-bottom:auto');
push('.-mt-1','margin-top:-0.25rem'); push('.-mt-2','margin-top:-0.5rem');
// space-x/y (child combinators)
Object.entries(spacing).forEach(([k,v])=>{
  push(`.space-x-${k} > * + *`,`margin-left:${v}`);
  push(`.space-y-${k} > * + *`,`margin-top:${v}`);
});

// widths / heights
const wh = {...spacing, full:'100%', screen:'100vw', min:'min-content', max:'max-content', fit:'fit-content', auto:'auto'};
Object.entries(wh).forEach(([k,v])=>{ push(`.w-${k}`,`width:${v}`); });
const hh = {...spacing, full:'100%', screen:'100vh', min:'min-content', max:'max-content', fit:'fit-content', auto:'auto'};
Object.entries(hh).forEach(([k,v])=>{ push(`.h-${k}`,`height:${v}`); });
['1/2','1/3','2/3','1/4','2/4','3/4','1/5','2/5','3/5','4/5','1/6','5/6','1/12'].forEach(f=>{
  const [a,b]=f.split('/').map(Number);
  push(`.w-${f.replace('/','\\/')}`,`width:${(a/b*100).toFixed(4)}%`);
});
[ ['xs','20rem'],['sm','24rem'],['md','28rem'],['lg','32rem'],['xl','36rem'],['2xl','42rem'],['3xl','48rem'],['4xl','56rem'],['5xl','64rem'],['6xl','72rem'],['7xl','80rem'],['none','none'],['full','100%'] ]
  .forEach(([k,v])=>push(`.max-w-${k}`,`max-width:${v}`));
Object.entries(spacing).forEach(([k,v])=>push(`.min-w-${k}`,`min-width:${v}`));
push('.min-w-0','min-width:0px'); push('.min-w-full','min-width:100%');
push('.min-h-screen','min-height:100vh'); push('.min-h-full','min-height:100%'); push('.min-h-0','min-height:0px');
Object.entries(spacing).forEach(([k,v])=>push(`.max-h-${k}`,`max-height:${v}`));
push('.max-h-full','max-height:100%'); push('.max-h-screen','max-height:100vh');

// typography
push('.text-xs','font-size:0.75rem;line-height:1rem'); push('.text-sm','font-size:0.875rem;line-height:1.25rem');
push('.text-base','font-size:1rem;line-height:1.5rem'); push('.text-lg','font-size:1.125rem;line-height:1.75rem');
push('.text-xl','font-size:1.25rem;line-height:1.75rem'); push('.text-2xl','font-size:1.5rem;line-height:2rem');
push('.text-3xl','font-size:1.875rem;line-height:2.25rem'); push('.text-4xl','font-size:2.25rem;line-height:2.5rem');
push('.text-5xl','font-size:3rem;line-height:1');
push('.font-thin','font-weight:100'); push('.font-light','font-weight:300'); push('.font-normal','font-weight:400');
push('.font-medium','font-weight:500'); push('.font-semibold','font-weight:600'); push('.font-bold','font-weight:700'); push('.font-extrabold','font-weight:800');
push('.italic','font-style:italic'); push('.not-italic','font-style:normal');
push('.uppercase','text-transform:uppercase'); push('.lowercase','text-transform:lowercase'); push('.capitalize','text-transform:capitalize'); push('.normal-case','text-transform:none');
push('.underline','text-decoration-line:underline'); push('.line-through','text-decoration-line:line-through'); push('.no-underline','text-decoration-line:none');
push('.text-left','text-align:left'); push('.text-center','text-align:center'); push('.text-right','text-align:right');
push('.leading-none','line-height:1'); push('.leading-tight','line-height:1.25'); push('.leading-snug','line-height:1.375');
push('.leading-normal','line-height:1.5'); push('.leading-relaxed','line-height:1.625'); push('.leading-loose','line-height:2');
push('.tracking-tight','letter-spacing:-0.025em'); push('.tracking-normal','letter-spacing:0'); push('.tracking-wide','letter-spacing:0.025em'); push('.tracking-wider','letter-spacing:0.05em'); push('.tracking-widest','letter-spacing:0.1em');
push('.break-words','overflow-wrap:break-word'); push('.break-all','word-break:break-all');
push('.font-mono',"font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace");

// borders / radius / shadow
push('.border-0','border-width:0'); push('.border','border-width:1px'); push('.border-2','border-width:2px'); push('.border-4','border-width:4px');
push('.border-t','border-top-width:1px'); push('.border-b','border-bottom-width:1px'); push('.border-l','border-left-width:1px'); push('.border-r','border-right-width:1px');
push('.border-t-2','border-top-width:2px'); push('.border-b-2','border-bottom-width:2px');
push('.border-dashed','border-style:dashed'); push('.border-solid','border-style:solid'); push('.border-none','border-style:none');
push('.rounded-none','border-radius:0'); push('.rounded-sm','border-radius:0.25rem'); push('.rounded','border-radius:0.375rem');
push('.rounded-md','border-radius:0.5rem'); push('.rounded-lg','border-radius:0.75rem'); push('.rounded-xl','border-radius:1rem');
push('.rounded-2xl','border-radius:1.25rem'); push('.rounded-3xl','border-radius:1.75rem'); push('.rounded-full','border-radius:9999px');
push('.rounded-t-xl','border-top-left-radius:1rem;border-top-right-radius:1rem');
push('.rounded-b-xl','border-bottom-left-radius:1rem;border-bottom-right-radius:1rem');
push('.rounded-t-2xl','border-top-left-radius:1.25rem;border-top-right-radius:1.25rem');
push('.rounded-l-xl','border-top-left-radius:1rem;border-bottom-left-radius:1rem');
push('.rounded-r-xl','border-top-right-radius:1rem;border-bottom-right-radius:1rem');
push('.shadow-none','box-shadow:none');
push('.shadow-sm','box-shadow:0 1px 2px 0 rgba(15,23,42,0.05)');
push('.shadow','box-shadow:0 1px 3px 0 rgba(15,23,42,0.08),0 1px 2px -1px rgba(15,23,42,0.08)');
push('.shadow-md','box-shadow:0 4px 10px -2px rgba(15,23,42,0.10),0 2px 6px -2px rgba(15,23,42,0.06)');
push('.shadow-lg','box-shadow:0 12px 24px -6px rgba(15,23,42,0.14),0 4px 10px -4px rgba(15,23,42,0.08)');
push('.shadow-xl','box-shadow:0 20px 40px -8px rgba(15,23,42,0.18),0 8px 16px -6px rgba(15,23,42,0.1)');
push('.shadow-2xl','box-shadow:0 28px 56px -12px rgba(15,23,42,0.28)');
push('.dark .shadow-sm','box-shadow:0 1px 2px 0 rgba(0,0,0,0.3)');
push('.dark .shadow','box-shadow:0 1px 3px 0 rgba(0,0,0,0.35)');
push('.dark .shadow-md','box-shadow:0 4px 10px -2px rgba(0,0,0,0.4)');
push('.dark .shadow-lg','box-shadow:0 12px 24px -6px rgba(0,0,0,0.5)');
push('.dark .shadow-xl','box-shadow:0 20px 40px -8px rgba(0,0,0,0.55)');
push('.outline-none','outline:2px solid transparent;outline-offset:2px');
push('.ring-0','box-shadow:0 0 0 0 transparent');

// opacity / transforms / transitions
[0,5,10,20,25,30,40,50,60,70,75,80,90,95,100].forEach(o=>push(`.opacity-${o}`,`opacity:${o/100}`));
push('.transition','transition-property:color,background-color,border-color,box-shadow,transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms');
push('.transition-all','transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms');
push('.transition-colors','transition-property:color,background-color,border-color;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms');
push('.transition-transform','transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms');
push('.transition-opacity','transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms');
[75,100,150,200,300,500,700].forEach(d=>push(`.duration-${d}`,`transition-duration:${d}ms`));
push('.ease-in-out','transition-timing-function:cubic-bezier(.4,0,.2,1)');
push('.scale-95','transform:scale(.95)'); push('.scale-100','transform:scale(1)'); push('.scale-105','transform:scale(1.05)'); push('.scale-110','transform:scale(1.1)');
push('.rotate-45','transform:rotate(45deg)'); push('.rotate-90','transform:rotate(90deg)'); push('.rotate-180','transform:rotate(180deg)'); push('.-rotate-90','transform:rotate(-90deg)');
push('.translate-y-0','transform:translateY(0)'); push('.translate-y-1','transform:translateY(0.25rem)'); push('.-translate-y-1','transform:translateY(-0.25rem)');
push('.translate-x-0','transform:translateX(0)'); push('.translate-x-full','transform:translateX(100%)');
push('.hover\\:scale-105:hover','transform:scale(1.05)');
push('.hover\\:-translate-y-0\\.5:hover','transform:translateY(-0.125rem)');
push('.backdrop-blur','backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)');
push('.backdrop-blur-sm','backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)');
push('.backdrop-blur-lg','backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)');
push('.ring-1','box-shadow:0 0 0 1px var(--csp-ring-color, rgba(249,115,22,.5))');
push('.ring-2','box-shadow:0 0 0 2px var(--csp-ring-color, rgba(249,115,22,.5))');
push('.ring-orange-400','--csp-ring-color:rgba(251,146,60,.6)');
push('.ring-white','--csp-ring-color:rgba(255,255,255,.8)');
push('.divide-y > * + *','border-top-width:1px;border-color:rgba(148,163,184,.18)');
push('.line-clamp-1','display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden');
push('.line-clamp-2','display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden');
push('.line-clamp-3','display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden');
push('.aspect-video','aspect-ratio:16/9'); push('.aspect-square','aspect-ratio:1/1');
push('.animate-spin','animation:csp-spin 1s linear infinite');
push('.animate-pulse','animation:csp-pulse 2s cubic-bezier(.4,0,.6,1) infinite');
push('.animate-fade-in','animation:csp-fade .2s ease-out');
push('.animate-slide-up','animation:csp-slide-up .25s ease-out');
push('.animate-slide-in','animation:csp-slide-in .28s cubic-bezier(.16,1,.3,1)');
css += `
@keyframes csp-spin { to { transform: rotate(360deg); } }
@keyframes csp-pulse { 50% { opacity: .5; } }
@keyframes csp-fade { from { opacity:0 } to { opacity:1 } }
@keyframes csp-slide-up { from { opacity:0; transform:translateY(8px);} to {opacity:1; transform:translateY(0);} }
@keyframes csp-slide-in { from { opacity:0; transform:translateX(24px);} to {opacity:1; transform:translateX(0);} }
`;

// object-fit
push('.object-cover','object-fit:cover'); push('.object-contain','object-fit:contain');

// list style
push('.list-none','list-style:none'); push('.list-disc','list-style:disc'); push('.list-inside','list-style-position:inside');
push('.appearance-none','appearance:none;-webkit-appearance:none');
push('.resize-none','resize:none'); push('.resize','resize:both');

// ---------- Colors: bg / text / border / ring / placeholder ----------
function colorEntries() {
  const out = [];
  out.push(['white', colors.white]); out.push(['black', colors.black]); out.push(['transparent','transparent']); out.push(['current','currentColor']);
  Object.entries(colors).forEach(([name, val]) => {
    if (typeof val === 'string') return;
    Object.entries(val).forEach(([shade, hex]) => out.push([`${name}-${shade}`, hex]));
  });
  return out;
}
const colorList = colorEntries();
colorList.forEach(([name, hex]) => {
  push(`.bg-${name}`, `background-color:${hex}`);
  push(`.text-${name}`, `color:${hex}`);
  push(`.border-${name}`, `border-color:${hex}`);
  push(`.from-${name}`, `--csp-from:${hex}`);
  push(`.via-${name}`, `--csp-via:${hex}`);
  push(`.to-${name}`, `--csp-to:${hex}`);
  push(`.hover\\:bg-${name}:hover`, `background-color:${hex}`);
  push(`.hover\\:text-${name}:hover`, `color:${hex}`);
  push(`.hover\\:border-${name}:hover`, `border-color:${hex}`);
  push(`.focus\\:border-${name}:focus`, `border-color:${hex}`);
  push(`.group:hover .group-hover\\:text-${name}`, `color:${hex}`);
  push(`.group:hover .group-hover\\:bg-${name}`, `background-color:${hex}`);
  push(`.dark .dark\\:bg-${name}`, `background-color:${hex}`);
  push(`.dark .dark\\:text-${name}`, `color:${hex}`);
  push(`.dark .dark\\:border-${name}`, `border-color:${hex}`);
  push(`.dark .dark\\:hover\\:bg-${name}:hover`, `background-color:${hex}`);
  push(`.dark .dark\\:from-${name}`, `--csp-from:${hex}`);
  push(`.dark .dark\\:via-${name}`, `--csp-via:${hex}`);
  push(`.dark .dark\\:to-${name}`, `--csp-to:${hex}`);
});
// gradient bg
push('.bg-gradient-to-r','background-image:linear-gradient(to right, var(--csp-from), var(--csp-via, var(--csp-to)), var(--csp-to))');
push('.bg-gradient-to-br','background-image:linear-gradient(to bottom right, var(--csp-from), var(--csp-via, var(--csp-to)), var(--csp-to))');
push('.bg-gradient-to-b','background-image:linear-gradient(to bottom, var(--csp-from), var(--csp-via, var(--csp-to)), var(--csp-to))');
push('.bg-gradient-to-tr','background-image:linear-gradient(to top right, var(--csp-from), var(--csp-via, var(--csp-to)), var(--csp-to))');
// opacity variants for bg colors used
[10,20,30,40,50,60,70,80,90].forEach(o=>{
  colorList.forEach(([name,hex])=>{
    // only emit for commonly used ones to limit size
  });
});
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
const opacityTargets = [
  ['white', '#ffffff'], ['black', '#000000'],
  ['orange-500', colors.orange[500]], ['orange-600', colors.orange[600]],
  ['purple-500', colors.purple[500]], ['purple-600', colors.purple[600]],
  ['pink-500', colors.pink[500]], ['green-500', colors.green[500]],
  ['red-500', colors.red[500]], ['amber-500', colors.amber[500]],
  ['slate-900', colors.slate[900]], ['slate-500', colors.slate[500]],
  ['blue-500', colors.blue[500]], ['cyan-500', colors.cyan[500]],
  ['violet-600', colors.violet[600]], ['purple-400', colors.purple[400]],
];
const opacitySteps = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90];
opacityTargets.forEach(([name, hex]) => {
  const [r, g, b] = hexToRgb(hex);
  opacitySteps.forEach((o) => {
    const frac = (o / 100).toFixed(2);
    push(`.bg-${name}\\/${o}`, `background-color:rgba(${r},${g},${b},${frac})`);
    push(`.hover\\:bg-${name}\\/${o}:hover`, `background-color:rgba(${r},${g},${b},${frac})`);
    push(`.border-${name}\\/${o}`, `border-color:rgba(${r},${g},${b},${frac})`);
    push(`.text-${name}\\/${o}`, `color:rgba(${r},${g},${b},${frac})`);
    push(`.dark .dark\\:bg-${name}\\/${o}`, `background-color:rgba(${r},${g},${b},${frac})`);
    push(`.dark .dark\\:hover\\:bg-${name}\\/${o}:hover`, `background-color:rgba(${r},${g},${b},${frac})`);
    push(`.dark .dark\\:border-${name}\\/${o}`, `border-color:rgba(${r},${g},${b},${frac})`);
    push(`.bg-${name}\\/${o}`.replace('bg-', 'from-'), `--csp-from:rgba(${r},${g},${b},${frac})`);
    push(`.to-${name}\\/${o}`, `--csp-to:rgba(${r},${g},${b},${frac})`);
    push(`.dark .dark\\:from-${name}\\/${o}`, `--csp-from:rgba(${r},${g},${b},${frac})`);
    push(`.dark .dark\\:to-${name}\\/${o}`, `--csp-to:rgba(${r},${g},${b},${frac})`);
  });
});

css += rules.join('\n') + '\n';

// ---------- Responsive (sm/md/lg/xl breakpoints) ----------
const bpRules = [];
function pushBp(selector, decls) { bpRules.push(`${selector}{${decls}}`); }
const respGrid = [];
for (let i=1;i<=6;i++) respGrid.push([`grid-cols-${i}`, `grid-template-columns:repeat(${i},minmax(0,1fr))`]);
const respMisc = [
  ['flex','display:flex'],['hidden','display:none'],['block','display:block'],['inline-flex','display:inline-flex'],['grid','display:grid'],
  ['flex-row','flex-direction:row'],['flex-col','flex-direction:column'],
  ['items-center','align-items:center'],['justify-between','justify-content:space-between'],
  ['w-auto','width:auto'],['w-full','width:100%'],['w-1\\/2','width:50%'],['w-1\\/3','width:33.3333%'],
  ['col-span-1','grid-column:span 1 / span 1'],['col-span-2','grid-column:span 2 / span 2'],['col-span-3','grid-column:span 3 / span 3'],
  ['p-4','padding:1rem'],['p-6','padding:1.5rem'],['px-4','padding-left:1rem;padding-right:1rem'],['px-6','padding-left:1.5rem;padding-right:1.5rem'],
  ['text-sm','font-size:.875rem;line-height:1.25rem'],['text-2xl','font-size:1.5rem;line-height:2rem'],
  ['gap-4','gap:1rem'],['gap-6','gap:1.5rem'],
  ['ml-64','margin-left:16rem'], ['ml-20','margin-left:5rem'],
];
const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };
Object.entries(breakpoints).forEach(([bp, min]) => {
  bpRules.push(`@media (min-width: ${min}) {`);
  [...respGrid, ...respMisc].forEach(([cls, decl]) => {
    bpRules.push(`.${bp}\\:${cls}{${decl}}`);
  });
  bpRules.push(`}`);
});
// NOTE: bpRules is appended at the very end of the file (after component
// classes) so responsive display/layout overrides always win the cascade
// against same-specificity component classes like .btn (display:inline-flex).

// ---------- Component classes (hand-crafted, reused across pages) ----------
css += `
.card { border-radius: 1.25rem; }
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; font-weight:600; border-radius:9999px; transition: all .15s ease; white-space:nowrap; }
.btn:disabled { opacity:.5; cursor:not-allowed; }
.btn-primary { background:linear-gradient(135deg,#f97316,#ea580c); color:#fff; box-shadow:0 8px 20px -6px rgba(234,88,12,.55); }
.btn-primary:hover { box-shadow:0 10px 24px -4px rgba(234,88,12,.6); transform:translateY(-1px); }
.btn-secondary { background:rgba(255,255,255,0.9); color:#334155; border:1px solid #e5e7eb; }
.btn-secondary:hover { background:#fff; }
.dark .btn-secondary { background:rgba(30,26,48,0.8); color:#e2e8f0; border:1px solid rgba(255,255,255,0.1); }
.dark .btn-secondary:hover { background:rgba(40,34,60,0.9); }
.btn-ghost { background:transparent; color:#475569; }
.btn-ghost:hover { background:rgba(148,163,184,.15); }
.dark .btn-ghost { color:#cbd5e1; }
.btn-danger { background:#fff; color:#dc2626; border:1px solid #fecaca; }
.btn-danger:hover { background:#fef2f2; }
.badge { display:inline-flex; align-items:center; gap:.25rem; font-size:.7rem; font-weight:700; padding:.25rem .65rem; border-radius:9999px; letter-spacing:.02em; }
.input { width:100%; border-radius:9999px; border:1px solid #e2e8f0; background:rgba(255,255,255,0.85); padding:.65rem 1.1rem; font-size:.875rem; color:#0f172a; transition:border-color .15s ease, box-shadow .15s ease; }
.input:focus { border-color:#f97316; box-shadow:0 0 0 3px rgba(249,115,22,.15); outline:none; }
.dark .input { background:rgba(30,26,48,0.7); border-color:rgba(255,255,255,0.12); color:#f1f5f9; }
.input-box { border-radius:1rem; }
.select { border-radius:9999px; border:1px solid #e2e8f0; background:rgba(255,255,255,0.85); padding:.55rem 2rem .55rem 1rem; font-size:.8rem; color:#0f172a; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right .6rem center; }
.dark .select { background-color:rgba(30,26,48,0.7); border-color:rgba(255,255,255,0.12); color:#f1f5f9; }
.table-wrap { overflow-x:auto; border-radius:1rem; }
.table-head th { text-align:left; font-size:.68rem; text-transform:uppercase; letter-spacing:.05em; color:#94a3b8; font-weight:700; padding:.75rem 1rem; white-space:nowrap; }
.dark .table-head th { color:#7c8aa5; }
.table-row td { padding:.9rem 1rem; font-size:.85rem; border-top:1px solid rgba(148,163,184,.16); vertical-align:middle; }
.table-row:hover { background:rgba(249,115,22,.05); }
.dark .table-row:hover { background:rgba(249,115,22,.08); }
.nav-item { display:flex; align-items:center; gap:.75rem; padding:.65rem .9rem; border-radius:.85rem; font-size:.875rem; font-weight:600; color:#475569; transition:all .15s ease; }
.nav-item:hover { background:rgba(255,255,255,.6); color:#0f172a; }
.dark .nav-item { color:#a8b3c7; }
.dark .nav-item:hover { background:rgba(255,255,255,.06); color:#f1f5f9; }
.nav-item.active { background:linear-gradient(135deg,#fff,#ffe9da); color:#ea580c; box-shadow:0 4px 14px -4px rgba(234,88,12,.35); border:1px solid #fed7aa; }
.dark .nav-item.active { background:linear-gradient(135deg, rgba(249,115,22,.18), rgba(249,115,22,.08)); color:#fb923c; border:1px solid rgba(249,115,22,.35); box-shadow:none; }
.scrollbar-thin::-webkit-scrollbar { width:6px; height:6px; }
.chip { display:inline-flex; align-items:center; gap:.35rem; padding:.2rem .6rem; border-radius:9999px; font-size:.7rem; font-weight:700; }
.link-btn { color:#ea580c; font-weight:600; }
.link-btn:hover { text-decoration:underline; }
.progress-track { width:100%; height:.5rem; border-radius:9999px; background:rgba(148,163,184,.25); overflow:hidden; }
.progress-fill { height:100%; border-radius:9999px; }
.divider { border-top:1px solid rgba(148,163,184,.2); }
.modal-backdrop { position:fixed; inset:0; background:rgba(15,23,42,.45); backdrop-filter:blur(2px); z-index:50; }
.tab-pill { padding:.6rem 1.1rem; border-radius:9999px; font-size:.85rem; font-weight:700; color:#64748b; background:rgba(255,255,255,.6); transition:all .15s ease; }
.dark .tab-pill { color:#94a3b8; background:rgba(255,255,255,.05); }
.tab-pill.active { background:linear-gradient(135deg,#ea580c,#f97316); color:#fff; box-shadow:0 6px 16px -4px rgba(234,88,12,.5); }
.subtab { padding:.55rem .25rem; font-size:.85rem; font-weight:600; color:#64748b; border-bottom:2px solid transparent; }
.subtab.active { color:#ea580c; border-bottom-color:#ea580c; }
.dark .subtab { color:#94a3b8; }
.dark .subtab.active { color:#fb923c; border-bottom-color:#fb923c; }
.kbd { font-size:.7rem; font-weight:700; padding:.15rem .4rem; border-radius:.4rem; background:rgba(148,163,184,.2); color:#64748b; }
.dark .kbd { background:rgba(255,255,255,.08); color:#94a3b8; }
.avatar { display:inline-flex; align-items:center; justify-content:center; border-radius:9999px; font-weight:700; }
.copilot-fab { position:fixed; right:1.75rem; bottom:1.75rem; z-index:40; }
.gantt-bar { border-radius:9999px; font-size:.75rem; font-weight:700; display:flex; align-items:center; gap:.35rem; padding:.4rem .8rem; cursor:pointer; transition:all .15s ease; white-space:nowrap; }
.gantt-bar:hover { filter:brightness(1.06); transform:translateY(-1px); }
.node-card { border-radius:1rem; padding:.85rem 1rem; min-width:180px; cursor:pointer; }
.scrollbar-none::-webkit-scrollbar{display:none}
.scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
.copilot-panel { width: 100%; max-width: 24rem; }

/* ---- Header: simplified, premium, clear focus states ---- */
.header-bar {
  background: rgba(255,255,255,.62); backdrop-filter: blur(14px);
  border: 1px solid rgba(226,232,240,.7); box-shadow: 0 1px 2px rgba(15,23,42,.04);
}
.dark .header-bar { background: rgba(20,17,32,.55); border-color: rgba(255,255,255,.08); }
.header-pill {
  display:flex; align-items:center; gap:.5rem; border-radius:9999px; padding:.35rem .7rem .35rem .35rem;
  border:1px solid transparent; transition: all .15s ease; background: transparent;
}
.header-pill:hover { background: rgba(148,163,184,.1); }
.header-pill:focus-visible { outline:none; border-color:#fb923c; box-shadow: 0 0 0 3px rgba(249,115,22,.18); }
.header-pill--static { cursor: default; }
.header-pill--static:hover { background: transparent; }
.header-pill--user { padding:.3rem .8rem .3rem .3rem; }
.header-search { transition: all .15s ease; border-radius: 9999px; }
.header-search__input {
  width:100%; border-radius:9999px; border:1px solid rgba(226,232,240,.9); background: rgba(255,255,255,.7);
  padding:.55rem 3.2rem .55rem 2.5rem; font-size:.8rem; color:#0f172a; transition: all .15s ease;
}
.dark .header-search__input { background: rgba(30,26,48,.55); border-color: rgba(255,255,255,.1); color:#f1f5f9; }
.header-search__input:focus { outline:none; border-color:#f97316; box-shadow: 0 0 0 3px rgba(249,115,22,.16); background: #fff; }
.dark .header-search__input:focus { background: rgba(30,26,48,.85); }

/* ---- Library: generated-asset creative cards ---- */
.asset-card {
  border-radius: 1.25rem; padding: 1.1rem 1.15rem; display:flex; flex-direction:column;
  background: radial-gradient(120% 140% at 0% 0%, #3b2a12 0%, #1c1408 45%, #0b0704 100%);
  border: 1px solid rgba(251,191,36,.18); box-shadow: 0 10px 30px -12px rgba(0,0,0,.55);
  cursor: pointer; width: 100%;
}
.asset-card--modal { border-radius: 0; box-shadow:none; border:none; padding: 1.75rem 1.5rem; }

/* ---- Campaign detail: spreadsheet-style tabs, checklist rows, phone mock ---- */
.sheet-tab { padding:.5rem 1rem; border-radius:.65rem .65rem 0 0; font-size:.75rem; font-weight:700; color:#64748b; background:rgba(148,163,184,.12); border:1px solid transparent; }
.dark .sheet-tab { color:#94a3b8; background:rgba(255,255,255,.05); }
.sheet-tab.active { background:#fff; color:#ea580c; border-color:#e2e8f0; border-bottom-color:#fff; }
.dark .sheet-tab.active { background:#1e293b; color:#fb923c; border-color:rgba(255,255,255,.1); border-bottom-color:#1e293b; }

.checklist-row { display:flex; align-items:center; gap:.75rem; border-radius:1rem; padding:.85rem 1rem; background:rgba(148,163,184,.08); }
.dark .checklist-row { background:rgba(255,255,255,.04); }
.checklist-row.is-done { background:rgba(34,197,94,.09); }
.dark .checklist-row.is-done { background:rgba(34,197,94,.12); }
.checklist-row.is-fail { background:rgba(239,68,68,.08); }
.dark .checklist-row.is-fail { background:rgba(239,68,68,.12); }

.phone-mock { width: 15.5rem; border-radius: 2rem; padding: .6rem; background:#0f172a; box-shadow: 0 20px 45px -18px rgba(15,23,42,.55); margin: 0 auto; }
.phone-mock__screen { border-radius: 1.5rem; background:#f8fafc; overflow:hidden; min-height: 20rem; }
.dark .phone-mock__screen { background:#0b1220; }
.accent-orange-600 { accent-color: #ea580c; }

/* one-off "arbitrary value" utilities actually used by the app (hand-added
   since this offline build has no JIT compiler to generate them on demand) */
.max-h-\[92vh\]{max-height:92vh}
.max-w-\[1900px\]{max-width:1900px}
.max-w-\[85\%\]{max-width:85%}
.max-w-\[92\%\]{max-width:92%}
.min-w-\[100px\]{min-width:100px}
.min-w-\[110px\]{min-width:110px}
.min-w-\[220px\]{min-width:220px}
.min-w-\[240px\]{min-width:240px}
.min-w-\[10rem\]{min-width:10rem}
.w-\[26rem\]{width:26rem}
.text-\[9px\]{font-size:9px}
.text-\[10px\]{font-size:10px}
.text-\[11px\]{font-size:11px}
.text-\[15px\]{font-size:15px}
.max-h-\[19rem\]{max-height:19rem}
@media (min-width:1024px){
  .lg\:w-\[26rem\]{width:26rem}
  .lg\:grid-cols-\[17rem_1fr\]{grid-template-columns:17rem 1fr}
  .lg\:grid-cols-\[1fr_20rem\]{grid-template-columns:1fr 20rem}
}
`;

css += bpRules.join('\n') + '\n';

const outPath = path.join(__dirname, 'public', 'styles.css');
fs.writeFileSync(outPath, css);
console.log('Wrote', outPath, (css.length/1024).toFixed(1) + 'KB');
