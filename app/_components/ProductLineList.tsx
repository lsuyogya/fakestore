//can be used on checkout later, used on cart right now
import type { CartItem } from "../utils/types";
import Image from "next/image";
import { useCartActions } from "../_stores/cartStore";
import { Trash } from "react-feather";
import QuantityButton from "@/app/_components/QuantityButton";

const ProductLineList = ({ items }: { items: CartItem[] }) => {
  const { incrementQuantity, removeItem } = useCartActions();
  return (
    <ul className="flex-1 overflow-y-auto px-4">
      {items.map((cartItem: CartItem, index: number) => (
        <li
          key={cartItem.product.id}
          className={`flex items-center gap-6 border-grey ${index < items.length - 1 ? "border-b-2 mb-(--elementGap)" : ""} pb-(--elementGap) ${index == 0 ? "mt-(--elementGap)" : ""}`}
        >
          <div className="imgWrapper bg-[rgb(235,236,242)] p-4 rounded-md">
            <Image
              src={cartItem.product.image}
              alt={cartItem.product.title}
              className="w-24 h-24 object-contain"
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg line-clamp-2">{cartItem.product.title}</h2>

            <div className="flex items-centers mt-4">
              <QuantityButton
                currentQuantity={cartItem.quantity}
                qtuReduceCallBack={() =>
                  incrementQuantity(-1, cartItem.product)
                }
                qtyIncreaseCallback={() =>
                  incrementQuantity(1, cartItem.product)
                }
              />
              <button
                className="text-grey-700 text-sm ml-2"
                onClick={() => removeItem(cartItem.product.id)}
                aria-label={`Remove ${cartItem.product.title} from cart`}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
          <p className="text-lg">
            ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProductLineList;
