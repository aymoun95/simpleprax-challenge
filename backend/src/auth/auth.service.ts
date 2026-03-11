import { DoctorRepository } from "@/doctor/doctor.repository.js";
import { PatientRepository } from "@/patient/patient.repository.js";
import { AuthResponse, SigninRequest, SignupRequest } from "@/types/index.js";

export class AuthService {
  private patientRepository: PatientRepository;
  private doctorRepository: DoctorRepository;

  constructor() {
    this.patientRepository = new PatientRepository();
    this.doctorRepository = new DoctorRepository();
  }

  signup(request: SignupRequest): AuthResponse {
    if (request.role === "patient") {
      const existingPatient = this.patientRepository.findByName(request.name);
      if (existingPatient) {
        throw new Error("Patient with this name already exists");
      }

      const patient = this.patientRepository.create(request.name);
      return {
        id: patient.id,
        name: patient.name,
        role: "patient",
        created_at: patient.created_at,
      };
    } else {
      const existingDoctor = this.doctorRepository.findByName(request.name);
      if (existingDoctor) {
        throw new Error("Doctor with this name already exists");
      }

      const doctor = this.doctorRepository.create(request.name);
      return {
        id: doctor.id,
        name: doctor.name,
        role: "doctor",
        created_at: doctor.created_at,
      };
    }
  }

  signin(request: SigninRequest): AuthResponse {
    if (request.role === "patient") {
      const patient = this.patientRepository.findByName(request.name);
      if (!patient) {
        throw new Error("Patient not found");
      }
      return {
        id: patient.id,
        name: patient.name,
        role: "patient",
        created_at: patient.created_at,
      };
    } else {
      const doctor = this.doctorRepository.findByName(request.name);
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      return {
        id: doctor.id,
        name: doctor.name,
        role: "doctor",
        created_at: doctor.created_at,
      };
    }
  }
}
