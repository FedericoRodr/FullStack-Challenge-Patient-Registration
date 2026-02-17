import { useEffect, useRef, useState } from "react";
import { createPatient } from "../../services/patientService";
import StatusModal from "../StatusModal/StatusModal";
import "./PatientForm.css";

type FieldErrors = {
  full_name?: string;
  email?: string;
  phone?: string;
  document_photo?: string;
};

type ApiValidationError = {
  message?: string;
  errors?: {
    full_name?: string[];
    email?: string[];
    phone?: string[];
    document_photo?: string[];
  };
};

export function PatientForm({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function validate() {
    const errors: FieldErrors = {};

    if (!fullName.trim()) {
      errors.full_name = "Full name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      errors.full_name = "Full name must contain only letters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!email.endsWith("@gmail.com")) {
      errors.email = "Email must be a @gmail.com address";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(phone)) {
      errors.phone = "Phone number must contain only digits";
    }

    if (!countryCode.trim()) {
      errors.phone = "Country code is required";
    } else if (!/^\+\d+$/.test(countryCode)) {
      errors.phone = "Country code must start with + followed by digits";
    }

    if (!file) {
      errors.document_photo = "Document photo is required";
    } else if (file.type !== "image/jpeg") {
      errors.document_photo = "Only JPG images are allowed";
    }

    return errors;
  }

  function closeStatusModal() {
    setStatus("idle");
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setFieldErrors({});
    setFormError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus("error");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("phone", `${countryCode}${phone}`);
    formData.append("document_photo", file!);

    try {
      setStatus("loading");
      await createPatient(formData);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");

      if (typeof err === "object" && err !== null && "errors" in err) {
        const apiError = err as ApiValidationError;

        setFieldErrors({
          full_name: apiError.errors?.full_name?.[0],
          email: apiError.errors?.email?.[0],
          phone: apiError.errors?.phone?.[0],
          document_photo: apiError.errors?.document_photo?.[0],
        });
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeStatusModal();
      }
    }

    if (status !== "idle") {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  return (
    <>
      <form className="patient-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="form-close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="patient-form-title">Add Patient</h2>

        <div className="patient-form-field">
          <label>Full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />
          {submitted && fieldErrors.full_name && (
            <div className="field-error">{fieldErrors.full_name}</div>
          )}
        </div>

        <div className="patient-form-field">
          <label>Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
          {submitted && fieldErrors.email && (
            <div className="field-error">{fieldErrors.email}</div>
          )}
        </div>

        <div className="patient-form-field">
          <label>Phone number</label>
          <div className="patient-form-phone">
            <input
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="phone-code"
              placeholder="+598"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="95290543"
            />
          </div>
          {submitted && fieldErrors.phone && (
            <div className="field-error">{fieldErrors.phone}</div>
          )}
        </div>

        <div className="patient-form-field">
          <label>Document photo (.jpg)</label>

          <label className="file-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            {file ? (
              <div className="file-preview">
                <span className="file-name">{file.name}</span>

                <div className="file-actions">
                  <button
                    type="button"
                    className="file-remove"
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="file-placeholder">
                <span className="file-icon">📄</span>
                <span>Click to upload file or drag and drop</span>
              </div>
            )}
          </label>

          {submitted && fieldErrors.document_photo && (
            <div className="field-error">{fieldErrors.document_photo}</div>
          )}
        </div>

        <button
          type="submit"
          className="patient-form-submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Create Patient"}
        </button>
      </form>

      {status !== "idle" && (
        <StatusModal
          status={status}
          message={
            status === "success"
              ? "Patient registered successfully"
              : formError || "Please fix the errors in the form."
          }
          onClose={() => setStatus("idle")}
          onConfirm={onSuccess}
        />
      )}
    </>
  );
}

export default PatientForm;
