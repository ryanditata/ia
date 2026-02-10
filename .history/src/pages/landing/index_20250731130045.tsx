import About from "./about";
import Hero from "./hero";

function LandingPage() {
  return (
    <div className="font-jakarta-sans">
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
