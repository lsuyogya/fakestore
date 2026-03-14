import { Minus, Plus } from "react-feather";

const QuantityButton = ({
  currentQuantity,
  qtuReduceCallBack,
  qtyIncreaseCallback,
}: {
  currentQuantity: number;
  qtuReduceCallBack: () => void;
  qtyIncreaseCallback: () => void;
}) => {
  return (
    <div className="flex items-centers">
      <button
        className="px-2 border-grey border rounded-l"
        onClick={() => qtuReduceCallBack()}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="border-t border-b border-grey px-2 content-center">
        {currentQuantity}
      </span>
      <button
        className="px-2 border-grey border rounded-r"
        onClick={() => qtyIncreaseCallback()}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantityButton;
