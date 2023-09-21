import { z } from "zod";

export type SchemaType = z.infer<typeof signUpSchema>;
export type SchemaKeys = keyof SchemaType;

const userRegex = /^[a-zA-Z\s]*\s+[a-zA-Z\s]*$/;
const userNameRegex = /^[a-zA-Z0-9-_]+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]).*(?=.*[a-zA-Z]).*(?=.*\d).+$/;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2)
      .max(24)
      .regex(
        new RegExp(userRegex),
        "Write your name and surname divided by space"
      )
      .trim(),
    username: z
      .string()
      .min(2)
      .max(24)
      .regex(
        new RegExp(userNameRegex),
        "Alphanumeric, underscores or dash characters only"
      )
      .trim(),
    email: z.string().email().nonempty().trim(),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(
        new RegExp(passwordRegex),
        "Please combine numbers, letters and special characters"
      )
      .trim(),
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required")
      .trim(),
    termsConfirmation: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
