import api from "../api/axios";

const REST_API_BASE_URL = "/api/users";

export const getAllUsers = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post(REST_API_BASE_URL, user);
  return response.data;
};