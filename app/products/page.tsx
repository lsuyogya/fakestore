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
  const categories: string[] = await customFetch("/products/categories", {
    next: { revalidate: 7200, tags: ["categories"] },
  });
  const filters = await searchParams;
  const cleanFilters = {
    Search: filters.search ?? "",
    Category: filters.category ?? "",
    MinPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
    MaxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    Sort: filters.sort ?? "asc",

    page: parseInt(filters.page ?? "1"),
  };
  const perPage = 6;

  const data: Product[] =
    cleanFilters.Sort === "asc"
      ? await customFetch("/products?sort=asc", {
          next: { revalidate: 7200, tags: ["product-list-asc"] },
        })
      : await customFetch("/products?sort=desc", {
          next: { revalidate: 7200, tags: ["product-list-desc"] },
        });

  const maxProductPrice = data.reduce(
    (max, product) => Math.max(max, product.price),
    0,
  );

  //Since we use Params as the single source of truth, server side filtering made sense
  const filteredData = data.filter((product) => {
    if (cleanFilters.Category && product.category !== cleanFilters.Category)
      return false;

    if (
      cleanFilters.Search &&
      !product.title.toLowerCase().includes(cleanFilters.Search.toLowerCase())
    )
      return false;

    if (cleanFilters.MinPrice && product.price < cleanFilters.MinPrice)
      return false;

    if (cleanFilters.MaxPrice && product.price > cleanFilters.MaxPrice)
      return false;

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / perPage);
  const validPage = Math.min(Math.max(cleanFilters.page, 1), totalPages);
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
              <ResetFilters className="mx-auto" />
            </div>
          )}
          <Pagination activePage={validPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
