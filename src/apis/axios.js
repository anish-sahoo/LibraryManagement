import axios from "axios";

axios.defaults.baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:OdC5pPk_";

export const setAuthHeaders = async () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    axios.defaults.headers["Authorization"] = authToken;
  }
};

export const resetAuthTokens = () => {
  delete axios.defaults.headers["Authorization"];
};

const handleSuccessResponse = (response) => {
  return response;
};

const handleErrorResponse = (error, logout) => {
  if (error.response?.status === 401) {
    logout();
    // add alert for logout
  } else {
    // add alert for error
  }
  return Promise.reject(error);
};

export const registerIntercepts = (logout) => {
  axios.interceptors.response.use(
    handleSuccessResponse,
    (error) => handleErrorResponse(error, logout)
  );
};
