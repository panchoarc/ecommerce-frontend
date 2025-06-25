import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import PasswordInput from "@/shared/ui/PasswordInput";

import AuthService from "@/features/auth/services/AuthService";
import BasicLayout from "@/features/products/layouts/ProductsLayout";

import {
  RegisterForm,
  registerSchema,
} from "@/features/auth/valdations/RegisterSchema";

import FormError from "@/shared/ui/formerror";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    return await AuthService.registerUser(data)
      .then((response) => {
        console.log(response);
        toast.success(response.message);
        reset();
      })
      .catch((error) => {
        toast.error(error.response.data.errors.message);
        console.error(error);
      });
  };

  return (
    <BasicLayout>
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            autoComplete="on"
            {...register("firstname")}
            placeholder="Nombre"
          />
          {errors.firstname && <FormError message={errors.firstname.message} />}

          <Input
            autoComplete="on"
            {...register("lastname")}
            placeholder="Apellido"
          />
          {errors.lastname && <FormError message={errors.lastname.message} />}

          <Input
            autoComplete="on"
            {...register("username")}
            placeholder="Usuario"
          />
          {errors.username && <FormError message={errors.username.message} />}

          <Input
            autoComplete="on"
            type="email"
            {...register("email")}
            placeholder="Correo electrónico"
          />
          {errors.email && <FormError message={errors.email.message} />}

          <PasswordInput
            {...register("password")}
            name="password"
            placeholder="Password"
          />

          {errors.password && <FormError message={errors.password.message} />}

          <Button type="submit">Registrarse</Button>
        </form>
      </div>
    </BasicLayout>
  );
};

export default Register;
