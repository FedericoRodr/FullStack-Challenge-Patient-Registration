import { useState } from "react";
import { createPatient } from "../services/patientService";

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

    if (!email.endsWith("@gmail.com")) return "Email must be @gmail.com";

    if (!file || file.type !== "image/jpeg") return "Only JPG images allowed";

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
      <h2>Add patient</h2>
      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="patient-form-row">
        <input
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <input
        type="file"
        accept=".jpg"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {error && <p className="patient-form-error">{error}</p>}

      <button type="submit">Add Patient</button>
    </form>
  );
}
