import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";

import AddressService from "@/features/address/services/AddressService";
import AddressAutocomplete from "@/features/address/components/AddressAutoComplete";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
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

const EditAddress = () => {
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      toast.error("ID inválido.");
      navigate("/my-address");
      return;
    }

    const fetchAddress = async () => {
      try {
        const address = await AddressService.getOneAddress(Number(id));

        const { alias, street, city, country, postal_code } = address;

        form.setValue("street", street);
        form.reset({ alias, street, city, country, zipCode: postal_code });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto. Intenta nuevamente.");
        navigate("/my-address");
      }
    };

    fetchAddress();
  }, [id]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      const fullAddress = `${data.street}, ${data.city}, ${data.zipCode}, ${data.country}`;
      const validated = await AddressService.validateAddress(fullAddress);

      if (!validated) {
        alert("Dirección no válida. Por favor revisa los datos.");
        return;
      }

      console.log("Dirección validada con Nominatim:", validated);

      const addressData = {
        street: data.street,
        alias: data.alias,
        postal_code: data.zipCode,
        country: data.country,
        city: data.city,
      };

      const response = await AddressService.updateAddress(
        Number(id),
        addressData
      );
      console.log("Response", response);

      const redirectPath = location.state?.from ?? "my-address";
      navigate(`/${redirectPath}`);
    } catch (error) {
      console.error("Error: ", error);
    }
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

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader className="text-xl font-bold">
        Añadir nueva dirección
      </CardHeader>

      <AddressAutocomplete
        value={autocompleteValue || ""}
        onChange={setAutocompleteValue}
        onSelect={handleAddressSelect}
      />

      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

export default EditAddress;
