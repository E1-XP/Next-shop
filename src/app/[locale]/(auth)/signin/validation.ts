import { z } from "zod";

export type SchemaType = z.infer<typeof signInSchema>;
export type SchemaKeys = keyof SchemaType;

export const signInSchema = z.object({
  email: z.string().nonempty().email().trim(),
  password: z.string().nonempty().trim(),
});
