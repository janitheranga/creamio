"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-celadon-50 to-icy-aqua-50 dark:from-slate-950 dark:to-celadon-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl md:text-[200px] font-black font-sans text-celadon-600 dark:text-icy-aqua-400 mb-8">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          It looks like the page you're looking for doesn't exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-celadon-500 hover:bg-celadon-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <Home size={20} />
            Go to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-celadon-500 text-celadon-600 hover:bg-celadon-50 dark:hover:bg-celadon-950 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Browse Products
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-slate-900 rounded-xl border border-celadon-100 dark:border-celadon-800">
          <p className="text-slate-700 dark:text-slate-300">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@creamio.com"
              className="text-celadon-600 dark:text-celadon-400 font-semibold hover:underline cursor-pointer"
            >
              support@creamio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
