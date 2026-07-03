import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import StatusBadge from '../components/StatusBadge';
import ChannelChips from '../components/ChannelChips';
import {
  CAMPAIGN_DETAIL_TABS, AUDIT_TRAIL, SEGMENTS, BRANDS, ANALYTICS_PERFORMANCE, APPROVAL_AUDIT,
  BASE_COUNT_ROWS, BASE_COUNT_COMMENTS, CREATIVE_COPY_IDEAS, DEPLOYMENT_CHECKLIST_TEMPLATE,
} from '../data/mockData';
import {
  IconArrowLeft, IconCheck, IconWarning, IconSparkle, IconAdd, IconSend, IconMagic,
  IconPhone, IconVerified, IconRocket, IconWhatsapp, IconSms, IconEmail, IconRcs,
  IconRadioUnchecked, IconErrorOutline, IconHourglass,
} from '../components/icons';

const STEPS = [
  { n: 1, label: 'Create' },
  { n: 2, label: 'Base Count' },
  { n: 3, label: 'Creative' },
  { n: 4, label: 'Whitelisting' },
  { n: 5, label: 'Deployment' },
  { n: 6, label: 'Performance' },
];

// How far along the approval pipeline a campaign's status implies. Used to
// derive per-stage checklist state across Approvals + Deployment tabs.
const STAGE_LEVEL = { Draft: 0, 'Base: With Data Team': 0, 'Base Approved': 2, Overdue: 2, Completed: 5, Cancelled: -1 };

export default function CampaignDetail({ id }) {
  const { getCampaign, cancelCampaign } = useData();
  const { navigate } = useRouter();
  const [tab, setTab] = useState('details');
  const campaign = getCampaign(id);

  if (!campaign) {
    return (
      <div className="glass card p-10 text-center">
        <p className="text-slate-500 text-sm mb-3">Campaign not found.</p>
        <button className="btn btn-secondary px-4 py-2 text-sm" onClick={() => navigate('/campaigns')}>Back to Campaigns</button>
      </div>
    );
  }

  const brandMeta = BRANDS[campaign.brand];
  const activeMeta = CAMPAIGN_DETAIL_TABS.find((t) => t.key === tab);
  const activeStep = activeMeta ? activeMeta.step : 1;

  return (
    <div>
      <button
        onClick={() => navigate('/campaigns')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-600 mb-3"
      >
        <IconArrowLeft size={15} /> Campaigns / {campaign.name}
      </button>

      <div className="glass card p-6 mb-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{campaign.name}</h1>
            <StatusBadge status={campaign.status} />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {Object.values(campaign.ids || {}).map((cid) => (
              <span key={cid} className="kbd">{cid}</span>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Created {campaign.createdOn} · Owner {campaign.owner} · Shelf {campaign.shelfStart}–{campaign.shelfEnd}{' '}
            <button className="link-btn ml-1">Details &amp; remarks ↗</button>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-lg font-extrabold" style={{ color: brandMeta?.color || '#0f172a' }}>{(brandMeta?.name || campaign.brand || '').toUpperCase()}</span>
          {campaign.status !== 'Cancelled' && campaign.status !== 'Completed' && (
            <button
              className="btn btn-danger px-4 py-2 text-xs"
              onClick={() => { cancelCampaign(campaign.id); }}
            >
              Cancel Campaign
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className={`rounded-2xl px-3 py-2.5 text-center text-xs font-bold border ${
              activeStep === s.n
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white border-transparent shadow-md'
                : 'glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
            }`}
          >
            {s.n} · {s.label}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 border-b border-slate-200/70 dark:border-white/10 mb-5 overflow-x-auto scrollbar-none">
        {CAMPAIGN_DETAIL_TABS.map((t) => (
          <button key={t.key} className={`subtab shrink-0 ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'details' && <DetailsTab campaign={campaign} brandMeta={brandMeta} />}
          {tab === 'basecount' && <BaseCountTab campaign={campaign} />}
          {tab === 'segments' && <SegmentsTab campaign={campaign} />}
          {tab === 'creative' && <CreativeTab campaign={campaign} />}
          {tab === 'approvals' && <ApprovalsTab campaign={campaign} />}
          {tab === 'whitelisting' && <WhitelistingTab campaign={campaign} brandMeta={brandMeta} />}
          {tab === 'deployment' && <DeploymentTab campaign={campaign} />}
          {tab === 'performance' && <PerformanceTab campaign={campaign} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Panel({ children, className = '' }) {
  return <div className={`glass card p-6 ${className}`}>{children}</div>;
}

function Field({ label, children }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{children}</div>
    </div>
  );
}

function DetailsTab({ campaign, brandMeta }) {
  const trail = AUDIT_TRAIL[campaign.id] || [{ actor: 'Titan Admin', action: `Created — ${campaign.name}`, time: campaign.createdOn }];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Panel className="lg:col-span-2">
        <p className="font-bold text-slate-900 dark:text-white mb-5">Creation fields</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Campaign name">{campaign.name}</Field>
          <Field label="Brand">{brandMeta?.name || campaign.brand}</Field>
          <Field label="Type">{campaign.type} ({campaign.tier})</Field>
          <Field label="Owner">{campaign.owner}</Field>
          <Field label="Modes of deployment"><ChannelChips channels={campaign.channels} /></Field>
          <Field label="Deployment date">{campaign.deployDate}</Field>
          <Field label="Campaign IDs (auto-generated per channel)">
            <div className="flex flex-wrap gap-1.5 mt-1">
              {Object.values(campaign.ids || {}).map((cid) => <span key={cid} className="kbd">{cid}</span>)}
            </div>
          </Field>
          <Field label="Remarks">{campaign.remarks || '—'}</Field>
        </div>
      </Panel>
      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Audit trail</p>
        <div className="flex flex-col gap-4">
          {trail.map((t, i) => (
            <div key={i} className="flex gap-3">
              <span className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {t.actor} · {t.action}
                </p>
                <p className="text-[11px] text-slate-400">{t.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Base Count — spreadsheet-linked TG base table + comments thread
// ---------------------------------------------------------------------------
const BASE_SHEETS = ['TG Base', 'Suppression List', 'DND Scrub'];

function BaseCountTab({ campaign }) {
  const [sheet, setSheet] = useState('TG Base');
  const [comments, setComments] = useState(BASE_COUNT_COMMENTS);
  const [draft, setDraft] = useState('');
  const approved = campaign.status === 'Base Approved' || campaign.status === 'Completed' || campaign.status === 'Overdue';
  const withDataTeam = campaign.status === 'Base: With Data Team';

  const rows = sheet === 'TG Base' ? BASE_COUNT_ROWS : BASE_COUNT_ROWS.slice(0, 3).map((r) => ({ ...r, status: sheet === 'DND Scrub' ? 'approved' : 'pending' }));

  const postComment = () => {
    if (!draft.trim()) return;
    setComments((prev) => [...prev, { author: 'You', text: draft.trim(), time: 'just now' }]);
    setDraft('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <Panel>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <p className="font-bold text-slate-900 dark:text-white">Base count</p>
            {approved ? (
              <StatusBadge status="Approved" />
            ) : withDataTeam ? (
              <StatusBadge status="Base: With Data Team" />
            ) : (
              <StatusBadge status="Pending" />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{campaign.base ? campaign.base.toLocaleString('en-IN') : '—'}</p>
              <p className="text-xs text-slate-500 mt-1">Total base uploaded</p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{campaign.base ? Math.round(campaign.base * 0.94).toLocaleString('en-IN') : '—'}</p>
              <p className="text-xs text-slate-500 mt-1">Contactable after frequency caps</p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{approved ? 'DND-scrubbed' : 'In progress'}</p>
              <p className="text-xs text-slate-500 mt-1">Compliance check</p>
            </div>
          </div>
          {!approved && !withDataTeam && (
            <button className="btn btn-primary mt-5 px-5 py-2.5 text-sm">Submit for base count approval</button>
          )}
        </Panel>

        <div className="glass card overflow-hidden">
          <div className="px-5 pt-5">
            <p className="font-bold text-slate-900 dark:text-white mb-1">Base Count Template</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Linked spreadsheet · synced from the Data Team workspace</p>
            <div className="flex items-center gap-1.5">
              {BASE_SHEETS.map((s) => (
                <button key={s} className={`sheet-tab ${sheet === s ? 'active' : ''}`} onClick={() => setSheet(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead className="table-head">
                <tr><th>TG Base</th><th>State</th><th>Gender</th><th>Band</th><th>RCS</th><th>Count</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="table-row">
                    <td className="font-semibold">{r.tg}</td>
                    <td>{r.state}</td>
                    <td>{r.gender}</td>
                    <td>{r.band}</td>
                    <td>{r.rcs}</td>
                    <td>{r.count.toLocaleString('en-IN')}</td>
                    <td><StatusBadge status={r.status === 'approved' ? 'Approved' : r.status === 'flagged' ? 'Flagged' : 'Pending'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </div>
      </div>

      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Comments — base count</p>
        <div className="flex flex-col gap-3 max-h-[19rem] overflow-y-auto scrollbar-thin pr-1">
          {comments.map((c, i) => (
            <div key={i} className="rounded-2xl bg-slate-50 dark:bg-white/5 p-3">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{c.author}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{c.text}</p>
              <p className="text-[10px] text-slate-400 mt-1.5">{c.time}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            className="input flex-1"
            placeholder="@mention a teammate…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && postComment()}
          />
          <button className="btn btn-primary h-10 w-10 rounded-full shrink-0" onClick={postComment} aria-label="Post comment">
            <IconSend size={15} />
          </button>
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Segments — auto-generated segment cards
// ---------------------------------------------------------------------------
function SegmentsTab({ campaign }) {
  const [shown, setShown] = useState(3);
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const visible = SEGMENTS.slice(0, shown);

  return (
    <Panel>
      <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">Segments used</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Auto-generated from the approved base count using buy-propensity, churn-risk, channel preference and best-send-hour scores — no manual segmentation needed.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {visible.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 dark:border-white/10 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Segment {letters[i]} · {s.name}</p>
              <span className="text-xs font-extrabold text-green-600">{s.ctr}% pred. CTR</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
            <div className="flex items-center flex-wrap gap-1.5 mt-2.5">
              <span className="chip bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">{s.pref} preferred</span>
              <span className="chip bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">best {s.bestHour}</span>
              <span className="chip bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">{s.tag}</span>
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2.5">{s.count.toLocaleString('en-IN')} customers</p>
          </motion.div>
        ))}
        {shown < SEGMENTS.length && (
          <button
            onClick={() => setShown((v) => Math.min(SEGMENTS.length, v + 1))}
            className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/15 p-4 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-orange-600 hover:border-orange-300 transition-colors min-h-[8rem]"
          >
            <IconAdd size={20} /> <span className="text-xs font-bold">Add Segment</span>
          </button>
        )}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------------------
// Creative — RCS/personalization toggle, AI copy ideas, live preview
// ---------------------------------------------------------------------------
const CHANNEL_ICON = { SMS: IconSms, WA: IconWhatsapp, RCS: IconRcs, EM: IconEmail };

function CreativeTab({ campaign }) {
  const [channel, setChannel] = useState(campaign.channels[0] || 'WA');
  const [personalized, setPersonalized] = useState(true);
  const [copy, setCopy] = useState('A celebration this special deserves something timeless. Enjoy up to 20% off this week.');
  const [ideaIdx, setIdeaIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [guardian, setGuardian] = useState(null);

  const nextIdea = () => {
    const idea = CREATIVE_COPY_IDEAS[ideaIdx % CREATIVE_COPY_IDEAS.length];
    setCopy(idea);
    setIdeaIdx((v) => v + 1);
    setSaved(false);
  };

  const runGuardian = () => {
    setGuardian('checking');
    setTimeout(() => setGuardian('pass'), 700);
  };

  const previewText = personalized ? copy.replace(/\byou\b/i, 'Anita') : copy;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <Panel>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="font-bold text-slate-900 dark:text-white">Creative</p>
            <div className="flex items-center gap-1 bg-white/60 dark:bg-white/5 rounded-full p-1">
              <button
                className={`tab-pill ${personalized ? '' : 'active'}`}
                onClick={() => setPersonalized(false)}
              >
                Static
              </button>
              <button
                className={`tab-pill ${personalized ? 'active' : ''}`}
                onClick={() => setPersonalized(true)}
              >
                Personalized
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {campaign.channels.map((ch) => {
              const Icon = CHANNEL_ICON[ch] || IconRcs;
              return (
                <button
                  key={ch}
                  onClick={() => setChannel(ch)}
                  className={`chip ${channel === ch ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}
                >
                  <Icon size={13} /> {ch}
                </button>
              );
            })}
          </div>

          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Message copy</label>
          <textarea
            className="input rounded-2xl"
            rows={4}
            maxLength={320}
            value={copy}
            onChange={(e) => { setCopy(e.target.value); setSaved(false); }}
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-slate-400">{copy.length} / 320 characters</span>
            <button className="btn btn-secondary text-xs px-3.5 py-2" onClick={nextIdea}>
              <IconMagic size={14} /> AI copy ideas
            </button>
          </div>

          {saved && <p className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 rounded-xl px-3 py-2 mt-4">Creative saved.</p>}
          {guardian === 'checking' && <p className="text-xs text-slate-500 bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2 mt-4">Brand Guardian is reviewing tone, compliance and prohibited claims…</p>}
          {guardian === 'pass' && (
            <p className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 rounded-xl px-3 py-2 mt-4 flex items-center gap-1.5">
              <IconVerified size={14} /> Brand Guardian: no prohibited claims found · tone matches brand voice.
            </p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button className="btn btn-primary px-5 py-2.5 text-sm" onClick={() => setSaved(true)}>Save creative</button>
            <button className="btn btn-secondary px-5 py-2.5 text-sm" onClick={runGuardian}>
              <IconVerified size={15} /> Run Brand Guardian
            </button>
          </div>
        </Panel>
      </div>

      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
          <IconPhone size={16} /> Live preview
        </p>
        <div className="phone-mock">
          <div className="phone-mock__screen p-3 flex flex-col gap-2">
            <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-3 self-start max-w-[90%]">
              <p className="text-[10px] font-extrabold text-slate-400 mb-1">{channel} · Titan Watches</p>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">{previewText || 'Your message preview will appear here…'}</p>
              {channel === 'RCS' && (
                <button className="btn btn-primary text-[10px] px-2.5 py-1.5 mt-2 w-full">CLAIM YOUR GIFT →</button>
              )}
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 text-center mt-3">
          {personalized ? 'Personalized preview — merge fields resolved for a sample customer.' : 'Static preview — no merge fields applied.'}
        </p>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Approvals — stage checklist + Finalize & send
// ---------------------------------------------------------------------------
const APPROVAL_STAGES = ['Base Count', 'Creative', 'Finalize & send', 'Whitelisting', 'Pre-deploy'];

function stageState(campaign, idx) {
  if (campaign.status === 'Cancelled') return 'cancelled';
  const level = STAGE_LEVEL[campaign.status] ?? 0;
  if (idx < level) return 'approved';
  if (idx === level) return 'pending';
  return 'locked';
}

function ApprovalsTab({ campaign }) {
  const [finalized, setFinalized] = useState(campaign.status === 'Completed');
  const finalizeIdx = APPROVAL_STAGES.indexOf('Finalize & send');
  const canFinalize = stageState(campaign, finalizeIdx) === 'pending' || stageState(campaign, finalizeIdx) === 'approved';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Panel className="lg:col-span-2">
        <p className="font-bold text-slate-900 dark:text-white mb-4">Approval checklist</p>
        <div className="flex flex-col gap-2.5">
          {APPROVAL_STAGES.map((stage, i) => {
            const state = stage === 'Finalize & send' && finalized ? 'approved' : stageState(campaign, i);
            const Icon = state === 'approved' ? IconCheck : state === 'pending' ? IconHourglass : state === 'cancelled' ? IconErrorOutline : IconRadioUnchecked;
            return (
              <div key={stage} className={`checklist-row ${state === 'approved' ? 'is-done' : state === 'cancelled' ? 'is-fail' : ''}`}>
                <Icon size={18} className={state === 'approved' ? 'text-green-600' : state === 'pending' ? 'text-amber-500' : state === 'cancelled' ? 'text-red-500' : 'text-slate-300 dark:text-slate-600'} />
                <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{stage}</span>
                <StatusBadge status={state === 'approved' ? 'Approved' : state === 'pending' ? 'Pending' : state === 'cancelled' ? 'Cancelled' : 'Draft'} />
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary mt-5 px-5 py-2.5 text-sm disabled:opacity-50"
          disabled={!canFinalize || finalized || campaign.status === 'Cancelled'}
          onClick={() => setFinalized(true)}
        >
          <IconSend size={15} /> Finalize &amp; send
        </button>
        {finalized && (
          <p className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 rounded-xl px-3 py-2 mt-3">
            Finalized — routed to Whitelisting, then Deployment.
          </p>
        )}
      </Panel>

      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Recent approval trail</p>
        <div className="flex flex-col gap-3">
          {APPROVAL_AUDIT.slice(0, 5).map((a, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{a.stage} · {a.actor}</p>
                <p className="text-[11px] text-slate-400">{a.when}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Whitelisting — submission payload + Customer Centria / BSP status
// ---------------------------------------------------------------------------
function WhitelistingTab({ campaign, brandMeta }) {
  const [submitted, setSubmitted] = useState(campaign.status === 'Completed');
  const rows = [
    { entity: `Karix WA Business number — ${brandMeta?.name || campaign.brand}`, status: 'Whitelisted' },
    { entity: `RCS agent — ${brandMeta?.name || campaign.brand}`, status: campaign.channels.includes('RCS') ? 'Whitelisted' : 'Not applicable' },
    { entity: `Sender ID — ${(brandMeta?.short || campaign.brand || '').toUpperCase()}`, status: submitted ? 'Whitelisted' : 'Pending' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-1">Submission payload</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Sent to Customer Centria for BSP (Business Solution Provider) whitelisting.</p>
        <pre className="rounded-2xl bg-slate-900 text-slate-100 text-[11px] leading-relaxed p-4 overflow-x-auto scrollbar-thin">
{`{
  "campaignId": "${campaign.id}",
  "brand": "${campaign.brand}",
  "channels": ${JSON.stringify(campaign.channels)},
  "senderIds": ${JSON.stringify(Object.values(campaign.ids || {}))},
  "shelfWindow": ["${campaign.shelfStart}", "${campaign.shelfEnd}"],
  "requestedBy": "${campaign.owner}"
}`}
        </pre>
        <button
          className="btn btn-primary mt-4 px-5 py-2.5 text-sm disabled:opacity-50"
          disabled={submitted}
          onClick={() => setSubmitted(true)}
        >
          {submitted ? 'Submitted' : 'Submit for whitelisting'}
        </button>
        {submitted && (
          <p className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-500/10 rounded-xl px-3 py-2 mt-3">
            Submitted — awaiting Customer Centria confirmation (SLA 24h).
          </p>
        )}
      </Panel>

      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Whitelisting status</p>
        <div className="flex flex-col gap-2">
          {rows.map((r) => (
            <div key={r.entity} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-white/5 px-4 py-3 gap-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{r.entity}</p>
              <StatusBadge status={r.status === 'Whitelisted' ? 'Completed' : r.status === 'Not applicable' ? 'Draft' : 'Pending'} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deployment — Autopilot / AI send windows + pre-flight checklist
// ---------------------------------------------------------------------------
function DeploymentTab({ campaign }) {
  const [autopilot, setAutopilot] = useState(false);
  const [aiWindows, setAiWindows] = useState(true);

  const checks = DEPLOYMENT_CHECKLIST_TEMPLATE.map((item) => {
    let pass = false;
    if (item.key === 'base') pass = campaign.base != null;
    if (item.key === 'creative') pass = ['Base Approved', 'Overdue', 'Completed'].includes(campaign.status);
    if (item.key === 'whitelisting') pass = campaign.status === 'Completed';
    if (item.key === 'suppression') pass = campaign.status !== 'Draft' && campaign.status !== 'Base: With Data Team';
    if (item.key === 'window') pass = new Date(campaign.shelfEnd) >= new Date('2026-06-20');
    return { ...item, pass };
  });
  const allPass = checks.every((c) => c.pass);
  const deployed = campaign.status === 'Completed';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Deployments</p>
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-white/5 px-4 py-3 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">MAIN</p>
            <p className="text-[11px] text-slate-400">All channels · {campaign.channels.join(', ')}</p>
          </div>
          <StatusBadge status={deployed ? 'Completed' : 'Draft'} />
          {!deployed && <span className="text-xs text-slate-400 ml-2">Not deployed</span>}
        </div>

        <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-3 mb-2.5 cursor-pointer">
          <span>
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <IconRocket size={15} className="text-purple-500" /> Autopilot
            </span>
            <span className="block text-[11px] text-slate-400 mt-0.5">Let the Deployment Agent auto-send within the AI-recommended window, no manual trigger.</span>
          </span>
          <input type="checkbox" className="h-5 w-5 accent-orange-600 shrink-0" checked={autopilot} onChange={(e) => setAutopilot(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-3 cursor-pointer">
          <span>
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <IconSparkle size={15} className="text-purple-500" /> AI send windows
            </span>
            <span className="block text-[11px] text-slate-400 mt-0.5">Send each segment at its individually predicted best-engagement hour.</span>
          </span>
          <input type="checkbox" className="h-5 w-5 accent-orange-600 shrink-0" checked={aiWindows} onChange={(e) => setAiWindows(e.target.checked)} />
        </label>

        <button className="btn btn-primary w-full mt-5 py-3 text-sm disabled:opacity-50" disabled={!allPass || deployed}>
          {deployed ? 'Deployed' : 'Deploy now'}
        </button>
      </Panel>

      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Pre-flight check</p>
        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div key={c.key} className={`checklist-row ${c.pass ? 'is-done' : 'is-fail'}`}>
              {c.pass ? <IconCheck size={17} className="text-green-600" /> : <IconWarning size={17} className="text-red-500" />}
              <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{c.label}</span>
            </div>
          ))}
        </div>
        {!allPass && (
          <p className="text-xs text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl px-3 py-2 mt-4">
            Resolve items above before deploying.
          </p>
        )}
      </Panel>
    </div>
  );
}

function PerformanceTab({ campaign }) {
  const perf = ANALYTICS_PERFORMANCE[campaign.id];
  if (!perf) {
    return (
      <Panel>
        <p className="text-sm text-slate-400 text-center py-10">No performance data yet — this campaign hasn't deployed.</p>
      </Panel>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCardMini value={perf.sent.toLocaleString('en-IN')} label="Messages Sent" />
        <StatCardMini value={`${perf.deliveryRate}%`} label="Delivery Rate" />
        <StatCardMini value={`${perf.openRate}%`} label="Open Rate" />
        <StatCardMini value={`${perf.clickRate}%`} label="Click Rate" />
      </div>
      <Panel>
        <p className="font-bold text-slate-900 dark:text-white mb-4">Per-channel breakdown</p>
        <div className="table-wrap">
          <table>
            <thead className="table-head">
              <tr><th>Channel</th><th>Sent</th><th>Delivered</th><th>Read</th><th>Clicked</th><th>Cost</th></tr>
            </thead>
            <tbody>
              {perf.channelBreakdown.map((c) => (
                <tr key={c.channel} className="table-row">
                  <td className="font-semibold">{c.channel}</td>
                  <td>{c.sent.toLocaleString('en-IN')}</td>
                  <td>{c.delivered.toLocaleString('en-IN')}</td>
                  <td>{c.read.toLocaleString('en-IN')}</td>
                  <td>{c.clicked.toLocaleString('en-IN')}</td>
                  <td>₹{(c.cost / 1000).toFixed(1)}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function StatCardMini({ value, label }) {
  return (
    <div className="glass card p-4">
      <p className="text-xl font-extrabold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}
