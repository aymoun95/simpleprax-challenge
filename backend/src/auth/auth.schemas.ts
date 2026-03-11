import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["patient", "doctor"], {
    errorMap: () => ({ message: "Role must be 'patient' or 'doctor'" }),
  }),
});

export const SigninSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["patient", "doctor"], {
    errorMap: () => ({ message: "Role must be 'patient' or 'doctor'" }),
  }),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
