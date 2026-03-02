import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cooperationTypes } from "@/constants/cooperationTypes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
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

  return (
    <div
      id="collaboration-types"
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
              Types of Collaboration
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              We offer various collaborations open to students from universities
              worldwide. Each type provides a unique learning experience.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cooperationTypes.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 hover:scale-[1.02] dark:border-slate-700/80 dark:bg-slate-800/50 dark:shadow-slate-900/50"
                >
                  {/* Icon in circle */}
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 transition-all duration-300 group-hover:bg-primary-200 group-hover:scale-110 dark:bg-primary-900/50 dark:text-primary-400 dark:group-hover:bg-primary-800/50">
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-center text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
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
