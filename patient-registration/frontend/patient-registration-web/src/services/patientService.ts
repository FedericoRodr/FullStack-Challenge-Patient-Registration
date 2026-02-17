import type { Patient } from "../models/Patient";

const API_URL = "http://localhost:8000/api";

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_URL}/patients`);

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
}

export async function createPatient(formData: FormData) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Error creating patient");
  return response.json();
}
