import React from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import {
  IconOverview, IconCampaigns, IconCalendar, IconJourneys, IconCustomers,
  IconLibrary, IconAI, IconAnalytics, IconLeads, IconReports, IconClose,
} from './icons';

const NAV = [
  { to: '/overview', label: 'Overview', icon: IconOverview },
  { to: '/campaigns', label: 'Campaigns', icon: IconCampaigns },
  { to: '/calendar', label: 'Calendar', icon: IconCalendar },
  { to: '/journeys', label: 'Journeys', icon: IconJourneys },
  { to: '/customers', label: 'Customers', icon: IconCustomers },
  { to: '/library', label: 'Library', icon: IconLibrary },
  { to: '/campground', label: 'Campground', icon: IconAI, tag: 'AI' },
  { to: '/analytics', label: 'Analytics', icon: IconAnalytics },
  { to: '/leads', label: 'Leads', icon: IconLeads },
  { to: '/reports', label: 'Reports', icon: IconReports },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { path } = useRouter();
  const { account } = useAuth();

  const content = (
    <div className="h-full flex flex-col w-64 shrink-0 sidebar-panel px-4 py-5">
      <div className="flex items-center justify-between mb-6 px-1">
        <Link to="/overview" className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
            C
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-slate-900 dark:text-white text-[15px] leading-tight whitespace-nowrap">
              CampSyte <span className="text-orange-600">2.0</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Titan Campaign Cloud</p>
          </div>
        </Link>
        <button className="lg:hidden btn btn-ghost h-8 w-8 rounded-full" onClick={onCloseMobile}>
          <IconClose size={18} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
        {NAV.map((item) => {
          const active = path === item.to || path.startsWith(item.to + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <Icon size={19} />
              <span className="flex-1">{item.label}</span>
              {item.tag && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
                  {item.tag}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-4 py-3">
        <p className="flex items-center gap-1.5 text-xs font-bold text-green-700 dark:text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" /> All systems live
        </p>
        <p className="text-[11px] text-green-700/70 dark:text-green-400/70 mt-1 leading-snug">
          Karix · RLAI · Salesforce
          <br />
          (simulated)
        </p>
      </div>

      {account && (
        <div className="mt-3 px-1 text-[11px] text-slate-400 dark:text-slate-500">
          Signed in as <span className="font-semibold text-slate-500 dark:text-slate-400">{account.name}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block h-screen sticky top-0">{content}</div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="modal-backdrop" onClick={onCloseMobile} />
          <div className="relative animate-slide-in h-full" style={{ zIndex: 60 }}>{content}</div>
        </div>
      )}
    </>
  );
}
