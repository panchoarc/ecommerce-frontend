import CartItem from "@/features/cart/components/CartItem";
import { Button } from "@/shared/ui/button";

const CartStep = ({ cart, nextStep }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-center mb-6">🛒 Tu Carrito</h1>
      {cart.map((product) => (
        <CartItem key={product.id} product={product} disabled />
      ))}
      <div className="flex justify-end mt-8">
        <Button onClick={nextStep}>Continuar</Button>
      </div>
    </div>
  );
};

export default CartStep;
