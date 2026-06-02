import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import PaymentService from "@/features/payments/service/PaymentService";
import { toast } from "sonner";
import type { CartItem, Address } from "@/features/checkout/types";

type SummaryStepProps = {
  cart: CartItem[];
  addresses: Address[];
  selectedAddressId: number | null;
  nextStep: () => void;
  prevStep: () => void;
  clientSecret: string | null;
  setClientSecret: (secret: string) => void;
};

const SummaryStep = ({
  cart,
  addresses,
  selectedAddressId,
  nextStep,
  prevStep,
  clientSecret,
  setClientSecret,
}: SummaryStepProps) => {
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleGoToPayment = async () => {
    try {
      if (clientSecret) {
        nextStep();
        return;
      }

      const secret = await PaymentService.createPaymentIntent(
        Math.round(totalPrice * 100),
      );

      setClientSecret(secret);
      nextStep();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo iniciar el pago");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resumen de tu compra</h2>

      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {cart.length ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No tienes productos en el carrito.
            </p>
          )}

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dirección de envío</CardTitle>
        </CardHeader>

        <CardContent>
          {selectedAddress ? (
            <p>
              {selectedAddress.street}, {selectedAddress.city},{" "}
              {selectedAddress.country}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No seleccionaste dirección.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          Atrás
        </Button>

        <Button
          className={
            selectedAddressId
              ? "bg-blue-500 text-white hover:bg-blue-700 hover:cursor-pointer"
              : "bg-muted"
          }
          onClick={handleGoToPayment}
        >
          Confirmar y Pagar
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
