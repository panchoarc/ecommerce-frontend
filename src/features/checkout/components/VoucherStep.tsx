import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Download, ExternalLink, ArrowRight } from "lucide-react";

import OrderService from "@/features/order/services/OrderService";
import { Button } from "@/shared/ui/button";
import FullscreenLoader from "@/shared/ui/ScreenLoader";

interface VoucherStepProps {
  orderNumber: string;
}

const VoucherStep: FC<VoucherStepProps> = ({ orderNumber }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [voucherUrl, setVoucherUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [redirectCancelled, setRedirectCancelled] = useState(false);

  useEffect(() => {
    const fetchVoucher = async () => {
      setLoading(true);
      try {
        const response = await OrderService.getOrderVoucher(orderNumber);
        if (response) {
          const url = URL.createObjectURL(response);
          setVoucherUrl(url);
        }
      } catch (error) {
        console.error("Error al descargar el voucher:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchVoucher();
    }
  }, [orderNumber]);

  useEffect(() => {
    if (voucherUrl && !redirectCancelled) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/my-orders");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [voucherUrl, navigate, redirectCancelled]);

  const handleRedirectCancel = () => {
    setRedirectCancelled(true);
  };

  if (loading) return <FullscreenLoader />;
  if (!voucherUrl)
    return (
      <div className="text-center text-red-500">
        No se pudo obtener el voucher.
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white text-center">
      <div className="flex justify-center mb-4 text-green-600">
        <CheckCircle size={48} strokeWidth={1.5} />
      </div>

      <h2 className="text-2xl font-semibold mb-2">
        ¡Compra realizada con éxito!
      </h2>
      <p className="text-gray-600 mb-6">
        Gracias por tu compra. Aquí tienes tu comprobante:
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
        <a
          href={voucherUrl}
          download={`voucher_${orderNumber}.pdf`}
          onClick={handleRedirectCancel}
        >
          <Button className="w-full sm:w-auto gap-2">
            <Download size={18} />
            Descargar PDF
          </Button>
        </a>
        <a
          href={voucherUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRedirectCancel}
        >
          <Button variant="secondary" className="w-full sm:w-auto gap-2">
            <ExternalLink size={18} />
            Ver en nueva pestaña
          </Button>
        </a>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Serás redirigido automáticamente a tus pedidos en{" "}
        <span className="font-semibold">{countdown}</span> segundos...
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <Button
          onClick={() => navigate("/my-orders")}
          className="w-full sm:w-auto gap-2"
        >
          <ArrowRight size={18} />
          Ir a Mis Pedidos
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-full sm:w-auto"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default VoucherStep;
