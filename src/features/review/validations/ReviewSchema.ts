import { z } from "zod";

export const createReviewSchema = z.object({
  title: z.string().min(1, { message: "title cannot be blank" }),
  comment: z.string().min(1, { message: "comment cannot be blank" }),
  rating: z
    .number({ invalid_type_error: "rating must be a number" })
    .min(1, { message: "rating cannot be lower than 1" })
    .max(5, { message: "rating cannot be higher than 5" }),
  product_id: z
    .number({ invalid_type_error: "product_id must be a number" })
    .positive({ message: "product_id cannot be negative" }),
});

// Tipo inferido (opcional)
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
