import { Star } from "react-feather";
import { Product } from "../utils/types";

const RatingComponent = ({ rating }: { rating: Product["rating"] }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const fillPercent = Math.max(0, Math.min(1, rating.rate - i)) * 100;

        return (
          <div key={i} className="relative w-4.5 h-4.5">
            {/* empty star */}
            <Star size={18} className="absolute text-grey" />

            {/* filled portion */}
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star size={18} className="fill-yellow-400 text-yellow-400 z-1" />
            </div>
          </div>
        );
      })}

      <span className="ml-1 text-sm text-grey-700">({rating.count})</span>
    </div>
  );
};

export default RatingComponent;
