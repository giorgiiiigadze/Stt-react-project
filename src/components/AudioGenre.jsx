export default function AudioGenre({ genre, padding = 8 }) {
  if (!genre) return <span style={{ color: "#888", fontSize: "12px" }}>—</span>;

  let bgColor = "#7f8c8d";

  switch (genre.toLowerCase()) {
    case "lesson":
      bgColor = "#37674c";
      break;
    case "lecture":
    case "podcast":
      bgColor = "#355f8b";
      break;
    case "error":
    case "failed":
      bgColor = "#5f5e59";
      break;
  }

  return (
    <div
      className="audio_genre_label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: `${bgColor}20`, // light translucent background
        padding: `${padding / 2}px ${padding}px`, // vertical / horizontal
        borderRadius: "16px",
        fontSize: "11px",
        fontWeight: 600,
        color: "#fff",
        textTransform: "capitalize",
        minWidth: "fit-content",
      }}
    >
      <div
        className="audio_genre_dot"
        style={{
          width: padding,  // fixed size for the dot
          height: padding,
          borderRadius: "50%",
          backgroundColor: bgColor,
          flexShrink: 0,
        }}
      ></div>
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {genre}
      </span>
    </div>
  );
}
