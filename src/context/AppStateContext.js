import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { categoryColor, initialTransactions } from '../data/initialTransactions';

const AppStateContext = createContext(null);

const ROLE_KEY = 'userRole';

export function AppStateProvider({ children }) {
  const [transactions, setTransactions] = useState(() => [...initialTransactions]);
  const [userRole, setUserRoleState] = useState(() => {
    try {
      return localStorage.getItem(ROLE_KEY) || 'Viewer';
    } catch {
      return 'Viewer';
    }
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2200);
  }, []);

  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch {
      /* ignore */
    }
  }, []);

  /** Quick add from Overview FAB — matches original script.js behavior. */
  const addQuickTransaction = useCallback(() => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      merchant: 'Stripe payout',
      category: 'Income',
      amount: 560,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('Transaction added.');
  }, [showToast]);

  const addTransactionFromForm = useCallback(
    (tx) => {
      setTransactions((prev) => [{ ...tx, id: tx.id ?? Date.now() }, ...prev]);
      showToast('Transaction added');
    },
    [showToast]
  );

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      userRole,
      setUserRole,
      showToast,
      addQuickTransaction,
      addTransactionFromForm,
      toastMessage,
      categoryColor,
    }),
    [transactions, userRole, setUserRole, showToast, addQuickTransaction, addTransactionFromForm, toastMessage]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
      {toastMessage ? <div className="toast-notice">{toastMessage}</div> : null}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
