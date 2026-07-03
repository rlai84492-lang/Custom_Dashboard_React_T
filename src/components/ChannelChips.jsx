import React from 'react';

const STYLES = {
  SMS: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  WA: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  RCS: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
  EM: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
};

export default function ChannelChips({ channels = [] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {channels.map((ch) => (
        <span key={ch} className={`chip ${STYLES[ch] || 'bg-slate-100 text-slate-600'}`}>
          {ch}
        </span>
      ))}
    </div>
  );
}
