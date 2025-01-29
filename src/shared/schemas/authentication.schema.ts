import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Incorrect email format"),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const passwordPattern =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const signUpSchema = z
  .object({
    email: z.string().trim().email("Incorrect email format"),
    password: z
      .string()
      .trim()
      .regex(passwordPattern, "Password is too weak")
      .min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: z.string().trim(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }
  );

export type SignUpSchema = z.infer<typeof signUpSchema>;
