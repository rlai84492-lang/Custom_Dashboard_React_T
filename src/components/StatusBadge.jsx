import React from 'react';

const STYLES = {
  Draft: 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  Cancelled: 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400',
  Overdue: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  'Base Approved': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  'Base: With Data Team': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  Completed: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  Approved: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  Flagged: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  NEW: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  CONTACTED: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  CONVERTED: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
};

export default function StatusBadge({ status, className = '' }) {
  const style = STYLES[status] || 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300';
  return <span className={`badge ${style} ${className}`}>{status}</span>;
}
