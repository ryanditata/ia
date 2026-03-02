import { Link } from "react-scroll";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Dian Nuswantoro University. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            <Link
              to="about"
              smooth
              duration={500}
              className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              About
            </Link>
            <Link
              to="partners"
              smooth
              duration={500}
              className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Partners
            </Link>
            <Link
              to="contact"
              smooth
              duration={500}
              className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
