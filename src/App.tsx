import { BrowserRouter } from "react-router";
import { CartProvider } from "@/features/cart/hooks/CartContext";
import { UserProvider } from "./features/user/hooks/UserContext";
import { Toaster } from "@/shared/ui/sonner";
import { AuthProvider } from "react-oidc-context";

import RoleBasedRoutes from "@/shared/utils/RoleBasedRoutes";
import { oidcConfig } from "@/features/auth/config/OidcConfig";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider
        {...oidcConfig}
        onSigninCallback={() =>
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          )
        }
      >
        <UserProvider>
          <CartProvider>
            <RoleBasedRoutes />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
