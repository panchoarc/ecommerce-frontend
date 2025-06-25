import {
  Attribute,
  UpdateCategory,
  updateCategorySchema,
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
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditCategories: FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const form = useForm<UpdateCategory>({
    resolver: zodResolver(updateCategorySchema),
  });

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      toast.error("ID inválido.");
      navigate("/categories");
      return;
    }

    const fetchCategory = async () => {
      try {
        const category = await CategoryService.getCategoryById(Number(id));

        const categoryAttributes = await CategoryService.getCategoryAttributes(
          category.id
        );

        const { name, description, isActive } = category;
        form.reset({
          name,
          description,
          isActive,
          attributes: categoryAttributes,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Error al cargar la categoría. Intenta nuevamente.");
        navigate("/categories");
      }
    };

    fetchCategory();
  }, [form, id, navigate]);

  const onSubmit = async (data: any) => {
    const categoryData = {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    };

    const attributesData = data.attributes.map((attribute: Attribute) => {
      return {
        id: attribute.id,
        name: attribute.name,
        type: attribute.type,
        options: Array.isArray(attribute.options) ? attribute.options : [],
        required: attribute.required,
      };
    });

    try {
      await CategoryService.updateCategory(Number(id), categoryData);

      await CategoryService.updateCategoryAttributes(
        Number(id),
        attributesData
      );
      toast.success("Categoría actualizada correctamente!");
      navigate("/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error al actualizar la categoría. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg bg-white">
      <CardTitle className="text-2xl font-bold mb-4">Edit Category</CardTitle>

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
                    attributes={field.value || []}
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
            Editar categoría
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditCategories;
