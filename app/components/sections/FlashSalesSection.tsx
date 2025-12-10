"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { products } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store/cartStore";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import { Star, ShoppingCart, Zap, Heart } from "lucide-react";
import ProductDetailModal from "@/app/components/ProductDetailModal";

const flashSaleProducts = products.filter((p) => p.isFlashSale);

export default function FlashSalesSection() {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof flashSaleProducts)[0] | null
  >(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-white"
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Flash Sales
              </h2>
            </div>
            <p className="text-slate-600 mt-2">
              Limited time offers on selected products
            </p>
          </motion.div>
          <motion.a
            whileHover={{ x: 5 }}
            href="/flash-sales"
            className="text-celadon-600 font-semibold hover:text-celadon-700 cursor-pointer"
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
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white rounded-xl overflow-hidden border border-celadon-100 hover:border-celadon-400 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />

                {/* Top Left: Wishlist Button and Flash Sale Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
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
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(String(product.id))
                          ? "fill-cherry-blossom-500 text-cherry-blossom-500"
                          : "text-slate-600"
                      }`}
                    />
                  </motion.button>

                  {/* Flash Sale Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-cherry-blossom-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                  >
                    SALE
                  </motion.div>
                </div>

                {/* Stock Badge */}
                <div className="absolute top-3 right-3 bg-celadon-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.stock} left
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-celadon-600 font-semibold uppercase">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 mt-2 line-clamp-2">
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
                  <span className="text-xs text-slate-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-2xl font-bold text-celadon-600">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem({
                      id: String(product.id),
                      name: product.name,
                      price: product.discountedPrice,
                      image: product.image,
                    });
                  }}
                  className="w-full mt-4 bg-celadon-500 hover:bg-celadon-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
