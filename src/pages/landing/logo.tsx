import { useEffect, useState, useRef } from "react";
import LogoLoop from "@/components/ui/LogoLoop";
import { getLogos } from "@/service/logo/getLogos";
import { motion, useInView } from "framer-motion";
import { University, GraduationCap, BookOpen, Globe2, Library, Microscope } from "lucide-react";

interface LogoItem {
  id: number;
  nama: string;
  type: string;
  image_url: string;
  is_active: boolean;
}

// Fallback nodes if API doesn't have enough logos
const fallbackLogos = [
  { node: <University size={48} className="text-slate-400 dark:text-slate-600" /> },
  { node: <GraduationCap size={48} className="text-slate-400 dark:text-slate-600" /> },
  { node: <BookOpen size={48} className="text-slate-400 dark:text-slate-600" /> },
  { node: <Globe2 size={48} className="text-slate-400 dark:text-slate-600" /> },
  { node: <Library size={48} className="text-slate-400 dark:text-slate-600" /> },
  { node: <Microscope size={48} className="text-slate-400 dark:text-slate-600" /> },
];

export default function LogoSection() {
  const [univLogos, setUnivLogos] = useState<any[]>(fallbackLogos);
  const [mitraLogos, setMitraLogos] = useState<any[]>(fallbackLogos);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const fetchLogosData = async () => {
      try {
        const res = await getLogos();
        if (res?.data) {
          const mapLogos = (items: LogoItem[]) => {
            if (!items || items.length === 0) return fallbackLogos;
            return items.filter(item => item.is_active).map(item => ({
              src: item.image_url,
              alt: item.nama,
            }));
          };
          
          setUnivLogos(mapLogos(res.data.univ));
          setMitraLogos(mapLogos(res.data.mitra));
        }
      } catch (error) {
        console.error("Failed to fetch logos API", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogosData();
  }, []);

  return (
    <div className="relative bg-slate-50 py-12 dark:bg-slate-950">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={isLoading ? "loading" : "loaded"}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !isLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-12"
        >
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Universities & Corporate Partners
            </p>
          </div>
          
          <div className="w-full max-w-6xl mx-auto space-y-8 overflow-hidden">
            {!isLoading && (
              <>
                <div className="space-y-4">
                  <LogoLoop
                    logos={univLogos}
                    speed={30}
                    direction="left"
                    logoHeight={56}
                    gap={80}
                    pauseOnHover={true}
                  />
                </div>
                
                <div className="space-y-4">
                  <LogoLoop
                    logos={mitraLogos}
                    speed={30}
                    direction="right"
                    logoHeight={56}
                    gap={80}
                    pauseOnHover={true}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
