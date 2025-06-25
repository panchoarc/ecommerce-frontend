import { BrowserRouter } from "react-router";
import { CartProvider } from "@/features/cart/hooks/CartContext";
import { AuthProvider } from "@/features/auth/hooks/AuthContext";
import { UserProvider } from "./features/user/hooks/UserContext";

import { Toaster } from "@/shared/ui/sonner";

import RoleBasedRoutes from "@/shared/utils/RoleBasedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <UserProvider>
        <AuthProvider>
          <CartProvider>
            <RoleBasedRoutes />
          </CartProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
