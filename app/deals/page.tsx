"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store/cartStore";
import {
  Star,
  ShoppingCart,
  Heart,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import ProductDetailModal from "@/app/components/ProductDetailModal";
import TopCategoriesSection from "@/app/components/sections/TopCategoriesSection";
import ReviewsLoopSection from "@/app/components/sections/ReviewsLoopSection";

export default function DealsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [sortBy, setSortBy] = useState<"discount" | "price" | "newest">(
    "discount"
  );

  // Get flash sale products and sort them
  const dealProducts = useMemo(() => {
    const deals = products
      .filter((p) => p.isFlashSale)
      .map((p) => ({
        ...p,
        discount: Math.round(((p.price - p.discountedPrice) / p.price) * 100),
      }));

    if (sortBy === "discount") {
      return deals.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "price") {
      return deals.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else {
      return deals;
    }
  }, [sortBy]);

  const topDeals = dealProducts.slice(0, 6);
  const avgDiscount = Math.round(
    dealProducts.reduce((sum, p) => sum + p.discount, 0) / dealProducts.length
  );
  const totalSavings = dealProducts.reduce(
    (sum, p) => sum + (p.price - p.discountedPrice),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-cherry-blossom-50 to-cherry-blossom-100 dark:from-cherry-blossom-950 dark:to-cherry-blossom-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cherry-blossom-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-celadon-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-10 h-10 text-cherry-blossom-600 dark:text-cherry-blossom-400" />
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                Lightning Deals
              </h1>
              <Zap className="w-10 h-10 text-cherry-blossom-600 dark:text-cherry-blossom-400" />
            </div>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Limited time offers on premium dairy products. Save up to{" "}
              {Math.max(...dealProducts.map((p) => p.discount))}% on your
              favorite items!
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: TrendingUp,
                label: "Average Discount",
                value: `${avgDiscount}%`,
              },
              { icon: Zap, label: "Active Deals", value: dealProducts.length },
              {
                icon: Clock,
                label: "Total Savings",
                value: `$${totalSavings.toFixed(2)}`,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/80 dark:bg-slate-900/50 rounded-lg p-6 border border-white/20 dark:border-slate-800/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <stat.icon className="w-10 h-10 text-cherry-blossom-500" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Top Deals This Week
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Don't miss out on these incredible limited-time offers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDeals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-cherry-blossom-400 dark:hover:border-cherry-blossom-500 transition-all cursor-pointer shadow-md hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 left-4 bg-cherry-blossom-500 text-white px-4 py-2 rounded-full text-sm font-bold"
                  >
                    -{product.discount}%
                  </motion.div>

                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const wishlistItem = {
                        id: String(product.id),
                        name: product.name,
                        price: product.price,
                        discountedPrice: product.discountedPrice,
                        image: product.image,
                        category: product.category,
                        rating: product.rating,
                        reviews: product.reviews,
                        stock: product.stock,
                        isFlashSale: product.isFlashSale,
                      };
                      if (isInWishlist(String(product.id))) {
                        removeFromWishlist(String(product.id));
                      } else {
                        addToWishlist(wishlistItem);
                      }
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(String(product.id))
                          ? "fill-cherry-blossom-500 text-cherry-blossom-500"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    />
                  </motion.button>

                  <div className="absolute bottom-4 right-4 bg-celadon-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.stock} left
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-celadon-600 dark:text-celadon-400 font-semibold uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
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
                  <div className="flex items-center gap-3 mt-4 mb-4">
                    <span className="text-3xl font-bold text-cherry-blossom-600 dark:text-cherry-blossom-400">
                      ${product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({
                        id: String(product.id),
                        name: product.name,
                        price: product.discountedPrice,
                      });
                    }}
                    className="w-full bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Deals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                All Deals
              </h2>

              {/* Sort Dropdown */}
              <div className="flex gap-2">
                {[
                  { value: "discount", label: "Highest Discount" },
                  { value: "price", label: "Lowest Price" },
                  { value: "newest", label: "Newest" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSortBy(option.value as typeof sortBy);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      sortBy === option.value
                        ? "bg-cherry-blossom-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* All Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {dealProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedProduct(product)}
                    className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-cherry-blossom-400 dark:hover:border-cherry-blossom-500 transition-all cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Discount Badge */}
                      <div className="absolute top-2 left-2 bg-cherry-blossom-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{product.discount}%
                      </div>

                      {/* Wishlist Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const wishlistItem = {
                            id: String(product.id),
                            name: product.name,
                            price: product.price,
                            discountedPrice: product.discountedPrice,
                            image: product.image,
                            category: product.category,
                            rating: product.rating,
                            reviews: product.reviews,
                            stock: product.stock,
                            isFlashSale: product.isFlashSale,
                          };
                          if (isInWishlist(String(product.id))) {
                            removeFromWishlist(String(product.id));
                          } else {
                            addToWishlist(wishlistItem);
                          }
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-900/90 rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors z-10"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isInWishlist(String(product.id))
                              ? "fill-cherry-blossom-500 text-cherry-blossom-500"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-celadon-600 dark:text-celadon-400 font-semibold uppercase">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-cherry-blossom-600 dark:text-cherry-blossom-400">
                          ${product.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: String(product.id),
                            name: product.name,
                            price: product.discountedPrice,
                          });
                        }}
                        className="w-full mt-3 bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Categories Section */}
      <TopCategoriesSection />

      {/* Reviews Section */}
      <ReviewsLoopSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.div>
  );
}
