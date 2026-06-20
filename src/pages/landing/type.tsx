import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { getTypes } from "@/service/type/getType";

interface TypeItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  image_url: string;
}

interface TypeData {
  header: {
    title: string;
    description: string;
  };
  items: TypeItem[];
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

export default function Type() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [data, setData] = useState<TypeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTypesData = async () => {
      try {
        const result = await getTypes();
        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching types data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTypesData();
  }, []);

  const title = data?.header?.title;
  const description = data?.header?.description;
  const items = data?.items || [];

  return (
    <div
      id="collaboration-types"
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

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => {
              const IconComponent = (LucideIcons as any)[item.icon_name] || LucideIcons.Circle;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300  hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50"
                >
                  {/* Image Section */}
                  <div className="relative h-44 w-full bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-all duration-300 group-hover:scale-110 dark:bg-primary-900/50 dark:text-primary-400">
                      <IconComponent size={22} strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
