import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setUserLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.log("ERROR LOADING USER:", err);
      } finally {
        setUserLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
