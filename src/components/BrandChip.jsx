import React from 'react';
import { BRANDS } from '../data/mockData';

export default function BrandChip({ brandKey, size = 'sm' }) {
  const b = BRANDS[brandKey];
  if (!b) return null;
  const dim = size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs';
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`avatar ${dim} text-white`} style={{ background: b.color }}>
        {b.short.slice(0, 2).toUpperCase()}
      </span>
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{b.name}</span>
    </span>
  );
}
