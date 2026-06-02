import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- VALIDACIÓN DE SEGURIDAD ---
const isValidCartItem = (item: any): item is CartItem => {
  return (
    item &&
    typeof item === "object" &&
    typeof item.id === "number" &&
    Number.isFinite(item.id) &&
    typeof item.name === "string" &&
    item.name.length > 0 &&
    item.name.length < 200 &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0 &&
    item.quantity < 1000
  );
};

// --- SANITIZACIÓN ---
const sanitizeCart = (data: any): CartItem[] => {
  if (!Array.isArray(data)) return [];
  return data.filter(isValidCartItem);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      return sanitizeCart(parsed);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // silent fail
    }
  }, [cart]);

  const addToCart = (product: CartItem, quantity: number = 1) => {
    if (quantity <= 0 || quantity > 1000) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, 1000) }
            : i,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (!Number.isFinite(productId)) return;

    setCart((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== productId);

      if (quantity > 1000) quantity = 1000;

      return prev.map((i) => (i.id === productId ? { ...i, quantity } : i));
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const getTotalItems = () => cart.reduce((t, i) => t + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((t, i) => t + i.price * i.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
