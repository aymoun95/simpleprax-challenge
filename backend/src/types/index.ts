export interface Patient {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  created_at: Date;
}

export type UserRole = "patient" | "doctor";

export interface SignupRequest {
  name: string;
  role: UserRole;
}

export interface SigninRequest {
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  id: string;
  name: string;
  role: UserRole;
  created_at: Date;
}
