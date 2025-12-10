"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import { useCartStore } from "@/app/lib/store/cartStore";
import { Star, ShoppingCart, Trash2, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.discountedPrice,
      image: item.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Heart className="w-8 h-8 text-cherry-blossom-500 fill-cherry-blossom-500" />
              My Wishlist
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {items.length} {items.length === 1 ? "item" : "items"} saved for
              later
            </p>
          </div>
          {items.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearWishlist}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </motion.button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20 rounded-2xl border border-celadon-200 dark:border-celadon-800 p-12 text-center"
          >
            <Heart className="w-16 h-16 text-celadon-400 dark:text-celadon-600 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Start adding your favorite dairy products to save them for later!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 transition-all"
                >
                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isFlashSale && (
                      <div className="absolute top-3 left-3 bg-cherry-blossom-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        SALE
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-celadon-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {item.stock} in stock
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-celadon-600 dark:text-celadon-400 font-semibold uppercase">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-2 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-2xl font-bold text-celadon-600 dark:text-celadon-400">
                        ${item.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className="w-full mt-4 bg-celadon-500 hover:bg-celadon-600 disabled:bg-celadon-200 dark:bg-celadon-600 dark:hover:bg-celadon-700 dark:disabled:bg-celadon-800 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
