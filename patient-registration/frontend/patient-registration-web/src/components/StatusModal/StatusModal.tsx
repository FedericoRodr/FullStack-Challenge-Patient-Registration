import "./StatusModal.css";

type Status = "loading" | "success" | "error";

type Props = {
  status: Status;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export function StatusModal({ status, message, onClose, onConfirm }: Props) {
  return (
    <div className="status-modal" role="dialog" aria-modal="true">
      <div className={`status-modal-content ${status}`}>
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
