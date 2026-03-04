import { MapPin, Phone, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0f1f3d] to-[#0b172e] text-white">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-semibold">
              Cooperation and International Affairs 
            </h3>
            <p className="mt-6 max-w-md text-slate-300 leading-relaxed">
              Empowering education and research through international partnerships, innovation, and shared knowledge across institutions worldwide.
            </p>
          </div>

          {/* Program */}
          <div className="lg:ml-26">
            <h4 className="text-xl font-semibold">Program</h4>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>
                <a href="https://knb.dinus.id/" className="hover:text-white transition-colors cursor-pointer">
                  KNB Scholarship
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:ml-10">
            <h4 className="text-xl font-semibold">Contact</h4>
            <ul className="mt-6 space-y-5 text-slate-300">
              <li>
                <a
                  href="https://maps.app.goo.gl/TSfykKMo43eryVqY7"
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-white cursor-pointer"
                >
                  <MapPin className="mt-1 h-5 w-5 text-slate-400" />
                  <span>Jl. Imam Bonjol No.207, Semarang</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:international@dinus.id"
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-white cursor-pointer"
                >
                  <Mail className="h-5 w-5 text-slate-400" />
                  <span>international@dinus.id</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281391002282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-white cursor-pointer"
                >
                  <Phone className="h-5 w-5 text-slate-400" />
                  <span>+62 813-9100-2282</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kui_udinus/"
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-white cursor-pointer"
                >
                  <Instagram className="h-5 w-5 text-slate-400" />
                  <span>kui_udinus</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-6 border-t border-slate-700"></div>

        <div className="flex items-center justify-center text-sm text-slate-400 -mb-5">
          <p>
            © {new Date().getFullYear()} Dian Nuswantoro University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}