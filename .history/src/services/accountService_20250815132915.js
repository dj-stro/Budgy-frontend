import api from "../api/axios";

const REST_API_BASE_URL = "/api/accounts";

export const getAccounts = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

export const createAccount = async (account) => {
  const response = await api.post(REST_API_BASE_URL, account);
  return response.data;
};