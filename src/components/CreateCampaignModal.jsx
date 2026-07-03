import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { IconClose } from './icons';

const TYPES = [
  { key: 'Engagement', tier: 'MAJOR' },
  { key: 'Promotion', tier: 'MAJOR' },
  { key: 'Offer', tier: 'MAJOR' },
  { key: 'Store', tier: 'MINOR' },
];
const MODES = ['SMS', 'WhatsApp', 'RCS', 'Email'];

export default function CreateCampaignModal({ onClose }) {
  const { addCampaign } = useData();
  const { navigate } = useRouter();
  const { activeBrand } = useAuth();
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('Anita R');
  const [type, setType] = useState('Engagement');
  const [modes, setModes] = useState([]);
  const [deployDate, setDeployDate] = useState('');
  const [shelfStart, setShelfStart] = useState('');
  const [shelfEnd, setShelfEnd] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const toggleMode = (m) => setModes((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const submit = () => {
    if (!name.trim()) { setError('Campaign name is required.'); return; }
    if (!modes.length) { setError('Select at least one mode of deployment.'); return; }
    if (!deployDate) { setError('Deployment date is required.'); return; }
    const tier = TYPES.find((t) => t.key === type)?.tier || 'MAJOR';
    const created = addCampaign({ name, owner, type, tier, channels: modes, deployDate, shelfStart, shelfEnd, remarks, brand: activeBrand });
    onClose();
    navigate(`/campaigns/${created.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-backdrop" onClick={onClose} />
      <div
        className="relative glass-solid card w-full max-w-xl shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto scrollbar-thin"
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/70 dark:border-white/10">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Create Campaign</h2>
          <button className="btn btn-ghost h-8 w-8 rounded-full" onClick={onClose}>
            <IconClose size={18} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Campaign name *</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Diwali Radiance Edit" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Campaign owner *</label>
            <select className="select w-full" value={owner} onChange={(e) => setOwner(e.target.value)}>
              {['Anita R', 'Rahul M', 'Krupa S', 'Megha P'].map((o) => <option key={o} value={o}>Default: {o}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Campaign type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setType(t.key)}
                  className={`rounded-2xl border px-3 py-3 text-left transition-colors ${
                    type === t.key
                      ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10'
                      : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{t.key}</p>
                  <span className={`badge mt-1 ${t.tier === 'MAJOR' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                    {t.tier}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Modes of deployment * (multi-select)</label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMode(m)}
                  className={`rounded-full px-4 py-2 text-xs font-bold border transition-colors ${
                    modes.includes(m)
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Deployment date *</label>
              <input type="date" className="input" value={deployDate} onChange={(e) => setDeployDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Shelf start</label>
              <input type="date" className="input" value={shelfStart} onChange={(e) => setShelfStart(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Shelf end</label>
              <input type="date" className="input" value={shelfEnd} onChange={(e) => setShelfEnd(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
              Remarks (vendors, partner campaign owners…)
            </label>
            <textarea className="input rounded-2xl" rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          </div>

          {error && <p className="text-xs text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl px-3 py-2">{error}</p>}

          <button className="btn btn-primary w-full py-3 text-sm" onClick={submit}>
            Confirm &amp; create campaign
          </button>
        </div>
      </div>
    </div>
  );
}
