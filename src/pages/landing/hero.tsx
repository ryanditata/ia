import HeroBackground from "@/assets/img/bgHero.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBackground})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-full px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-semibold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Global Collaboration for the Future of Academia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base text-slate-200/95 sm:text-lg lg:text-xl"
          >
            Empowering education and research through international partnerships,
            innovation, and shared knowledge across institutions worldwide.
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
    </div>
  );
}
