import { Shield } from "lucide-react";
import { useAuth } from "react-oidc-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";
import { useSecurityStatus } from "../hooks/useSecurityStatus";

import SecurityService from "../services/SecurityService";

export default function SecurityPage() {
  const auth = useAuth();
  const status = useSecurityStatus();

  const enableOtp = async () => {
    await SecurityService.startOtpSetup();
    await auth.signinRedirect();
  };

  const disableOtp = async () => {
    await SecurityService.disableOtp();
    window.location.reload();
  };

  if (!status?.status) {
    return null; // o loader
  }

  const security = status.status;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Shield size={18} />
            Seguridad
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Autenticación de dos factores</h3>

            <p className="text-muted-foreground">
              {security.otpEnabled
                ? "Protección adicional activada."
                : "No configurada."}
            </p>
          </div>
          {!security.otpEnabled && (
            <Button onClick={enableOtp}>Activar 2FA</Button>
          )}

          {security.otpEnabled && (
            <Button variant="destructive" onClick={disableOtp}>
              Desactivar 2FA
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
