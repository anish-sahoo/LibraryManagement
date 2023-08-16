import axios from "axios";

const getBooksUrl = (id) => {
  if (id) {
    return `/books/${id}`;
  }

  return `/books`;
};

export const getBooks = () => {
  return axios.get(getBooksUrl());
};

export const getBook = (id) => {
  return axios.get(getBooksUrl(id));
};

export const createBook = (payload) => {
  return axios.post(getBooksUrl(), payload);
};

export const updateBook = (id, payload) => {
return axios.post(getBooksUrl(id), payload);
};

export const destroyBook = (id) => {
  return axios.delete(getBooksUrl(id));
};
