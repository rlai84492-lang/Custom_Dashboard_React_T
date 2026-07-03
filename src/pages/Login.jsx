import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';
import { DEMO_ACCOUNTS } from '../data/mockData';
import { IconEye, IconEyeOff, IconMoon, IconSun } from '../components/icons';

export default function Login() {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleDemoLogin = (acc) => {
    login(acc);
    navigate('/overview');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@titan.co.in')) {
      setError('Please use your @titan.co.in email address.');
      return;
    }
    const match = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (!match) {
      setError('No account found for that email. Try one of the demo accounts on the right.');
      return;
    }
    if (password !== 'Demo@CampSyte26') {
      setError('Incorrect password. Demo password is Demo@CampSyte26.');
      return;
    }
    setError('');
    handleDemoLogin(match);
  };

  return (
    <div className="login-shell min-h-screen flex items-center justify-center px-4 py-10">
      <button
        className="btn btn-ghost h-10 w-10 rounded-full fixed top-4 right-4"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
      </button>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl items-stretch">
        {/* Login card */}
        <div className="glass-solid card p-8 shadow-xl w-full lg:w-[26rem] shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
              C
            </div>
            <div>
              <p className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight">
                CampSyte <span className="text-orange-600">2.0</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Titan Campaign Cloud</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                Email (@titan.co.in)
              </label>
              <input
                className="input"
                type="email"
                placeholder="you@titan.co.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Password</label>
                <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline" onClick={() => {}}>
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  className="input pr-11"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl px-3 py-2">{error}</p>}

            <button type="submit" className="btn btn-primary w-full py-3 text-sm">
              Login
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="glass-solid card p-6 shadow-xl w-full lg:w-96 flex flex-col min-h-0">
          <p className="font-extrabold text-slate-900 dark:text-white text-base">Demo accounts</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            One-click login · password <span className="kbd">Demo@CampSyte26</span>
          </p>
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin pr-1" style={{ maxHeight: '26rem' }}>
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                onClick={() => handleDemoLogin(acc)}
                className="text-left rounded-2xl border border-slate-200 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-500/40 hover:bg-orange-50/60 dark:hover:bg-orange-500/10 transition-colors px-4 py-3"
              >
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{acc.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {acc.desc} · {acc.email}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
