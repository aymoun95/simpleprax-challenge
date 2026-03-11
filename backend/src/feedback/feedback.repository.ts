export interface Feedback {
  id: string;
  doctor_id: string;
  patient_id: string;
  rating: number;
  comment?: string;
  created_at: Date;
}

export class FeedbackRepository {
  private feedbacks: Map<string, Feedback> = new Map();
  private idCounter = 1;

  create(feedbackData: Omit<Feedback, "id" | "created_at">): Feedback {
    const id = `feedback_${this.idCounter++}`;
    const feedback: Feedback = {
      id,
      ...feedbackData,
      created_at: new Date(),
    };
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  findById(id: string): Feedback | undefined {
    return this.feedbacks.get(id);
  }

  findByDoctorId(doctorId: string): Feedback[] {
    return Array.from(this.feedbacks.values()).filter(
      (f) => f.doctor_id === doctorId,
    );
  }

  findByPatientId(patientId: string): Feedback[] {
    return Array.from(this.feedbacks.values()).filter(
      (f) => f.patient_id === patientId,
    );
  }

  findAll(): Feedback[] {
    return Array.from(this.feedbacks.values());
  }
}
