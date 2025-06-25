import { FC } from "react";

import ProductInfo from "@/features/products/components/ProductInfo";
import Image from "@/shared/ui/image";
import QuantityControls from "@/features/products/components/QuantityControls";
import { Button } from "@/shared/ui/button";

const CartItem: FC = ({
  product,
  handleDecrease,
  handleIncrease,
  removeFromCart,
  disabled = false,
}) => {
  return (
    <div
      key={product.id}
      className="w-full flex flex-col sm:flex-row gap-6 p-4 shadow-lg bg-white"
    >
      <Image src={product.img} alt={product.name} />
      <div className="flex flex-col justify-between items-start">
        <ProductInfo product={product} />

        {!disabled && (
          <div className="items-center gap-2 mt-2">
            <QuantityControls
              product={product}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
          </div>
        )}

        {!disabled && (
          <Button
            onClick={() => removeFromCart(product.id)}
            className="my-3 border-none bg-transparent text-red-500 hover:underline hover:bg-red-700 hover:text-white hover:cursor-pointer text-sm"
          >
            ❌ Eliminar
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
