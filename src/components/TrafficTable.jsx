import { useState } from "react";

const COLUMNS = [
  { key: "path", label: "Page" },
  { key: "views", label: "Views" },
  { key: "unique", label: "Unique" },
  { key: "bounce", label: "Bounce %" },
  { key: "avgTime", label: "Avg. time" },
];

// Top pages table. Click a header to sort; click again to flip direction.
export default function TrafficTable({ rows }) {
  const [sort, setSort] = useState({ key: "views", dir: "desc" });

  const sorted = [...rows].sort((a, b) => {
    const av = a[sort.key];
    const bv = b[sort.key];
    const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
    return sort.dir === "asc" ? cmp : -cmp;
  });

  function toggle(key) {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }
    );
  }

  return (
    <div className="table-scroll">
      <table className="traffic">
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th key={c.key} onClick={() => toggle(c.key)} className={sort.key === c.key ? "sorted" : ""}>
                {c.label}
                {sort.key === c.key && <span className="sort-arrow">{sort.dir === "asc" ? " ▲" : " ▼"}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.path}>
              <td className="path">{r.path}</td>
              <td>{r.views.toLocaleString()}</td>
              <td>{r.unique.toLocaleString()}</td>
              <td>{r.bounce}%</td>
              <td>{r.avgTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
