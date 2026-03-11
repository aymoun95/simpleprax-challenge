import { AuthForm } from "@/components/custom/AuthForm";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AuthForm />
    </div>
  );
}
