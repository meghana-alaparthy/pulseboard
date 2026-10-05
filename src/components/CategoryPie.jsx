import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Revenue share by product category, with a custom legend underneath.
export default function CategoryPie({ data }) {
  const total = data.reduce((s, c) => s + c.value, 0);

  return (
    <div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={2} strokeWidth={0}>
              {data.map((c) => (
                <Cell key={c.name} fill={c.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text)",
              }}
              formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="legend">
        {data.map((c) => (
          <li key={c.name}>
            <span className="dot" style={{ background: c.color }} />
            <span className="legend-name">{c.name}</span>
            <span className="legend-pct">{((c.value / total) * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
