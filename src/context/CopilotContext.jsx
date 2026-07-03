import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CopilotContext = createContext(null);

const DEFAULT_GREETING = {
  role: 'assistant',
  scoped: true,
  text: 'Sees this page · scoped to your role (Brand)',
};

export function CopilotProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState(null);

  const openWith = useCallback((userText, agentReply) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + '-u', role: 'user', text: userText },
      ...(agentReply ? [{ id: Date.now() + '-a', role: 'agent', ...agentReply }] : []),
    ]);
    setOpen(true);
  }, []);

  const send = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now() + '-u', role: 'user', text }]);
    // simulated orchestrator response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + '-a',
          role: 'agent',
          agentTag: 'ORCHESTRATOR',
          text: `Got it — I'm scoping "${text}" against your live campaigns and audiences now. I'll draft options here; nothing sends without your approval.`,
        },
      ]);
    }, 550);
  }, []);

  const reset = useCallback(() => setMessages([]), []);

  const value = useMemo(() => ({
    open, setOpen, messages, setMessages, openWith, send, reset, context, setContext,
  }), [open, messages, openWith, send, reset, context]);

  return <CopilotContext.Provider value={value}>{children}</CopilotContext.Provider>;
}

export function useCopilot() {
  const ctx = useContext(CopilotContext);
  if (!ctx) throw new Error('useCopilot must be used within CopilotProvider');
  return ctx;
}

export { DEFAULT_GREETING };
