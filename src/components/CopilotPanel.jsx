import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCopilot } from '../context/CopilotContext';
import { useAuth } from '../context/AuthContext';
import { IconSparkle, IconClose, IconSend } from './icons';

export default function CopilotPanel() {
  const { open, setOpen, messages, send } = useCopilot();
  const { account } = useAuth();
  const [text, setText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  if (!open) return null;

  const submit = () => {
    if (!text.trim()) return;
    send(text.trim());
    setText('');
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end pointer-events-none">
      <div
        className="copilot-panel pointer-events-auto w-full h-full glass-solid shadow-2xl flex flex-col animate-slide-in"
        style={{ borderLeft: '1px solid rgba(148,163,184,.25)' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white">
              <IconSparkle size={17} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">CampSyte Copilot</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Sees this page · scoped to your role ({account?.scope === 'ALL' ? 'Superadmin' : 'Brand'})
              </p>
            </div>
          </div>
          <button className="btn btn-ghost h-8 w-8 rounded-full" onClick={() => setOpen(false)}>
            <IconClose size={17} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="text-center text-xs text-slate-400 mt-10 px-6">
              Ask about campaigns, audiences, or performance on this page — I'll draft, you approve.
            </div>
          )}
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </AnimatePresence>
        </div>

        <div className="p-3 border-t border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <input
              className="input flex-1"
              placeholder="Ask the copilot…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
            <button className="btn btn-primary h-10 w-10 rounded-full shrink-0" onClick={submit} aria-label="Send">
              <IconSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  if (message.role === 'user') {
    return (
      <motion.div
        layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
        className="self-end max-w-[85%] bg-slate-900 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md"
      >
        {message.text}
      </motion.div>
    );
  }
  return (
    <motion.div
      layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.26 }}
      className="self-start max-w-[92%] glass card px-4 py-3 shadow-sm"
    >
      {message.agentTag && (
        <p className="text-[10px] font-extrabold tracking-wide text-purple-600 dark:text-purple-300 mb-1">
          {message.agentTag}
        </p>
      )}
      {message.title && <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{message.title}</p>}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{message.text}</p>
    </motion.div>
  );
}
