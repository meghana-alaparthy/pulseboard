// Stat card: formatted value, % change vs the previous period, and a sparkline.
export default function KpiCard({ title, value, delta, spark }) {
  const up = delta >= 0;
  const min = Math.min(...spark);
  const max = Math.max(...spark);
  const span = max - min || 1;
  const points = spark
    .map((v, i) => `${(i / (spark.length - 1)) * 100},${92 - ((v - min) / span) * 84}`)
    .join(" ");

  return (
    <div className="kpi">
      <div className="kpi-top">
        <span className="kpi-title">{title}</span>
        <span className={up ? "delta up" : "delta down"}>
          {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
      <div className="kpi-value">{value}</div>
      <svg className="spark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="kpi-foot">vs previous period</div>
    </div>
  );
}
