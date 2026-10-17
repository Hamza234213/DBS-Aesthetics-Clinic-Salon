"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export function ServiceCategoryGrid({
  categories,
}: {
  categories: ServiceCategory[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [query, categories]);

  return (
    <>
      {/* Search bar */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="group/search relative mt-10 flex items-center gap-4 rounded-full border border-[#c9ac6a]/60 bg-black/30 py-2 pl-6 pr-2 shadow-[0_0_28px_rgba(201,172,106,0.22),inset_0_0_18px_rgba(201,172,106,0.08)] backdrop-blur-sm transition-shadow duration-300 focus-within:border-[#c9ac6a] focus-within:shadow-[0_0_40px_rgba(201,172,106,0.38),inset_0_0_22px_rgba(201,172,106,0.12)]"
      >
        {/* Sparkle icon */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-7 w-7 shrink-0 text-[#e6c98a]"
          fill="currentColor"
        >
          <path d="M9 3c.4 3.9 1.6 5.6 5.5 6C10.6 9.4 9.4 11.1 9 15c-.4-3.900-1.600-5.600-5.500-6C7.400 8.600 8.600 6.900 9 3Z" />
          <path d="M18 12c.25 2.300.95 3.300 3.200 3.500-2.250.2-2.950 1.200-3.200 3.500-.25-2.300-.95-3.300-3.200-3.500 2.250-.2 2.950-1.200 3.200-3.500Z" />
        </svg>

        <label htmlFor="service-search" className="sr-only">
          Search for a service
        </label>
        <input
          id="service-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Search for a service (e.g. Hydra Facial, Laser, Hair...)"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-[#f7f2e9] placeholder:text-[#f7f2e9]/55 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />

        <button
          type="submit"
          aria-label="Search"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#232323] transition-all duration-300 bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)] hover:scale-105 hover:brightness-110 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6c98a] sm:h-14 sm:w-14"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
          </svg>
        </button>
      </form>

      {/* Divider with diamond */}
      <div
        aria-hidden="true"
        className="my-10 flex items-center gap-4 text-[#c9ac6a]"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9ac6a]/40" />
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 1c.6 6.200 4.800 10.400 11 11-6.200.6-10.400 4.800-11 11-.6-6.200-4.800-10.400-11-11C7.200 11.400 11.400 7.200 12 1Z" />
        </svg>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9ac6a]/40" />
      </div>

      {/* Category grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((category) => (
            <Link
              key={category.slug}
              href={`/services/${category.slug}`}
              className="page-card group overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9ac6a]/40"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Category Details */}
              <div className="p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#c9ac6a]">
                    {category.title}
                  </p>
                  <span className="shrink-0 text-[#c9ac6a] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-[#c9ac6a]/20 px-8 py-14 text-center">
          <p className="font-serif text-xl text-[#f7f2e9]">
            No services match “{query.trim()}”
          </p>
          <p className="mt-2 text-[#f7f2e9]/65">
            Try a different keyword, or clear the search to see every category.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 rounded-full border border-[#c9ac6a]/60 px-6 py-2 text-sm font-semibold text-[#c9ac6a] transition-colors hover:bg-[#c9ac6a]/10"
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
