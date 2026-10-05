# Pulseboard

A lightweight analytics dashboard for a fictional online store. I built it to get sharper with data visualization in React — real charts, derived KPIs, and a theme system, all wired to a deterministic mock dataset so it behaves like a production dashboard without needing a backend.

## Features

- KPI cards with period-over-period deltas and sparklines
- Revenue area chart, daily orders bar chart, revenue-by-category donut (recharts)
- Sortable top-pages table
- 7 / 30 / 90 day range switching — every number on the page recomputes
- Light/dark mode, persisted to localStorage
- Responsive layout down to phone screens

## Quickstart

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  App.jsx            # layout + all derived state (filtering, KPI math)
  main.jsx           # entry point
  index.css          # theme variables and layout
  data/generator.js  # seeded mock dataset (90 days)
  components/
    KpiCard.jsx        # stat card with delta + sparkline
    RevenueChart.jsx   # area chart
    OrdersChart.jsx    # bar chart
    CategoryPie.jsx    # donut chart + legend
    TrafficTable.jsx   # sortable table
    DateRangePicker.jsx
    ThemeToggle.jsx
```

## How the data works

There is no backend. `src/data/generator.js` builds 90 days of daily metrics (revenue, orders, visitors, conversion) with a seeded PRNG, so the numbers are identical on every reload but still look organic — weekend dips, a slow upward trend, and random noise.

Picking a date range slices the last N days. KPIs compare against the N days before that, and the charts, category breakdown, and table all derive from the same slice, so the whole page stays consistent when you switch ranges.

## Tech stack

React 18, Vite 5, recharts, plain CSS with custom properties for theming.

## License

MIT
