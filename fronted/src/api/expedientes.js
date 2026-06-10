import axios from 'axios';

const BASE = 'http://localhost:8080/api/expedientes';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getExpedientes = async () => {
  const res = await axios.get(BASE, { headers: getAuthHeaders() });
  return res.data;
};

export const crearExpediente = async (data) => {
  const res = await axios.post(BASE, data, { headers: getAuthHeaders() });
  return res.data;
};

export const actualizarExpediente = async (id, data) => {
  const res = await axios.put(`${BASE}/${id}`, data, { headers: getAuthHeaders() });
  return res.data;
};

export const eliminarExpediente = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

export default { getExpedientes, crearExpediente, actualizarExpediente, eliminarExpediente };
