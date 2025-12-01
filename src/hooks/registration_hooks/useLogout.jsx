import { useState } from "react";
import { logoutUser } from "../../services/api";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutUser();
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError("Logout failed");
      setLoading(false);
      return { success: false };
    }
  };

  return { logout, loading, error };
}
