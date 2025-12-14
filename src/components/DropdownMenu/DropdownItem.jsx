import '../../css/DropdownMenu/DropdownItem.css'

export function DropdownItem({ children, onClick, danger }) {
  return (
    <button
      className={`dropdown-item ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
