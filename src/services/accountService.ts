import api from "../api/axios.js";
import type { Account, User } from "../types/models.js";

const REST_API_BASE_URL = "/api/accounts";

// Get all accounts for a user
export const getAccountsByUserId = async (userId: number): Promise<Account[]> => {
  const response = await api.get<Account[]>(`${REST_API_BASE_URL}?userId=${userId}`);
  return response.data;
};

// Get a single account by ID
export const getAccountById = async (accountId: number): Promise<Account> => {
  const response = await api.get<Account>(`${REST_API_BASE_URL}/${accountId}`);
  return response.data;
};

export const getAllAccounts = async (): Promise<Account[]> => {
  const response = await api.get<Account[]>(REST_API_BASE_URL);
  return response.data;
};

export const createAccount = async (account: Omit<Account, 'id'>): Promise<Account> => {
  const response = await api.post(REST_API_BASE_URL, account);
  return response.data;
};
