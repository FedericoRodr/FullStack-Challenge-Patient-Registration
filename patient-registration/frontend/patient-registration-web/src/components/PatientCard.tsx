import { useState } from "react";
import type { Patient } from "../models/Patient";

export function PatientCard({ patient }: { patient: Patient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="patient-card">
      <div
        className="patient-card-header"
        onClick={() => setExpanded(!expanded)}
      >
        <img src={patient.document_photo_path} width={100} />
        <h3>{patient.full_name}</h3>
      </div>

      {expanded && (
        <div className="patient-card-details">
          <p>📧 {patient.email}</p>
          <p>📞 {patient.phone}</p>
        </div>
      )}
    </div>
  );
}

export default PatientCard;
