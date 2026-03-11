export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  created_at: Date;
}

export class DoctorRepository {
  private doctors: Map<string, Doctor> = new Map();
  private idCounter = 1;

  create(name: string, specialty: string = "General"): Doctor {
    const id = `doctor_${this.idCounter++}`;
    const doctor: Doctor = {
      id,
      name,
      specialty,
      created_at: new Date(),
    };
    this.doctors.set(id, doctor);
    return doctor;
  }

  findById(id: string): Doctor | undefined {
    return this.doctors.get(id);
  }

  findByName(name: string): Doctor | undefined {
    return Array.from(this.doctors.values()).find((d) => d.name === name);
  }

  findAll(): Doctor[] {
    return Array.from(this.doctors.values());
  }
}
