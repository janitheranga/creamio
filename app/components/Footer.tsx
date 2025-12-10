"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart, Send } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    Shop: [
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/products" },
      { name: "Flash Sales", href: "/flash-sales" },
      { name: "Bestsellers", href: "/bestsellers" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
    ],
    Support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Track Order", href: "/track" },
    ],
    Legal: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-900 dark:bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-y border-slate-700 py-8 my-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Text Content */}
              <div className="text-center lg:text-left flex-shrink-0">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-slate-300 text-sm">
                  Get exclusive offers and latest updates delivered to your
                  inbox
                </p>
              </div>

              {/* Form */}
              <div className="w-full lg:w-auto lg:flex-1 lg:max-w-md">
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-celadon-500 focus:outline-none text-white placeholder-slate-400 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-celadon-500 hover:bg-celadon-600 px-6 py-2 rounded-lg font-semibold text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="sm:inline">Subscribe</span>
                  </motion.button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-celadon-400 text-sm mt-2 text-center sm:text-left"
                  >
                    ✓ Thank you for subscribing!
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 cursor-pointer"
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-celadon-400 to-icy-aqua-400 bg-clip-text text-transparent">
                🥛
              </span>
              <span className="text-2xl font-bold text-celadon-400">
                Creamio
              </span>
            </Link>
            <p className="text-slate-300 text-sm mb-4">
              Premium dairy products delivered to your doorstep. Fresh,
              nutritious, and delicious.
            </p>
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 hover:text-celadon-400 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 hover:text-celadon-400 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@creamio.com</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-300 hover:text-celadon-400 transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  123 Dairy Lane, Farm City, ST 12345
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-celadon-400 transition-colors cursor-pointer text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-slate-400 text-sm text-center sm:text-left"
          >
            <p>© {new Date().getFullYear()} Creamio. All rights reserved.</p>
            <p className="flex items-center justify-center sm:justify-start gap-1 mt-1">
              Made with <Heart className="w-4 h-4 text-cherry-blossom-500" />{" "}
              for dairy lovers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            {[FaFacebook, FaSquareXTwitter, FaSquareInstagram, AiFillTikTok].map((SocialIcon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2 }}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-celadon-500 flex items-center justify-center transition-colors cursor-pointer text-sm font-semibold"
              >
                <SocialIcon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
