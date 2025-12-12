import api from "../api/axios.js";
import type { User } from "../types/models.js"

const REST_API_BASE_URL = "/api/users";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data as User[];
};

export const createUser = async (user: User): Promise<User> => {
  const response = await api.post(REST_API_BASE_URL, user);
  return response.data as User;
};