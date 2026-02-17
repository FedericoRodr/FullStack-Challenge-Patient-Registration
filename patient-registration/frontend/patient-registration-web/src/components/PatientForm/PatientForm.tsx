import { useState } from "react";
import { createPatient } from "../../services/patientService";
import "./PatientForm.css";

export function PatientForm({ onSuccess }: { onSuccess: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+598");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function validate() {
    if (!/^[a-zA-Z\s]+$/.test(fullName))
      return "Full name must contain only letters";

    if (!email.endsWith("@gmail.com"))
      return "Email must be a @gmail.com address";

    if (!file || file.type !== "image/jpeg")
      return "Only JPG images are allowed";

    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("phone", `${countryCode}${phone}`);
    formData.append("document_photo", file!);

    await createPatient(formData);
    onSuccess();
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2 className="patient-form-title">Add Patient</h2>

      <div className="patient-form-field">
        <label>Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="patient-form-field">
        <label>Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />
      </div>

      <div className="patient-form-field">
        <label>Phone number</label>
        <div className="patient-form-phone">
          <input
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="phone-code"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="91234567"
          />
        </div>
      </div>

      <div className="patient-form-field">
        <label>Document photo (.jpg)</label>
        <input
          type="file"
          accept=".jpg"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && <div className="patient-form-error">{error}</div>}

      <button type="submit" className="patient-form-submit">
        Add Patient
      </button>
    </form>
  );
}

export default PatientForm;
