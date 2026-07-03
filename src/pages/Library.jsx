import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIBRARY_TEMPLATES, TEMPLATE_ZONES, GENERATED_ASSETS, BRANDS } from '../data/mockData';
import Pagination from '../components/Pagination';
import { IconCake, IconCelebration, IconGift, IconEdit, IconClose, IconSparkle, IconRefresh } from '../components/icons';

const ICONS = { cake: IconCake, celebration: IconCelebration, gift: IconGift };
const PAGE_SIZE = 12;

export default function Library() {
  const [tab, setTab] = useState('templates');
  const [zonesModal, setZonesModal] = useState(null);
  const [previewAsset, setPreviewAsset] = useState(null);
  const [assets, setAssets] = useState(GENERATED_ASSETS);
  const [generating, setGenerating] = useState(false);
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(assets.length / PAGE_SIZE));
  const pageAssets = useMemo(
    () => assets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [assets, page]
  );

  const regenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setAssets((prev) => [...prev].reverse());
      setGenerating(false);
      setPage(1);
    }, 900);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Library</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
        Brand templates with print zones (RLAI Studio personalization) + generated assets · hidden from Data team
      </p>

      <div className="flex items-center gap-2 mb-5">
        <button className={`tab-pill ${tab === 'templates' ? 'active' : ''}`} onClick={() => setTab('templates')}>
          Templates ({LIBRARY_TEMPLATES.length})
        </button>
        <button className={`tab-pill ${tab === 'generated' ? 'active' : ''}`} onClick={() => setTab('generated')}>
          Generated assets ({assets.length})
        </button>
      </div>

      {tab === 'templates' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LIBRARY_TEMPLATES.map((t) => {
            const Icon = ICONS[t.icon] || IconSparkle;
            const brandMeta = BRANDS[t.brand];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3 }}
                className="glass card overflow-hidden"
              >
                <div className="h-52 relative bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                  <span className="absolute top-3 left-3 text-xs font-extrabold text-white/90">{brandMeta?.name || t.brand}</span>
                  <span className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Icon size={30} />
                  </span>
                  <span className="absolute bottom-3 right-3 text-[10px] text-white/70">
                    {t.name} · CampSyte template
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.category} · {t.zones} zones</p>
                  </div>
                  <button className="btn btn-secondary text-xs px-3.5 py-2" onClick={() => setZonesModal(t)}>
                    <IconEdit size={13} /> Edit zones
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized creatives produced by the Creative Agent for the <span className="font-semibold text-slate-700 dark:text-slate-200">Titan Watches — Birthday/Anniversary journey</span> campaign, using the Anniversary Classic template.
            </p>
            <button className="btn btn-primary text-xs px-4 py-2 shrink-0 disabled:opacity-60" onClick={regenerate} disabled={generating}>
              <IconRefresh size={14} className={generating ? 'animate-spin' : ''} /> {generating ? 'Generating…' : 'Generate new batch'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {pageAssets.map((a, i) => (
                <motion.button
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25, delay: (i % PAGE_SIZE) * 0.025 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setPreviewAsset(a)}
                  className="asset-card text-left"
                >
                  <AssetCardBody asset={a} />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <Pagination page={page} pageCount={pageCount} onChange={setPage} totalItems={assets.length} pageSize={PAGE_SIZE} />
        </div>
      )}

      {zonesModal && <EditZonesModal template={zonesModal} onClose={() => setZonesModal(null)} />}
      {previewAsset && <AssetPreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />}
    </div>
  );
}

function AssetCardBody({ asset }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-extrabold tracking-wide text-white/60">TITAN WATCHES</span>
        <IconCelebration size={16} className="text-amber-300" />
      </div>
      <p className="text-[11px] text-white/60">Dear {asset.customerName},</p>
      <p className="text-lg font-extrabold text-white mt-1 tracking-wide">HAPPY ANNIVERSARY!</p>
      <p className="text-xs font-semibold text-amber-300 mt-2">{asset.offer}</p>
      <p className="text-[11px] text-white/50 mt-2 leading-relaxed line-clamp-3">{asset.body}</p>
      <p className="text-xs font-extrabold text-white mt-3 flex items-center gap-1">{asset.cta}</p>
      <p className="text-[10px] text-white/40 mt-3 pt-3 border-t border-white/10">{asset.customerName} · generated {asset.generatedOn}</p>
    </>
  );
}

function EditZonesModal({ template, onClose }) {
  const zones = TEMPLATE_ZONES[template.id] || [];
  const [values, setValues] = useState(() => Object.fromEntries(zones.map((z) => [z, ''])));
  const [saved, setSaved] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="relative glass-solid card w-full max-w-lg shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto scrollbar-thin" style={{ zIndex: 60 }}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/70 dark:border-white/10">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Edit zones — {template.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{template.category} · {zones.length} print zones</p>
          </div>
          <button className="btn btn-ghost h-8 w-8 rounded-full" onClick={onClose}><IconClose size={18} /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          {zones.map((zone) => (
            <div key={zone}>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">{zone}</label>
              <input
                className="input"
                placeholder={`Bind a data field or static value for "${zone}"`}
                value={values[zone]}
                onChange={(e) => setValues((v) => ({ ...v, [zone]: e.target.value }))}
              />
            </div>
          ))}
          {saved && <p className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 rounded-xl px-3 py-2">Zone bindings saved.</p>}
          <button className="btn btn-primary w-full py-3 text-sm" onClick={() => setSaved(true)}>
            Save zone bindings
          </button>
        </div>
      </div>
    </div>
  );
}

function AssetPreviewModal({ asset, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-backdrop" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative glass-solid card w-full max-w-sm shadow-2xl overflow-hidden"
        style={{ zIndex: 60 }}
      >
        <button className="btn btn-ghost h-8 w-8 rounded-full absolute top-3 right-3 z-10 bg-black/30 text-white" onClick={onClose}>
          <IconClose size={18} />
        </button>
        <div className="asset-card asset-card--modal">
          <AssetCardBody asset={asset} />
        </div>
        <div className="p-4 text-xs text-slate-500 dark:text-slate-400">
          Template: Anniversary Classic · Campaign: Titan Watches — Birthday/Anniversary journey
        </div>
      </motion.div>
    </div>
  );
}
