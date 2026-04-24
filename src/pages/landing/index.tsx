import Hero from "./hero";
import About from "./about";
import Type from "./type";
import Partner from "./partner";
import News from "./news";
import Contact from "./contact";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-jakarta-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Hero />
      <About />
      <Type />
      <Partner />
      <News />
      <Contact />
    </div>
  );
}

export default LandingPage;
