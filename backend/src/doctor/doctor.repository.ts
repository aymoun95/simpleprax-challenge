export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  created_at: Date;
}

export class DoctorRepository {
  private static doctors: Map<string, Doctor> = new Map();
  private static idCounter = 1;

  create(name: string, specialty: string = "General"): Doctor {
    const id = `doctor_${DoctorRepository.idCounter++}`;
    const doctor: Doctor = {
      id,
      name,
      specialty,
      created_at: new Date(),
    };
    DoctorRepository.doctors.set(id, doctor);
    return doctor;
  }

  findById(id: string): Doctor | undefined {
    return DoctorRepository.doctors.get(id);
  }

  findByName(name: string): Doctor | undefined {
    return Array.from(DoctorRepository.doctors.values()).find(
      (d) => d.name === name,
    );
  }

  findAll(): Doctor[] {
    return Array.from(DoctorRepository.doctors.values());
  }
}
