import { useState } from "react";
import { loginUser, getUser } from "../../services/api";
import { useUser } from "../../contexts/UserContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(username, password);

      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
      }

      try {
        const userData = await getUser();
        if (typeof setUser === "function") {
          setUser(userData);
        }
      } catch (uErr) {
        console.warn("Failed to fetch user after login", uErr);
      }

      setLoading(false);
      return { success: true };

    } catch (err) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      setError("Invalid username or password");
      setLoading(false);

      return { success: false };
    }
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("access_token");
    return Boolean(token && token.length > 10);
  };

  return { login, loading, error, isLoggedIn };
}
