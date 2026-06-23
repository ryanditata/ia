import Hero from "./hero";
import Logo from "./logo";
import About from "./about";
import Type from "./type";
import Timeline from "./timeline";
import Partner from "./partner";
import News from "./news";
import Contact from "./contact";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-jakarta-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Hero />
      <Logo />
      <About />
      <Type />
      <Timeline />
      <Partner />
      <News />
      <Contact />
    </div>
  );
}

export default LandingPage;
