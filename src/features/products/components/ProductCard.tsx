import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/ui/card";
import Rating from "@/shared/ui/rating";
import { Link } from "react-router";

const ProductCard = ({ product, viewMode }) => {
  return (
    <div
      className={`${viewMode === "grid" ? "w-full max-w-[250px]" : "w-full"}`}
    >
      <Link to={`/products/${product.id}`}>
        <Card
          className={`border-none rounded-none flex hover:shadow-xl transition-shadow duration-300 cursor-pointer p-0 h-full ${
            viewMode === "list" ? "flex-row w-full" : "flex-col"
          }`}
        >
          <CardContent
            className={`p-3 w-full items-stretch ${
              viewMode === "list" ? "flex flex-row gap-4" : "flex flex-col"
            }`}
          >
            <img
              src={product.img}
              alt={product.name}
              className={`object-contain shrink-0 ${
                viewMode === "list" ? "w-48 h-48 sm:w-48" : "h-48 w-full"
              }`}
              loading="lazy"
            />

            <div
              className={`flex flex-col p-3 justify-between ${
                viewMode === "list" ? "flex-1 w-full" : ""
              }`}
            >
              <CardTitle className="text-lg font-medium text-gray-800 my-2 line-clamp-2 text-ellipsis break-all min-h-[4rem]">
                {product.name}
              </CardTitle>
              <Rating value={product.rating} />
              <CardDescription className="text-lg font-semibold text-gray-900">
                ${product.price}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCard;
