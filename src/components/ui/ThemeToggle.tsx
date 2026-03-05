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

  return (
    <div className="relative">
      {/* Button */}
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
        <div className="absolute bottom-10 right-0 w-36 rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800 cursor-pointer"
          >
            <Sun size={16} /> Light
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800 cursor-pointer"
          >
            <Moon size={16} /> Dark
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800 cursor-pointer"
          >
            <Laptop size={16} /> System
          </button>
        </div>
      )}
    </div>
  );
}