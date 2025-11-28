export default function AudioStatus({ status, padding }) {
  let bgColor = "#7f8c8d";

  switch (status?.toLowerCase()) {
    case "done":
      bgColor = "#37674c";
      break;
    case "processing":
    case "in_progress":
      bgColor = "#355f8b";
      break;
    case "error":
    case "failed":
      bgColor = "#5f5e59";
      break;
  }

  return (
    <label
      className="audio_status_label"
      style={{
        backgroundColor: bgColor,
        color: "#fff",
        fontSize: "12px",
        fontWeight: 600,
        padding: `${padding}px`,
        borderRadius: "50%",
        display: "inline-block",
      }}
    ></label>
  );
}