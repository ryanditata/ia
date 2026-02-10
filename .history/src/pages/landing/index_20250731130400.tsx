import About from "./about";
import Contact from "./contact";
import Hero from "./hero";
import News from "./news";
import Partner from "./partner";
import Type from "./type";

function LandingPage() {
  return (
    <div className="font-jakarta-sans">
      <Hero />
      <About />
      <Type />
      <Partner />
      <News />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
