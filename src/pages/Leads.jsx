import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';
import { exportToExcel, exportToPdf } from '../utils/exportTable';
import { BRANDS } from '../data/mockData';
import { IconDownload, IconPdf } from '../components/icons';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'CONVERTED'];

export default function Leads() {
  const { leads: allLeads, updateLeadStatus } = useData();
  const { brand } = useAuth();
  const leads = brand ? allLeads.filter((l) => l.brand === brand.key) : allLeads;

  const totalLeads = leads.length;
  const callback = leads.filter((l) => l.type === 'Callback').length;
  const storeVisit = leads.filter((l) => l.type === 'Store Visit').length;

  const columns = [
    { key: 'name', label: 'Customer' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'type', label: 'Lead Type',
      render: (r) => (
        <span className={`badge ${r.type === 'Callback' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' : r.type === 'Store Visit' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'}`}>
          {r.type}
        </span>
      ),
    },
    { key: 'collection', label: 'Collection' },
    {
      key: 'campaign', label: 'Campaign',
      render: (r) => <span className="text-xs font-bold" style={{ color: BRANDS[r.brand]?.color || '#0f172a' }}>{r.campaign}</span>,
    },
    {
      key: 'status', label: 'Status',
      render: (r) => (
        <select
          className="select"
          value={r.status}
          onChange={(e) => updateLeadStatus(r.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
    { key: 'created', label: 'Created' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Leads &amp; Follow-ups</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">People who clicked store-visit / callback / catalogue across campaigns</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary text-xs px-3.5 py-2" onClick={() => exportToExcel('leads', columns.filter(c => c.key !== 'status'), leads)}>
            <IconDownload size={15} /> Excel
          </button>
          <button className="btn btn-danger text-xs px-3.5 py-2" onClick={() => exportToPdf('leads', [...columns.filter(c => c.key !== 'status'), { key: 'status', label: 'Status' }], leads, 'Leads & Follow-ups')}>
            <IconPdf size={15} /> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard value={totalLeads} label="Total Leads" valueClassName="text-orange-600" />
        <StatCard value={callback} label="Callback" valueClassName="text-blue-600" />
        <StatCard value={storeVisit} label="Store Visit" valueClassName="text-green-600" />
      </div>

      <DataTable
        columns={columns}
        rows={leads}
        filename="leads"
        title="Leads & Follow-ups"
        searchPlaceholder="Search leads"
        searchKeys={['name', 'phone', 'type', 'status']}
        pageSize={10}
        hideToolbar
        rightSlot={null}
      />
    </div>
  );
}
