import type { Patient } from "../models/Patient";
import { ENV } from "../config/env";

const API_URL = `${ENV.BACKEND_API_URL}/api`;

async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      throw new Error("Unexpected server error");
    }
    throw error;
  }

  return response.json();
}

export function getPatients(): Promise<Patient[]> {
  return apiFetch<Patient[]>(`${API_URL}/patients`);
}

export function createPatient(formData: FormData) {
  return apiFetch(`${API_URL}/patients`, {
    method: "POST",
    body: formData,
  });
}
