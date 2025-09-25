import api from "../api/axios";

const REST_API_BASE_URL = "/api/accounts";

// Get all accounts for a user
export const getAccountsByUserId = async (userId) => {
  const response = await api.get(`${REST_API_BASE_URL}?userId=${userId}`);
  return response.data;
};

// Get a single account by ID
export const getAccountById = async (accountId) => {
  const response = await api.get(`${REST_API_BASE_URL}/${accountId}`);
  return response.data;
};

export const getAllAccounts = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

export const createAccount = async (account) => {
  const response = await api.post(REST_API_BASE_URL, account);
  return response.data;
};
