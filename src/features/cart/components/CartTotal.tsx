import { FC } from "react";

interface CartTotalProps {
  total: number;
}

const CartTotal: FC<CartTotalProps> = ({ total }) => (
  <div className="w-full text-right text-2xl font-bold text-gray-800 pt-4 mt-6">
    Total: ${total.toFixed(2)}
  </div>
);

export default CartTotal;
