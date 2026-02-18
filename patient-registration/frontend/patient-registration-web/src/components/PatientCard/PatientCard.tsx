import { useState } from "react";
import type { Patient } from "../../models/Patient";
import { ENV } from "../../config/env";
import "./PatientCard.css";

export function PatientCard({ patient }: { patient: Patient }) {
  const [expanded, setExpanded] = useState(false);

  function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

  return (
    <article
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

        <div className="patient-detail">
          <span>Created at</span>
          <strong>{formatDate(patient.created_at)}</strong>
        </div>

        <div className="patient-detail">
          <span>Updated at</span>
          <strong>{formatDate(patient.updated_at)}</strong>
        </div>
      </div>
    </article>
  );
}

export default PatientCard;
