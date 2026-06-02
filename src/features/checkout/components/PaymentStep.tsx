import { Button } from "@/shared/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentStep = ({ prevStep, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isStripeFormComplete, setIsStripeFormComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!elements) return;

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) return;

    const handler = (event) => {
      setIsStripeFormComplete(event.complete);
    };

    paymentElement.on("change", handler);

    return () => {
      paymentElement.off("change", handler);
    };
  }, [elements]);

  const handleSubmit = async () => {
    if (!stripe || !elements || isLoading) return;

    try {
      setIsLoading(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message);

        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await onPaymentSuccess();
      } else {
        toast.error("El pago no se completó.");
      }
    } catch (error) {
      console.error(error);

      toast.error("Error procesando pago.");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = !stripe || !elements || !isStripeFormComplete || isLoading;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center">💳 Pago</h2>

      <form className="bg-gray-50 p-6 rounded-lg shadow-md">
        <PaymentElement />
      </form>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>

        <Button disabled={disabled} onClick={handleSubmit}>
          {isLoading ? "Procesando..." : "🛍️ Confirmar compra"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
