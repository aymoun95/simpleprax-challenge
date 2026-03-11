import { Router } from "express";
import { DoctorRepository } from "./doctor.repository.js";

const router = Router();
const doctorRepository = new DoctorRepository();

router.get("/", (req, res) => {
  try {
    const doctors = doctorRepository.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

export default router;
