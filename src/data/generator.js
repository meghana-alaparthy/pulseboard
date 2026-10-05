// Seeded PRNG (mulberry32) so the dashboard renders identical data on every reload.
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CATEGORIES = [
  { name: "Electronics", share: 0.34, color: "#4f7cff" },
  { name: "Clothing", share: 0.26, color: "#22c55e" },
  { name: "Home & Kitchen", share: 0.18, color: "#f59e0b" },
  { name: "Books", share: 0.12, color: "#a855f7" },
  { name: "Sports", share: 0.1, color: "#ef4444" },
];

const PAGE_PATHS = [
  "/",
  "/products",
  "/products/wireless-headphones",
  "/products/smart-watch",
  "/checkout",
  "/blog/top-10-gadgets-2026",
  "/deals",
  "/about",
  "/support",
  "/products/running-shoes",
];

// 90 days of daily metrics with weekly seasonality, a slow upward trend, and noise.
export function generateDaily() {
  const rand = mulberry32(20260930);
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const seasonal = dow === 0 || dow === 6 ? 0.78 : dow === 3 ? 1.12 : 1.0;
    const trend = 1 + (89 - i) * 0.004;
    const noise = 0.85 + rand() * 0.3;

    const visitors = Math.round(4200 * seasonal * trend * noise);
    const conversion = 0.028 + rand() * 0.014;
    const orders = Math.round(visitors * conversion);
    const revenue = Math.round(orders * (58 + rand() * 24));

    days.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      visitors,
      orders,
      revenue,
      conversion: +(conversion * 100).toFixed(2),
    });
  }

  return days;
}

// Top pages for the trailing 90 days. App scales these to the selected range.
export function generatePages() {
  const rand = mulberry32(77031);
  return PAGE_PATHS.map((path) => {
    const views = Math.round(900 + rand() * 22000);
    const mins = 1 + Math.floor(rand() * 4);
    const secs = String(Math.floor(rand() * 60)).padStart(2, "0");
    return {
      path,
      views,
      unique: Math.round(views * (0.55 + rand() * 0.25)),
      bounce: +(28 + rand() * 42).toFixed(1),
      avgTime: `${mins}:${secs}`,
    };
  }).sort((a, b) => b.views - a.views);
}
