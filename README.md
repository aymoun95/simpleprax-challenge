# Simpleprax

Simpleprax is a full-stack web application designed for doctors and patients. It features a domain-driven backend API and a modern frontend interface. Patients can log in to leave feedback for their doctors, and doctors can log in to review their feedback.

## Project Structure

This project is divided into two main sections:

- `backend`: A Node.js API built with Express, TypeScript, and Domain-Driven Design principles.
- `frontend`: A React frontend built with Vite, TypeScript, TailwindCSS, and shadcn/ui.

---

## How to Run

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs with `tsx watch` on port 3000):
   ```bash
   npm run dev
   ```

### Running the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at the URL provided by Vite (typically `http://localhost:5173`). Vite is configured to automatically proxy API requests (`/auth`, `/feedback`, `/doctor`) to the backend running on `localhost:3000`.

---

## Application Routes

### Frontend Routes

- `/signup`: Page for new users to register an account as a Patient or a Doctor.
- `/signin`: Page for existing users to sign in.
- `/dashboard`: The main hub.
  - If signed in as a **Patient**, displays a form to leave a rating and comment for a selected doctor.
  - If signed in as a **Doctor**, displays a filterable list of all feedback left by patients.

### Backend API Routes

Base URL: `http://localhost:3000`

#### Base

- `GET /` : Returns a welcome message.
- `GET /health` : Returns `{ status: "ok" }`.

#### Auth Domain (`/auth`)

- `POST /auth/signup` : Creates a new user.
  - **Body**: `{ name: string, role: "patient" | "doctor" }`
  - **Returns**: The created user object with their ID.
- `POST /auth/signin` : Signs in an existing user.
  - **Body**: `{ name: string, role: "patient" | "doctor" }`
  - **Returns**: The user object if the name and role match an existing account.

#### Feedback Domain (`/feedback`)

- `POST /feedback` : Submits new feedback from a patient.
  - **Body**: `{ doctor_id: string, patient_id: string, rating: number, comment: string }`
  - **Returns**: The created feedback record.
- `GET /feedback` : Retrieves all feedback in the system.
- `GET /feedback/doctor/:doctorId` : Retrieves all feedback for a specific doctor.

#### Doctor Domain (`/doctor`)

- `GET /doctor` : Retrieves a list of all registered doctors.
