import { customFetch } from "../utils/fetchInterceptor";
import { Product, SearchParams } from "../utils/types";
import ProductCard from "../_components/ProductCard";
import ProductFilter from "../_components/ProductFilter";
import Pagination from "../_components/Pagination";
import ResetFilters from "../_components/ResetFilters";

export const metadata = {
  title: "Products",
  description: "Product listing page",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const data: Product[] = await customFetch("/products", {
    next: { revalidate: 7200, tags: ["product-list"] },
  });
  const categories: string[] = await customFetch("/products/categories", {
    next: { revalidate: 7200, tags: ["categories"] },
  });
  const filters = await searchParams;
  const querySearch = filters.search ?? "";
  const queryCategory = filters.category ?? "";
  const queryMinPrice = filters.minPrice
    ? parseFloat(filters.minPrice)
    : undefined;
  const queryMaxPrice = filters.maxPrice
    ? parseFloat(filters.maxPrice)
    : undefined;
  const page = parseInt(filters.page ?? "1");
  const perPage = 6;

  const maxProductPrice = data.reduce(
    (max, product) => Math.max(max, product.price),
    0,
  );

  const filteredData = data.filter((product) => {
    if (queryCategory && product.category !== queryCategory) return false;

    if (
      querySearch &&
      !product.title.toLowerCase().includes(querySearch.toLowerCase())
    )
      return false;

    if (queryMinPrice && product.price < queryMinPrice) return false;

    if (queryMaxPrice && product.price > queryMaxPrice) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / perPage);
  const validPage = Math.min(Math.max(page, 1), totalPages);
  const paginatedData = filteredData.slice(
    (validPage - 1) * perPage,
    validPage * perPage,
  );
  return (
    <div className="container my-12">
      <h1 className="text-2xl font-bold mb-12">Product Catalogue</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        <ProductFilter categories={categories} maxPrice={maxProductPrice} />
        <div className="grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {paginatedData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {paginatedData.length === 0 && (
            <div className="grid gap-4 col-span-full content-center text-center">
              <span>No data Available</span>
              <ResetFilters />
            </div>
          )}
          <Pagination activePage={validPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
