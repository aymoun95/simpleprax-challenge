import { Patient } from "@/types/index.js";

export class PatientRepository {
  private patients: Map<string, Patient> = new Map();
  private idCounter = 1;

  create(name: string): Patient {
    const id = `patient_${this.idCounter++}`;
    const patient: Patient = {
      id,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@patient.local`,
      created_at: new Date(),
    };
    this.patients.set(id, patient);
    return patient;
  }

  findById(id: string): Patient | undefined {
    return this.patients.get(id);
  }

  findByName(name: string): Patient | undefined {
    return Array.from(this.patients.values()).find((p) => p.name === name);
  }

  findAll(): Patient[] {
    return Array.from(this.patients.values());
  }
}
