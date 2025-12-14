import '../../css/Dialog/ConfrimDialog.css'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div
        className="dialog-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="dialog-title">{title}</h3>
          
          {description && (
            <p className="dialog-warning">{description}</p>
          )}
        </div>

        <div className="dialog-buttons">
          <button
            className={`confirm-btn ${danger ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
