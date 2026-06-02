import { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router";

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const RoleGuard = ({ children, allowedRoles = [] }: RoleGuardProps) => {
  const { roles } = useAuth();

  const normalizedRoles = (roles ?? []).map((r: string) => r.toLowerCase());

  const normalizedAllowed = new Set(allowedRoles.map((r) => r.toLowerCase()));

  const hasAccess = normalizedRoles.some((r: string) =>
    normalizedAllowed.has(r),
  );

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
