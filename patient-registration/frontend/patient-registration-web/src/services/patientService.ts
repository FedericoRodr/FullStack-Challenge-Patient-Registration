import type { Patient } from "../models/Patient";
import { ENV } from "../config/env";

const API_URL = `${ENV.BACKEND_API_URL}/api`;
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
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
}
