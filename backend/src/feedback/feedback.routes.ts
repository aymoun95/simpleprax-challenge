import { FeedbackController } from "@/feedback/feedback.controller.js";
import { Router } from "express";

const router = Router();
const feedbackController = new FeedbackController();

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedbacks);
router.get("/doctor/:doctorId", feedbackController.getFeedbacksByDoctorId);

export default router;
