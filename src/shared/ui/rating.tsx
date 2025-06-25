import { Star, StarHalf } from "lucide-react";
import { FC } from "react";

interface RatingProps {
  value: number;
}

const Rating: FC<RatingProps> = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i + 1 <= value ? "full" : i + 0.5 < value ? "half" : "empty"
  );

  return (
    <div className="flex items-center gap-1 mt-1">
      {stars.map((type, i) =>
        type === "full" ? (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ) : type === "half" ? (
          <StarHalf
            key={i}
            className="w-5 h-5 text-yellow-500 fill-yellow-500"
          />
        ) : (
          <Star key={i} className="w-5 h-5 text-gray-300" />
        )
      )}
      <span className="text-gray-700 text-sm font-medium">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export default Rating;
