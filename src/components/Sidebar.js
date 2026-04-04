import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Overview', icon: '🏠', end: true },
  { to: '/transactions', label: 'Transactions', icon: '💳', end: false },
  { to: '/insights', label: 'Insights', icon: '💡', end: false },
];

/**
 * Primary navigation + brand. Collapse and mobile open are controlled by parent (Layout).
 */
export default function Sidebar({ mobileOpen, onNavClick, onToggleCollapse, toggleLabel }) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggleCollapse}
        aria-label="Toggle sidebar"
      >
        {toggleLabel}
      </button>
      <div className="brand">
        <span className="brand-icon">F</span>
        <div className="brand-text">
          <h1>Finova</h1>
          <p>Finance dashboard</p>
        </div>
      </div>

      <nav className="nav">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-text">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="account-card">
        <div className="avatar">AJ</div>
        <div>
          <h4>Alex Johnson</h4>
          <p>alex@finova.app</p>
        </div>
      </div>
    </aside>
  );
}
