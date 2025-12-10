"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { topCategories } from "@/app/lib/data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TopCategoriesSection() {
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
          Top Categories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <Link
                href={`/products?category=${category.name}`}
                className="block h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-4 group-hover:translate-x-2 transition-transform transition-delay-100">
                    {category.description}
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-celadon-300 group-hover:text-celadon-200 transition-colors font-semibold"
                  >
                    Explore <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
