import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { TextAlignEnd, X, MoveUpRight } from "lucide-react";
import Logo from "@/assets/img/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-400 ${
        scrolled ? "bg-white shadow-lg shadow-black/5" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 lg:h-14" />
        </div>
        <ul className={`hidden items-center md:flex md:space-x-8`}>
          <li className="nav-item">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="about"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="collaboration-types"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                Collaboration
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="partners"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                Partners
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="news"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                News
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className={`nav-link cursor-pointer text-lg font-medium transition-all duration-300 md:text-sm
                ${scrolled 
                  ? "text-gray-700 hover:text-primary-600" 
                  : "text-neutral-50 hover:text-primary-600"
                }`}
              >
                Contact
            </Link>
          </li>
          <a
            href="https://lkui.dinus.id/login" 
            className="rounded-full bg-[#114D91] px-6 py-2 text-sm font-semibold text-white shadow-md shadow-black/10 transition-all duration-200 hover:bg-primary-600 active:scale-95 cursor-pointer">
            Login
          </a>
        </ul>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none transition-colors duration-300
                ${scrolled 
                  ? "text-gray-700 hover:text-black" 
                  : "text-neutral-50 hover:text-white"
                }`}
          >
            {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
          </button>
          {isOpen && (
            <div className="absolute top-16 right-14 w-64 rounded-xl bg-white p-4 shadow-xl shadow-black/10">
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    to="hero"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="about"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="collaboration-types"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Collaboration
                  </Link>
                </li>

                <li>
                  <Link
                    to="partners"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Partners
                  </Link>
                </li>

                <li>
                  <Link
                    to="news"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="contact"
                    smooth
                    duration={500}
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="my-4 border-t border-gray-300"></div>

              <a
                href="https://wa.me/6281391002282"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#114D91] py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-primary-50"
              >
                Partner With Us <MoveUpRight size={14} />
              </a>

              <a
                href="https://lkui.dinus.id/login"
                className="mt-3 block w-full rounded-lg bg-[#114D91] py-2 text-sm text-center font-medium text-white shadow-md transition-all duration-200 hover:bg-primary-600">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
