import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    if (!isLoggedIn) {
      
      setUser(null);
      setUserLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const data = await getUser();
        setUser(data);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setUserLoading(false);
      }
    }

    loadUser();
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, userLoading, isLoggedIn, setIsLoggedIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
