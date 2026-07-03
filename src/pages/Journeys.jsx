import React, { useMemo, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { JOURNEYS } from '../data/mockData';
import {
  IconSparkle, IconChat, IconSchedule, IconArrowRightAlt, IconWhatsapp,
} from '../components/icons';

const NODE_STYLE = {
  TRIGGER: { bg: 'bg-orange-100 dark:bg-orange-500/15', border: 'border-orange-300 dark:border-orange-500/30', label: 'TRIGGER', text: 'text-orange-700 dark:text-orange-300' },
  WHATSAPP: { bg: 'bg-blue-100 dark:bg-blue-500/15', border: 'border-blue-300 dark:border-blue-500/30', label: 'WHATSAPP', text: 'text-blue-700 dark:text-blue-300' },
  WAIT: { bg: 'bg-amber-100 dark:bg-amber-500/15', border: 'border-amber-300 dark:border-amber-500/30', label: 'WAIT', text: 'text-amber-700 dark:text-amber-300' },
  BRANCH: { bg: 'bg-purple-100 dark:bg-purple-500/15', border: 'border-purple-300 dark:border-purple-500/30', label: 'BRANCH', text: 'text-purple-700 dark:text-purple-300' },
};

export default function Journeys() {
  const { navigate } = useRouter();
  const [journeys, setJourneys] = useState(JOURNEYS);
  const [selectedId, setSelectedId] = useState(JOURNEYS[0].id);
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState(JOURNEYS[0].name);

  const selected = journeys.find((j) => j.id === selectedId) || journeys[0];

  const canvasSize = useMemo(() => {
    const nodes = selected.nodes || [];
    const maxX = Math.max(400, ...nodes.map((n) => n.x + 220));
    const maxY = Math.max(320, ...nodes.map((n) => n.y + 90));
    return { w: maxX, h: maxY };
  }, [selected]);

  const select = (j) => { setSelectedId(j.id); setName(j.name); };

  const propose = () => {
    if (!prompt.trim()) return;
    const newJourney = {
      id: `jr-${Date.now()}`,
      name: prompt.trim().length > 40 ? prompt.trim().slice(0, 40) + '…' : prompt.trim(),
      steps: 5,
      status: 'draft',
      ai: true,
      nodes: [
        { id: 'a1', type: 'TRIGGER', title: 'Audience match', x: 30, y: 170 },
        { id: 'a2', type: 'WHATSAPP', title: 'Opening message', x: 300, y: 170 },
        { id: 'a3', type: 'WAIT', title: 'Wait 1 day', x: 570, y: 170 },
        { id: 'a4', type: 'BRANCH', title: 'Clicked?', x: 820, y: 170 },
      ],
      edges: [['a1', 'a2'], ['a2', 'a3'], ['a3', 'a4']],
    };
    setJourneys((prev) => [newJourney, ...prev]);
    setSelectedId(newJourney.id);
    setName(newJourney.name);
    setPrompt('');
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Journey Builder
          <span className="badge bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">AI-FIRST</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Multi-touch flows: the Journey Agent proposes, you edit, then launch into the approval workflow
        </p>
      </div>

      <div className="glass card p-2 mb-5 flex items-center gap-2">
        <IconSparkle size={18} className="text-purple-500 ml-2 shrink-0" />
        <input
          className="flex-1 bg-transparent text-sm px-2 py-2.5 outline-none"
          placeholder='Describe the objective… e.g. "birthday journey for Mia" / "winback lapsed buyers" / "festive footfall wave"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && propose()}
        />
        <button className="btn btn-primary px-4 py-2.5 text-xs shrink-0" onClick={propose}>
          <IconSparkle size={14} /> Propose journey
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[17rem_1fr] gap-5">
        <div className="glass card p-4 h-fit">
          <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400 mb-3 px-1">Journeys</p>
          <div className="flex flex-col gap-2">
            {journeys.map((j) => (
              <button
                key={j.id}
                onClick={() => select(j)}
                className={`text-left rounded-2xl border px-3.5 py-3 transition-colors ${
                  selectedId === j.id
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10'
                    : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  {j.ai && <IconSparkle size={13} className="text-purple-500 shrink-0" />}
                  <span className="truncate">{j.name}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {j.steps} steps · {j.status === 'launched' ? <span className="text-green-600 font-semibold">launched</span> : 'draft'}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="glass card p-4">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <input
              className="flex-1 min-w-[10rem] text-sm font-bold bg-transparent px-2 py-1.5 rounded-lg outline-none focus:bg-slate-50 dark:focus:bg-white/5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-secondary text-xs px-3 py-2"><IconChat size={14} /> Message</button>
            <button className="btn btn-secondary text-xs px-3 py-2"><IconSchedule size={14} /> Wait</button>
            <button className="btn btn-secondary text-xs px-3 py-2"><IconArrowRightAlt size={14} /> Branch</button>
            <button className="btn btn-secondary text-xs px-3 py-2">Goal</button>
            <button className="btn btn-secondary text-xs px-3 py-2">Save</button>
            <button
              className="btn btn-primary text-xs px-4 py-2"
              onClick={() => selected.campaignId && navigate(`/campaigns/${selected.campaignId}`)}
              disabled={!selected.campaignId}
            >
              Open campaign →
            </button>
          </div>

          <div className="overflow-auto rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5" style={{ height: 440 }}>
            {(!selected.nodes || selected.nodes.length === 0) ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                No steps yet — describe an objective above to have the Journey Agent propose one.
              </div>
            ) : (
              <div className="relative" style={{ width: canvasSize.w, height: canvasSize.h }}>
                <svg className="absolute inset-0" width={canvasSize.w} height={canvasSize.h}>
                  {selected.edges.map(([fromId, toId], i) => {
                    const from = selected.nodes.find((n) => n.id === fromId);
                    const to = selected.nodes.find((n) => n.id === toId);
                    if (!from || !to) return null;
                    const x1 = from.x + 190, y1 = from.y + 30, x2 = to.x, y2 = to.y + 30;
                    return (
                      <path
                        key={i}
                        d={`M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`}
                        stroke="#fb923c"
                        strokeWidth="2"
                        fill="none"
                      />
                    );
                  })}
                </svg>
                {selected.nodes.map((n) => {
                  const style = NODE_STYLE[n.type] || NODE_STYLE.WHATSAPP;
                  return (
                    <div
                      key={n.id}
                      className={`node-card absolute border ${style.bg} ${style.border} shadow-sm`}
                      style={{ left: n.x, top: n.y, width: 190 }}
                    >
                      <p className={`text-[10px] font-extrabold tracking-wide ${style.text} flex items-center gap-1`}>
                        {n.type === 'WHATSAPP' && <IconWhatsapp size={12} />}
                        {style.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-0.5 truncate">{n.title}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Drag to move · double-click to rename · → button connects nodes · branch edges label yes/no automatically on AI proposals
          </p>
        </div>
      </div>
    </div>
  );
}
