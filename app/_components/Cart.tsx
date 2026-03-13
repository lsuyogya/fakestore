"use client";

import React, { useEffect } from "react";
import { X } from "react-feather";
import { useCart, useCartActions } from "../_stores/cartStore";
import styles from "../_styles/modules/cart.module.css";
import ProductLineList from "./ProductLineList";

const Cart: React.FC = () => {
  const { items, vatRate, totalPrice, isOpen } = useCart();
  const { showCart } = useCartActions();
  const cartRef = React.useRef<HTMLDialogElement>(null);

  //Effect to subscriebe to browser dialog api
  useEffect(() => {
    const dialog = cartRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }

    if (dialog.open) {
    }
  }, [isOpen]);

  const handleCartClose = () => {
    showCart(false);
  };

  const vatAmount = totalPrice * vatRate;

  return (
    <dialog
      className={`${styles.cart} fixed inset-0 m-auto h-160 max-h-[min(100%,40rem)] w-160 max-w-[min(calc(100%-2rem),40rem)] bg-white p-8 shadow-lg rounded-lg overflow-clip`}
      closedby="any"
      onClose={handleCartClose}
      ref={cartRef}
    >
      <div
        className={` flex flex-col transition-transform duration-300 max-h-[min(100%,40rem)] w-full h-full overflow-auto `}
      >
        <div className="flex justify-between items-center pb-(--elementGap) border-b-2 border-grey">
          <h2 className="text-2xl">Your Cart </h2>
          <button
            onClick={handleCartClose}
            className="p-1 hover:bg-gray-200 rounded"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-center content-center grow">Your cart is empty.</p>
        ) : (
          <ProductLineList items={items} />
        )}

        <div className="pt-(--elementGap) border-grey border-t-2 px-6 grid gap-2 text-grey-700">
          <div className="flex justify-between">
            <p>Sub-Total </p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>VAT ({vatRate * 100}%) </p>
            <p>${vatAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="pt-(--elementGap) mt-(--elementGap) border-grey border-t-2 px-6 text-lg">
          <div className="flex justify-between">
            <p> Total </p>
            <p>${(totalPrice + vatAmount).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Cart;
