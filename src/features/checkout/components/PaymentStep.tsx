import { Button } from "@/shared/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const PaymentStep = ({ handleCheckout, prevStep }) => {
  const [isStripeFormComplete, setIsStripeFormComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);

      if (paymentElement) {
        paymentElement.on("change", (event) => {
          setIsStripeFormComplete(event.complete);
        });
      }
    }
  }, [elements]);

  const isButtonDisabled = !stripe || !elements || !isStripeFormComplete;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center mb-6">💳 Pago</h2>
      <form className="bg-gray-50 p-6 rounded-lg shadow-md">
        <PaymentElement />
      </form>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button
          onClick={handleCheckout}
          disabled={isButtonDisabled}
          className={`py-3 px-6 rounded-lg text-sm font-semibold ${
            !isButtonDisabled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          🛍️ Confirmar compra
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
