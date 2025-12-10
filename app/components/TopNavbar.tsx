"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { languages, currencies } from "@/app/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [searchValue, setSearchValue] = useState("");

  type CartItem = { id: string; name: string; price: number; qty: number };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const addItem = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    // Allow other components to dispatch cart updates via custom events
    const handleAdd = (event: Event) => {
      const custom = event as CustomEvent<{
        id: string;
        name: string;
        price: number;
        qty?: number;
      }>;
      addItem(custom.detail);
    };

    const handleUpdate = (event: Event) => {
      const custom = event as CustomEvent<{ id: string; qty: number }>;
      updateQuantity(custom.detail.id, custom.detail.qty);
    };

    const handleRemove = (event: Event) => {
      const custom = event as CustomEvent<{ id: string }>;
      removeItem(custom.detail.id);
    };

    window.addEventListener("cart:add", handleAdd as EventListener);
    window.addEventListener("cart:update", handleUpdate as EventListener);
    window.addEventListener("cart:remove", handleRemove as EventListener);

    return () => {
      window.removeEventListener("cart:add", handleAdd as EventListener);
      window.removeEventListener("cart:update", handleUpdate as EventListener);
      window.removeEventListener("cart:remove", handleRemove as EventListener);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-celadon-100 dark:border-celadon-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0"
          >
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="text-2xl font-bold bg-linear-to-r from-celadon-500 to-icy-aqua-500 bg-clip-text text-transparent">
                🥛
              </div>
              <span className="text-xl font-bold text-celadon-600 dark:text-celadon-400">
                Creamio
              </span>
            </Link>
          </motion.div>

          {/* Center Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <motion.div
              className="relative w-full"
              whileFocus={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="Search dairy products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 focus:outline-none focus:ring-2 focus:ring-celadon-500 transition-all cursor-text"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500 cursor-pointer" />
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="hidden sm:block px-3 py-1.5 text-sm font-medium text-celadon-600 dark:text-celadon-400 hover:text-celadon-700 dark:hover:text-celadon-300 transition-colors cursor-pointer"
              >
                Login
              </Link>
            </motion.div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:block px-3 py-1.5 text-sm font-medium text-celadon-600 dark:text-celadon-400 hover:text-celadon-700 dark:hover:text-celadon-300 transition-colors cursor-pointer"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer hidden sm:block"
              >
                <Heart className="w-5 h-5 text-celadon-600 dark:text-celadon-400" />
              </motion.button>
            </Link>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-celadon-600 dark:text-celadon-400" />
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-cherry-blossom-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-celadon-100 dark:border-celadon-800"
          >
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800"
                />
              </div>
              <Link
                href="/login"
                className="block px-4 py-2 text-celadon-600 dark:text-celadon-400 hover:bg-celadon-100 dark:hover:bg-celadon-900 rounded cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/wishlist"
                className="block px-4 py-2 hover:bg-celadon-100 dark:hover:bg-celadon-900 rounded cursor-pointer"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="block px-4 py-2 hover:bg-celadon-100 dark:hover:bg-celadon-900 rounded cursor-pointer"
              >
                Cart
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.currentTarget === e.target) setIsCartOpen(false);
          }}
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl border-l border-celadon-100 dark:border-celadon-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-celadon-100 dark:border-celadon-800">
              <div>
                <p className="text-sm uppercase tracking-wide text-celadon-600 dark:text-celadon-400">
                  Your Cart
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 px-5 py-6 space-y-4 bg-white dark:bg-slate-950">
              {cartItems.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-full max-w-sm text-center flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                    <div className="w-14 h-14 rounded-full bg-celadon-50 dark:bg-celadon-900/40 flex items-center justify-center">
                      <ShoppingCart className="w-7 h-7 text-celadon-600 dark:text-celadon-400" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-800 dark:text-white">
                        Your cart is empty
                      </p>
                      <p className="text-sm">Add items to see them here.</p>
                    </div>
                    <Link
                      href="/products"
                      className="px-4 py-2 bg-celadon-500 hover:bg-celadon-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-celadon-100 dark:border-celadon-800 p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-celadon-50 dark:bg-celadon-900/60 px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.qty - 1)
                            }
                            className="p-1 rounded-full hover:bg-celadon-100 dark:hover:bg-celadon-800 transition-colors"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.qty + 1)
                            }
                            className="p-1 rounded-full hover:bg-celadon-100 dark:hover:bg-celadon-800 transition-colors"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-semibold text-celadon-600 dark:text-celadon-400">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-slate-500 hover:text-cherry-blossom-500 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-celadon-100 dark:border-celadon-800 space-y-3 bg-celadon-50/60 dark:bg-slate-900/60">
              <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                <span>Subtotal</span>
                <span className="font-semibold">
                  $
                  {cartItems
                    .reduce((sum, item) => sum + item.price * item.qty, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/cart"
                  className="flex-1 text-center px-4 py-2 rounded-lg border border-celadon-400 text-celadon-700 dark:text-celadon-300 hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer font-semibold"
                >
                  View cart
                </Link>
                <button
                  disabled={cartItems.length === 0}
                  className="flex-1 px-4 py-2 rounded-lg bg-celadon-500 disabled:bg-celadon-200 text-white font-semibold hover:bg-celadon-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
