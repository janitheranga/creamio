"use client";

import { motion } from "motion/react";
import { products } from "@/app/lib/data";
import { Star, ShoppingCart, Zap } from "lucide-react";

const flashSaleProducts = products.filter((p) => p.isFlashSale);

export default function FlashSalesSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-cherry-blossom-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Flash Sales
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Limited time offers on selected products
            </p>
          </motion.div>
          <motion.a
            whileHover={{ x: 5 }}
            href="/flash-sales"
            className="text-celadon-600 dark:text-celadon-400 font-semibold hover:text-celadon-700 cursor-pointer"
          >
            View All
          </motion.a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 transition-all"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Flash Sale Badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-3 left-3 bg-cherry-blossom-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                >
                  SALE
                </motion.div>

                {/* Stock Badge */}
                <div className="absolute top-3 right-3 bg-celadon-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.stock} left
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-celadon-600 dark:text-celadon-400 font-semibold uppercase">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-2xl font-bold text-celadon-600 dark:text-celadon-400">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-cherry-blossom-500 ml-auto">
                    {Math.round(
                      ((product.price - product.discountedPrice) /
                        product.price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
