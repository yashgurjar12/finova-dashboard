import React from 'react';

/** Gradient metric tile for Overview / summary stats. */
export default function MetricCard({ title, emoji, value, detail, detailClassName = '', variant }) {
  return (
    <article className={`metric-card ${variant}`}>
      <div className="metric-title">
        <span>{emoji}</span> {title}
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-detail ${detailClassName}`}>{detail}</div>
    </article>
  );
}
