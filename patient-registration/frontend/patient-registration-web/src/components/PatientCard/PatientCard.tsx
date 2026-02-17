import { useState } from "react";
import type { Patient } from "../../models/Patient";
import "./PatientCard.css";
import { ENV } from "../../config/env";

export function PatientCard({ patient }: { patient: Patient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`patient-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="patient-card-header">
        <img
          className="patient-photo"
          src={`${ENV.BACKEND_API_URL}/storage/${patient.document_photo_path}`}
          alt={patient.full_name}
        />

        <div className="patient-main-info">{patient.full_name}</div>

        <div className="expand-indicator">{expanded ? "−" : "+"}</div>
      </div>

      <div className="patient-card-body">
        <div className="patient-detail">
          <span>Email address</span>
          <strong>{patient.email}</strong>
        </div>

        <div className="patient-detail">
          <span>Phone number</span>
          <strong>{patient.phone}</strong>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
