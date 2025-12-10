"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { notifications } from "@/app/lib/data";

export default function NotificationBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = notifications[currentIndex];

  return (
    <div
      className="bg-linear-to-r from-celadon-500 to-icy-aqua-500 py-3 px-4 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-1"
        >
          <p className="text-sm font-medium">{current.title}</p>
          <p className="text-xs opacity-90">{current.description}</p>
        </motion.div>

        {/* Indicator dots */}
        <div className="flex gap-1">
          {notifications.map((_, idx) => (
            <motion.div
              key={idx}
              className="h-1.5 rounded-full cursor-pointer transition-colors"
              animate={{
                backgroundColor:
                  idx === currentIndex
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(255, 255, 255, 0.5)",
                width: idx === currentIndex ? "24px" : "6px",
              }}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
