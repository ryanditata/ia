import HeroBackground from "@/assets/img/bgHero.png";
import Navbar from "@/components/layouts/navbar";

export default function Hero() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center"
      id="hero"
      style={{ backgroundImage: `url(${HeroBackground})` }}
    >
      <Navbar />
      <div className="container space-y-2 text-neutral-50 text-shadow-black text-shadow-md">
        <h1 className="text-xl font-bold text-wrap md:text-4xl lg:text-6xl">
          Global Collaboration for the Future of Academia
        </h1>
        <p className="text-xs md:text-base lg:text-lg">
          Empowering education and research through international partnerships,
          innovation, and shared knowledge across institutions worldwide.
        </p>
      </div>
    </div>
  );
}
