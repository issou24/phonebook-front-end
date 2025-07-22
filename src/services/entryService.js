import axios from "axios";

const baseUrl = "https://part3-notes-backend-o51h.onrender.com/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

const entryService = {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};

export default entryService;
