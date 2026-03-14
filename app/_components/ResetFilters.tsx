"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ResetFilters = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const resetUrl = `${pathname}`;
  return (
    <Link
      className={` btn-dark w-max content-center ${className}`}
      href={resetUrl}
    >
      Reset Filters
    </Link>
  );
};

export default ResetFilters;
