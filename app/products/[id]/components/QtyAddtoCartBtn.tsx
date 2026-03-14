"use client";
import { useState } from "react";
import QuantityButton from "@/app/_components/QuantityButton";
import AddtoCart from "@/app/_components/AddtoCart";
import { Product } from "@/app/utils/types";

const QtyAddtoCartBtn = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex justify-between w-full">
      <QuantityButton
        currentQuantity={quantity}
        qtuReduceCallBack={() => {
          setQuantity((prev) => Math.max(prev - 1, 1));
        }}
        qtyIncreaseCallback={() => {
          setQuantity((prev) => prev + 1);
        }}
      />
      <AddtoCart product={product} quantity={quantity} />
    </div>
  );
};

export default QtyAddtoCartBtn;
