import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { ANALYTICS_PERFORMANCE, ACTIVITY_FEED, APPROVAL_AUDIT, BRANDS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/DataTable';
import { IconDot } from '../components/icons';

export default function Analytics() {
  const { campaigns } = useData();
  const withPerf = campaigns.filter((c) => ANALYTICS_PERFORMANCE[c.id]);
  const defaultCampaign = withPerf[0] || campaigns[0];
  const [campaignId, setCampaignId] = useState(defaultCampaign?.id);
  const [view, setView] = useState('performance');

  const campaign = campaigns.find((c) => c.id === campaignId) || defaultCampaign;
  const perf = campaign ? ANALYTICS_PERFORMANCE[campaign.id] : null;

  const channelColumns = [
    { key: 'channel', label: 'Channel' },
    { key: 'sent', label: 'Sent', render: (r) => r.sent.toLocaleString('en-IN') },
    { key: 'delivered', label: 'Delivered', render: (r) => r.delivered.toLocaleString('en-IN') },
    { key: 'read', label: 'Read', render: (r) => r.read.toLocaleString('en-IN') },
    { key: 'clicked', label: 'Clicked', render: (r) => r.clicked.toLocaleString('en-IN') },
    { key: 'cost', label: 'Cost', render: (r) => `₹${(r.cost / 1000).toFixed(1)}k` },
  ];

  const auditColumns = [
    { key: 'when', label: 'When' },
    { key: 'stage', label: 'Stage' },
    { key: 'decision', label: 'Decision', render: (r) => <StatusBadge status="Approved" /> },
    { key: 'actor', label: 'Actor' },
    { key: 'comment', label: 'Comment' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Analytics Engine</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Live via Karix webhooks (simulated) · streaming</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={campaignId} onChange={(e) => setCampaignId(e.target.value)}>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({BRANDS[c.brand]?.name || c.brand})</option>
            ))}
          </select>
          <div className="flex items-center gap-1 bg-white/60 dark:bg-white/5 rounded-full p-1">
            <button className={`tab-pill ${view === 'performance' ? 'active' : ''}`} onClick={() => setView('performance')}>Performance</button>
            <button className={`tab-pill ${view === 'audit' ? 'active' : ''}`} onClick={() => setView('audit')}>Operational / Audit</button>
          </div>
        </div>
      </div>

      {view === 'performance' ? (
        !perf ? (
          <div className="glass card p-14 text-center text-sm text-slate-400">
            No live performance data for this campaign yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-5">
              <Stat value={perf.sent.toLocaleString('en-IN')} label="Messages Sent" color="text-blue-600" />
              <Stat value={`${perf.deliveryRate}%`} label="Delivery Rate" color="text-cyan-600" />
              <Stat value={`${perf.openRate}%`} label="Open Rate" color="text-purple-600" />
              <Stat value={`${perf.clickRate}%`} label="Click Rate" color="text-fuchsia-600" />
              <Stat value={perf.callbacks.toLocaleString('en-IN')} label="Callback Requests" color="text-slate-800 dark:text-white" />
              <Stat value={perf.storeVisits.toLocaleString('en-IN')} label="Store Visit Requests" color="text-slate-800 dark:text-white" />
              <Stat value={perf.catalogueViews.toLocaleString('en-IN')} label="Catalogue Views" color="text-slate-800 dark:text-white" />
              <Stat value={`₹${(perf.spend / 1000).toFixed(1)}k`} label="Spend" color="text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="glass card p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-4">Per-channel breakdown</p>
                <div className="table-wrap">
                  <table>
                    <thead className="table-head">
                      <tr>{channelColumns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
                    </thead>
                    <tbody>
                      {perf.channelBreakdown.map((row) => (
                        <tr key={row.channel} className="table-row">
                          {channelColumns.map((c) => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass card p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-green-500 inline-block"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  /> Activity feed · LIVE
                </p>
                <div className="flex flex-col divide-y max-h-[19rem] overflow-y-auto scrollbar-thin">
                  {ACTIVITY_FEED.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center justify-between py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <span className="badge bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 text-[10px]">{a.type}</span>
                        <span className="text-slate-700 dark:text-slate-200">{a.text}</span>
                      </span>
                      <span className="text-[11px] text-slate-400 shrink-0">just now</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div>
          <div className="glass card p-5 mb-2">
            <p className="font-bold text-slate-900 dark:text-white mb-1">Who approved what, when</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Cross-campaign approvals trail — the operational layer of analytics.</p>
          </div>
          <DataTable
            columns={auditColumns}
            rows={APPROVAL_AUDIT}
            filename="approval-audit"
            title="Operational / Audit trail"
            searchPlaceholder="Search by actor or stage"
            searchKeys={['actor', 'stage', 'decision']}
            hideToolbar={false}
          />
        </div>
      )}
    </div>
  );
}

function Stat({ value, label, color }) {
  return (
    <div className="glass card p-4">
      <p className={`text-xl font-extrabold ${color}`}>{value}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}
