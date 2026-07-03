import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import ChannelChips from '../components/ChannelChips';
import DataTable from '../components/DataTable';
import CreateCampaignModal from '../components/CreateCampaignModal';
import { BRANDS } from '../data/mockData';
import { IconAdd, IconFlag, IconSparkle, IconMore } from '../components/icons';

const TABS = ['All', 'In Progress', 'Completed', 'Overdue', 'Cancelled'];

export default function Campaigns() {
  const { campaigns } = useData();
  const { brand } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState('All');
  const [createOpen, setCreateOpen] = useState(false);

  const brandCampaigns = useMemo(
    () => campaigns.filter((c) => c.brand === (brand ? brand.key : c.brand)),
    [campaigns, brand]
  );

  const tabbed = useMemo(() => {
    if (tab === 'All') return brandCampaigns;
    if (tab === 'In Progress') return brandCampaigns.filter((c) => c.status === 'Draft' || c.status === 'Base Approved');
    return brandCampaigns.filter((c) => c.status === tab);
  }, [brandCampaigns, tab]);

  const columns = [
    {
      key: 'name', label: 'Campaign', value: (r) => r.name,
      render: (r) => (
        <div className="flex items-start gap-2 min-w-[240px]">
          {r.flagged && <IconFlag size={14} className="text-orange-500 mt-1 shrink-0" />}
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{r.name}</p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 whitespace-nowrap">
              {r.aiAssisted && <span className="inline-flex items-center gap-0.5 text-purple-500 whitespace-nowrap"><IconSparkle size={11} /> AI-assisted ·</span>}
              created {r.createdOn}
            </p>
          </div>
        </div>
      ),
    },
    { key: 'brand', label: 'Brand', value: (r) => BRANDS[r.brand]?.name || r.brand, render: (r) => <span className="text-xs font-bold" style={{ color: BRANDS[r.brand]?.color || '#0f172a' }}>{(BRANDS[r.brand]?.short || r.brand).toUpperCase()}</span> },
    { key: 'owner', label: 'Owner', value: (r) => r.owner },
    {
      key: 'type', label: 'Type', value: (r) => r.type,
      render: (r) => (
        <span className="flex items-center gap-1.5">
          <span className={`badge ${r.tier === 'MAJOR' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300'}`}>{r.tier}</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">{r.type}</span>
        </span>
      ),
    },
    { key: 'channels', label: 'Channels', value: (r) => r.channels.join(', '), render: (r) => <ChannelChips channels={r.channels} /> },
    { key: 'base', label: 'Base', value: (r) => r.base ?? '—', render: (r) => (r.base ? r.base.toLocaleString('en-IN') : '—') },
    { key: 'delivered', label: 'Delivered', value: (r) => r.delivered ?? '—', render: (r) => (r.delivered ? r.delivered.toLocaleString('en-IN') : '—') },
    { key: 'deployDate', label: 'Deploy Date', value: (r) => r.deployDate, render: (r) => formatDate(r.deployDate) },
    { key: 'status', label: 'Status', value: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: () => <IconMore size={18} className="text-slate-400" /> },
  ];

  const stats = { campaigns: brandCampaigns.length, segments: 12, sms: { d: 109431, c: 19700 }, wa: { d: 109431, c: 54700 }, rcs: { d: 39880, c: 8200 }, em: { d: 45210, c: 5500 } };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Campaigns</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Hover a row and press Enter to open · default view: trailing 3 months</p>
        </div>
        <button className="btn btn-primary px-5 py-2.5 text-sm" onClick={() => setCreateOpen(true)}>
          <IconAdd size={17} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-5">
        <StatCard value={stats.campaigns} label="Campaigns" />
        <StatCard value={stats.segments} label="Segments" />
        <StatCard value={`${stats.sms.d.toLocaleString('en-IN')} · ₹${(stats.sms.c/1000).toFixed(1)}k`} label="SMS delivered · cost" valueClassName="text-orange-600" />
        <StatCard value={`${stats.wa.d.toLocaleString('en-IN')} · ₹${(stats.wa.c/1000).toFixed(1)}k`} label="WhatsApp delivered · cost" valueClassName="text-green-600" />
        <StatCard value={`${stats.rcs.d} · ₹${stats.rcs.c}`} label="RCS delivered · cost" valueClassName="text-blue-600" />
        <StatCard value={`${stats.em.d.toLocaleString('en-IN')} · ₹${(stats.em.c/1000).toFixed(1)}k`} label="Email delivered · cost" valueClassName="text-indigo-600" />
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-none">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`tab-pill shrink-0 ${tab === t ? 'active' : ''}`}>
            {t}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={tabbed}
        filename="campaigns"
        title="Campaigns"
        searchPlaceholder="Search by campaign name"
        searchKeys={['name', 'owner', 'type', 'status']}
        onRowClick={(row) => navigate(`/campaigns/${row.id}`)}
        emptyMessage="No campaigns in this view."
      />

      {createOpen && <CreateCampaignModal onClose={() => setCreateOpen(false)} />}
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}
