export interface Patient {
  id: string;
  name: string;
  created_at: Date;
}

export class PatientRepository {
  private static patients: Map<string, Patient> = new Map();
  private static idCounter = 1;

  create(name: string): Patient {
    const id = `patient_${PatientRepository.idCounter++}`;
    const patient: Patient = {
      id,
      name,
      created_at: new Date(),
    };
    PatientRepository.patients.set(id, patient);
    return patient;
  }

  findById(id: string): Patient | undefined {
    return PatientRepository.patients.get(id);
  }

  findByName(name: string): Patient | undefined {
    return Array.from(PatientRepository.patients.values()).find(
      (p) => p.name === name,
    );
  }

  findAll(): Patient[] {
    return Array.from(PatientRepository.patients.values());
  }
}
