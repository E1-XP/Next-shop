import { z } from "zod";

export type SchemaType = z.infer<typeof reviewSchema>;
export type SchemaKeys = keyof SchemaType;

export const reviewSchema = z.object({
  review: z.string().nonempty().trim(),
  username: z.string().nonempty().trim(),
});
