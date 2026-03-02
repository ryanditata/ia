import Footer from "@/components/layouts/footer";
import About from "./about";
import Contact from "./contact";
import Hero from "./hero";
import News from "./news";
import Partner from "./partner";
import Type from "./type";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-jakarta-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Hero />
      <About />
      <Type />
      <Partner />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
