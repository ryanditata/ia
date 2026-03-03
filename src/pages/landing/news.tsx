import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { newsData } from "@/constants/newsData";
import { Newspaper } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      id="news"
      className="relative bg-white py-20 dark:bg-slate-900"
    >
      <div ref={ref} className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              News and Events
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Stay updated with our latest news and events. We are committed to
              providing up-to-date information about global academic collaborations.
            </p>
          </motion.div>

          {/* News Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {newsData.map((news, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <Newspaper size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {news.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {news.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
