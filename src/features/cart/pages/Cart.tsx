import { useAuth } from "@/features/auth/hooks/AuthContext";
import { useCart } from "@/features/cart/hooks/CartContext";

import CartEmpty from "@/features/cart/components/CartEmpty";
import CartItem from "@/features/cart/components/CartItem";
import CartTotal from "@/features/cart/components/CartTotal";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const handleIncrease = (product) => {
    if (product.quantity < product.stock) {
      updateQuantity(product.id, product.quantity + 1);
    }
  };

  const handleBuyAll = () => {
    if (!isAuthenticated) {
      // Opcional: guardar ruta para redirigir después del login
      navigate("/login", {
        replace: true,
        state: { from: "/checkout" },
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-0 sm:mx-auto md:p-6">
      <h1 className="text-3xl font-bold my-3">🛒 Carrito de Compras</h1>

      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                removeFromCart={removeFromCart}
              />
            ))}

            <CartTotal total={total} />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleBuyAll}
              className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
            >
              ✅ Comprar todo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
