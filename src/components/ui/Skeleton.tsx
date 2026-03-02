import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200/80 dark:bg-gray-700/50 ${className}`}
      aria-hidden
    />
  );
}

export function TableRowSkeleton() {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-100 dark:border-gray-800"
    >
      <td className="px-6 py-5">
        <Skeleton className="h-8 w-8 rounded-full" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-9 w-40 rounded-full" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-6 w-20 rounded-md" />
      </td>
    </motion.tr>
  );
}
