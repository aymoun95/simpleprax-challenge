import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorDashboard, type Doctor } from "./doctor/DoctorDashboard";
import { PatientDashboard, type Patient } from "./patient/PatientDashboard";

export type User = Patient | Doctor;

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      navigate("/signin");
      return;
    }
    try {
      setUser(JSON.parse(rawUser));
    } catch {
      navigate("/signin");
    }
  }, [navigate]);

  if (!user) return null;

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (user.role === "patient") {
    return <PatientDashboard user={user} onSignOut={handleSignOut} />;
  }

  if (user.role === "doctor") {
    return <DoctorDashboard user={user} onSignOut={handleSignOut} />;
  }

  return <div>Unknown role</div>;
}
