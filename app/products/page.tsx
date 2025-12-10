"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { products, categories } from "@/app/lib/data";
import { useCartStore } from "@/app/lib/store/cartStore";
import { useWishlistStore } from "@/app/lib/store/wishlistStore";
import ProductDetailModal from "@/app/components/ProductDetailModal";
import { Star, ShoppingCart, LayoutGrid, List, Heart } from "lucide-react";
import { MdTableRows } from "react-icons/md";
import {
  TfiLayoutGrid2Alt,
  TfiLayoutGrid3Alt,
  TfiLayoutGrid4Alt,
} from "react-icons/tfi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [layout, setLayout] = useState<"grid" | "2col" | "3col" | "4col">(
    "grid"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [inStock, setInStock] = useState(true);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    filtered = filtered.filter(
      (p) =>
        p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
    );

    if (inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered.slice(0, displayCount);
  }, [selectedCategories, priceRange, inStock, sortBy, displayCount]);

  const getGridClass = () => {
    switch (layout) {
      case "2col":
        return "grid-cols-2";
      case "3col":
        return "grid-cols-3";
      case "4col":
        return "grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Filters
              </h2>

              {/* Category Filter */}
              <div className="border-b border-celadon-200 dark:border-celadon-800 pb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <motion.label
                      key={cat.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              cat.name,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== cat.name)
                            );
                          }
                        }}
                        className="w-4 h-4 text-celadon-500 rounded cursor-pointer"
                      />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">
                        {cat.name}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-b border-celadon-200 dark:border-celadon-800 pb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseFloat(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="border-b border-celadon-200 dark:border-celadon-800 pb-4">
                <motion.label
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 text-celadon-500 rounded cursor-pointer"
                  />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">
                    In Stock Only
                  </span>
                </motion.label>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            {/* Hero Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-64 rounded-2xl overflow-hidden mb-8 bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/30 dark:to-icy-aqua-900/30"
            >
              <img
                src="https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                <h1 className="text-4xl font-bold text-white">Our Products</h1>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
              {/* Layout Options */}
              <div className="flex gap-2 items-center">
                <p className="pr-4">View as</p>
                {[
                  { id: "grid", icon: MdTableRows },
                  { id: "2col", icon: TfiLayoutGrid2Alt },
                  { id: "3col", icon: TfiLayoutGrid3Alt },
                  { id: "4col", icon: TfiLayoutGrid4Alt },
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLayout(option.id as any)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                      layout === option.id
                        ? "bg-celadon-500 text-white"
                        : "bg-celadon-100 dark:bg-celadon-900 text-celadon-700 dark:text-celadon-300 hover:bg-celadon-200 dark:hover:bg-celadon-800"
                    }`}
                  >
                    <option.icon />
                  </motion.button>
                ))}
              </div>

              {/* Right Controls */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Display Count */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg bg-celadon-100 dark:bg-celadon-900 text-celadon-700 dark:text-celadon-300 font-semibold hover:bg-celadon-200 dark:hover:bg-celadon-800 transition-all cursor-pointer"
                    >
                      Show: {displayCount}
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Products per page</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[6, 12, 24, 48].map((count) => (
                      <DropdownMenuItem
                        key={count}
                        onClick={() => setDisplayCount(count)}
                        className="cursor-pointer"
                      >
                        {count}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg bg-celadon-100 dark:bg-celadon-900 text-celadon-700 dark:text-celadon-300 font-semibold hover:bg-celadon-200 dark:hover:bg-celadon-800 transition-all cursor-pointer"
                    >
                      Sort: {sortBy}
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[
                      { id: "featured", label: "Featured" },
                      { id: "price-low", label: "Price: Low to High" },
                      { id: "price-high", label: "Price: High to Low" },
                      { id: "rating", label: "Highest Rated" },
                    ].map((option) => (
                      <DropdownMenuItem
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className={`grid ${getGridClass()} gap-6`}>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-celadon-100 dark:border-celadon-800 hover:border-celadon-400 dark:hover:border-celadon-500 transition-all cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-celadon-900/20 dark:to-icy-aqua-900/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <div className="flex justify-center">
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
                        className="w-[95%] mt-4 bg-celadon-500 hover:bg-celadon-600 dark:bg-celadon-600 dark:hover:bg-celadon-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.div>
  );
}
