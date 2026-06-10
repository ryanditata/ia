import { motion } from "framer-motion";
import { SearchX, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onBack?: () => void;
}

export default function NotFound({
  title = "Data Not Found",
  description = "We couldn't find the data you're looking for. It might have been removed or the ID is incorrect.",
  buttonText = "Go Back",
  onBack,
}: NotFoundProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center text-center"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/20" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <SearchX className="h-10 w-10 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
          </div>
        </motion.div>

        <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          {description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <ChevronLeft size={18} />
          {buttonText}
        </motion.button>
      </motion.div>
    </div>
  );
}