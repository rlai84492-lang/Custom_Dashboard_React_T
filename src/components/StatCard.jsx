import React from 'react';

export default function StatCard({ value, sub, label, valueClassName = 'text-slate-900 dark:text-white', big }) {
  return (
    <div className="glass card p-5 shadow-sm">
      <p className={`font-bold ${big ? 'text-3xl' : 'text-2xl'} ${valueClassName}`}>
        {value}
        {sub && <span className="text-lg font-semibold opacity-80"> · {sub}</span>}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</p>
    </div>
  );
}
