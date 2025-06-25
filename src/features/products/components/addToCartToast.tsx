import { Button } from "@/shared/ui/button";
import { Check } from "lucide-react";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";

export function showCartToast(navigate: NavigateFunction) {
  toast(
    <div className="flex items-start gap-4">
      {/* Icono de éxito */}
      <div className="shrink-0 mt-1 text-green-500 dark:text-green-400">
        <Check className="w-5 h-5" />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-2">
        <p className="font-medium text-sm text-foreground">
          Producto agregado al carrito
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-sm px-3 py-1.5 bg-green-500 text-white hover:bg-green-700 hover:cursor-pointer hover:text-white"
            onClick={() => navigate("/cart")}
          >
            Ir al carrito
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-sm px-3 py-1.5 hover:cursor-pointer"
            onClick={() => toast.dismiss()}
          >
            Seguir comprando
          </Button>
        </div>
      </div>
    </div>,
    {
      duration: 5000,
      className:
        "bg-background shadow-xl border border-border rounded-xl p-4 max-w-md",
    }
  );
}
