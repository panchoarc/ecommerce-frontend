import { useAddresses } from "@/features/address/hooks/useAddress";
import { useCart } from "@/features/cart/hooks/CartContext";
import AddressStep from "@/features/checkout/components/AddressStep";
import CartStep from "@/features/checkout/components/CartStep";
import CheckoutStepper from "@/features/checkout/components/CheckoutStepper";
import PaymentStep from "@/features/checkout/components/PaymentStep";
import SummaryStep from "@/features/checkout/components/SummaryStep";
import OrderService from "@/features/order/services/OrderService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import VoucherStep from "../components/VoucherStep";

type Step = {
  label: string;
  component: React.ReactNode;
};

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_API_PK_KEY as string,
);

const Checkout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { clearCart, cart } = useCart();
  const { addresses, refetch } = useAddresses();

  const initialStep = (location.state as { step?: number } | null)?.step ?? 0;
  const shouldRefetch = (location.state as { shouldRefetch?: boolean } | null)
    ?.shouldRefetch;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    if (shouldRefetch) {
      refetch();

      navigate(location.pathname, {
        replace: true,
        state: { step: currentStep },
      });
    }
  }, [shouldRefetch, refetch, navigate, location.pathname, currentStep]);

  const nextStep = (): void => setCurrentStep((prev) => prev + 1);
  const prevStep = (): void => setCurrentStep((prev) => prev - 1);

  const handlePaymentSuccess = async (): Promise<void> => {
    try {
      const cart_items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const order = {
        cart_items,
        address_id: selectedAddressId,
      };

      const response = await OrderService.buyOrder(order);

      setOrderNumber(response.orderNumber);
      clearCart();
      nextStep();

      toast.success("Compra realizada exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error creando la orden");
    }
  };

  const steps: Step[] = [
    {
      label: "Carrito",
      component: <CartStep cart={cart} nextStep={nextStep} />,
    },
    {
      label: "Dirección",
      component: (
        <AddressStep
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      label: "Resumen",
      component: (
        <SummaryStep
          cart={cart}
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          nextStep={nextStep}
          prevStep={prevStep}
          clientSecret={clientSecret}
          setClientSecret={setClientSecret}
        />
      ),
    },
    {
      label: "Pago",
      component: clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentStep
            prevStep={prevStep}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      ) : (
        <div>Cargando pago...</div>
      ),
    },
    {
      label: "Voucher",
      component: <VoucherStep orderNumber={orderNumber} />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CheckoutStepper steps={steps} currentStep={currentStep} />

      <div className="pt-8">{steps[currentStep].component}</div>
    </div>
  );
};

export default Checkout;
