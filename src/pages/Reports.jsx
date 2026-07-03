import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { APPROVAL_AUDIT, BRANDS } from '../data/mockData';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

export default function Reports() {
  const { campaigns: allCampaigns } = useData();
  const { brand } = useAuth();
  const campaigns = brand ? allCampaigns.filter((c) => c.brand === brand.key) : allCampaigns;

  const stats = useMemo(() => {
    const inProgress = campaigns.filter((c) => c.status === 'Draft' || c.status === 'Base Approved').length;
    const completed = campaigns.filter((c) => c.status === 'Completed').length;
    const overdue = campaigns.filter((c) => c.status === 'Overdue').length;
    const delivered = campaigns.reduce((sum, c) => sum + (c.delivered || 0), 0);
    const spend = 79900;
    return { count: campaigns.length, delivered, spend, inProgress, completed, overdue };
  }, [campaigns]);

  const eventsByCampaign = { 'Wedding Season Silk Edit': 4, "Mother's Day Capsule": 1, 'Onam Kasavu Collection': 1 };

  const rows = campaigns.map((c) => ({
    campaign: c.name,
    brand: BRANDS[c.brand]?.name || c.brand,
    events: eventsByCampaign[c.name] || 0,
    created: c.createdOn,
  }));

  const columns = [
    { key: 'campaign', label: 'Campaign', render: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.campaign}</span> },
    { key: 'brand', label: 'Brand' },
    { key: 'events', label: 'Approval Events', render: (r) => <span className="font-semibold">{r.events}</span> },
    { key: 'created', label: 'Created' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Reports</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">Operational summaries · export full data from Campaigns and Leads</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard value={stats.count} label="Campaigns (visible scope)" />
        <StatCard value={stats.delivered.toLocaleString('en-IN')} label="Messages delivered" />
        <StatCard value={`₹${(stats.spend / 1000).toFixed(1)}k`} label="Total spend" valueClassName="text-orange-600" />
        <StatCard value={`${stats.inProgress} / ${stats.completed} / ${stats.overdue}`} label="In progress / Completed / Overdue" />
      </div>

      <div className="glass card p-5 mb-2">
        <p className="font-bold text-slate-900 dark:text-white">Approval activity by campaign</p>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        filename="reports-approval-activity"
        title="Approval activity by campaign"
        searchPlaceholder="Search by campaign"
        searchKeys={['campaign', 'brand']}
      />
    </div>
  );
}
