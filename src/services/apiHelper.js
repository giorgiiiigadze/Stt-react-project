const BASE_URL = "http://127.0.0.1:8000";

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

import { refreshToken } from "./refreshApi"; 

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  let token = getAccessToken();

  const headers = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const payload = body instanceof FormData ? body : body ? JSON.stringify(body) : null;

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: payload,
  });


  if (response.status === 401) {
    const refresh = getRefreshToken();
    if (!refresh) {
      const error = new Error("Not authenticated");
      error.status = 401;
      throw error;
    }

    try {
      const newAccess = await refreshToken();  
      token = newAccess;

      if (token) headers["Authorization"] = `Bearer ${token}`;

      response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: payload,
      });
    } catch (e) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      const error = new Error("Session expired");
      error.status = 401;
      throw error;
    }
  }

  if (response.status === 204) return null;

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    try { error.data = await response.json(); } catch {}
    throw error;
  }

  return response.json();
};
