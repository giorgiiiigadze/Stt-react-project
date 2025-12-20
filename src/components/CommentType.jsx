export default function CommentType({
  type = "note",
  size = 20,
}) {
  const CONFIG = {
    idea: { color: "#37674c", emoji: "💡", label: "Idea" },
    issue: { color: "#5f3b3b", emoji: "🐞", label: "Issue" },
    edit: { color: "#6b5c2e", emoji: "✂️", label: "Edit" },
    note: { color: "#7f8c8d", emoji: "📌", label: "Note" },
    task: { color: "#355f8b", emoji: "✅", label: "Task" },
    question: { color: "#5b3d75", emoji: "❓", label: "Question" },
    audio: { color: "#4c6a7a", emoji: "🔊", label: "Audio" },
    timing: { color: "#6a4c7a", emoji: "⏱", label: "Timing" },
    highlight: { color: "#7a6a4c", emoji: "🔥", label: "Highlight" },
  };

  const config = CONFIG[type] || CONFIG.note;

  return (
    <span
      title={config.label}
      style={{
        backgroundColor: config.color,
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      {config.emoji}
    </span>
  );
}
