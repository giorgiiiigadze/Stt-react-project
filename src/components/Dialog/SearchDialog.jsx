import { useEffect, useRef } from "react";
import "../../css/Dialog/SearchDialog.css";

export default function SearchDialog({ open, onClose }) {
  const inputRef = useRef(null);

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Autofocus search input
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="search-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="search-header">
          <svg
            aria-hidden="true"
            role="graphics-symbol"
            viewBox="0 0 20 20"
            className="magnifyingGlass"
            style={{
              width: "22px",
              height: "22px",
              display: "block",
              flexShrink: 0,
            }}>
            <path d="M8.875 2.625a6.25 6.25 0 1 0 3.955 11.09l3.983 3.982a.625.625 0 1 0 .884-.884l-3.983-3.982a6.25 6.25 0 0 0-4.84-10.205m-5 6.25a5 5 0 1 1 10 0 5 5 0 0 1-10 0" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search your audios…"
            className="search-input"
          />
        </header>

        <section className="sorting-section">
          
        </section>

        <div className="search-results">
        </div>
      </div>
    </div>
  );
}
