const BASE_URL = "http://127.0.0.1:8000";

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");

  if (!refresh) {
    const error = new Error("No refresh token available");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${BASE_URL}/users/api/token/refresh/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    const error = new Error("Refresh token invalid");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (data.access) {
    localStorage.setItem("access_token", data.access);
  }
  return data.access;
};
