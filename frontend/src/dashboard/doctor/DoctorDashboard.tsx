"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Feedback } from "../patient/PatientDashboard";

export type Doctor = {
  id: string;
  name: string;
  created_at: Date;
  specialty: string;
  role: "doctor";
};

type GeneralFeedback = Feedback & {
  id: string;
  patient_id: string;
  created_at: Date;
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

        <Card>
          <CardHeader>
            <CardTitle>Your Feedback</CardTitle>
            <CardDescription>
              What patients are saying about you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedbacks.length === 0 ? (
              <p className="text-gray-500 italic">No feedback received yet.</p>
            ) : (
              <div className="space-y-4">
                {feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold text-lg">
                        {fb.rating} Stars
                      </div>
                    </div>
                    <p className="text-gray-700">{fb.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Patient ID: {fb.patient_id} •{" "}
                      {new Date(fb.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
