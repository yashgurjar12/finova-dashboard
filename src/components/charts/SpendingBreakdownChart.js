import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

export default function SpendingBreakdownChart() {
  const { isDark } = useTheme();
  const legendColor = isDark ? '#e5e7eb' : '#6b7280';

  const data = {
    labels: ['Shopping', 'Transport', 'Entertainment', 'Food & Dining', 'Healthcare', 'Education'],
    datasets: [
      {
        data: [28, 16, 12, 18, 14, 12],
        backgroundColor: ['#f97316', '#3b82f6', '#ec4899', '#f59e0b', '#6366f1', '#10b981'],
        borderWidth: 0,
      },
    ],
  };

  const options = useMemo(
    () => ({
      cutout: '62%',
      plugins: {
        legend: { position: 'bottom', labels: { color: legendColor } },
      },
    }),
    [legendColor]
  );

  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <h3>Spending Breakdown</h3>
        <span>By category</span>
      </div>
      <Doughnut key={String(isDark)} data={data} options={options} aria-label="Spending Breakdown" />
    </article>
  );
}
