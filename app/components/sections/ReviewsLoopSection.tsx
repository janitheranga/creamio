"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { reviews } from "@/app/lib/data";
import { Star } from "lucide-react";

export default function ReviewsLoopSection() {
  const [isPausedTop, setIsPausedTop] = useState(false);
  const [isPausedBottom, setIsPausedBottom] = useState(false);

  const baseReviews = [...reviews, ...reviews];
  const topRowReviews = [...baseReviews, ...baseReviews]; // 4x for smoother left loop
  const bottomRowReviews = [...baseReviews, ...baseReviews]; // 4x for a longer right loop

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-br from-celadon-50 to-icy-aqua-50 dark:from-slate-950 dark:to-celadon-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white"
        >
          What Our Customers Say
        </motion.h2>

        {/* Top Row - Scroll Left */}
        <div
          className="relative overflow-hidden mb-6 py-2"
          onMouseEnter={() => setIsPausedTop(true)}
          onMouseLeave={() => setIsPausedTop(false)}
        >
          <motion.div
            animate={{ x: isPausedTop ? 0 : ["0%", "-50%"] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {topRowReviews.map((review, idx) => (
              <motion.div
                key={`top-${review.id}-${idx}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 min-w-[300px]"
              >
                <div className="h-full bg-white dark:bg-slate-900 rounded-xl p-6 border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 hover:shadow-lg transition-all cursor-pointer">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm italic">
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        {review.name}
                      </p>
                      <p className="text-xs text-celadon-600 dark:text-celadon-400">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Scroll Right */}
        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPausedBottom(true)}
          onMouseLeave={() => setIsPausedBottom(false)}
        >
          <motion.div
            animate={{ x: isPausedBottom ? 0 : ["-50%", "0%"] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {bottomRowReviews.map((review, idx) => (
              <motion.div
                key={`bottom-${review.id}-${idx}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 min-w-[300px]"
              >
                <div className="h-full bg-white dark:bg-slate-900 rounded-xl p-6 border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 hover:shadow-lg transition-all cursor-pointer">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm italic">
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        {review.name}
                      </p>
                      <p className="text-xs text-celadon-600 dark:text-celadon-400">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
