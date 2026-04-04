import React from 'react';

export default function TransactionListItem({ label, dateLabel, category, amount, color }) {
  const income = amount >= 0;
  return (
    <li>
      <div className="tx-meta">
        <div className="tx-chip" style={{ background: color }}>
          {label.slice(0, 2).toUpperCase()}
        </div>
        <div className="tx-details">
          <h4>{label}</h4>
          <p>
            {dateLabel} · {category}
          </p>
        </div>
      </div>
      <div className={`tx-value ${income ? 'income' : 'expense'}`}>
        {income ? '+' : '-'}${Math.abs(amount).toFixed(2)}
      </div>
    </li>
  );
}
