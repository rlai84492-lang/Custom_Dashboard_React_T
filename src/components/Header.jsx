import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';
import { BRANDS, NOTIFICATIONS } from '../data/mockData';
import { IconSearch, IconBell, IconMoon, IconSun, IconMenu, IconLogout, IconArrowDown } from './icons';

const dropdownMotion = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.16, ease: 'easeOut' },
};

export default function Header({ onOpenMobile }) {
  const { account, brand, activeBrand, switchBrand, canSwitchBrand, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { navigate } = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (brandRef.current && !brandRef.current.contains(e.target)) setBrandOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className="header-bar sticky top-0 z-30 flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-3 mb-6 rounded-2xl">
      <button className="lg:hidden header-icon-btn btn btn-ghost h-9 w-9 rounded-full shrink-0" onClick={onOpenMobile} aria-label="Open menu">
        <IconMenu size={20} />
      </button>

      {/* Brand / login context */}
      <div className="relative shrink-0" ref={brandRef}>
        <motion.button
          whileHover={canSwitchBrand ? { y: -1 } : undefined}
          whileTap={canSwitchBrand ? { scale: 0.98 } : undefined}
          className={`header-pill ${canSwitchBrand ? '' : 'header-pill--static'}`}
          onClick={() => canSwitchBrand && setBrandOpen((v) => !v)}
        >
          <span
            className="header-avatar-ring h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0"
            style={{ background: brand ? brand.color : '#0f172a' }}
          >
            {brand ? brand.short.slice(0, 2).toUpperCase() : 'CS'}
          </span>
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-100">
              {brand ? brand.name : 'All Brands'}
            </span>
            <span className="block text-[10px] font-semibold text-slate-400">
              {canSwitchBrand ? 'Switch brand' : 'Brand'}
            </span>
          </span>
          {canSwitchBrand && <IconArrowDown size={16} className="text-slate-400 shrink-0" />}
        </motion.button>
        <AnimatePresence>
          {brandOpen && canSwitchBrand && (
            <motion.div {...dropdownMotion} className="absolute left-0 mt-2 w-56 glass-solid rounded-2xl shadow-xl p-1.5 z-40" style={{ transformOrigin: 'top left' }}>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 px-2.5 pt-1.5 pb-1">Switch brand</p>
              {Object.values(BRANDS).map((b) => (
                <button
                  key={b.key}
                  onClick={() => { switchBrand(b.key); setBrandOpen(false); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                    activeBrand === b.key ? 'bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white" style={{ background: b.color }}>
                    {b.short.slice(0, 2).toUpperCase()}
                  </span>
                  {b.name}
                  {activeBrand === b.key && <IconArrowDown size={12} className="ml-auto -rotate-90 text-orange-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="header-divider hidden sm:block" />

      {/* Search — the horizontal centerpiece */}
      <div className="header-search relative flex-1 min-w-0 max-w-2xl hidden sm:block">
        <IconSearch className="header-search__icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={16} />
        <input className="header-search__input" placeholder="Search campaigns, customers, reports…" />
        <span className="kbd absolute right-3 top-1/2 -translate-y-1/2">⌘K</span>
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Right cluster — pinned to the far edge so the bar reads as fully covered, edge to edge */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Light / dark background switch */}
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.92 }}
            className="header-icon-btn btn btn-ghost h-9 w-9 rounded-full"
            onClick={toggleTheme}
            title="Switch light / dark background"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex items-center justify-center"
              >
                {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <div className="relative" ref={notifRef}>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.92 }}
              className="header-icon-btn btn btn-ghost h-9 w-9 rounded-full relative"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notifications"
            >
              <IconBell size={18} />
              {NOTIFICATIONS.length > 0 && (
                <motion.span
                  className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {NOTIFICATIONS.length}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div {...dropdownMotion} className="absolute right-0 mt-2 w-80 glass-solid rounded-2xl shadow-xl p-2 z-40" style={{ transformOrigin: 'top right' }}>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 py-1.5">Notifications</p>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{n.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="header-divider hidden sm:block" />

        {/* Logged-in account */}
        <div className="relative shrink-0" ref={userRef}>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="header-pill header-pill--user"
            onClick={() => setUserOpen((v) => !v)}
          >
            <span className="header-avatar-ring avatar h-8 w-8 bg-gradient-to-br from-orange-600 to-red-500 text-white text-xs">
              {account ? account.initials : '?'}
            </span>
            <span className="hidden md:block text-left">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{account ? account.name : 'Guest'}</span>
              <span className="block text-[10px] uppercase tracking-wide text-slate-400 leading-tight">{account ? account.scope : ''}</span>
            </span>
            <IconArrowDown size={14} className="hidden md:block text-slate-400 shrink-0" />
          </motion.button>
          <AnimatePresence>
            {userOpen && (
              <motion.div {...dropdownMotion} className="absolute right-0 mt-2 w-56 glass-solid rounded-2xl shadow-xl p-1.5 z-40" style={{ transformOrigin: 'top right' }}>
                <div className="px-3 py-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{account?.name}</p>
                  <p className="text-[11px] text-slate-400">{account?.email}</p>
                </div>
                <div className="divider my-1" />
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                  onClick={() => { logout(); navigate('/login'); }}
                >
                  <IconLogout size={16} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}