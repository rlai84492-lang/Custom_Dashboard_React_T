import React from 'react';
import { useCopilot } from '../context/CopilotContext';
import { IconSparkle } from './icons';

export default function CopilotFab() {
  const { open, setOpen } = useCopilot();
  if (open) return null;
  return (
    <button
      className="copilot-fab btn px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-xl hover:scale-105 transition-transform"
      onClick={() => setOpen(true)}
    >
      <IconSparkle size={18} />
      <span className="text-sm font-bold">Copilot</span>
    </button>
  );
}
