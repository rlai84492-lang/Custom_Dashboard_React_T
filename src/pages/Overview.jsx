import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { useCopilot } from '../context/CopilotContext';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { PREDICTIVE_INSIGHTS } from '../data/mockData';
import { IconSparkle, IconFlag } from '../components/icons';

const PIPELINE_STYLE = {
  'Base: With Data Team': { bar: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-300' },
  Overdue: { bar: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-300' },
  'In Progress': { bar: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-300' },
  Completed: { bar: 'bg-green-500', text: 'text-green-600 dark:text-green-300' },
  Cancelled: { bar: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
};

export default function Overview() {
  const { campaigns } = useData();
  const { brand } = useAuth();
  const { navigate } = useRouter();
  const { openWith } = useCopilot();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const brandCampaigns = useMemo(
    () => campaigns.filter((c) => c.brand === (brand ? brand.key : c.brand)),
    [campaigns, brand]
  );

  const stats = useMemo(() => {
    const sms = { delivered: 109431, cost: 19700 };
    const wa = { delivered: 109431, cost: 54700 };
    const rcs = { delivered: 39880, cost: 8200 };
    const em = { delivered: 45210, cost: 5500 };
    return { sms, wa, rcs, em, campaigns: brandCampaigns.length, segments: 12 };
  }, [brandCampaigns]);

  const pipeline = useMemo(() => {
    const counts = { 'Base: With Data Team': 0, Overdue: 0, 'In Progress': 0, Completed: 0, Cancelled: 0 };
    brandCampaigns.forEach((c) => {
      if (c.status === 'Base: With Data Team') counts['Base: With Data Team'] += 1;
      else if (c.status === 'Overdue') counts.Overdue += 1;
      else if (c.status === 'Draft' || c.status === 'Base Approved') counts['In Progress'] += 1;
      else if (c.status === 'Completed') counts.Completed += 1;
      else if (c.status === 'Cancelled') counts.Cancelled += 1;
    });
    return counts;
  }, [brandCampaigns]);

  const maxPipeline = Math.max(1, ...Object.values(pipeline));

  const priority = useMemo(
    () =>
      brandCampaigns
        .filter((c) => c.status === 'Overdue' || c.status === 'Base: With Data Team')
        .sort((a, b) => new Date(b.deployDate) - new Date(a.deployDate))
        .slice(0, 7),
    [brandCampaigns]
  );

  const liveNow = brandCampaigns.filter((c) => c.status === 'Base Approved' && c.delivered);
  const insight = PREDICTIVE_INSIGHTS[0];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {brand ? brand.name : 'All brands'} · Showing: trailing 3 months (01 Apr – today)
          </p>
        </div>
      </div>

      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="glass card p-4 mb-5 flex items-center gap-4 border border-purple-200/60 dark:border-purple-500/20"
          >
            <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white shrink-0">
              <IconSparkle size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-purple-600 dark:text-purple-300">
                Recommendation Agent · {insight.kind === 'ANOMALY' ? 'anomaly' : 'idea'}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200 truncate">
                <span className="font-semibold">{insight.title}</span> — {insight.body}
              </p>
            </div>
            <button
              className="btn btn-primary text-xs px-4 py-2 shrink-0"
              onClick={() => openWith('Draft a campaign from the Recommendation Agent idea', {
                agentTag: 'RECOMMENDATION AGENT',
                title: insight.title,
                text: insight.body,
              })}
            >
              Create draft
            </button>
            <button className="btn btn-secondary text-xs px-4 py-2 shrink-0" onClick={() => setBannerDismissed(true)}>
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-5">
        <StatCard value={stats.campaigns} label="Campaigns" />
        <StatCard value={stats.segments} label="Segments" />
        <StatCard value={`${(stats.sms.delivered).toLocaleString('en-IN')} · ₹${(stats.sms.cost/1000).toFixed(1)}k`} label="SMS delivered · cost" valueClassName="text-orange-600" />
        <StatCard value={`${(stats.wa.delivered).toLocaleString('en-IN')} · ₹${(stats.wa.cost/1000).toFixed(1)}k`} label="WhatsApp delivered · cost" valueClassName="text-green-600" />
        <StatCard value={`${(stats.rcs.delivered).toLocaleString('en-IN')} · ₹${(stats.rcs.cost/1000).toFixed(1)}k`} label="RCS delivered · cost" valueClassName="text-blue-600" />
        <StatCard value={`${(stats.em.delivered).toLocaleString('en-IN')} · ₹${(stats.em.cost/1000).toFixed(1)}k`} label="Email delivered · cost" valueClassName="text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass card p-5">
          <p className="font-bold text-slate-900 dark:text-white mb-4">Pipeline by status</p>
          <div className="flex flex-col gap-4">
            {Object.entries(pipeline).map(([label, count], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>{label}</span>
                  <span className={`font-bold ${PIPELINE_STYLE[label]?.text || 'text-slate-700 dark:text-slate-200'}`}>{count}</span>
                </div>
                <div className="progress-track">
                  <motion.div
                    className={`progress-fill ${PIPELINE_STYLE[label]?.bar || 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxPipeline) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass card p-5">
          <p className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
            <IconFlag size={16} className="text-orange-500" /> Priority — next 7 days / ongoing
          </p>
          {priority.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Nothing overdue or waiting on data right now.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {priority.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ x: 2 }}
                  onClick={() => navigate(`/campaigns/${c.id}`)}
                  className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 hover:bg-orange-50 dark:hover:bg-white/5 focus-visible:bg-orange-50 dark:focus-visible:bg-white/5 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <IconFlag size={14} className="text-orange-400 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{c.name}</span>
                      <span className="block text-[11px] text-slate-400">{brand ? brand.name : 'Titan Watches'} · {formatDate(c.deployDate)}</span>
                    </span>
                  </span>
                  <StatusBadge status={c.status} className="shrink-0" />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="glass card p-5 flex flex-col">
          <p className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
            <motion.span
              className="h-2 w-2 rounded-full bg-green-500 inline-block"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            /> Live now
          </p>
          {liveNow.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No campaigns deploying right now.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {liveNow.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="rounded-xl px-3 py-2.5 bg-green-50 dark:bg-green-500/10"
                >
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.name}</p>
                  <p className="text-[11px] text-green-700/70 dark:text-green-400/70 mt-0.5">{c.delivered.toLocaleString('en-IN')} delivered so far</p>
                </motion.div>
              ))}
            </div>
          )}
          <motion.button
            onClick={() => navigate('/campground')}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="mt-auto rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-500/10 dark:to-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-bold py-3 text-center hover:opacity-90 transition-opacity"
          >
            <IconSparkle size={15} className="inline mr-1.5 -mt-0.5" /> Open Campground — plan the next one
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  } catch (e) {
    return iso;
  }
}
