import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email().transform((val) => val.toLowerCase()),
  password: z.string().min(6),
});

export default {signupSchema, loginSchema};

