export default function CommentStatus({ status }) {
  const config = {
    pending: {
      label: "Pending",
      bg: "#2b2b2b",
      text: "#cfcfcf",
    },
    processing: {
      label: "Processing",
      bg: "#1f3a56",
      text: "#5da9ff",
    },
    completed: {
      label: "Completed",
      bg: "#1f3d2b",
      text: "#4fd18b",
    },
    failed: {
      label: "Failed",
      bg: "#3d2424",
      text: "#ff6b6b",
    },
  };

  const key = status?.toLowerCase();
  const s = config[key] || config.pending;

  return (
    <span
      className="comment_status_badge"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: s.text,
        }}
      />
      {s.label}
    </span>
  );
}
