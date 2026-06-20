import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { getNews } from "@/service/news/getNews";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

interface NewsData {
  header: {
    title: string;
    description: string;
  };
  items: NewsItem[];
}

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
  const [data, setData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const result = await getNews();
        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  const title = data?.header?.title;
  const description = data?.header?.description;
  const items = data?.items || [];

  return (
    <div
      id="news"
      className="relative bg-white py-20 dark:bg-slate-900"
    >
      <div ref={ref} className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          key={isLoading ? "loading" : "loaded"}
          variants={containerVariants}
          initial="hidden"
          animate={isInView && !isLoading ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </motion.div>

          {/* News Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((news, index) => {
              const IconComponent = (LucideIcons as any)[news.icon_name] || LucideIcons.Newspaper;
              return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {news.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {news.description}
                </p>
              </motion.div>
            );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
