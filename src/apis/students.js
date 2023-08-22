import axios from "axios";

const getStudentsUrl = (id) => {
  if (id) {
    return `/students/${id}`;
  }

  return `/students`;
};

export const getStudents = () => {
  return axios.get(getStudentsUrl());
};

export const getStudent = (id) => {
  return axios.get(getStudentsUrl(id));
};

export const createStudent = (payload) => {
  return axios.post(getStudentsUrl(), payload);
};

export const updateStudent = (id, payload) => {
  return axios.post(getStudentsUrl(id), payload);
};

export const destroyStudent = (id) => {
  return axios.delete(getStudentsUrl(id));
};
