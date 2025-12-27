import { useEffect, useRef, useState } from "react";
import '../../css/DropdownMenu/Dropdown.css'

export function Dropdown({ trigger, children, align = "left", offset = 6, offsetRight = 0, offsetLeft = 0, width }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>
        {typeof trigger === "function"
          ? trigger({ open })
          : trigger}
      </div>

      {open && (
        <div
          className={`dropdown-menu ${align}`}
          style={{ marginTop: offset, minWidth: `${width}px`, marginRight: offsetRight, marginLeft: offsetLeft}}
        >
          {typeof children === "function"
            ? children({ close: () => setOpen(false) })
            : children}
        </div>
      )}
    </div>
  );
}
