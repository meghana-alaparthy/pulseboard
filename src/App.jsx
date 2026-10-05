import { useEffect, useMemo, useState } from "react";
import KpiCard from "./components/KpiCard";
import RevenueChart from "./components/RevenueChart";
import OrdersChart from "./components/OrdersChart";
import CategoryPie from "./components/CategoryPie";
import TrafficTable from "./components/TrafficTable";
import DateRangePicker from "./components/DateRangePicker";
import ThemeToggle from "./components/ThemeToggle";
import { CATEGORIES, generateDaily, generatePages } from "./data/generator";

// Seeded, so identical across reloads. Generated once at module load.
const DAYS = generateDaily();
const PAGES = generatePages();

const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const fmtNum = new Intl.NumberFormat("en-US");

function pctChange(cur, prev) {
  if (!prev) return 0;
  return ((cur - prev) / prev) * 100;
}

export default function App() {
  const [range, setRange] = useState(30);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("pulseboard-theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      localStorage.setItem("pulseboard-theme", dark ? "dark" : "light");
    } catch {
      // private mode etc. — theme just won't persist
    }
  }, [dark]);

  const current = useMemo(() => DAYS.slice(-range), [range]);
  const previous = useMemo(() => DAYS.slice(-range * 2, -range), [range]);

  const totals = useMemo(() => {
    const sum = (rows, k) => rows.reduce((s, r) => s + r[k], 0);
    const avgConv = (rows) => (rows.length ? sum(rows, "conversion") / rows.length : 0);
    return {
      revenue: { cur: sum(current, "revenue"), prev: sum(previous, "revenue") },
      orders: { cur: sum(current, "orders"), prev: sum(previous, "orders") },
      visitors: { cur: sum(current, "visitors"), prev: sum(previous, "visitors") },
      conversion: { cur: avgConv(current), prev: avgConv(previous) },
    };
  }, [current, previous]);

  const kpis = [
    {
      title: "Revenue",
      value: fmtUSD.format(totals.revenue.cur),
      delta: pctChange(totals.revenue.cur, totals.revenue.prev),
      spark: current.map((d) => d.revenue),
    },
    {
      title: "Orders",
      value: fmtNum.format(totals.orders.cur),
      delta: pctChange(totals.orders.cur, totals.orders.prev),
      spark: current.map((d) => d.orders),
    },
    {
      title: "Visitors",
      value: fmtNum.format(totals.visitors.cur),
      delta: pctChange(totals.visitors.cur, totals.visitors.prev),
      spark: current.map((d) => d.visitors),
    },
    {
      title: "Conv. rate",
      value: `${totals.conversion.cur.toFixed(2)}%`,
      delta: pctChange(totals.conversion.cur, totals.conversion.prev),
      spark: current.map((d) => d.conversion),
    },
  ];

  // Category shares stay fixed; values scale with the selected range's revenue.
  const categoryData = useMemo(() => {
    const total = totals.revenue.cur;
    return CATEGORIES.map((c, i) => ({
      ...c,
      value: Math.round(total * c.share * (0.96 + (i % 3) * 0.04)),
    }));
  }, [totals]);

  // Table numbers scale down proportionally for shorter ranges.
  const pageRows = useMemo(() => {
    const f = range / 90;
    return PAGES.map((p) => ({
      ...p,
      views: Math.round(p.views * f),
      unique: Math.round(p.unique * f),
    }));
  }, [range]);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Pulseboard</h1>
          <p className="subtitle">E-commerce analytics at a glance</p>
        </div>
        <div className="controls">
          <DateRangePicker range={range} onChange={setRange} />
          <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
        </div>
      </header>

      <section className="kpis">
        {kpis.map((k) => (
          <KpiCard key={k.title} title={k.title} value={k.value} delta={k.delta} spark={k.spark} />
        ))}
      </section>

      <section className="charts-main">
        <div className="card span-2">
          <h2>Revenue</h2>
          <RevenueChart data={current} dark={dark} />
        </div>
        <div className="card">
          <h2>Revenue by category</h2>
          <CategoryPie data={categoryData} />
        </div>
      </section>

      <section className="card">
        <h2>Orders per day</h2>
        <OrdersChart data={current} dark={dark} />
      </section>

      <section className="card">
        <h2>Top pages</h2>
        <TrafficTable rows={pageRows} />
      </section>
    </div>
  );
}
