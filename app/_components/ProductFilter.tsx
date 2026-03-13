"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";

const ProductFilter = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateUrl("search", value);
    }, 400);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl("category", e.target.value);
  };

  return (
    <div className="filter flex md:flex-col flex-wrap gap-4 sticky top-4 max-h-max">
      <span className="text-xl w-full">Filters</span>

      {/* Key to rerender input tag. Using uncontrolled input to use url as the single source of truth */}
      <div className="group flex flex-col gap-1">
        <label htmlFor="search" className="text-grey-700">
          Search
        </label>
        <input
          id="search"
          key={search}
          type="text"
          className="search border border-grey rounded px-2 py-1"
          placeholder="Search products..."
          defaultValue={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="group flex flex-col gap-1">
        <label htmlFor="category" className="text-grey-700">
          Category
        </label>
        <select
          id="category"
          className="category-select border border-grey rounded px-2 py-1"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="" className="text-grey-700">
            All Categories
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
