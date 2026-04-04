import React, { useEffect, useState } from 'react';

const defaultCategories = [
  'Salary',
  'Housing',
  'Utensils',
  'Food & Dining',
  'Entertainment',
  'Transport',
  'Shopping',
  'Healthcare',
];

export default function TransactionModal({ open, onClose, onSave }) {
  const [formType, setFormType] = useState('Expense');
  const [formDate, setFormDate] = useState('');
  const [formAmount, setFormAmount] = useState('0.00');
  const [formCategory, setFormCategory] = useState('');
  const [formMerchant, setFormMerchant] = useState('');
  const [formDescription, setFormDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    const today = new Date().toISOString().slice(0, 10);
    setFormDate(today);
    setFormType('Expense');
    setFormAmount('0.00');
    setFormCategory('');
    setFormMerchant('');
    setFormDescription('');
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number.parseFloat(formAmount) || 0;
    const merchant = formMerchant.trim() || 'Unknown Merchant';
    if (!formDate || !formCategory || !merchant) {
      window.alert('Please complete all mandatory fields.');
      return;
    }
    const signedAmount = formType === 'Expense' ? -Math.abs(amount) : Math.abs(amount);
    onSave({
      date: formDate,
      merchant,
      category: formCategory,
      amount: signedAmount,
      description: formDescription.trim(),
    });
    onClose();
  };

  return (
    <div
      className="modal"
      role="presentation"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button type="button" className="modal-close" aria-label="Close modal" onClick={onClose}>
          ×
        </button>
        <h3 id="modalTitle">New Transaction</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-grid">
            <label htmlFor="formType">
              Type
              <select
                id="formType"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                required
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </label>
            <label htmlFor="formDate">
              Date
              <input
                id="formDate"
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                required
              />
            </label>
            <label htmlFor="formAmount">
              Amount ($)
              <input
                id="formAmount"
                type="number"
                min="0.01"
                step="0.01"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                required
              />
            </label>
            <label htmlFor="formCategory">
              Category
              <select
                id="formCategory"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                required
              >
                <option value="">Select</option>
                {defaultCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="formMerchant">
              Merchant / Source
              <input
                id="formMerchant"
                type="text"
                placeholder="e.g. Netflix, Tech Corp"
                value={formMerchant}
                onChange={(e) => setFormMerchant(e.target.value)}
                required
              />
            </label>
            <label htmlFor="formDescription" className="full-width">
              Description
              <input
                id="formDescription"
                type="text"
                placeholder="Brief description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
