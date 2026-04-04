import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { useOverviewGreeting } from '../hooks/useTypewriter';
import { formatShortDate } from '../utils/dateFormat';
import MetricCard from '../components/MetricCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingBreakdownChart from '../components/charts/SpendingBreakdownChart';
import TransactionListItem from '../components/TransactionListItem';

export default function Overview() {
  const { transactions, userRole, addQuickTransaction, categoryColor } = useAppState();
  const { line1, line2, typingLine } = useOverviewGreeting(
    'Hello, Alex✨',
    "Here's your financial overview for today."
  );

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const showAdminActions = userRole === 'Admin';

  return (
    <>
      <section className="dashboard-header">
        <div className="greeting-block">
          <h2 className={typingLine === 1 ? 'typing' : ''} aria-live="polite" aria-atomic="true">
            {line1}
          </h2>
          <p className={typingLine === 2 ? 'typing' : ''} aria-live="polite" aria-atomic="true">
            {line2}
          </p>
        </div>
      </section>

      <section className="cards-grid">
        <MetricCard
          variant="gradient-purple"
          emoji="💼"
          title="Total Balance"
          value="$27,190"
          detail="↗ +12.4%"
          detailClassName="positive"
        />
        <MetricCard
          variant="gradient-green"
          emoji="📈"
          title="Total Income"
          value="$39,300"
          detail="↗ +8.2%"
          detailClassName="positive"
        />
        <MetricCard
          variant="gradient-pink"
          emoji="💳"
          title="Total Expenses"
          value="$12,110"
          detail="↘ +3.1%"
          detailClassName="negative"
        />
        <MetricCard variant="gradient-blue" emoji="💰" title="Savings Rate" value="69.2%" detail="Target: 20%" />
      </section>

      <section className="analytics-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </section>

      <section className="transactions-card">
        <div className="transactions-header">
          <div>
            <h3>Recent Transactions</h3>
            <p>Latest 5 activities</p>
          </div>
          <Link to="/transactions" className="link-btn">
            View all →
          </Link>
        </div>

        {recent.length > 0 ? (
          <ul className="transactions-list">
            {recent.map((tx) => (
              <TransactionListItem
                key={tx.id}
                label={tx.merchant}
                dateLabel={formatShortDate(tx.date)}
                category={tx.category}
                amount={tx.amount}
                color={categoryColor(tx.category)}
              />
            ))}
          </ul>
        ) : null}

        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>No recent transactions yet</h4>
            <p>Once you add transactions, your dashboard will show your spending and income trends here.</p>
            {showAdminActions ? (
              <button type="button" className="btn-primary" onClick={addQuickTransaction}>
                Add first transaction
              </button>
            ) : null}
          </div>
        ) : null}
      </section>

      {showAdminActions ? (
        <button
          type="button"
          className="fab"
          id="addTransaction"
          title="Add Transaction"
          onClick={addQuickTransaction}
        >
          +
        </button>
      ) : null}
    </>
  );
}
