import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CAMPAIGNS, LEADS } from '../data/mockData';

// Holds the "live" mutable slice of mock data (campaigns can be created,
// leads' statuses can change) so the whole app stays in sync without a
// backend. Everything else in mockData.js is treated as read-only reference
// data and imported directly where needed.

const DataContext = createContext(null);

let idCounter = 1000;

export function DataProvider({ children }) {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [leads, setLeads] = useState(LEADS);

  const addCampaign = useCallback((draft) => {
    idCounter += 1;
    const suffix = String(100000 + Math.floor(Math.random() * 899999));
    const brandKey = draft.brand || 'TW';
    const brandPrefix = { TW: 'TW', MIA: 'MIA', TANEIRA: 'TAN', EYEPLUS: 'EYE' }[brandKey] || brandKey;
    const ids = {};
    (draft.channels || []).forEach((ch) => {
      const map = { SMS: 'sms', WhatsApp: 'wa', RCS: 'rcs', Email: 'em' };
      const prefix = { SMS: 'SMS', WhatsApp: 'WA', RCS: 'RCS', Email: 'EM' }[ch];
      ids[map[ch]] = `${brandPrefix}-${prefix}-${suffix}`;
    });
    const newCampaign = {
      id: `cmp-new-${idCounter}`,
      name: draft.name || 'Untitled campaign',
      brand: brandKey,
      owner: draft.owner || 'Anita R',
      type: draft.type || 'Engagement',
      tier: draft.tier || 'MAJOR',
      channels: draft.channels && draft.channels.length ? draft.channels.map((c) => ({ SMS: 'SMS', WhatsApp: 'WA', RCS: 'RCS', Email: 'EM' }[c])) : ['WA'],
      base: null,
      delivered: null,
      deployDate: draft.deployDate || new Date().toISOString().slice(0, 10),
      status: 'Draft',
      aiAssisted: false,
      createdOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      shelfStart: draft.shelfStart || draft.deployDate,
      shelfEnd: draft.shelfEnd || draft.deployDate,
      flagged: true,
      remarks: draft.remarks || '',
      ids,
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    return newCampaign;
  }, []);

  const cancelCampaign = useCallback((id) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Cancelled' } : c)));
  }, []);

  const updateLeadStatus = useCallback((id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const getCampaign = useCallback((id) => campaigns.find((c) => c.id === id), [campaigns]);

  const value = useMemo(() => ({
    campaigns, addCampaign, cancelCampaign, getCampaign, leads, updateLeadStatus,
  }), [campaigns, addCampaign, cancelCampaign, getCampaign, leads, updateLeadStatus]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
