import React from 'react';
import { Line } from 'react-chartjs-2';

const labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const dataPoints = [7000, 9600, 11800, 13300, 17500, 27190];

export default function BalanceTrendChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: dataPoints,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.24)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointHitRadius: 12,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#4f46e5',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4f46e5',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (ctx) => ctx[0]?.label,
          label: (ctx) => `Balance: $${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { color: 'rgba(148,163,184,0.2)' } },
      y: { grid: { color: 'rgba(148,163,184,0.2)' } },
    },
  };

  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <h3>Balance Trend</h3>
        <span>6-month cumulative balance</span>
      </div>
      <Line data={data} options={options} aria-label="Balance Trend" />
      <div className="chart-highlight">+328% overall</div>
    </article>
  );
}
