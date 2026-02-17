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

        <div className="patients-list">
          {loading && <p className="state">Loading patients...</p>}

          {!loading && patients.length === 0 && (
            <p className="state">No patients yet</p>
          )}

          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>

        <div className="patients-footer">
          <button onClick={() => setShowModal(true)}>+ Add Patient</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <PatientForm
              onSuccess={() => {
                setShowModal(false);
                getPatients().then(setPatients);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsList;