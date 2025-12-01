import { useState } from "react";
import { loginUser } from "../../services/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError("Invalid username or password");
      setLoading(false);
      return { success: false };
    }
  };

  return { login, loading, error };
}
