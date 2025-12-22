const BASE_URL = "http://127.0.0.1:8000";

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

import { refreshToken } from "./refreshApi";

let isRefreshing = false;
let waitQueue = [];

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  let token = getAccessToken();

  const headers = {};
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const payload =
    body instanceof FormData ? body : body ? JSON.stringify(body) : null;

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: payload,
  });

  if (response.status === 401) {
    if (!getRefreshToken()) {
      throw Object.assign(new Error("Not authenticated"), { status: 401 });
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        waitQueue.push({ resolve, reject });
      }).then(newToken => {
        headers.Authorization = `Bearer ${newToken}`;
        return fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers,
          body: payload,
        }).then(res => res.json());
      });
    }

    isRefreshing = true;

    try {
      const newAccess = await refreshToken();

      waitQueue.forEach(p => p.resolve(newAccess));
      waitQueue = [];

      headers.Authorization = `Bearer ${newAccess}`;

      response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: payload,
      });
    } catch (e) {
      waitQueue.forEach(p => p.reject(e));
      waitQueue = [];
      localStorage.clear();
      throw Object.assign(new Error("Session expired"), { status: 401 });
    } finally {
      isRefreshing = false;
    }
  }

  if (response.status === 204) return null;

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    try {
      error.data = await response.json();
    } catch {}
    throw error;
  }

  return response.json();
};
