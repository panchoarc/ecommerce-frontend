import { useMyOrders } from "@/features/order/hooks/useMyOrders";
import { OrderCard } from "../components/OrderCard";
import { FC } from "react";

const MyOrdersHome: FC = () => {
  const { orders } = useMyOrders();

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis Ordenes</h1>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col max-w-3xl gap-4">
          {orders.map((order) => (
            <OrderCard key={order.order_number} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg">No tienes Ordenes</p>
        </div>
      )}
    </div>
  );
};

export default MyOrdersHome;
