import { z } from "zod";

export const registerValidator = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password Length should be more than 5 characters"),
});

export type RegisterFormType = z.infer<typeof registerValidator>;