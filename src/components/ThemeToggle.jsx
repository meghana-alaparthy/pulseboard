export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button className="theme-btn" onClick={onToggle} aria-label="Toggle color theme">
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
