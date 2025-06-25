// shared/validation/category.ts
import { z } from "zod";

/** 🧩 Tipos posibles de atributo */
export const attributeTypes = [
  "text",
  "number",
  "select",
  "radio",
  "checkbox",
] as const;

export const attributeTypeEnum = z.enum(attributeTypes);
export type AttributeType = (typeof attributeTypes)[number];

/** ✅ Esquema base del atributo */
const baseAttributeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre del atributo es obligatorio"),
  type: attributeTypeEnum,
  required: z.boolean(),
  options: z.array(z.string()),
});

/** ✅ Validación adicional para atributos con opciones */
export const attributeSchema = baseAttributeSchema.superRefine((attr, ctx) => {
  const needsOptions = ["select", "radio", "checkbox"].includes(attr.type);

  if (needsOptions) {
    if (!attr.options || attr.options.length === 0) {
      ctx.addIssue({
        path: ["options"],
        code: z.ZodIssueCode.custom,
        message: "Debe especificar al menos una opción",
      });
    } else if (!attr.options.some((opt) => opt.trim().length > 0)) {
      ctx.addIssue({
        path: ["options"],
        code: z.ZodIssueCode.custom,
        message: "Las opciones no pueden estar vacías",
      });
    }
  }
});

/** ✅ Esquema base para categoría */
export const baseCategorySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, "El nombre solo puede contener letras"),
  description: z.string().nonempty("La descripción es obligatoria"),
  attributes: z
    .array(attributeSchema)
    .min(1, "Debe contener al menos 1 atributo"),
});

/** 🏗️ Para creación de categoría */
export const createCategorySchema = baseCategorySchema;

/** ✏️ Para actualización de categoría */
export const updateCategorySchema = baseCategorySchema.extend({
  isActive: z.boolean(),
});

/** 📦 Tipos inferidos */
export type Attribute = z.infer<typeof attributeSchema>;
export type BaseCategory = z.infer<typeof baseCategorySchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
