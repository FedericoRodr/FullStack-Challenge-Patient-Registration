import { PatientCard } from "./PatientCard";
import type { Patient } from "../models/Patient";
import "./PatientList.css";

export function PatientList({
  patients,
  loading,
}: {
  patients: Patient[];
  loading: boolean;
}) {
  if (loading) return <p>Loading patients...</p>;
  if (patients.length === 0) return <p>No patients yet</p>;

  return (
    <div className="patient-grid">
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}
