"use client";

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/lib/theme-provider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer">
        <Moon className="w-5 h-5 text-celadon-600" />
      </button>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-celadon-100 dark:hover:bg-celadon-900 transition-colors cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-celadon-600" />
      ) : (
        <Sun className="w-5 h-5 text-celadon-400" />
      )}
    </motion.button>
  );
}
