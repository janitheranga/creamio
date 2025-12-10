"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Heart,
  Award,
  Users,
  TrendingUp,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import ReviewsLoopSection from "@/app/components/sections/ReviewsLoopSection";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description:
        "We source only the finest dairy products from trusted farms, ensuring freshness and quality in every item.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and supporting local farmers who share our environmental values.",
    },
    {
      icon: ShieldCheck,
      title: "Trust & Safety",
      description:
        "All products undergo rigorous quality checks and meet the highest food safety standards.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building lasting relationships with our customers and supporting local dairy farming communities.",
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Products", value: "500+", icon: Award },
    { label: "Partner Farms", value: "100+", icon: Leaf },
    { label: "Years Experience", value: "15+", icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-celadon-50 to-icy-aqua-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About Creamio
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted source for premium dairy products since 2009. We're
              passionate about delivering farm-fresh quality to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded in 2009, Creamio began with a simple mission: to make
                  premium dairy products accessible to everyone. What started as
                  a small family business has grown into a trusted name serving
                  over 50,000 happy customers.
                </p>
                <p>
                  We work directly with over 100 partner farms across the
                  region, ensuring that every product meets our strict quality
                  standards. From fresh milk to artisanal cheeses, each item is
                  carefully selected and delivered with care.
                </p>
                <p>
                  Our commitment to sustainability and community support drives
                  everything we do. We believe in fair partnerships with
                  farmers, eco-friendly practices, and providing our customers
                  with the freshest, most nutritious dairy products available.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/etc/Dairy_Farm.jpg"
                  alt="Dairy farm"
                  fill
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-celadon-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-celadon-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 border border-celadon-100 hover:border-celadon-400 transition-all"
              >
                <div className="w-12 h-12 bg-celadon-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-celadon-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The passionate people behind Creamio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "/images/reviews/Review_Sarah_Johnson.jpg",
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "/images/reviews/Review_Michael_Chen.jpg",
              },
              {
                name: "Emily Rodriguez",
                role: "Quality Assurance Lead",
                image: "/images/reviews/Review_Emily_Rodriguez.jpg",
              },
            ].map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden border border-celadon-100 hover:border-celadon-400 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-celadon-600 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsLoopSection />
    </motion.div>
  );
}
