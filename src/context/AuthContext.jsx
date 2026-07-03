import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { DEMO_ACCOUNTS, BRANDS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(() => {
    try {
      const saved = localStorage.getItem('campsyte-account');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [activeBrand, setActiveBrand] = useState(() => {
    try {
      const saved = localStorage.getItem('campsyte-brand');
      if (saved) return saved;
    } catch (e) {}
    return 'TANEIRA';
  });

  const login = useCallback((acc) => {
    setAccount(acc);
    try { localStorage.setItem('campsyte-account', JSON.stringify(acc)); } catch (e) {}
    if (acc.brand) {
      setActiveBrand(acc.brand);
      try { localStorage.setItem('campsyte-brand', acc.brand); } catch (e) {}
    }
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
    try { localStorage.removeItem('campsyte-account'); } catch (e) {}
  }, []);

  const switchBrand = useCallback((brandKey) => {
    setActiveBrand(brandKey);
    try { localStorage.setItem('campsyte-brand', brandKey); } catch (e) {}
  }, []);

  const value = useMemo(() => ({
    account,
    login,
    logout,
    activeBrand,
    brand: BRANDS[activeBrand],
    switchBrand,
    canSwitchBrand: account ? account.scope === 'ALL' || account.scope === 'CROSS' : false,
    isAuthenticated: !!account,
  }), [account, login, logout, activeBrand, switchBrand]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { DEMO_ACCOUNTS };
