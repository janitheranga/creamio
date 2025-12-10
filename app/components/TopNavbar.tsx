"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
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
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [searchValue, setSearchValue] = useState("");

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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer hidden sm:block"
            >
              <Heart className="w-5 h-5 text-celadon-600 dark:text-celadon-400" />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer relative"
            >
              <ShoppingCart className="w-5 h-5 text-celadon-600 dark:text-celadon-400" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-cherry-blossom-500 text-white text-xs rounded-full flex items-center justify-center">
                0
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
    </motion.nav>
  );
}
