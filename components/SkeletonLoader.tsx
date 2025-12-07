"use client";

import { motion } from 'framer-motion';

export default function SkeletonLoader({ 
  className = "", 
  height = "h-4", 
  width = "w-full",
  rounded = "rounded"
}: {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}) {
  return (
    <motion.div
      className={`${height} ${width} ${rounded} bg-slate-200 dark:bg-slate-700 ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <SkeletonLoader height="h-6" width="w-3/4" className="mb-4" />
      <SkeletonLoader height="h-4" className="mb-2" />
      <SkeletonLoader height="h-4" className="mb-2" />
      <SkeletonLoader height="h-4" width="w-5/6" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <SkeletonLoader height="h-20" width="w-full" className="mb-6 mx-auto" />
        <SkeletonLoader height="h-8" width="w-2/3" className="mb-10 mx-auto" />
        <div className="flex gap-4 justify-center mb-16">
          <SkeletonLoader height="h-12" width="w-32" rounded="rounded-md" />
          <SkeletonLoader height="h-12" width="w-32" rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
}
