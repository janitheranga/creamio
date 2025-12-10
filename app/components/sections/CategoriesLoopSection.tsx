"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { categories } from "@/app/lib/data";
import Link from "next/link";

export default function CategoriesLoopSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Create a repeating array for infinite scroll effect
  const repeatedCategories = [...categories, ...categories];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white"
        >
          Shop by Categories
        </motion.h2>

        {/* Scrolling Loop */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: isPaused ? 0 : "-50%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {repeatedCategories.map((category, idx) => (
              <motion.div
                key={`${category.id}-${idx}`}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex-shrink-0 min-w-[200px]"
              >
                <Link
                  href={`/products?category=${category.name}`}
                  className="block h-full cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/30 dark:to-icy-aqua-900/30 rounded-xl p-6 text-center border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 transition-all h-full flex flex-col items-center justify-center gap-4">
                    <span className="text-5xl">{category.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
