"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { categories, languages, currencies } from "@/app/lib/data";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Layers,
  BookOpen,
  Home,
  Package,
  Info,
  Phone,
  Tag,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function BottomNavbar() {
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [languageSearch, setLanguageSearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(languageSearch.toLowerCase())
  );

  const filteredCurrencies = currencies.filter((curr) =>
    curr.name.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Deals", href: "/deals", icon: Tag },
    { name: "Flash Sales", href: "/flash-sales", icon: Zap },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 border-b border-celadon-100 dark:border-celadon-800 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Shop by Categories Dropdown */}
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-celadon-500 hover:bg-celadon-600 text-white rounded-lg transition-colors cursor-pointer font-medium"
                >
                  <Layers className="w-5 h-5" />
                  <span className="hidden sm:inline">Shop by Categories</span>
                  <span className="sm:hidden">Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 text-sm focus:outline-none focus:ring-2 focus:ring-celadon-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/products"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl">📦</span>
                    <span className="font-medium">All Categories</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {filteredCategories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/products?category=${category.name}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Items - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer group"
                  >
                    <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-celadon-600 dark:group-hover:text-celadon-400 transition-colors" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-celadon-600 dark:group-hover:text-celadon-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Right: Language, Currency, and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer"
                >
                  <span className="text-lg">{selectedLanguage.flag}</span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {selectedLanguage.code.toUpperCase()}
                  </span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 text-sm focus:outline-none focus:ring-2 focus:ring-celadon-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                {filteredLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang)}
                    className="cursor-pointer"
                  >
                    {lang.flag} {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer"
                >
                  <span className="text-lg font-bold">
                    {selectedCurrency.symbol}
                  </span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {selectedCurrency.code}
                  </span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Currency</DropdownMenuLabel>
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search currency..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 text-sm focus:outline-none focus:ring-2 focus:ring-celadon-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                {filteredCurrencies.map((curr) => (
                  <DropdownMenuItem
                    key={curr.code}
                    onClick={() => setSelectedCurrency(curr)}
                    className="cursor-pointer"
                  >
                    {curr.symbol} {curr.code} - {curr.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu for nav items */}
            <div className="md:hidden z-50">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer"
                  >
                    <Layers className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
