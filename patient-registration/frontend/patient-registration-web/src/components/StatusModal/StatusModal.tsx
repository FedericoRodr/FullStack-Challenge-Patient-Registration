import { useEffect } from "react";
import "./StatusModal.css";

type Status = "loading" | "success" | "error";

type Props = {
  status: Status;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export function StatusModal({ status, message, onClose, onConfirm }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="status-modal" onClick={onClose}>
      <div
        className={`status-modal-content ${status}`}
        onClick={(e) => e.stopPropagation()}
      >
        {status === "loading" && (
          <>
            <div className="status-spinner" />
            <p className="status-loading-text">Saving patient...</p>
          </>
        )}

        {status === "success" && (
          <>
            <h3>✅ Success</h3>
            <p>{message || "Operation completed successfully"}</p>
            <button
              className="modal-close"
              onClick={() => {
                onClose();
                onConfirm?.();
              }}
            >
              OK
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h3>❌ Error</h3>
            <p>{message || "Something went wrong"}</p>
            <button className="modal-close" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StatusModal;
