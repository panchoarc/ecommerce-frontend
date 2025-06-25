import OrderShippingAddress from "@/features/order/components/OrderShipping";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import Image from "@/shared/ui/image";
import FullscreenLoader from "@/shared/ui/ScreenLoader";
import { Separator } from "@/shared/ui/separator";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import OrderService from "../services/OrderService";

const MyOrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<any>(null);
  const [isLoadingVoucher, setIsLoadingVoucher] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("ID inválido.");
      navigate("/my-address");
      return;
    }

    const fetchOrderData = async () => {
      try {
        const order = await OrderService.getMyOrder(id);
        setOrder(order);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto. Intenta nuevamente.");
        navigate("/my-address");
      }
    };

    fetchOrderData();
  }, [id]);

  const handleVoucher = async (id: string) => {
    try {
      setIsLoadingVoucher(true);
      const response = await OrderService.getOrderVoucher(id);
      if (response) {
        const url = URL.createObjectURL(response);
        window.open(url, "_blank");
      } else {
        toast.error("Error al obtener el voucher");
      }
    } catch (error) {
      toast.error("Hubo un problema al generar el voucher.");
      console.error(error);
    } finally {
      setIsLoadingVoucher(false);
    }
  };

  if (!order) return <FullscreenLoader />;

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Detalle de tu compra</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Productos */}
        <Card className="flex-1 border-none rounded-none">
          <CardContent className="px-4 space-y-4">
            <h2 className="text-lg font-semibold">Productos</h2>
            <Separator />
            <div className="space-y-4">
              {order?.products?.map((product: any) => (
                <div
                  key={product.product_id}
                  className="flex gap-4 items-start"
                >
                  <div className="w-20 h-20 relative shrink-0">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground rounded">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {product.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ${product.price_at_purchase}
                    </p>
                  </div>

                  <div className="flex ml-auto">
                    <Link to={`/reviews/${product.product_id}`}>
                      <Button className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer">
                        Agregar Review
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className=" border-none  rounded-none w-full lg:w-80">
          <CardContent className="p-4 space-y-4">
            <OrderShippingAddress address={order.address} />
            {/* <Separator /> */}
            {/* <OrderPayment /> */}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => handleVoucher(order.order_number)}
          variant="outline"
          disabled={isLoadingVoucher}
        >
          {isLoadingVoucher ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              Generando...
            </div>
          ) : (
            "Ver factura"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MyOrderDetails;
