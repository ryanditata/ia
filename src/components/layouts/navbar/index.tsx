import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/img/logo.png";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { to: "hero", label: "Home" },
  { to: "about", label: "About Us" },
  { to: "collaboration-types", label: "Collaboration" },
  { to: "partners", label: "Partners" },
  { to: "news", label: "News" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClassName = scrolled
    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20"
    : "bg-transparent";

  const linkClass = (to: string) => {
    const isActive = activeSection === to;
    const baseClass =
      "cursor-pointer text-sm font-medium transition-all duration-300 ease-in-out rounded-lg px-3 py-2";
    if (scrolled) {
      return isActive
        ? "text-primary-600 dark:text-primary-400"
        : "text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400";
    }
    return isActive
      ? "text-white"
      : "text-white/90 hover:text-white";
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${navClassName}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="hero" smooth duration={500}>
          <img
            src={Logo}
            alt="Logo"
            className="h-10 transition-transform duration-300 hover:scale-105 lg:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-4 md:flex cursor-pointer">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                smooth
                duration={500}
                className={linkClass(item.to)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://lkui.dinus.id/login"
            className="group relative rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 ease-in-out hover:bg-primary-700 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Login</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-lg p-2 transition-colors duration-300 md:hidden ${
            scrolled
              ? "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95 md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    smooth
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-slate-700 transition-all duration-200 dark:text-slate-300 ${
                      activeSection === item.to
                        ? "bg-primary-50 font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-700">
              <a
                href="https://lkui.dinus.id/login"
                className="flex w-full items-center justify-center rounded-full bg-primary-600 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:bg-primary-700"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
