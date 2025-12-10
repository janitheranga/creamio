"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { blogPosts } from "@/app/lib/data";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-celadon-500 hover:bg-celadon-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-celadon-600 hover:text-celadon-700 font-semibold mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-4 items-center mb-4">
            <span className="bg-celadon-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="bg-celadon-50 p-8 rounded-xl border border-celadon-200 mb-8">
            <p className="text-lg text-slate-700 leading-relaxed m-0">
              {post.excerpt}
            </p>
          </div>

          <div className="space-y-6 text-slate-700">
            <p>{post.content}</p>
            <p>
              Our commitment to quality means every step of our process is
              carefully monitored. From sourcing the finest ingredients to
              maintaining optimal storage conditions, we ensure that every
              product meets the highest standards of freshness and purity.
            </p>
            <p>
              At Creamio, we believe that good dairy products are not just about
              taste—they're about nutrition, sustainability, and supporting
              local farmers. That's why we partner with trusted suppliers who
              share our values and dedication to excellence.
            </p>
            <p>
              Whether you're looking to improve your health, enjoy delicious
              flavors, or simply support sustainable practices, Creamio has the
              perfect dairy products for you.
            </p>
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t-2 border-celadon-200 pt-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related, idx) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-xl overflow-hidden border border-celadon-100 hover:border-celadon-400 transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-linear-to-br from-celadon-50 to-icy-aqua-50">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs font-semibold text-celadon-600 uppercase">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                    {related.excerpt}
                  </p>

                  <Link
                    href={`/blog/${related.id}`}
                    className="inline-block mt-4 text-celadon-600 font-semibold hover:text-celadon-700 transition-colors"
                  >
                    Read More →
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
