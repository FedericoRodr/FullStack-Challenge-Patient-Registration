import { useEffect, useState } from "react";
import { getPatients } from "../../services/patientService";
import type { Patient } from "../../models/Patient";
import PatientForm from "../PatientForm/PatientForm";
import PatientCard from "../PatientCard/PatientCard";
import "./PatientsList.css";

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setLoading(false);
    }

    fetchPatients();
  }, []);

  return (
    <div className="patients-page">
      <div className="patients-box">
        <h1 className="patients-title">Patients</h1>

        <div className={`patients-list ${loading ? "loading" : ""}`}>
          {loading && (
            <div className="spinner-container">
              <div className="spinner" />
            </div>
          )}

          {!loading && patients.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🩺</div>
              <h2>No patients yet</h2>
              <p>Get started by adding the first patient.</p>
              <button
                className="add-patient-button"
                onClick={() => setShowModal(true)}
              >
                Add Patient
              </button>
            </div>
          )}

          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>

        {patients.length > 0 && (
          <div className="patients-footer">
            <button
              className="add-patient-button"
              onClick={() => setShowModal(true)}
            >
              Add Patient
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <PatientForm
              onSuccess={async () => {
                setShowModal(false);
                setLoading(true);
                const data = await getPatients();
                setPatients(data);
                setLoading(false);
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsList;
