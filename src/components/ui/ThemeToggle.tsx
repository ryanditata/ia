import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeClass = "bg-slate-800 text-white";
  const baseClass =
    "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800 transition rounded-lg cursor-pointer";

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-700/50 transition cursor-pointer"
      >
        {theme === "light" && <Sun size={18} />}
        {theme === "dark" && <Moon size={18} />}
        {theme === "system" && <Laptop size={18} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-10 right-0 w-36 rounded-xl border border-slate-700 bg-slate-900 shadow-lg p-1 space-y-1">
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={`${baseClass} ${theme === "light" ? activeClass : ""}`}
          >
            <Sun size={16} /> Light
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={`${baseClass} ${theme === "dark" ? activeClass : ""}`}
          >
            <Moon size={16} /> Dark
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={`${baseClass} ${theme === "system" ? activeClass : ""}`}
          >
            <Laptop size={16} /> System
          </button>
        </div>
      )}
    </div>
  );
}