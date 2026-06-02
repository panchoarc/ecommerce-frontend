import { useEffect, useState } from "react";
import SecurityService from "@/features/settings/services/SecurityService";

export interface SecurityStatus {
  otpEnabled: boolean;
  webAuthnEnabled: boolean;
}

export function useSecurityStatus() {
  const [status, setStatus] = useState<SecurityStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const userStatus = await SecurityService.getSecurityStatus();
      setStatus(userStatus);
    };
    fetchStatus();
  }, []);

  return { status };
}
