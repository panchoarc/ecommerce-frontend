// EditProduct.tsx

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FC, useEffect, useState } from "react";

import {
  UpdateProductInput,
  updateProductSchema,
} from "@/features/admin/validations/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCategories } from "@/features/categories/hooks/useCategory";
import ProductService from "@/features/products/services/ProductService";
import { AttributeValueForm } from "@/shared/ui/AttributeValueForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { useCategoryAttributes } from "@/features/categories/hooks/useCategoryAttributes";
import ImageUploader from "@/shared/ui/ImageUploader";
import TextEditor from "@/shared/ui/texteditor";
import TextEditorTest from "@/shared/ui/texteditortest";

const EditProduct: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const { attributes } = useCategoryAttributes(selectedCategoryId);

  const form = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
  });

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      toast.error("ID inválido.");
      navigate("/products");
      return;
    }

    const fetchProduct = async () => {
      try {
        const product = await ProductService.getProduct(Number(id));

        console.log("Product", product);
        const imagesResponse = await ProductService.getProductImages(
          product.id
        );

        const attributesResponse = await ProductService.getProductAttributes(
          product.id
        );

        const transformedAttributes = attributesResponse.map((attribute) => {
          return {
            id: attribute.attributeId,
            values: attribute.values,
          };
        });

        console.log("TRANSFORMED ATTRIBUTES", transformedAttributes);

        console.log("attributesResponse", attributesResponse);

        const mainImage = imagesResponse.find(
          (image) => image.isMainImage
        )?.url;

        const galleryImages = imagesResponse
          .filter((image) => !image.isMainImage)
          .map((image) => image.url);

        const {
          name,
          description,
          price,
          stock: quantity,
          category_id,
          is_active,
        } = product;

        setSelectedCategoryId(category_id);

        form.reset({
          name,
          description,
          price,
          quantity,
          categoryId: category_id.toString(),
          isActive: is_active,
          mainImage,
          gallery: galleryImages,
          attributes: transformedAttributes,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto. Intenta nuevamente.");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [form, id, navigate]);

  // Función para convertir URL a File
  const convertUrlToFile = async (
    url: string,
    fileName: string
  ): Promise<File> => {
    try {
      const response = await fetch(url, {
        mode: "cors", // Asegúrate de que CORS esté permitido si es necesario
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch the image. Status: ${response.status}`
        );
      }

      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error: any) {
      console.error("Error in convertUrlToFile:", error);
      throw new Error(`Error converting URL to File: ${error.message}`);
    }
  };

  // Convertir imágenes URLs a archivos solo cuando se envíe el formulario
  const processImages = async (data: any) => {
    const mainImageFile =
      data.mainImage instanceof File
        ? data.mainImage
        : await convertUrlToFile(data.mainImage, "main_image.jpg");

    let galleryImagesFiles = [];
    if (data.gallery.length > 0) {
      galleryImagesFiles = await Promise.all(
        data.gallery.map(async (img) =>
          img instanceof File
            ? img
            : await convertUrlToFile(img, `gallery_image_${Date.now()}.jpg`)
        )
      );
    }
    return { mainImageFile, galleryImagesFiles };
  };

  const onSubmit = async (data: UpdateProductInput) => {
    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category_id: Number(data.categoryId),
      is_active: Boolean(data.isActive),
    };

    try {
      // Procesamos las imágenes (convertir URLs a File)
      const { mainImageFile, galleryImagesFiles } = await processImages(data);

      const images: { image: File; isMain: boolean }[] = [
        { image: mainImageFile, isMain: true },
        ...galleryImagesFiles.map((file) => ({ image: file, isMain: false })),
      ];

      const productAttributes = data.attributes.map((attr) => ({
        attributeId: attr.id,
        values: attr.values,
      }));

      console.log("Product Attributes", productAttributes);

      // Actualizamos el producto
      await ProductService.updateProduct(Number(id), productData);

      // Si hay imágenes, las subimos al backend
      if (images.length > 0) {
        await ProductService.uploadProductImages(Number(id), images);
      }

      await ProductService.addAttributesToProduct(
        Number(id),
        productAttributes
      );

      toast.success("Producto actualizado correctamente.");
      navigate("/products");
    } catch (error) {
      console.error("Error actualizando producto:", error);
      toast.error("Error actualizando producto. Intenta nuevamente.");
    }
  };

  const onError = (error: any) => {
    console.log("Error", error);
  };

  return (
    <div className="w-full mx-auto h-auto md:max-w-3xl mt-6 px-4 sm:px-6 py-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
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
                      min={1}
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
                    value={field.value ?? ""} // asegura valor inicial
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
                <FormMessage>
                  {form.formState.errors.categoryId?.message}
                </FormMessage>
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

export default EditProduct;
