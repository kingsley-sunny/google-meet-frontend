import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password Length should be more than 5 characters"),
});
