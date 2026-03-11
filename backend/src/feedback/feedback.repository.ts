export interface Feedback {
  id: string;
  doctor_id: string;
  patient_id: string;
  rating: number;
  comment?: string;
  created_at: Date;
}

export class FeedbackRepository {
  private static feedbacks: Map<string, Feedback> = new Map();
  private static idCounter = 1;

  create(feedbackData: Omit<Feedback, "id" | "created_at">): Feedback {
    const id = `feedback_${FeedbackRepository.idCounter++}`;
    const feedback: Feedback = {
      id,
      ...feedbackData,
      created_at: new Date(),
    };
    FeedbackRepository.feedbacks.set(id, feedback);
    return feedback;
  }

  findById(id: string): Feedback | undefined {
    return FeedbackRepository.feedbacks.get(id);
  }

  findByDoctorId(doctorId: string): Feedback[] {
    return Array.from(FeedbackRepository.feedbacks.values()).filter(
      (f) => f.doctor_id === doctorId,
    );
  }

  findByPatientId(patientId: string): Feedback[] {
    return Array.from(FeedbackRepository.feedbacks.values()).filter(
      (f) => f.patient_id === patientId,
    );
  }

  findAll(): Feedback[] {
    return Array.from(FeedbackRepository.feedbacks.values());
  }
}
