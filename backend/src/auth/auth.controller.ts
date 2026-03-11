import { SigninSchema, SignupSchema } from "@/auth/auth.schemas.js";
import { AuthService } from "@/auth/auth.service.js";
import { Request, Response } from "express";
import { z } from "zod";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signup = (req: Request, res: Response): void => {
    try {
      const validatedData = SignupSchema.parse(req.body);
      const user = this.authService.signup(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
        return;
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  };

  signin = (req: Request, res: Response): void => {
    try {
      const validatedData = SigninSchema.parse(req.body);
      const user = this.authService.signin(validatedData);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
        return;
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(404).json({ error: message });
    }
  };
}
