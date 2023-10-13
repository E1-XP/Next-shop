import { z } from "zod";

export type SchemaType = z.infer<typeof signUpSchema>;
export type SchemaKeys = keyof SchemaType;

const userRegex = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
const userNameRegex = /^[a-zA-Z0-9-_]+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]).*(?=.*[a-zA-Z]).*(?=.*\d).+$/;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2)
      .max(24)
      .regex(new RegExp(userRegex), "i18n:validation.signUpForm.name")
      .trim(),
    username: z
      .string()
      .min(2)
      .max(24)
      .regex(new RegExp(userNameRegex), "i18n:validation.signUpForm.username")
      .trim(),
    email: z.string().email().nonempty().trim(),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(new RegExp(passwordRegex), "i18n:validation.signUpForm.password")
      .trim(),
    confirmPassword: z
      .string()
      .min(1, "i18n:validation.signUpForm.confirmPassword")
      .trim(),
    termsConfirmation: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "i18n:validation.signUpForm.afterPasswordConfirmation",
  });
