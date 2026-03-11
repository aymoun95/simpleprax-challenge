"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FeedbackList, type GeneralFeedback } from "./FeedbackList";

export type Doctor = {
  id: string;
  name: string;
  created_at: Date;
  specialty: string;
  role: "doctor";
};

export function DoctorDashboard({
  user,
  onSignOut,
}: {
  user: Doctor;
  onSignOut: () => void;
}) {
  const [feedbacks, setFeedbacks] = useState<GeneralFeedback[]>([]);

  useEffect(() => {
    fetch(`/feedback/doctor/${user.id}`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch(() => toast.error("Failed to fetch feedbacks"));
  }, [user.id]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Doctor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome Dr. {user.name}</p>
          </div>
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>

        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  );
}
