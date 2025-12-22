import { useState } from "react";
import { loginUser, getUser } from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import { useToast } from '../../contexts/MessageContext'

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setIsLoggedIn } = useUser();

  const { addToast } = useToast()

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

      const userData = await getUser();
      setUser(userData);
      setIsLoggedIn(true);

      setLoading(false);

      addToast("Logged in successfully")
      return { success: true };
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsLoggedIn(false);
      setError("Invalid username or password");
      setLoading(false);
      return { success: false };
    }
  };

  return { login, loading, error };
}
