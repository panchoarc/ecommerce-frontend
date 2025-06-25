// schemas/productSchemas.ts
import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Subschemas
const commonBaseSchema = {
  categoryId: z
    .string()
    .min(1, { message: "Debe seleccionar una categoría" })
    .refine((val) => val !== "", { message: "Debe seleccionar una categoría" }),

  name: z.string().min(1, { message: "El nombre es obligatorio" }),

  description: z.string().min(1, { message: "La descripción es obligatoria" }),

  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive({ message: "El precio debe ser mayor a 0" }),

  quantity: z
    .number({ invalid_type_error: "La cantidad debe ser un número" })
    .int({ message: "La cantidad debe ser un número entero" })
    .min(0, { message: "La cantidad no puede ser negativa" }),
};

// Subschemas específicos
const imageFileSchema = z
  .instanceof(File, {
    message: "Debes subir una imagen principal",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "El archivo debe ser una imagen válida (jpg, png, webp)",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: "La imagen no debe superar los 5MB",
  });

const fileOrUrlSchema = z.union([
  z.instanceof(File),
  z.string().url({ message: "Debe ser una URL válida" }),
]);

const attributesSchema = z.object({
  id: z.number().min(1, "El nombre del atributo es obligatorio"),
  values: z.array(z.string().min(1, "El valor del atributo es obligatorio")),
});

// Esquemas finales
export const createProductSchema = z.object({
  ...commonBaseSchema,

  mainImage: imageFileSchema,
  gallery: z.array(imageFileSchema).optional(),

  attributes: z.array(attributesSchema),
});

export const updateProductSchema = z.object({
  ...commonBaseSchema,

  mainImage: fileOrUrlSchema,
  gallery: z.array(fileOrUrlSchema).optional(),

  attributes: z.array(attributesSchema),
  isActive: z.boolean(),
});

// Inferencias
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type ProductAttributeInput = z.infer<typeof attributesSchema>;
