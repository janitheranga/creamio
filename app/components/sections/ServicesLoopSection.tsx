"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { services } from "@/app/lib/data";

export default function ServicesLoopSection() {
  const [isPaused, setIsPaused] = useState(false);
  const repeatedServices = [...services, ...services];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-linear-to-br from-celadon-50 to-icy-aqua-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900"
        >
          Why Choose Creamio?
        </motion.h2>

        {/* Scrolling Loop */}
        <div
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: isPaused ? 0 : "-50%" }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {repeatedServices.map((service, idx) => (
              <motion.div
                key={`${service.id}-${idx}`}
                whileHover={{ scale: 1.05, y: -10 }}
                className="shrink-0 min-w-[250px]"
              >
                <div className="h-full bg-white rounded-xl p-8 border border-celadon-100 hover:border-celadon-400 hover:shadow-lg transition-all text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl mb-4"
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
