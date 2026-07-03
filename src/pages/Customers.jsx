import React from 'react';
import { useCopilot } from '../context/CopilotContext';
import { useAuth } from '../context/AuthContext';
import { SEGMENTS, CUSTOMERS } from '../data/mockData';
import DataTable from '../components/DataTable';
import { IconSparkle } from '../components/icons';

export default function Customers() {
  const { openWith } = useCopilot();
  const { brand } = useAuth();

  const draftFromSegment = (seg) => {
    openWith(
      `draft a campaign for the NBA segment "${seg.name}" (${seg.count.toLocaleString('en-IN')} customers, predicted CTR ${seg.ctr}%)`,
      {
        agentTag: 'AUDIENCE AGENT · NBA',
        title: `Next-best-action segments for ${brand ? brand.name : 'this brand'}`,
        text: `(assembled from per-customer buy/churn/channel/send-hour scores — see the Customers screen for the underlying profiles):\n\n${seg.name} — ${seg.count.toLocaleString('en-IN')} customers · ${seg.pref} preferred · best send ${seg.bestHour}\nSuggested play: ${seg.tag}`,
      }
    );
  };

  const columns = [
    { key: 'name', label: 'Customer', value: (r) => r.name, render: (r) => (
      <div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{r.name}</p>
        <p className="text-[11px] text-slate-400">{r.phone}</p>
      </div>
    ) },
    { key: 'state', label: 'State' },
    { key: 'band', label: 'Band', render: (r) => (
      <span className={`badge ${r.band === 'Premium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : r.band === 'Gold' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>
        {r.band}
      </span>
    ) },
    { key: 'buyPropensity', label: 'Buy Propensity', render: (r) => (
      <div className="flex items-center gap-2 min-w-[110px]">
        <div className="progress-track w-16"><div className="progress-fill bg-green-500" style={{ width: `${r.buyPropensity}%` }} /></div>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{r.buyPropensity}</span>
      </div>
    ) },
    { key: 'churnRisk', label: 'Churn Risk', render: (r) => (
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="progress-track w-16"><div className={`progress-fill ${r.churnRisk > 70 ? 'bg-red-500' : r.churnRisk > 40 ? 'bg-amber-500' : 'bg-slate-300'}`} style={{ width: `${r.churnRisk}%` }} /></div>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{r.churnRisk}</span>
      </div>
    ) },
    { key: 'channel', label: 'Channel' },
    { key: 'bestHour', label: 'Best Hour' },
    { key: 'ltv', label: 'LTV', value: (r) => r.ltv, render: (r) => `₹${r.ltv}.0k` },
    { key: 'lastPurchase', label: 'Last Purchase', value: (r) => r.lastPurchase, render: (r) => `${r.lastPurchase}d ago` },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
        Customers
        <span className="badge bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">PROPENSITY AI</span>
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
        56,400 customers (showing 1,200 representative profiles) · scores refresh nightly from CRM + click signals (simulated)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {SEGMENTS.map((seg) => (
          <div key={seg.id} className="glass card p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-slate-900 dark:text-white">{seg.name}</p>
              <span className="badge bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 shrink-0">{seg.ctr}% pred. CTR</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{seg.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-slate-500">
                <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{seg.count.toLocaleString('en-IN')}</span>{' '}
                {seg.pref} pref. · best {seg.bestHour}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{seg.tag}</p>
            <button className="btn btn-primary text-xs px-4 py-2 mt-3 w-full" onClick={() => draftFromSegment(seg)}>
              <IconSparkle size={13} /> Draft campaign
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">All customers · top 60 by buy propensity</p>
      <DataTable
        columns={columns}
        rows={CUSTOMERS}
        filename="customers"
        title="Customers"
        searchPlaceholder="Search customers"
        searchKeys={['name', 'phone', 'state', 'channel']}
        pageSize={10}
      />
    </div>
  );
}
