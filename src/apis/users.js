import axios from "axios";

const getUsersUrl = (id) => {
  if (id) {
    return `/users/${id}`;
  }

  return `/users`;
};

export const getUsers = () => {
  return axios.get(getUsersUrl());
};

export const getUser = (id) => {
  return axios.get(getUsersUrl(id));
};

export const createUser = (payload) => {
  return axios.post(getUsersUrl(), payload);
};

export const updateUser = (id, payload) => {
  return axios.post(getUsersUrl(id), payload);
};

export const destroyUser = (id) => {
  return axios.delete(getUsersUrl(id));
};
