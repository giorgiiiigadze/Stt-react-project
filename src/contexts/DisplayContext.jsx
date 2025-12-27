import { createContext, useContext, useState, useEffect } from "react";

const DisplayContext = createContext(null);

export function DisplayProvider({ children }) {
  // possible values: "grid", "list", "compact"
  const [display, setDisplay] = useState(() => {
    // persist user preference
    return localStorage.getItem("display-mode") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("display-mode", display);
  }, [display]);

  const value = {
    display,
    setDisplay,
    isGrid: display === "grid",
    isList: display === "list",
    isCompact: display === "compact",
  };

  return (
    <DisplayContext.Provider value={value}>
      {children}
    </DisplayContext.Provider>
  );
}

export function useDisplay() {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be used within a DisplayProvider");
  }
  return context;
}
