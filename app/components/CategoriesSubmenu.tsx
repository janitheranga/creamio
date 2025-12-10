"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { categories, languages, currencies } from "@/app/lib/data";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function CategoriesSubmenu() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [categorySearch, setCategorySearch] = useState("");
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

  return (
    <div className="bg-white dark:bg-slate-950 border-b border-celadon-100 dark:border-celadon-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Categories */}
          <div className="flex items-center gap-6 flex-1">
            {filteredCategories.slice(0, 4).map((category, idx) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={`/products?category=${category.name}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer group"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-celadon-600">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Switchers */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Language Switcher with search */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer"
                >
                  <span className="text-lg">{selectedLanguage.flag}</span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {selectedLanguage.code.toUpperCase()}
                  </span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 text-sm"
                    />
                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500" />
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

            {/* Currency Switcher with search */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
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
              <DropdownMenuContent className="w-48">
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search currency..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-celadon-50 dark:bg-slate-900 border border-celadon-200 dark:border-celadon-800 text-sm"
                    />
                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-celadon-500" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
