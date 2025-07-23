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

// ✅ VERSION CORRIGÉE - ne pas essayer d'accéder à response.data pour DELETE
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response); // Retourne la response complète
};

// Alternative encore plus sûre :
const deletePersonSafe = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log('Delete response status:', response.status);
      return response.status === 204 ? { success: true } : response.data;
    });
};

const entryService = {
  getAll,
  createPerson,
  updatePerson,
  deletePerson, // Ou utilisez deletePersonSafe si vous préférez
};

export default entryService;
