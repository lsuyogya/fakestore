"use client";
import Link from "next/link";
import { useCart, useCartActions } from "../_stores/cartStore";
import { ShoppingCart } from "react-feather";

export default function Header() {
  const { totalItems } = useCart();
  const { showCart } = useCartActions();
  const handleCartClick = () => {
    showCart(true);
  };
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex-1" />

        <Link href="/" className="text-2xl font-bold text-center">
          FakeStore
        </Link>

        <div className="flex-1 flex justify-end">
          <button
            onClick={handleCartClick}
            className="group flex gap-2 cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingCart /> <span>({totalItems})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
