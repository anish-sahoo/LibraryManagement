import axios from "axios";

const getAuthorsUrl = (id) => {
  if (id) {
    return `/authors/${id}`;
  }

  return `/authors`;
};

export const getAuthors = () => {
  return axios.get(getAuthorsUrl());
};

export const getAuthor = (id) => {
  return axios.get(getAuthorsUrl(id));
};

export const createAuthor = (payload) => {
  return axios.post(getAuthorsUrl(), payload);
};

export const updateAuthor = (id, payload) => {
  return axios.post(getAuthorsUrl(id), payload);
};

export const destroyAuthor = (id) => {
  return axios.delete(getAuthorsUrl(id));
};
