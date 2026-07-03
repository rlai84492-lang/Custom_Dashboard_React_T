import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import CopilotFab from './CopilotFab';
import CopilotPanel from './CopilotPanel';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="app-shell">
      <div className="flex max-w-[1900px] mx-auto">
        <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="flex-1 min-w-0 px-3 sm:px-5 py-4">
          <Header onOpenMobile={() => setMobileOpen(true)} />
          <main className="pb-16">{children}</main>
        </div>
      </div>
      <CopilotFab />
      <CopilotPanel />
    </div>
  );
}
