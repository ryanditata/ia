import { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { TextAlignEnd, X } from "lucide-react";
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

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isSolid = !isHomePage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    
    if (isHomePage) {
      scroller.scrollTo(to, { smooth: true, duration: 500 });
    } else {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(to, { smooth: true, duration: 500 });
      }, 100);
    }
  };

  const navClassName = isSolid
    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20"
    : "bg-transparent";

  const checkIsActive = (to: string) => {
    if (isHomePage) {
      return activeSection === to;
    }
    if (to === "partners") {
      return (
        location.pathname.includes("/partners") || 
        location.pathname.includes("/mous") || 
        location.pathname.includes("/moas") ||
        location.pathname.includes("/ias")
      );
    }
    return location.pathname.includes(`/${to}`);
  };

  const linkClass = (to: string) => {
    const isActive = checkIsActive(to);
    const baseClass = "cursor-pointer transition-all duration-300 ease-in-out rounded-lg py-2";

    if (isSolid) {
      return `${baseClass} ${isActive
        ? "text-primary-600 dark:text-primary-400"
        : "text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"}`;
    }
    return `${baseClass} ${isActive
      ? "text-white"
      : "text-white/90 hover:text-white"}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${navClassName}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => handleNavClick("hero")} className="cursor-pointer">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 transition-transform duration-300 hover:scale-105 lg:h-12"
          />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <button onClick={() => handleNavClick(item.to)} className={linkClass(item.to)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://lkui.dinus.id/login"
            className="group relative rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary-700"
          >
            <span className="relative z-10">Login</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-lg p-2 transition-colors duration-300 md:hidden cursor-pointer ${
            isSolid
              ? "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
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
              {navItems.map((item) => {
                const isActive = checkIsActive(item.to);
                return (
                <li key={item.to}>
                  <button
                    onClick={() => handleNavClick(item.to)}
                    className={`block w-full text-left rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary-50 font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
              })}
            </ul>
            <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-700">
              <a
                href="https://lkui.dinus.id/login"
                className="flex w-full items-center justify-center rounded-full bg-primary-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-700"
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