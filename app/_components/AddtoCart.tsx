"use client";

import { useCartActions } from "../_stores/cartStore";
import { Product } from "../utils/types";
import toast from "react-hot-toast";

const AddToCart = ({
  product,
  quantity,
}: {
  product: Product;
  quantity?: number;
}) => {
  const { addItem } = useCartActions();

  const truncateTitle = (title: string, wordLimit = 3) => {
    const words = title.split(" ");
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleAdd = () => {
    addItem({ product, quantity: quantity ?? 1 });
    toast.success(`"${truncateTitle(product.title)}" added to cart!`);
  };

  return (
    <button className="btn-dark" onClick={handleAdd}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
