import "../css/AudioSelect.css";

export default function AudioSelect({ selected = false, onToggle = () => {} }) {
    return (
        <button
            className={`select-button ${selected ? "selected" : ""}`}
            onClick={onToggle}
            aria-pressed={selected}
            title={selected ? "Deselect audio" : "Select audio"}
        ></button>
    );
}