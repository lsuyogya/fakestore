"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ResetFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const resetUrl = `${pathname}`;
  return (
    <Link className="btn-dark w-max mx-auto" href={resetUrl}>
      Reset Filters
    </Link>
  );
};

export default ResetFilters;
