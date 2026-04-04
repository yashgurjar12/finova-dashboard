import React from 'react';
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart';

const spendCategories = [
  { rank: 1, name: 'Housing', amount: 9000, pct: 74, color: '#6366f1' },
  { rank: 2, name: 'Food & Dining', amount: 2008, pct: 17, color: '#f59e0b' },
  { rank: 3, name: 'Shopping', amount: 320, pct: 3, color: '#f97316' },
  { rank: 4, name: 'Utilities', amount: 310, pct: 3, color: '#8b5cf6' },
  { rank: 5, name: 'Education', amount: 150, pct: 1, color: '#10b981' },
];

const observations = [
  {
    icon: '💡',
    title: 'Tip',
    text: 'Automate 20% of your paycheck into savings each month to make it habitual.',
  },
  {
    icon: '📈',
    title: 'Progress',
    text: 'Savings rate 69.2% is well above target; keep this momentum.',
  },
  {
    icon: '📊',
    title: 'Progress',
    text: 'Monthly net is $4,530 and forward trend is positive for sustained surplus.',
  },
  {
    icon: '🏠',
    title: 'Biggest Expense',
    text: 'Housing is $9,000 (74% of total expenses); review options for 5-10% cost optimization.',
  },
];

/** Financial insights: static summary cards, charts, and observation tiles (original insight.js). */
export default function Insights() {
  return (
    <>
      <section className="dashboard-header">
        <div className="greeting-block">
          <h2>Financial insights at a glance</h2>
          <p>Auto-summarized from your transaction history</p>
        </div>
      </section>

      <section className="insight-cards">
        <article className="insight-card gradient-purple">
          <div className="insight-card-icon">🏆</div>
          <h3>Highest Spending</h3>
          <p className="insight-card-main">Housing</p>
          <p className="insight-card-sub">$9,000 · 74% of expenses</p>
        </article>
        <article className="insight-card gradient-green">
          <div className="insight-card-icon">🐷</div>
          <h3>Total Saved</h3>
          <p className="insight-card-main">$27,182</p>
          <p className="insight-card-sub">69.2% savings rate</p>
        </article>
        <article className="insight-card gradient-blue">
          <div className="insight-card-icon">🎯</div>
          <h3>Monthly Net</h3>
          <p className="insight-card-main">$4,530</p>
          <p className="insight-card-sub">Average per month</p>
        </article>
      </section>

      <section className="analytics-grid insight-charts-grid">
        <IncomeExpenseChart />
        <article className="chart-card" style={{ minHeight: 360 }}>
          <div className="chart-card-header">
            <h3>Top Spending Categories</h3>
            <span>Where your money goes</span>
          </div>
          <div className="spend-category-list">
            {spendCategories.map((cat) => (
              <div key={cat.name} className="spend-category-item">
                <div className="spend-category-row">
                  <span>
                    {cat.rank}. {cat.name}
                  </span>
                  <span>
                    ${cat.amount.toLocaleString()} · {cat.pct}%
                  </span>
                </div>
                <div className="spend-category-progress">
                  <div
                    className="spend-category-progress-fill"
                    style={{ width: `${cat.pct}%`, background: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="transactions-card" style={{ borderRadius: 20 }}>
        <div className="transactions-header" style={{ flexWrap: 'wrap' }}>
          <h3>Savings Goal Progress</h3>
          <p>20% target savings rate</p>
        </div>
        <div className="savings-progress-track">
          <div className="savings-progress-fill" style={{ width: '69.2%' }} />
        </div>
        <div className="savings-progress-labels">
          <span>$0</span>
          <span>69.2%</span>
          <span>100%</span>
        </div>
      </section>

      <section className="transactions-card" style={{ borderRadius: 20 }}>
        <div className="transactions-header">
          <h3>Smart Observations</h3>
        </div>
        <div className="observation-grid">
          {observations.map((obs, index) => (
            <div
              key={`obs-${index}`}
              className={`summary-card type-${obs.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="summary-card-header">
                <span>{obs.icon}</span>
                <strong>{obs.title}</strong>
              </div>
              <div>{obs.text}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
