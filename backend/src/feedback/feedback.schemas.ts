import { z } from "zod";

export const CreateFeedbackSchema = z.object({
  doctor_id: z.string().min(1, "Doctor ID is required"),
  patient_id: z.string().min(1, "Patient ID is required"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().optional(),
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedbackSchema>;
