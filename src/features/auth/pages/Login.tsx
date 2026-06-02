import { FC } from "react";
import BasicLayout from "@/features/products/layouts/ProductsLayout";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Login: FC = () => {
  const { login } = useAuth();

  return (
    <BasicLayout>
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <Button className="w-full" onClick={login}>
          Login con Keycloak
        </Button>
      </div>
    </BasicLayout>
  );
};

export default Login;