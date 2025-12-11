// src/pages/Blog.js
import React from "react";
import { Link } from "react-router-dom";
import FooterBanner from "../components/FooterBanner";

// Blog card (no animation)
const BlogCard = ({ post }) => {
  return (
    <article className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 mx-auto max-w-3xl">
      <img
        src={post.img}
        alt={post.title}
        className="w-full h-96 object-cover rounded-t-lg"
        loading="lazy"
      />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-[#8D5A3A]/20 text-[#8D5A3A] font-semibold">
            {post.category}
          </span>
          <span className="text-xs text-gray-500">{post.date}</span>
          <span className="ml-auto text-xs text-gray-500">⏱ {post.read}</span>
        </div>

        <h3 className="text-2xl font-semibold leading-snug mb-3">{post.title}</h3>

        <p className="text-sm text-gray-700 mb-5">{post.description}</p>

        {/* Use Link so navigation is handled by react-router */}
        <Link
          to="/blog/digital-transformation"
          className="inline-block px-5 py-2 rounded bg-[#8D5A3A] text-white font-semibold hover:bg-[#74462D] transition"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Digital Transformation for SMEs",
      description:
        "KDASTSHO Fintech Solutions helps SMEs and MSMEs leverage technology for efficient operations, secure financial transactions, and robust digital solutions tailored to their business needs.",
      img: "/images/post-0.jpg",
      category: "Business",
      date: "Dec 11, 2025",
      read: "5 min read",
    },
  ];

  return (
    <>
      <div style={{ height: "var(--navbar-height, 80px)" }} />
      <section className="min-h-screen font-sans" style={{ backgroundColor: "#F6EFE8", paddingTop: "24px" }}>
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 gap-8">
            <BlogCard post={blogPosts[0]} />
          </div>

          {/* Footer banner below card (shifted right): change translate-x to move */}
          <div className="mt-12">
            <div className="max-w-5xl mx-auto flex justify-center">
              <div className="w-full max-w-4xl transform translate-x-10">
                <FooterBanner />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
