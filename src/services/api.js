const BASE_URL = "http://127.0.0.1:8000";

export const getAudios = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    const error = new Error("No access token found");
    error.status = 401;
    throw error;
  }
  
  const response = await fetch(`${BASE_URL}/stt/api/audio/`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  
  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    throw error;
  }
  
  const data = await response.json();
  return data;
};

export const getUser = async () =>{
  const token = localStorage.getItem("access_token");
  if (!token) {
    const error = new Error("No access token found");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${BASE_URL}/users/api/profile/`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}

export const registerUser = async (username, email, password, confirm_password) => {
  const response = await fetch(`${BASE_URL}/users/api/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm_password,
    }),
  });

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    error.data = await response.json();
    throw error;
  }

  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

export const logoutUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    const error = new Error("No access token found");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${BASE_URL}/users/api/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    throw error;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return await response.json();
};

export const toggleFavoriteAudio = async (audioId, favorite = null) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    const error = new Error("No access token found");
    error.status = 401;
    throw error;
  }

  const body = favorite !== null ? { favorite } : {};

  const response = await fetch(`${BASE_URL}/stt/api/audio/favorite/${audioId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = new Error("API Error");
    error.status = response.status;
    error.data = await response.json();
    throw error;
  }

  return await response.json();
};