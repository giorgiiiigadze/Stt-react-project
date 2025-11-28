import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar_position");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar_position", isOpen.toString());
  }, [isOpen]);

  const toggleOpen = () =>{
    setIsOpen(!isOpen)
  }
  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
