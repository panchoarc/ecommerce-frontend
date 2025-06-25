import { FC } from "react";

import Rating from "@/shared/ui/rating";

interface ProductTitleSectionProps {
  name: string;
  rating: number;
}

const ProductTitleSection: FC<ProductTitleSectionProps> = ({
  name,
  rating,
}) => {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl break-words font-bold text-gray-800 py-4">
        {name}
      </h1>
      <Rating value={rating} />
    </div>
  );
};

export default ProductTitleSection;
