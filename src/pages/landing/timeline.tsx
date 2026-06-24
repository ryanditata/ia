import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { getProcedures } from "@/service/procedure/getProcedures";

export type StepStatus = "completed" | "current" | "pending";

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  icon: string;
  action?: {
    href: string;
    target?: string;
  };
}

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [stepsData, setStepsData] = useState<TimelineStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const result = await getProcedures();
        if (result.success && result.data) {
          const { completed = [], current = [], pending = [] } = result.data;
          
          const combined: TimelineStep[] = [
            ...completed,
            ...current.map((item: any) => ({
              ...item,
              action: {
                href: "https://wa.me/6281391002282?text=Halo%20Admin%20LKUI,%20Saya%20ingin%20mengajukan%20permohonan%20kerja%20sama.",
                target: "_blank"
              }
            })),
            ...pending
          ];
          
          combined.sort((a, b) => a.id - b.id);

          setStepsData(combined);
        }
      } catch (error) {
        console.error("Error fetching procedures data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProcedures();
  }, []);

  return (
    <div
      id="procedure"
      className="relative bg-white py-20 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-50" />

      <div
        ref={ref}
        className="container relative mx-auto max-w-full px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          key={isLoading ? "loading" : "loaded"}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-full md:max-w-2xl xl:max-w-4xl 2xl:max-w-7xl space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Cooperation Procedures
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative py-4">
            {!isLoading && stepsData.map((step, index) => {
              const IconComponent = (LucideIcons as any)[step.icon] || LucideIcons.FileText;
              const isLast = index === stepsData.length - 1;
              const isLineActive = step.status === "completed";

              return (
                <div key={step.id} className="relative pl-12 sm:pl-32 py-6 group">
                  {/* Connecting Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-[1.5rem] sm:left-[5rem] top-16 bottom-[-1.5rem] w-[2px] -translate-x-1/2 transition-colors duration-500 overflow-hidden ${
                        isLineActive
                          ? "bg-primary-500 dark:bg-primary-500"
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    >
                      {step.status === "current" && stepsData[index + 1]?.status === "pending" && (
                        <motion.div
                          className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary-500 to-primary-500"
                          animate={{ y: ["-200%", "300%"] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`absolute left-[1.5rem] sm:left-[5rem] top-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white transition-all duration-500 dark:bg-slate-950 z-10 ${
                      step.status === "completed"
                        ? "border-primary-500 text-primary-600 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] dark:border-primary-500 dark:text-primary-400 dark:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
                        : step.status === "current"
                        ? "border-primary-500 text-primary-600 ring-4 ring-primary-500/30 animate-pulse dark:border-primary-400 dark:text-primary-400"
                        : "border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600"
                    }`}
                  >
                    <IconComponent size={22} strokeWidth={2} />

                    {/* Checkmark Badge for Completed */}
                    {step.status === "completed" && (
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950">
                        <LucideIcons.CheckCircle2
                          size={18}
                          className="text-emerald-500 fill-emerald-100 dark:fill-emerald-950"
                        />
                      </div>
                    )}
                  </div>

                  {/* Content Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    {/* Desktop Step Label */}
                    <div className="hidden sm:flex w-16 shrink-0 justify-end">
                      <span
                        className={`text-sm font-bold uppercase tracking-wider ${
                          step.status === "completed" || step.status === "current"
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        Step {index + 1}
                      </span>
                    </div>

                    {/* Content Card */}
                    <motion.div
                      onClick={() => {
                        if (step.action) {
                          window.open(step.action.href, step.action.target || "_self");
                        }
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex w-full flex-col p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        step.status === "current"
                          ? "border-primary-500/50 bg-primary-50/50 shadow-md shadow-primary-500/5 dark:bg-primary-500/10 dark:border-primary-500/30"
                          : step.status === "completed"
                          ? "border-slate-200/80 bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
                          : "border-slate-100 bg-slate-50/50 dark:border-slate-800/50 dark:bg-slate-900/30"
                      } ${step.action ? "cursor-pointer hover:border-primary-500 hover:ring-2 hover:ring-primary-500/20" : ""}`}
                    >
                      <h3
                        className={`text-lg font-semibold sm:text-xl ${
                          step.status === "pending"
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed sm:text-base ${
                          step.status === "pending"
                            ? "text-slate-400 dark:text-slate-500"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
