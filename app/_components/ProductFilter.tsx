"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";
import ResetFilters from "./ResetFilters";

const ProductFilter = ({
  categories,
  maxPrice,
}: {
  categories: string[];
  maxPrice: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const cleanSort = sort == "asc" || sort == "desc" ? sort : "asc";
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const currentMaxPrice = Number(searchParams.get("maxPrice") ?? maxPrice);

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

  const debounceUpdate = (key: string, value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateUrl(key, value);
    }, 400);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceUpdate("search", e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    debounceUpdate("category", e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceUpdate("minPrice", e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceUpdate("maxPrice", e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    debounceUpdate("sort", e.target.value);
  };

  return (
    <div className="filter flex md:flex-col flex-wrap gap-4 md:sticky md:top-4 max-h-max">
      <span className="w-full text-xl">Filters</span>

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

      <div className="group flex flex-col gap-1">
        <label htmlFor="sort" className="text-grey-700">
          Sort By
        </label>
        <select
          id="sort"
          className="sort-select border border-grey rounded px-2 py-1"
          value={cleanSort}
          onChange={handleSortChange}
        >
          <option value="asc" className="">
            Ascending
          </option>
          <option value="desc" className="">
            Descending
          </option>
        </select>
      </div>

      <div className="group flex flex-col gap-1">
        <label className="text-grey-700">Price Range</label>

        <div className="flex gap-2">
          <input
            key={`min-${minPrice}`}
            type="number"
            min={0}
            max={maxPrice}
            defaultValue={minPrice}
            onChange={handleMinPriceChange}
            className="border border-grey rounded px-2 py-1 w-full"
            placeholder="Min"
          />

          <input
            key={`max-${currentMaxPrice}`}
            type="number"
            min={0}
            max={maxPrice}
            defaultValue={currentMaxPrice}
            onChange={handleMaxPriceChange}
            className="border border-grey rounded px-2 py-1 w-full"
            placeholder="Max"
          />
        </div>
      </div>
      <div className="w-full">
        <ResetFilters className="ml-0 mr-auto"></ResetFilters>
      </div>
    </div>
  );
};

export default ProductFilter;
