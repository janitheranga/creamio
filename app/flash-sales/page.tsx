"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store/cartStore";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import {
  Star,
  ShoppingCart,
  Heart,
  Zap,
  Timer,
  TrendingUp,
  Percent,
  Package,
} from "lucide-react";
import ProductDetailModal from "@/app/components/ProductDetailModal";
import TopCategoriesSection from "@/app/components/sections/TopCategoriesSection";
import ReviewsLoopSection from "@/app/components/sections/ReviewsLoopSection";

export default function FlashSalesPage() {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"discount" | "price" | "rating">(
    "discount"
  );

  // Get flash sale products
  const flashSaleProducts = useMemo(() => {
    let filtered = products
      .filter((p) => p.isFlashSale)
      .map((p) => ({
        ...p,
        discount: Math.round(((p.price - p.discountedPrice) / p.price) * 100),
      }));

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    // Sort
    if (sortBy === "discount") {
      return filtered.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "price") {
      return filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else {
      return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [filterCategory, sortBy]);

  const categories = [
    "all",
    ...new Set(products.filter((p) => p.isFlashSale).map((p) => p.category)),
  ];
  const maxDiscount = Math.max(...flashSaleProducts.map((p) => p.discount));
  const avgDiscount = Math.round(
    flashSaleProducts.reduce((sum, p) => sum + p.discount, 0) /
      flashSaleProducts.length
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-cherry-blossom-100 via-cherry-blossom-50 to-white dark:from-cherry-blossom-950 dark:via-cherry-blossom-900 dark:to-slate-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-40 h-40 bg-cherry-blossom-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-52 h-52 bg-celadon-400 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-3 mb-6 bg-cherry-blossom-500 text-white px-6 py-3 rounded-full"
            >
              <Zap className="w-6 h-6 fill-white" />
              <span className="font-bold text-lg">FLASH SALE ACTIVE</span>
              <Zap className="w-6 h-6 fill-white" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Flash Sales
            </h1>
            <p className="text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Unbeatable prices on premium dairy products. Limited stock
              available!
            </p>

            {/* Countdown Timer Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl shadow-xl border-2 border-cherry-blossom-300 dark:border-cherry-blossom-700"
            >
              <Timer className="w-6 h-6 text-cherry-blossom-600 dark:text-cherry-blossom-400" />
              <div className="text-left">
                <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">
                  Sale Ends In
                </p>
                <div className="flex gap-2 text-2xl font-bold text-slate-900 dark:text-white">
                  <span>23:59:45</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Percent,
                label: "Max Discount",
                value: `${maxDiscount}%`,
                color: "cherry-blossom",
              },
              {
                icon: Package,
                label: "Products on Sale",
                value: flashSaleProducts.length,
                color: "celadon",
              },
              {
                icon: TrendingUp,
                label: "Average Savings",
                value: `${avgDiscount}%`,
                color: "icy-aqua",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon
                      className={`w-7 h-7 text-${stat.color}-600 dark:text-${stat.color}-400`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filter */}
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                        filterCategory === cat
                          ? "bg-cherry-blossom-500 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  Sort by
                </p>
                <div className="flex gap-2">
                  {[
                    { value: "discount", label: "Discount" },
                    { value: "price", label: "Price" },
                    { value: "rating", label: "Rating" },
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
                          ? "bg-celadon-500 dark:bg-celadon-600 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {flashSaleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-cherry-blossom-400 dark:hover:border-cherry-blossom-500 transition-all cursor-pointer shadow-md hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-3 left-3 bg-cherry-blossom-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
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
                      className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors z-10 shadow-md"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isInWishlist(String(product.id))
                            ? "fill-cherry-blossom-500 text-cherry-blossom-500"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      />
                    </motion.button>

                    {/* Stock Badge */}
                    <div className="absolute bottom-3 left-3 bg-celadon-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      {product.stock} left
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-celadon-600 dark:text-celadon-400 font-semibold uppercase tracking-wide">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-2 line-clamp-2">
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
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <span className="text-2xl font-bold text-cherry-blossom-600 dark:text-cherry-blossom-400">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
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
                      className="w-full bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {flashSaleProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Package className="w-20 h-20 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Shop Flash Sales Section */}
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
              Why Shop Our Flash Sales?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get the best deals on premium dairy products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Deals",
                description:
                  "Grab amazing discounts before they're gone. New deals added daily!",
              },
              {
                icon: Percent,
                title: "Huge Savings",
                description:
                  "Save up to 50% on selected products. Quality guaranteed.",
              },
              {
                icon: Package,
                title: "Fresh Products",
                description:
                  "All flash sale items are fresh and of the highest quality.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 border border-celadon-100 dark:border-celadon-800 text-center"
              >
                <div className="w-16 h-16 bg-cherry-blossom-100 dark:bg-cherry-blossom-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-cherry-blossom-600 dark:text-cherry-blossom-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
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
