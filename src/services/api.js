import { apiRequest } from "./apiHelper";

export const getAudios = () => {
  return apiRequest("/stt/api/audio/", "GET");
}

export const getAllTranscriptedAudios = () =>{
  return apiRequest(`/transcription/api/transcripted_audios/`)
}

export const uploadAudio = (file_title, file) => {
  const formData = new FormData();
  formData.append("file_title", file_title); 
  formData.append("file", file);

  console.log("Fetching the upload API")

  return apiRequest(
    "/stt/api/audio/upload/",
    "POST",
    formData,
  )
}

export const editAudioTitle = (audioId, newTitle) => {
  console.log("Changing the audio title...")

  return apiRequest(
    `/stt/api/audio/edit-title/${audioId}/`,
    "PATCH",
    { file_title: newTitle }
  );
};

export const deleteAudio = (audioId) => {
  return apiRequest(`/stt/api/audio/${audioId}/`, "DELETE");
};


export const getUser = () => 
  apiRequest("/users/api/profile/", "GET");


export const registerUser = (username, email, password, confirm_password) => {
  return apiRequest(
    "/users/api/register/",
    "POST",
    {
      username,
      email,
      password,
      confirm_password,
    }
  );
};


export const loginUser = (username, password) => {
  return apiRequest(
    "/users/api/login/",
    "POST",
    {
      username,
      password,
    }
  );
};

export const logoutUser = async () => {
  const response = await apiRequest("/users/api/logout/", "POST");

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return response;
};


export const toggleFavoriteAudio = (audioId, favorite = null) => {
  const body = favorite !== null ? { favorite } : {};
  return apiRequest(`/stt/api/audio/favorite/${audioId}/`, "POST", body);
};
