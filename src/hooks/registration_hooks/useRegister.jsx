import { useState } from "react";
import { registerUser } from "../../services/api";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function register(username, email, password, confirmPassword) {
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser({
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      return { success: true, data };
    } catch (err) {
      const message =
        err?.detail ||
        err?.error ||
        err?.non_field_errors?.[0] ||
        "Registration failed";

      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error };
}
