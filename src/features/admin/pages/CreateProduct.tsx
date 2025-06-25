import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FC, useState } from "react";

import {
  CreateProductInput,
  createProductSchema,
} from "@/features/admin/validations/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

import ProductService from "@/features/products/services/ProductService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useCategories } from "@/features/categories/hooks/useCategory";
import { useCategoryAttributes } from "@/features/categories/hooks/useCategoryAttributes";
import { AttributeValueForm } from "@/shared/ui/AttributeValueForm";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import ImageUploader from "@/shared/ui/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import TextEditor from "@/shared/ui/texteditor";
import TextEditorTest from "@/shared/ui/texteditortest";

const CreateProduct: FC = () => {
  const { categories } = useCategories(1000);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const { attributes } = useCategoryAttributes(selectedCategoryId);

  const navigate = useNavigate();

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      quantity: 1,
      categoryId: "",
      mainImage: undefined,
    },
  });

  const onSubmit = async (data: CreateProductInput) => {
    if (isFirstLoad) {
      // Lógica para asegurar que las imágenes son solo creadas en la primera carga
      setIsFirstLoad(false); // Cambia el estado para evitar que se carguen más imágenes

      // Aquí se realiza la creación del producto con las imágenes cargadas
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        category_ids: [Number(data.categoryId)],
      };

      const images: { image: File; isMain: boolean }[] = [];

      const { mainImage, gallery } = data;

      // Imagen principal
      if (mainImage) {
        images.push({
          image: mainImage, // `data.mainImage` ya es un File, según tu ejemplo anterior
          isMain: true,
        });
      }

      // Galería
      if (gallery && gallery.length > 0) {
        gallery.forEach((file: File) => {
          images.push({
            image: file,
            isMain: false,
          });
        });
      }

      console.log("ATTRIBUTES DATA", data.attributes);

      console.log("ALL ATTRIBUTES", attributes);

      const productAttributes = data.attributes?.map((attr) => ({
        attributeId: attr.id,
        values: attr.values,
      }));

      console.log("PRODUCT ATTRIBUTES", productAttributes);

      try {
        const response = await ProductService.createProduct(productData);
        const productId = response.id;

        await ProductService.uploadProductImages(productId, images);

        await ProductService.addAttributesToProduct(
          productId,
          productAttributes
        );

        toast.success("Producto creado correctamente");
        navigate("/products");
      } catch (error) {
        console.error("Error creando producto:", error);
        alert("Error creando producto. Intenta nuevamente.");
      }
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log("Errores del formulario:", errors);
  };

  return (
    <div className="w-full mx-auto min-h-screen md:max-w-5xl mt-6 px-4 sm:px-6 py-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
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
                  <TextEditorTest
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Precio del Producto"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.price?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cantidad del Producto"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.quantity?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Aquí agregamos el componente de carga de imagen principal */}
          <FormField
            control={form.control}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen Principal</FormLabel>
                <FormControl>
                  <ImageUploader {...field} />
                </FormControl>

                <FormMessage>
                  {form.formState.errors.mainImage?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Aquí agregamos el componente de carga de imágenes para la galería */}
          <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Galería de imagenes</FormLabel>
                <FormControl>
                  <ImageUploader multiple {...field} />
                </FormControl>

                <FormMessage>
                  {form.formState.errors.gallery?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val); // mantener conexión con RHF
                      setSelectedCategoryId(Number(val)); // tu lógica adicional
                    }}
                    value={field.value || ""} // asegura valor inicial
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {attributes && (
            <FormField
              control={form.control}
              name="attributes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atributos</FormLabel>
                  <FormControl>
                    <AttributeValueForm
                      attributes={attributes}
                      values={field.value} // evita warning
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            variant={"outline"}
            className="w-fit bg-blue-600 hover:bg-blue-800 text-white hover:text-white"
            type="submit"
          >
            Crear producto
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
