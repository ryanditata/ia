import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import MapChart from "@/components/layouts/mapchart";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getAbout } from "@/service/about/getAbout";

interface AboutData {
  title: string;
  description: string;
  student_value: number;
  project_value: number;
  country_value: number;
  bottom_description: string;
}

const parseHighlightedText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(\{.*?\})/g);
  return parts.map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <strong key={index} className="text-slate-900 dark:text-white">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const result = await getAbout();
        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const title = data?.title;
  const description = data?.description;
  
  const computedStats = [
    {
      value: data?.student_value ?? 0,
      label: "Students",
      suffix: "+",
    },
    {
      value: data?.project_value ?? 0,
      label: "Completed Projects",
      suffix: "+",
    },
    {
      value: data?.country_value ?? 0,
      label: "Countries",
      suffix: "+",
    },
  ];

  const bottomDescription = data?.bottom_description;

  return (
    <div
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

      <div ref={ref} className="container relative mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          key={isLoading ? "loading" : "loaded"}
          variants={containerVariants}
          initial="hidden"
          animate={isInView && !isLoading ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-slate-400 lg:text-lg">
              {description}
            </p>
          </motion.div>

          {/* Glassmorphism Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {computedStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50 dark:hover:border-primary-500/20"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-100/50 dark:bg-primary-900/20" />
                <div className="relative">
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 sm:text-4xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <p key={bottomDescription} className="text-base leading-relaxed text-slate-600 dark:text-slate-400 lg:text-lg">
              {parseHighlightedText(bottomDescription)}
            </p>
          </motion.div>

          {/* Map Chart */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 md:p-4 lg:p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50">
              <MapChart />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
