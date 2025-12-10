"use client";

import { motion } from "motion/react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-celadon-50 to-icy-aqua-50 dark:from-slate-950 dark:to-celadon-950 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sign in to your Creamio account
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-celadon-100 dark:border-celadon-800 p-8 space-y-6"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celadon-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-celadon-50 dark:bg-slate-800 border border-celadon-200 dark:border-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-500 text-slate-900 dark:text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celadon-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-celadon-50 dark:bg-slate-800 border border-celadon-200 dark:border-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-500 text-slate-900 dark:text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-celadon-600 dark:text-celadon-400 hover:text-celadon-700 cursor-pointer font-semibold"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-celadon-500 to-icy-aqua-500 hover:from-celadon-600 hover:to-icy-aqua-600 text-white py-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-celadon-200 dark:border-celadon-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="py-2 px-4 rounded-lg border border-celadon-200 dark:border-celadon-700 hover:bg-celadon-50 dark:hover:bg-celadon-900/20 transition-colors text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
            >
              Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="py-2 px-4 rounded-lg border border-celadon-200 dark:border-celadon-700 hover:bg-celadon-50 dark:hover:bg-celadon-900/20 transition-colors text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
            >
              Apple
            </motion.button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-celadon-600 dark:text-celadon-400 font-semibold hover:text-celadon-700 cursor-pointer"
            >
              Sign up here
            </Link>
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
}
