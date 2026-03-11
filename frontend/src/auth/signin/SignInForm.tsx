"use client";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

import { authSchema } from "@/auth/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      role: "doctor",
    },
  });

  function onSubmit() {
    toast("Signed in successfully!", {
      position: "bottom-right",
    });
    navigate("/dashboard");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your details to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signin-title">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-signin-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signin-role">Role</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-signin-role"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-stretch">
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-signin"
            className="w-full cursor-pointer"
          >
            Sign In
          </Button>
        </Field>

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Button
            type="button"
            onClick={() => navigate("/signup")}
            className="cursor-pointer"
            variant="link"
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
