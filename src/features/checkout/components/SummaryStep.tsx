import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

const SummaryStep = ({
  cart,
  addresses,
  selectedAddressId,
  nextStep,
  prevStep,
}) => {
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resumen de tu compra</h2>

      {/* Productos */}
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

      {/* Dirección */}
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

      {/* Acciones */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          Atrás
        </Button>
        <Button
          className={`${
            selectedAddressId ? "bg-blue-500 text-white" : "bg-muted"
          } hover:bg-blue-700 hover:text-white hover:cursor-pointer`}
          onClick={nextStep}
        >
          Confirmar y Pagar
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
