import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router";

const CartPopup = () => {
  const { showCartPopup, setShowCartPopup } = useCart();
  const navigate = useNavigate();

  if (!showCartPopup) return null;

  const handleCart = () => {
    navigate("/cart");
    setShowCartPopup(false);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-2xl p-5 rounded-lg border border-gray-300 w-72 z-50">
      <p className="text-black">✅ Producto agregado al carrito</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleCart()}
          className="text-blue-500 font-semibold hover:underline"
        >
          Ir al carrito
        </button>
        <button
          onClick={() => setShowCartPopup(false)}
          className="text-gray-500 font-semibold hover:underline"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
