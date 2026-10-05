import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Daily order counts over the selected range.
export default function OrdersChart({ data, dark }) {
  const grid = dark ? "#232c44" : "#e8ecf4";
  const tick = "#8a94a6";

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: tick, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: grid }}
            minTickGap={28}
          />
          <YAxis tick={{ fill: tick, fontSize: 12 }} tickLine={false} axisLine={false} width={44} />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text)",
            }}
            formatter={(v) => [v.toLocaleString(), "Orders"]}
          />
          <Bar dataKey="orders" fill="#4f7cff" radius={[4, 4, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
