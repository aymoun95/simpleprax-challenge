import {
  Feedback,
  FeedbackRepository,
} from "@/feedback/feedback.repository.js";

export interface CreateFeedbackRequest {
  doctor_id: string;
  patient_id: string;
  rating: number;
  comment?: string;
}

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  createFeedback(request: CreateFeedbackRequest): Feedback {
    return this.feedbackRepository.create({
      doctor_id: request.doctor_id,
      patient_id: request.patient_id,
      rating: request.rating,
      comment: request.comment,
    });
  }

  getFeedbacksByDoctorId(doctorId: string): Feedback[] {
    return this.feedbackRepository.findByDoctorId(doctorId);
  }

  getAllFeedbacks(): Feedback[] {
    return this.feedbackRepository.findAll();
  }
}
