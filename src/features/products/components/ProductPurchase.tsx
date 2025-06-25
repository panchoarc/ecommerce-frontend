import { Button } from "@/shared/ui/button";
import { CheckCircle2Icon, ShoppingCart } from "lucide-react";

interface ProductPurchaseSectionProps {
  price: number;
  stock: number;
  onAddToCart: () => void;
}

const ProductPurchaseSection: React.FC<ProductPurchaseSectionProps> = ({
  price,
  stock,
  onAddToCart,
}) => {
  const inStock = stock > 0;

  return (
    <section className="space-y-5 pt-6" aria-labelledby="product-price">
      <p id="product-price" className="text-4xl font-extrabold text-green-700">
        ${price.toLocaleString()}
      </p>

      <output
        className={`block text-base font-medium py-4 ${
          inStock ? "text-gray-800" : "text-red-600"
        }`}
        aria-live="polite"
      >
        {inStock ? `Stock disponible: ${stock}` : "Sin stock disponible"}
      </output>

      <Button
        className={`w-full text-lg font-bold py-4 rounded-md shadow-lg transition-transform ${
          inStock
            ? "bg-yellow-400 text-white hover:bg-yellow-500 active:scale-95"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2`}
        onClick={onAddToCart}
        disabled={!inStock}
        aria-disabled={!inStock}
        title={!inStock ? "Producto agotado" : "Agregar al carrito"}
      >
        {inStock ? (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar ahora
          </>
        ) : (
          "Agotado"
        )}
      </Button>

      <div className="text-sm text-gray-600 flex items-center gap-2">
        <CheckCircle2Icon />
        Compra protegida, garantía total.
      </div>
    </section>
  );
};

export default ProductPurchaseSection;
