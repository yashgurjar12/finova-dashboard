import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const TITLES = {
  '/': 'Overview',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = TITLES[location.pathname] ?? 'Finova';

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', mobileOpen);
    return () => document.body.classList.remove('sidebar-open');
  }, [mobileOpen]);

  return (
    <div className={`app-shell ${collapsed ? 'collapsed-sidebar' : ''}`}>
      <Sidebar
        mobileOpen={mobileOpen}
        onNavClick={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        toggleLabel={collapsed ? '▶' : '◀'}
      />
      <div
        role="presentation"
        className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <main className="main-content">
        <TopBar title={title} onOpenMobile={() => setMobileOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
}
