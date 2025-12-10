"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { blogPosts } from "@/app/lib/data";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const currentPost = blogPosts[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Creamio Blog
          </h1>
          <p className="text-lg text-slate-600">
            Discover tips, recipes, and stories about premium dairy products
          </p>
        </motion.div>

        {/* Featured Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentPost.image}
                alt={currentPost.title}
                fill
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                <div className="flex gap-4 mb-4">
                  <span className="bg-celadon-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {currentPost.category}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {currentPost.title}
                </h2>
                <p className="text-white/80 mb-6">{currentPost.excerpt}</p>
                <div className="flex items-center gap-6 text-white text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {currentPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {currentPost.author}
                  </div>
                </div>
                <Link
                  href={`/blog/${currentPost.id}`}
                  className="inline-flex items-center gap-2 bg-celadon-500 hover:bg-celadon-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer w-fit"
                >
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {blogPosts.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="h-2 rounded-full transition-all cursor-pointer"
                  animate={{
                    width: idx === currentSlide ? "24px" : "8px",
                    backgroundColor:
                      idx === currentSlide
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.5)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Latest Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Latest Blog Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-xl overflow-hidden border border-celadon-100 hover:border-celadon-400 transition-all"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-celadon-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-celadon-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                  </div>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-celadon-600 font-semibold group/link hover:text-celadon-700 transition-colors cursor-pointer"
                  >
                    Read More{" "}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
