"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Fresh Milk Delivery",
    description: "Experience the freshness of farm-to-table dairy",
    image:
      "https://images.unsplash.com/photo-1550949387-9b91b58b6993?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Artisan Cheese Selection",
    description: "Premium handcrafted cheese from around the world",
    image:
      "https://images.unsplash.com/photo-1452894895917-032f887f6b85?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Creamy Yogurt Range",
    description: "Delicious and nutritious yogurt for your family",
    image:
      "https://images.unsplash.com/photo-1535920527894-b45eba376ac0?w=800&h=600&fit=crop",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);

    rotateY.set((x - rect.width / 2) * 0.01);
    rotateX.set(-(y - rect.height / 2) * 0.01);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[600px] bg-gradient-to-br from-celadon-50 to-icy-aqua-50 dark:from-slate-950 dark:to-celadon-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-16">
          {/* Left Column */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-1 perspective"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d" as any,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Premium Dairy
                <span className="bg-gradient-to-r from-celadon-500 to-icy-aqua-500 bg-clip-text text-transparent">
                  {" "}
                  Products
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Fresh, nutritious, and delicious dairy products delivered to
                your doorstep.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-celadon-500 to-icy-aqua-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                Shop Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-white/80">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {heroSlides.map((_, idx) => (
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
        </div>
      </div>
    </motion.section>
  );
}
