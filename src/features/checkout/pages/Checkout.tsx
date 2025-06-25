import { useAddresses } from "@/features/address/hooks/useAddress";
import { useCart } from "@/features/cart/hooks/CartContext";
import AddressStep from "@/features/checkout/components/AddressStep";
import CartStep from "@/features/checkout/components/CartStep";
import CheckoutStepper from "@/features/checkout/components/CheckoutStepper";
import PaymentStep from "@/features/checkout/components/PaymentStep";
import SummaryStep from "@/features/checkout/components/SummaryStep";
import VoucherStep from "@/features/checkout/components/VoucherStep";
import OrderService from "@/features/order/services/OrderService";
import PaymentService from "@/features/payments/service/PaymentService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Checkout: FC = () => {
  const navigate = useNavigate();

  const { clearCart, cart } = useCart();
  const location = useLocation();

  const initialStep = location.state?.step ?? 0;

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [orderNumber, setOrderNumber] = useState<string>("");
  const { addresses, refetch } = useAddresses();

  const shouldRefetch = location.state?.shouldRefetch;

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_PK_KEY);
        setStripePromise(stripe);

        const total = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const centsAmount = Math.round(total * 100);

        const response = await PaymentService.createPaymentIntent(centsAmount);
        setClientSecret(response);
      } catch (error) {
        console.error("Error inicializando Stripe:", error);
      }
    };

    initStripe();
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      // Forzar refetch desde hook o similar si lo permite
      refetch();
      navigate(location.pathname, {
        replace: true,
        state: { step: currentStep },
      }); // limpia el estado para evitar refetch infinitos
    }
  }, [shouldRefetch]);

  const handleCheckout = async () => {
    const isDevMode = import.meta.env.DEV;
    if (isDevMode) {
      // Simula comportamiento sin Stripe
      const cart_items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const order = {
        cart_items,
        address_id: selectedAddressId,
      };

      try {
        const response = await OrderService.buyOrder(order);
        setOrderNumber(response.orderNumber);

        clearCart();
        nextStep();
        toast.success("Compra simulada exitosamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al simular la compra.");
      }
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        console.error(error.message);
        toast.error(error.message ?? "Hubo un problema procesando el pago.");
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
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
        nextStep();
        toast.success("Compra realizada exitosamente");
      } else {
        toast.error("El pago no se pudo completar. Intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Problema de conexión. Intenta de nuevo.");
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const steps = [
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
        />
      ),
    },
    {
      label: "Pago",
      component: (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentStep handleCheckout={handleCheckout} prevStep={prevStep} />
        </Elements>
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
