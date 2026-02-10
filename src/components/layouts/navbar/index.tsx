import { useState, useEffect } from "react";
import { Link } from "react-scroll";
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
        scrolled ? "bg-primary-800" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-6">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 lg:h-16" />
        </div>
        <ul className={`hidden md:flex md:space-x-8`}>
          <li className="nav-item">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="collaboration-types"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              Collaboration
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="partners"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              Partner
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="news"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold md:text-sm"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-neutral-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <ul className="bg-primary-800 absolute top-16 right-14 rounded-lg px-4 py-2 shadow-md shadow-black">
              <li>
                <Link
                  to="hero"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="collaboration-types"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  Collaboration
                </Link>
              </li>
              <li>
                <Link
                  to="partners"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  to="news"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 text-sm text-neutral-50 ease-in-out hover:font-bold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
