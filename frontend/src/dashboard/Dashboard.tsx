import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to SimplePrex</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/signin")}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Profile settings coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>View your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Appointments coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Access your health information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Medical records coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Communicate with healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Messages coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
