import {
  Attribute,
  CreateCategory,
  createCategorySchema,
} from "@/features/admin/validations/categorySchema";
import CategoryService from "@/features/categories/services/CategoryService";
import { AttributeBuilder } from "@/shared/ui/AttributeBuilder";
import { Button } from "@/shared/ui/button";
import { CardTitle } from "@/shared/ui/card";
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
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateCategories: FC = () => {
  const navigate = useNavigate();
  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      attributes: [], // Asegúrate de que 'attributes' esté inicializado correctamente
    },
  });

  const onSubmit = async (data: CreateCategory) => {
    console.log("Data to submit:", data); // Verifica los datos que se envían

    const productPayload = {
      name: data.name,
      description: data.description,
    };

    const attributesPayload = data.attributes.map((attribute: Attribute) => ({
      id: attribute.id,
      name: attribute.name,
      type: attribute.type,
      required: attribute.required,
      options: attribute.options,
    }));

    try {
      const categoryResponse = await CategoryService.createCategory(
        productPayload
      );

      console.log("Category created successfully:", categoryResponse);
      const attributesResponse = await CategoryService.addCategoryAttribute(
        categoryResponse.id,
        attributesPayload
      );

      console.log("Attributes added successfully:", attributesResponse);

      toast.success("Category created successfully!");
      form.reset();
      navigate("/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category. Please try again.");
      navigate("/categories");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg bg-white">
      <CardTitle className="text-2xl font-bold mb-4">Create Category</CardTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre de la categoría"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Descripción de la categoría"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Atributos</FormLabel>
                <FormControl>
                  <AttributeBuilder
                    attributes={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.attributes?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full mx-auto my-4 focus-visible:ring focus-visible:ring-blue-300"
          >
            Crear categoría
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategories;
