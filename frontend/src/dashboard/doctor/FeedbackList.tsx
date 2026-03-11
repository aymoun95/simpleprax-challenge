import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { Feedback } from "../patient/PatientDashboard";

export type GeneralFeedback = Feedback & {
  id: string;
  patient_id: string;
  created_at: Date;
};

export function FeedbackList({ feedbacks }: { feedbacks: GeneralFeedback[] }) {
  const [filterRating, setFilterRating] = useState<string>("all");

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filterRating === "all") return true;
    return fb.rating.toString() === filterRating;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Feedback</CardTitle>
            <CardDescription>
              What patients are saying about you
            </CardDescription>
          </div>
          <div className="w-48">
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger aria-label="Filter by rating">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredFeedbacks.length === 0 ? (
          <p className="text-gray-500 italic">
            No feedback matches your filter.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold text-lg">{fb.rating} Stars</div>
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
  );
}
