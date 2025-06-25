import { Button } from "@/shared/ui/button";
import Image from "@/shared/ui/image";
import { Link } from "react-router";

interface OrderCardProps {
  order: {
    id: number;
    order_number: string;
    created_at: string;
    status: string;
    total_amount: number;
    products: {
      id: number;
      name: string;
      quantity: number;
      price_at_purchase: number;
      image?: string; // URL de imagen
    }[];
  };
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const product = order.products[0]; 
  const formattedDate = order.created_at.split(" ")[0];

  return (
    <div className="border shadow-xl bg-white">
      <div className="px-4 py-2 border-b text-sm">{order.created_at}</div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
        {/* Imagen */}
        <div className="hidden md:block w-20 h-20 relative shrink-0">
          {product.image ? (
            <Image src={product.image} alt={product.name} />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground rounded">
              Sin imagen
            </div>
          )}
        </div>

        {/* Info del producto */}
        <div className="flex-1">
          <div className="text-green-600 font-medium">{order.status}</div>
          <div className="text-sm text-muted-foreground">
            Llegó el {formattedDate}
          </div>

          <div className="text-sm mt-1">{product.name}</div>
          <div className="text-sm text-muted-foreground">
            {product.quantity} unidad{product.quantity > 1 ? "es" : ""}
          </div>
        </div>

        {/* Info del vendedor y acciones */}
        <div className="flex flex-col md:items-end gap-2 ml-auto">
          <div className="flex gap-2 mt-2">
            <Link to={`/my-orders/${order.order_number}`}>
              <Button
                className="bg-blue-500 hover:cursor-pointer hover:bg-blue-800"
                size="sm"
              >
                Ver compra
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
