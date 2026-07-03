import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { OCCASIONS, BRANDS } from '../data/mockData';
import { IconWarning, IconSparkle } from '../components/icons';

const RANGE_START = new Date('2026-06-01');
const RANGE_END = new Date('2026-09-30');
const TOTAL_DAYS = daysBetween(RANGE_START, RANGE_END);
const MONTHS = [
  { label: 'JUN', date: new Date('2026-06-01') },
  { label: 'JUL', date: new Date('2026-07-01') },
  { label: 'AUG', date: new Date('2026-08-01') },
  { label: 'SEP', date: new Date('2026-09-01') },
];
const TODAY = new Date('2026-07-02');

function daysBetween(a, b) { return (b - a) / (1000 * 60 * 60 * 24); }
function pct(date) { return Math.min(100, Math.max(0, (daysBetween(RANGE_START, date) / TOTAL_DAYS) * 100)); }
function rangesOverlap(aStart, aEnd, bStart, bEnd) { return aStart <= bEnd && bStart <= aEnd; }

const STATUS_COLOR = {
  Draft: 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200',
  Cancelled: 'bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-slate-500 line-through',
  Overdue: 'bg-orange-200 text-orange-800 dark:bg-orange-500/25 dark:text-orange-200',
  'Base Approved': 'bg-blue-200 text-blue-800 dark:bg-blue-500/25 dark:text-blue-200',
  'Base: With Data Team': 'bg-cyan-200 text-cyan-800 dark:bg-cyan-500/25 dark:text-cyan-200',
  Completed: 'bg-green-200 text-green-800 dark:bg-green-500/25 dark:text-green-200',
};

export default function Calendar() {
  const { campaigns } = useData();
  const { brand } = useAuth();
  const { navigate } = useRouter();

  const rows = useMemo(() => {
    const list = campaigns.filter((c) => c.brand === (brand ? brand.key : c.brand) && c.status !== 'Cancelled');
    const withRange = list.map((c) => {
      const start = new Date(c.shelfStart || c.deployDate);
      const end = new Date(c.shelfEnd || c.deployDate);
      const safeEnd = new Date(Math.max(end, start.getTime() + 1000 * 60 * 60 * 24 * 3));
      return { ...c, _start: start, _end: safeEnd, startPct: pct(start), endPct: pct(safeEnd) };
    });
    // Real same-brand overlap detection: a campaign is flagged if its shelf
    // window intersects any other campaign's shelf window in this list.
    const flagged = withRange.map((c, i) => {
      const overlaps = withRange.some((other, j) => j !== i && rangesOverlap(c._start, c._end, other._start, other._end));
      return { ...c, overlap: overlaps };
    });
    return flagged.sort((a, b) => a.startPct - b.startPct);
  }, [campaigns, brand]);

  const todayPct = pct(TODAY);
  const brandLabel = brand ? brand.name.toUpperCase() : 'ALL BRANDS';
  const brandColor = brand ? brand.color : '#0f172a';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Campaign Calendar</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            All-brands timeline · shelf-life bars · <IconWarning size={13} className="inline text-amber-500" /> marks same-brand overlaps · ◆ occasions
          </p>
        </div>
      </div>

      <div className="glass card p-6 overflow-x-auto">
        <div style={{ minWidth: 900 }}>
          <div className="relative h-8 border-b border-slate-200 dark:border-white/10 mb-4">
            {MONTHS.map((m) => (
              <span
                key={m.label}
                className="absolute top-0 text-xs font-bold text-slate-500 dark:text-slate-400 -translate-x-1/2"
                style={{ left: `${pct(m.date)}%` }}
              >
                {m.label}
              </span>
            ))}
            {OCCASIONS.map((o) => {
              const [d, mon] = o.date.split(' ');
              const date = new Date(`2026-${monthIdx(mon)}-${d.padStart(2, '0')}`);
              return (
                <span
                  key={o.name}
                  title={`${o.name} · relevance ${o.relevance}`}
                  className="absolute top-0.5 text-orange-500 -translate-x-1/2 cursor-help"
                  style={{ left: `${pct(date)}%` }}
                >
                  <IconSparkleDiamond />
                </span>
              );
            })}
          </div>

          <div className="relative">
            <div
              className="absolute top-0 bottom-0 w-px bg-orange-500 z-10"
              style={{ left: `${todayPct}%` }}
            >
              <span className="absolute -top-1 left-1.5 badge bg-orange-600 text-white text-[10px]">TODAY</span>
            </div>

            <div className="mb-2">
              <p className="text-xs font-extrabold" style={{ color: brandColor }}>{brandLabel}</p>
            </div>

            <div className="flex flex-col gap-2.5 pb-4">
              {rows.map((c, i) => (
                <div key={c.id} className="relative h-9" style={{ marginLeft: 0 }}>
                  <motion.button
                    initial={{ opacity: 0, scaleX: 0.85 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 12) * 0.035 }}
                    style={{ left: `${c.startPct}%`, width: `${Math.max(6, c.endPct - c.startPct)}%`, transformOrigin: 'left center' }}
                    whileHover={{ y: -1 }}
                    onClick={() => navigate(`/campaigns/${c.id}`)}
                    className={`gantt-bar absolute top-0 ${STATUS_COLOR[c.status] || 'bg-slate-200 text-slate-700'}`}
                    title={`${c.name} · ${c.status}`}
                  >
                    {c.overlap && <IconWarning size={12} className="text-amber-600 shrink-0" />}
                    {c.aiAssisted && <IconSparkle size={12} className="text-purple-600 shrink-0" />}
                    <span className="truncate">{c.name}</span>
                  </motion.button>
                </div>
              ))}
              {rows.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10">No active campaigns in this window.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-400">
        <span className="flex items-center gap-1"><IconSparkleDiamond small /> occasion (hover for name)</span>
        <span className="flex items-center gap-1"><IconWarning size={13} className="text-amber-500" /> same-brand audience overlap risk</span>
        <span className="flex items-center gap-1"><IconSparkle size={13} className="text-purple-500" /> AI-created</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500 inline-block" /> live now</span>
      </div>
    </div>
  );
}

function IconSparkleDiamond({ small }) {
  return <span style={{ fontSize: small ? 12 : 14 }}>◆</span>;
}

function monthIdx(mon) {
  const map = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  return map[mon] || '01';
}
