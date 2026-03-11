import { DoctorRepository } from "@/doctor/doctor.repository.js";
import {
  Feedback,
  FeedbackRepository,
} from "@/feedback/feedback.repository.js";
import { PatientRepository } from "@/patient/patient.repository.js";

export interface CreateFeedbackRequest {
  doctor_id: string;
  patient_id: string;
  rating: number;
  comment?: string;
}

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;
  private doctorRepository: DoctorRepository;
  private patientRepository: PatientRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
    // Assuming these could ideally be injected, but keeping it simple as per previous structure
    this.doctorRepository = new DoctorRepository();
    this.patientRepository = new PatientRepository();
  }

  createFeedback(request: CreateFeedbackRequest): Feedback {
    // We ideally should validate if doctor and patient exist, but since repositories
    // are currently in-memory and instantiated anew here, they might be empty in this instance.
    // In a real database scenario with DI, we would do:
    // const doctor = this.doctorRepository.findById(request.doctor_id);
    // if (!doctor) throw new Error("Doctor not found");
    // const patient = this.patientRepository.findById(request.patient_id);
    // if (!patient) throw new Error("Patient not found");

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

  getFeedbacksByPatientId(patientId: string): Feedback[] {
    return this.feedbackRepository.findByPatientId(patientId);
  }

  getAllFeedbacks(): Feedback[] {
    return this.feedbackRepository.findAll();
  }
}
