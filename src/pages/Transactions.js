import React, { useMemo, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { formatTableDate } from '../utils/dateFormat';
import TransactionModal from '../components/TransactionModal';

function getType(amount) {
  return amount >= 0 ? 'Income' : 'Expense';
}

export default function Transactions() {
  const { transactions, userRole, addTransactionFromForm } = useAppState();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return ['All Categories', ...Array.from(set).sort()];
  }, [transactions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = transactions.filter((tx) => {
      const searchText = `${tx.merchant} ${tx.category}`.toLowerCase();
      const matchesText = searchText.includes(q);
      const matchesType = typeFilter === 'All' || getType(tx.amount) === typeFilter;
      const matchesCategory = categoryFilter === 'All Categories' || tx.category === categoryFilter;
      return matchesText && matchesType && matchesCategory;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'dateAsc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'dateDesc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'categoryAsc') return a.category.localeCompare(b.category);
      if (sortBy === 'categoryDesc') return b.category.localeCompare(a.category);
      if (sortBy === 'amountAsc') return a.amount - b.amount;
      if (sortBy === 'amountDesc') return b.amount - a.amount;
      return 0;
    });

    return list;
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);

  const isAdmin = userRole === 'Admin';

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSave = (payload) => {
    addTransactionFromForm({
      id: Date.now(),
      date: payload.date,
      merchant: payload.merchant,
      category: payload.category,
      amount: payload.amount,
      description: payload.description,
    });
  };

  return (
    <>
      <section className="transactions-card">
        <div className="transactions-header">
          <div>
            <h3>Transactions</h3>
            <p>
              {filtered.length} of {transactions.length} transactions
            </p>
          </div>
          {isAdmin ? (
            <button
              type="button"
              id="addTxHeaderBtn"
              className={`btn-add-transaction ${isAdmin ? 'visible' : ''}`}
              title="Add new transaction"
              onClick={openModal}
            >
              + Add Transaction
            </button>
          ) : null}
        </div>

        <div className="tx-toolbar">
          <div className="search-group">
            <span className="search-icon">🔍</span>
            <input
              id="searchInput"
              type="search"
              placeholder="Search by merchant, description or category..."
              aria-label="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-actions">
            <select
              id="typeFilter"
              aria-label="Filter by transaction type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <select
              id="categoryFilter"
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              id="sortSelect"
              aria-label="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dateDesc">Date: Newest first</option>
              <option value="dateAsc">Date: Oldest first</option>
              <option value="categoryAsc">Category: A → Z</option>
              <option value="categoryDesc">Category: Z → A</option>
              <option value="amountDesc">Amount: High → Low</option>
              <option value="amountAsc">Amount: Low → High</option>
            </select>
          </div>
        </div>

        <div className="transaction-table-wrapper">
          <table className="transactions-table" aria-label="Transactions list">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const t = getType(tx.amount);
                const cls = t.toLowerCase();
                return (
                  <tr key={tx.id}>
                    <td>{formatTableDate(tx.date)}</td>
                    <td>{tx.category}</td>
                    <td className={`tx-amount ${cls}`}>
                      {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td>
                      <span className={`tx-type-chip ${cls}`}>{t}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>No matching transactions</h4>
            <p>Try adjusting your filter or search.</p>
            {isAdmin ? (
              <button type="button" className="btn-primary" onClick={openModal}>
                Add Transaction
              </button>
            ) : null}
          </div>
        ) : null}
      </section>

      <TransactionModal open={modalOpen} onClose={closeModal} onSave={handleSave} />
    </>
  );
}
