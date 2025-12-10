"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store/cartStore";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductDetailModal from "@/app/components/ProductDetailModal";

const bestSellingProducts = products
  .sort(() => Math.random() - 0.5)
  .slice(0, 8);

export default function BestSellingSection() {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

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
          Best Selling Products
        </motion.h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />

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
                  className="absolute top-3 left-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors cursor-pointer z-10"
                  aria-label="Add to wishlist"
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

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.section>
  );
}
