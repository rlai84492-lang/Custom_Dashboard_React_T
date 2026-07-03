import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { OCCASIONS, PREDICTIVE_INSIGHTS, FATIGUE_METER, CAMPGROUND_WELCOME } from '../data/mockData';
import { IconSparkle, IconSend, IconVoice, IconFatigue, IconWarning, IconAutoGraph } from '../components/icons';

const SUGGESTION_LINES = [
  { n: 1, label: 'Increase footfalls', example: 'increase store footfalls in the South zone this month, budget ₹8L' },
  { n: 2, label: 'Find audiences', example: 'which cohorts should I target for a festive offer?' },
  { n: 3, label: 'Simulate', example: 'what if I send an offer to 80k contacts?' },
  { n: 4, label: 'Winback', example: 're-engage customers going cold' },
];

function orchestratorGreeting(campaignCount) {
  return `I'm tracking ${campaignCount} campaigns for Titan Watches (0 live right now), brand-average CTR 16.1%.\n\nI can help you:\n1. Increase footfalls — "increase store footfalls in the South zone this month, budget ₹8L"\n2. Find audiences — "which cohorts should I target for a festive offer?"\n3. Simulate — "what if I send an offer to 80k contacts?"\n4. Winback — "re-engage customers going cold"\n\nEvery idea I propose becomes a real draft campaign that enters your normal approval workflow — nothing sends without your approval.`;
}

export default function Campground() {
  const { campaigns } = useData();
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'orchestrator', text: CAMPGROUND_WELCOME }]);
  const [text, setText] = useState('');
  const [insights, setInsights] = useState(PREDICTIVE_INSIGHTS);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = (value) => {
    const val = (value ?? text).trim();
    if (!val) return;
    setMessages((prev) => [...prev, { id: Date.now() + 'u', role: 'user', text: val }]);
    setText('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 'o', role: 'orchestrator', text: orchestratorGreeting(campaigns.length) }]);
    }, 500);
  };

  const dismissInsight = (id) => setInsights((prev) => prev.filter((i) => i.id !== id));

  const fatiguePct = Math.round((FATIGUE_METER.contactable / FATIGUE_METER.total) * 100);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
        <IconSparkle size={24} className="text-purple-500" /> Campground
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
        AI campaign workspace · Orchestrator + Audience, Creative, Journey, Deployment, Performance &amp; Recommendation agents
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-5">
        <div className="glass card p-5 flex flex-col" style={{ height: 620 }}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-3 pr-1">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} onSuggestion={send} />
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              className="input flex-1"
              placeholder='Try: "increase store footfalls, budget ₹8L" or "which cohorts for a festive offer?"'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn btn-primary px-5 py-2.5 text-sm shrink-0" onClick={() => send()}>
              <IconSend size={15} /> Send
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="glass card p-5">
            <p className="font-bold text-slate-900 dark:text-white mb-3 text-sm">🗓️ Occasion radar — next 60 days</p>
            <div className="grid grid-cols-2 gap-2">
              {OCCASIONS.slice(0, 3).map((o) => (
                <div key={o.name} className={`rounded-xl p-2.5 ${o.relevance >= 60 ? 'bg-amber-100 dark:bg-amber-500/15' : 'bg-slate-50 dark:bg-white/5'}`}>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{o.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{o.date} · relevance {o.relevance}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass card p-5">
            <p className="font-bold text-slate-900 dark:text-white mb-3 text-sm flex items-center gap-1.5">
              <IconAutoGraph size={16} className="text-blue-500" /> Predictive insights
            </p>
            <div className="flex flex-col gap-3">
              {insights.length === 0 && <p className="text-xs text-slate-400">No open insights right now.</p>}
              {insights.map((i) => (
                <div key={i.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-3">
                  <span className={`badge ${i.kind === 'ANOMALY' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                    {i.kind === 'ANOMALY' && <IconWarning size={11} />} {i.kind === 'ANOMALY' ? 'ANOMALY' : 'NEXT BEST ACTION'}
                  </span>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2">{i.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{i.body}</p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <button className="btn btn-primary text-xs px-3 py-1.5" onClick={() => send(`explore: ${i.title}`)}>Explore</button>
                    <button className="btn btn-secondary text-xs px-3 py-1.5" onClick={() => dismissInsight(i.id)}>Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass card p-5">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm flex items-center gap-1.5">
              <IconVoice size={16} className="text-pink-500" /> Voice of customer
            </p>
            <p className="text-xs text-slate-500 mb-3">Themes mined from bot conversations</p>
            <button className="btn btn-secondary w-full text-xs py-2.5" onClick={() => send('mine latest voice-of-customer themes')}>
              Mine latest themes →
            </button>
          </div>

          <div className="glass card p-5">
            <p className="font-bold text-slate-900 dark:text-white mb-3 text-sm flex items-center gap-1.5">
              <IconFatigue size={16} className="text-green-500" /> Fatigue meter
            </p>
            <p className="text-[11px] text-slate-500 mb-2">Reachable base after frequency caps (max 2 msgs / 14 days)</p>
            <div className="progress-track">
              <div className="progress-fill bg-green-500" style={{ width: `${fatiguePct}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">{FATIGUE_METER.contactable.toLocaleString('en-IN')}</span> of{' '}
              {FATIGUE_METER.total.toLocaleString('en-IN')} contactable · {FATIGUE_METER.resting.toLocaleString('en-IN')} resting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message, onSuggestion }) {
  if (message.role === 'user') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="self-end max-w-[85%] bg-slate-900 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md"
      >
        {message.text}
      </motion.div>
    );
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="self-start max-w-[92%] glass card p-4"
    >
      <p className="text-[10px] font-extrabold tracking-wide text-purple-600 dark:text-purple-300 mb-1.5 flex items-center gap-1.5">
        <IconSparkle size={11} /> ORCHESTRATOR
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">{message.text}</p>
      {message.id === 'welcome' && (
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTION_LINES.map((s) => (
            <button key={s.n} className="tab-pill text-xs" onClick={() => onSuggestion(s.example)}>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
