const OPTIONS = [
  { days: 7, label: "7D" },
  { days: 30, label: "30D" },
  { days: 90, label: "90D" },
];

export default function DateRangePicker({ range, onChange }) {
  return (
    <div className="range-picker" role="group" aria-label="Date range">
      {OPTIONS.map((o) => (
        <button
          key={o.days}
          className={o.days === range ? "range-btn active" : "range-btn"}
          onClick={() => onChange(o.days)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
