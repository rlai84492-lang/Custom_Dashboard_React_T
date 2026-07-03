import React from 'react';
import { IconArrowLeft, IconArrowRight } from './icons';

export default function Pagination({ page, pageCount, onChange, totalItems, pageSize }) {
  if (pageCount <= 0) return null;
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = [];
  const windowSize = 1;
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - windowSize && i <= page + windowSize)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{start}-{end}</span> of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-200">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          className="btn btn-ghost h-8 w-8 rounded-full"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          <IconArrowLeft size={18} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="px-2 text-xs text-slate-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors ${
                p === page ? 'bg-orange-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-white/10'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          className="btn btn-ghost h-8 w-8 rounded-full"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          <IconArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
