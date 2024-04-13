import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "username must be of 3 character")
  .max(20, "username mustn't be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username mustn't contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "password must be at least 8 characters long"),
});
