import authRoutes from "@/auth/auth.routes.js";
import doctorRoutes from "@/doctor/doctor.routes.js";
import feedbackRoutes from "@/feedback/feedback.routes.js";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Simpleprax Backend" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/doctor", doctorRoutes);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
