import z from "zod";
export const authSchema = z.object({
  name: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  role: z.enum(["patient", "doctor"]),
});
