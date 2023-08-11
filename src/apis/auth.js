import axios from "axios";

export const loginUser = (payload) => {
  return axios.post("/auth/login", payload);
}

export const authUser = () => {
  return axios.get("/auth/me");
}
