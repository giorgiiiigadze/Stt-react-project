import { useEffect, useRef, useState } from "react";
import "../css/showOnce.css";

export default function ShowOnce({
  children,
  text,
  storageKey,
  position = "top"
}) {
  const wrapperRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(storageKey)) {
      setShow(true);
    }
  }, [storageKey]);

  const dismiss = () => {
    localStorage.setItem(storageKey, "true");
    setShow(false);
  };

  return (
    <span className="show-once-wrapper" ref={wrapperRef}>
      {children}

      {show && (
        <span
          className={`show-once-container ${position}`}
          onClick={dismiss}
        >
          {text}
        </span>
      )}
    </span>
  );
}
