// src/pages/Blog.js
import React from "react";
import { Link } from "react-router-dom";
import FooterBanner from "../components/FooterBanner";
import useTheme from "../hooks/useTheme";

const BlogCard = ({ post }) => {
  return (
    <article className="rounded-lg overflow-hidden shadow-md mx-auto max-w-2xl 
      bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700">
      
      <img
        src={post.img}
        alt={post.title}
        className="w-full h-72 object-cover rounded-t-lg"
        loading="lazy"
      />

      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs px-3 py-1 rounded-full bg-[#8D5A3A]/20 text-[#8D5A3A] font-semibold">
            {post.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
          <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">⏱ {post.read}</span>
        </div>

        <h3 className="text-xl font-semibold leading-snug mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {post.description}
        </p>

        <Link
          to="/blog/digital-transformation"
          className="inline-block px-4 py-2 rounded bg-[#8D5A3A] text-white font-semibold hover:bg-[#74462D] transition"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const [darkMode] = useTheme();

  const blogPosts = [
    {
      title: "Nifty 50 & Bank Nifty Outlook",
      description:
        "Indian equities step into Week 50 in a phase of tight consolidation. Strong domestic inflows continue to cushion downside moves.",
      img: "/images/post-0.jpg",
      category: "Business",
      date: "Dec 11, 2025",
      read: "5 min read",
    },
  ];

  return (
    <>
      <div style={{ height: "var(--navbar-height, 80px)" }} />

      <section
        className={`min-h-screen font-sans pt-16 transition-colors ${
          darkMode ? "bg-[#0f0f0f]" : "bg-[#F6EFE8]"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 gap-6">
            <BlogCard post={blogPosts[0]} />
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl">
              <FooterBanner />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
