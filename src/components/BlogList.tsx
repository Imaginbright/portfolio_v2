"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { IPost } from "@/lib/blog";

export default function BlogList({ allPosts }: { allPosts: IPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(allPosts.map((p) => p.category))),
  ];

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allPosts]);

  return (
    <div className="container mx-auto px-6 md:px-20 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 md:items-center justify-between">
        {/* Consistent Back Navigation */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors font-lekton text-sm md:text-base w-fit"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to home
        </Link>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 focus:outline-none focus:border-zinc-600 transition-colors text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-48 flex items-center justify-between px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <span className="truncate text-zinc-400 text-sm font-lekton">
                {selectedCategory === "All" ? "Category" : selectedCategory}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <>
                {/* Backdrop to close dropdown on mobile when clicking outside */}
                <div
                  className="fixed inset-0 z-10 md:hidden"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="w-full text-left px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm capitalize font-lekton text-zinc-400 hover:text-primary"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Uniform Grid UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredPosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col w-full"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                className="group-hover:scale-105 duration-500 transition-transform object-cover opacity-80 group-hover:opacity-100"
              />
            </div>

            {/* Text Content */}
            <div className="mt-5 flex flex-col flex-1 px-1">
              <p className="text-[10px] tracking-widest text-primary font-bold mb-3 uppercase opacity-80 font-lekton">
                {p.category}
              </p>

              <h2 className="text-xl font-bold leading-snug mb-3 line-clamp-2 text-white/90 group-hover:text-white transition-colors">
                {p.title}
              </h2>

              <div className="flex items-center text-zinc-500 text-[11px] mt-auto pt-2 space-x-3 font-lekton">
                <span className="font-medium text-zinc-400 uppercase tracking-wider">
                  {p.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>{p.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg font-lekton">
            No posts match your search.
          </p>
        </div>
      )}
    </div>
  );
}
