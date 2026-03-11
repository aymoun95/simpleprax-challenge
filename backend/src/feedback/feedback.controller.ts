import { CreateFeedbackSchema } from "@/feedback/feedback.schemas.js";
import { FeedbackService } from "@/feedback/feedback.service.js";
import { Request, Response } from "express";
import { z } from "zod";

export class FeedbackController {
  private feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  createFeedback = (req: Request, res: Response): void => {
    try {
      const validatedData = CreateFeedbackSchema.parse(req.body);

      const feedback = this.feedbackService.createFeedback(validatedData);

      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
        return;
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  };

  getFeedbacksByDoctorId = (req: Request, res: Response): void => {
    try {
      const { doctorId } = req.params;
      const feedbacks = this.feedbackService.getFeedbacksByDoctorId(doctorId);
      res.status(200).json(feedbacks);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  };

  getAllFeedbacks = (req: Request, res: Response): void => {
    try {
      const feedbacks = this.feedbackService.getAllFeedbacks();
      res.status(200).json(feedbacks);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  };
}
