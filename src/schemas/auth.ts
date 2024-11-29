import z from "zod";

// zod validation schemas
export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be 3 or more characters long" }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface User {
  id: String;
  email: String;
  password: String;
  username: String;
  createdAt: Date;
  updatedAt: Date;
}
