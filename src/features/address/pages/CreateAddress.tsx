import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AddressAutocomplete from "@/features/address/components/AddressAutoComplete";
import AddressService from "@/features/address/services/AddressService";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

// Esquema de validación con Zod
const addressSchema = z.object({
  alias: z.string().min(1, "El nombre es requerido"),
  street: z.string().min(1, "La calle es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  zipCode: z
    .string()
    .min(3, "El código postal debe tener al menos 3 caracteres"),
  country: z.string().min(1, "El país es requerido"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const CreateAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [autocompleteValue, setAutocompleteValue] = useState("");

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      const fullAddress = `${data.street}, ${data.city}, ${data.zipCode}, ${data.country}`;
      const validated = await AddressService.validateAddress(fullAddress);

      if (!validated) {
        toast.error("Dirección no válida. Por favor revisa los datos.");
        return;
      }

      const addressData = {
        street: data.street,
        alias: data.alias,
        postal_code: data.zipCode,
        country: data.country,
        city: data.city,
      };

      const response = await AddressService.createNewAddress(addressData);
      console.log("Response", response);

      const redirectPath = location.state?.from ?? "/my-address";
      const step = location.state?.step ?? 1;

      navigate(redirectPath, {
        state: {
          step,
          shouldRefetch: true,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }

    // Ahora sí, puedes enviarla a tu backend o procesarla
  };

  const handleAddressSelect = (result: any) => {
    const address = result.address;

    form.setValue("street", address.road ?? result.display_name);
    form.setValue(
      "city",
      address.city ?? address.town ?? address.village ?? ""
    );
    form.setValue("zipCode", address.postcode ?? "");
    form.setValue("country", address.country ?? "");

    setAutocompleteValue(address.road ?? result.display_name);
  };

  const onError = (error) => {
    console.error("Error", error);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader className="text-xl font-bold">
        Añadir nueva dirección
      </CardHeader>

      <AddressAutocomplete
        value={autocompleteValue}
        onChange={setAutocompleteValue}
        onSelect={handleAddressSelect}
      />

      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Casa de mamá" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Springfield" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Springfield" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 62704" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Estados Unidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Guardar dirección
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAddress;
