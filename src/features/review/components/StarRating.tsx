// StarRating.tsx
import { Star } from "lucide-react";
import { FC } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
}

const StarRating: FC<StarRatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
}) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            size={size}
            className={`cursor-pointer transition-colors ${
              filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } `}
            onClick={() => !readOnly && onChange(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
