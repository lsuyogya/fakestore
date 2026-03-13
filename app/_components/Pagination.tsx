"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "react-feather";

const Pagination = ({
  activePage,
  totalPages,
}: {
  activePage: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const allParams = Object.fromEntries(searchParams.entries());
  const handleNavigate = (page: number) => {
    const newParam = new URLSearchParams({
      ...allParams,
      page: page.toString(),
    }).toString();
    router.push(`${pathname}?${newParam}`);
  };

  return (
    <nav
      className={`pagination col-span-full gap-4 ${totalPages === 0 ? "hidden" : "flex"}`}
      aria-label="Pagination"
    >
      {/* Decided to not use Link since it visibly rerenders the page and handle next/prev disable in browser-native way */}
      <button
        className="disabled:text-grey-700/60 py-1 px-2 border-grey-700 disabled:border-grey border rounded flex gap-1 items-center mr-4 h-max disabled:cursor-not-allowed!"
        disabled={activePage <= 1}
        onClick={() => {
          handleNavigate(activePage - 1);
        }}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={18} /> Back
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          className={`${i + 1 === activePage ? "" : "text-grey-700"}`}
          key={i}
          onClick={() => {
            handleNavigate(i + 1);
          }}
          aria-label={`Go to page ${i + 1}`}
          aria-current={i + 1 === activePage ? "page" : undefined}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={activePage >= totalPages}
        onClick={() => {
          handleNavigate(activePage + 1);
        }}
        className="disabled:text-grey-700/60 py-1 px-2 border-grey-700 disabled:border-grey border rounded flex gap-1 items-center ml-4 h-max disabled:cursor-not-allowed!"
        aria-label="Go to next page"
      >
        Next <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
