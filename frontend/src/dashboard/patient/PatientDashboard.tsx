"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Doctor } from "../doctor/DoctorDashboard";

const feedbackSchema = z.object({
  doctor_id: z.string().min(1, "Please select a doctor"),
  rating: z.string().min(1, "Please select a rating"),
  comment: z.string().min(1, "Please provide a comment"),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export type Patient = {
  id: string;
  name: string;
  created_at: Date;
  role: "patient";
};

export function PatientDashboard({
  user,
  onSignOut,
}: {
  user: Patient;
  onSignOut: () => void;
}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const form = useForm<Feedback>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      doctor_id: "",
      rating: "5",
      comment: "",
    },
  });

  useEffect(() => {
    fetch("/doctor")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() => toast.error("Failed to fetch doctors"));
  }, []);

  async function onSubmit(data: Feedback) {
    try {
      const response = await fetch("/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          rating: Number(data.rating),
          patient_id: user.id,
        }),
      });

      if (!response.ok) {
        return toast.error("Failed to submit feedback", {
          position: "bottom-right",
        });
      }

      toast.success("Feedback submitted successfully!", {
        position: "bottom-right",
      });
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Patient Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
          </div>
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Give Feedback</CardTitle>
            <CardDescription>
              Rate and review your most recent doctor visit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="feedback-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="doctor_id"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="doctor-select">Doctor</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="doctor-select"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doc) => (
                            <SelectItem key={doc.id} value={doc.id}>
                              Dr. {doc.name} ({doc.specialty})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="rating"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="rating-select">
                        Rating (1-5)
                      </FieldLabel>
                      <Select
                        value={String(field.value)}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="rating-select"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={String(num)}>
                              {num} Star{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="comment"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="comment-input">Comment</FieldLabel>
                      <Input
                        {...field}
                        id="comment-input"
                        aria-invalid={fieldState.invalid}
                        placeholder="Write your feedback here..."
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="feedback-form">
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
