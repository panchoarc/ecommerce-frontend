import { jwtDecode } from "jwt-decode";
import { useAuth as useOidcAuth } from "react-oidc-context";

export const useAuth = () => {
  const auth = useOidcAuth();

  const token = auth.user?.access_token;

  const decoded: any = token ? jwtDecode(token) : null;

  const roles = decoded?.resource_access?.["buyit-backend"]?.roles ?? [];

  return {
    user: auth.user,
    profile: auth.user?.profile,

    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,

    token,
    roles,

    login: () => auth.signinRedirect(),
    logout: () => auth.signoutRedirect(),
  };
};
