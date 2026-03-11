import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { SignIn } from "./auth/signin/SignIn";
import { SignUp } from "./auth/signup/SignUp";
import { Dashboard } from "./dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
