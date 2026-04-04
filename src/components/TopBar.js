import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAppState } from '../context/AppStateContext';

export default function TopBar({ title, onOpenMobile }) {
  const { isDark, toggleTheme } = useTheme();
  const { userRole, setUserRole } = useAppState();

  return (
    <header className="top-bar">
      <button
        type="button"
        id="mobileNavToggle"
        className="icon-btn mobile-menu-btn"
        aria-label="Open navigation menu"
        onClick={onOpenMobile}
      >
        ☰
      </button>
      <h2>{title}</h2>
      <div className="top-controls">
        <select
          id="roleSelect"
          className="role-selector"
          title="Select user role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="button"
          id="themeToggle"
          className="icon-btn"
          title="Toggle dark mode"
          onClick={toggleTheme}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <button type="button" className="icon-btn" title="Profile">
          👤
        </button>
      </div>
    </header>
  );
}
