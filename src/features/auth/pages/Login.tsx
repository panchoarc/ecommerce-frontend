import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/auth/hooks/AuthContext";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import IDPLogin from "./IDPLogin";
import BasicLayout from "@/features/products/layouts/ProductsLayout";

import { LoginData, loginSchema } from "@/features/auth/valdations/LoginSchema";

import FormError from "@/shared/ui/formerror";
import PasswordInput from "@/shared/ui/PasswordInput";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.username, data.password);
      toast.success("Bienvenido");
      reset();
    } catch (error) {
      toast.error(error.response.data.errors.message);
    }
  };

  return (
    <BasicLayout>
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            autoComplete="on"
            type="text"
            {...register("username")}
            placeholder="Username"
          />
          {errors.username && <FormError message={errors?.username?.message} />}

          <PasswordInput
            {...register("password")}
            name="password"
            placeholder="Password"
          />
          {errors.username && <FormError message={errors?.password?.message} />}

          <Button className="w-full mx-auto mb-4" type="submit">
            Login
          </Button>
        </form>

        <IDPLogin />
      </div>
    </BasicLayout>
  );
};

export default Login;
