import { useEffect, useState } from "react";
import type { Patient } from "../models/Patient";
import { getPatients } from "../services/patientService";
import { PatientList } from "../components/PatientList";
import { PatientForm } from "../components/PatientForm";
import "./PatientPage.css";

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPatients() {
      setLoading(true);
      try {
        const data = await getPatients();
        if (isMounted) {
          setPatients(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="patient-page">
      <h1>Patients</h1>
      <PatientForm
        onSuccess={() => {
          getPatients().then(setPatients);
        }}
      />
      <PatientList patients={patients} loading={loading} />
    </div>
  );
}
