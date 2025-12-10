"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/app/lib/store/cartStore";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  isFlashSale?: boolean;
  description?: string;
};

type ProductDetailModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useState(() => {
    setMounted(true);
  });

  if (!product || !isOpen || !mounted) return null;

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.discountedPrice,
      qty: quantity,
    });
    onClose();
  };

  const discount = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isFlashSale && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 left-4 bg-cherry-blossom-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    SALE {discount}% OFF
                  </motion.div>
                )}
                <div className="absolute top-4 right-4 bg-celadon-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {product.stock} in stock
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col gap-4">
              {/* Category */}
              <p className="text-xs uppercase tracking-wide text-celadon-600 dark:text-celadon-400 font-semibold">
                {product.category}
              </p>

              {/* Product Name */}
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-celadon-600 dark:text-celadon-400">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                {product.isFlashSale && (
                  <span className="px-2 py-1 bg-cherry-blossom-100 dark:bg-cherry-blossom-900/30 text-cherry-blossom-600 dark:text-cherry-blossom-400 text-sm font-bold rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-celadon-100 dark:border-celadon-800 pt-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {product.description ||
                    `Premium quality ${product.name.toLowerCase()} made with the finest ingredients. Fresh, nutritious, and delicious - perfect for your daily needs. Our products are sourced from trusted farms and delivered fresh to ensure the best quality.`}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="border-t border-celadon-100 dark:border-celadon-800 pt-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-celadon-50 dark:bg-celadon-900/60 px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 rounded-full hover:bg-celadon-100 dark:hover:bg-celadon-800 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center text-lg font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="p-1 rounded-full hover:bg-celadon-100 dark:hover:bg-celadon-800 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full mt-4 bg-celadon-500 hover:bg-celadon-600 disabled:bg-celadon-200 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0
                  ? "Out of Stock"
                  : `Add ${quantity} to Cart - $${(
                      product.discountedPrice * quantity
                    ).toFixed(2)}`}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
