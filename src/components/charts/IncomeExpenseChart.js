import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const income = [8000, 6400, 6500, 5900, 6000, 6700];
const expenses = [1600, 1900, 1840, 3750, 4100, 4070];

/** Income vs expenses bar chart for Insights page. Reacts to dark mode for tick colors. */
export default function IncomeExpenseChart() {
  const { isDark } = useTheme();
  const textColor = isDark ? '#ffffff' : 'var(--text)';

  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        { label: 'Income', data: income, backgroundColor: '#10b981' },
        { label: 'Expenses', data: expenses, backgroundColor: '#ef4444' },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: textColor } },
      },
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.2)' },
          ticks: { color: textColor },
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(148,163,184,0.2)' },
          ticks: { color: textColor },
        },
      },
    }),
    [textColor]
  );

  return (
    <article className="chart-card" style={{ minHeight: 360 }}>
      <div className="chart-card-header">
        <h3>Income vs Expenses</h3>
        <span>6 months (May–Oct)</span>
      </div>
      <div style={{ height: 260 }}>
        <Bar key={String(isDark)} data={data} options={options} aria-label="Monthly income vs expenses chart" />
      </div>
    </article>
  );
}
