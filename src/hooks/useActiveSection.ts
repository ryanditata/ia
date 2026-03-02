import { useState, useEffect } from "react";

const sectionIds = ["hero", "about", "collaboration-types", "partners", "news", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const middle = scrollY + windowHeight / 2;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (middle >= offsetTop && middle < offsetTop + offsetHeight) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
