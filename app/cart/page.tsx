"use client";

import { motion } from "motion/react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <ShoppingCart className="w-8 h-8 text-celadon-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Shopping Cart
          </h1>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-linear-to-br from-celadon-50 to-icy-aqua-50 rounded-2xl border border-celadon-200 p-12 text-center"
        >
          <ShoppingCart className="w-16 h-16 text-celadon-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-slate-600 mb-6">
            Add some delicious dairy products to your cart and start shopping!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-celadon-500 hover:bg-celadon-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
