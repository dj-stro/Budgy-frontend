import api from '../api/axios.js';
import type { TransactionCreationPayload, TransactionModel } from '../types/models.js';

const REST_API_BASE_URL = '/api/transactions';

// Get all transactions
export const getAllTransactions = async (): Promise<TransactionModel[]> => {
  const response = await api.get(REST_API_BASE_URL);
  console.log(response.data);
  return response.data as TransactionModel[];
};

// Get transactions for a single user
export const getAllUserTransactions = async (userId: number): Promise<TransactionModel[]> => {
  const response = await api.get(`${REST_API_BASE_URL}/user/${userId}`);
  console.log(response.data);
  return response.data as TransactionModel[];
};

// Get transactions for multiple users
export const getTransactionsByUserIds = async (userIds: string[] = []): Promise<TransactionModel[]> => {
  if (!userIds.length) return [];

  try {
    // Axios automatically serializes arrays as userIds=1&userIds=2
    const response = await api.get('/api/transactions/users', {
      params: { userIds },
      paramsSerializer: params => {
        // Ensure Axios uses Spring-friendly format
        return Object.keys(params)
          .map(key =>
            // Handles multiple values for the same key
            params[key].map((val: string | number) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
          )
          .join('&');
      },
    });
    return response.data as TransactionModel[];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};



export const createTransaction = async (txn: TransactionCreationPayload): Promise<TransactionModel> => {
  const response = await api.post("/api/transactions", {
    description: txn.description,
    amount: txn.amount,
    date: txn.date,
    type: txn.type,
    accountFrom: txn.accountFromId ? { id: txn.accountFromId } : null,
    accountTo: txn.accountToId ? { id: txn.accountToId } : null,
    category: { id: txn.categoryId },
    user: { id: txn.userId },
  });
  return response.data as TransactionModel;
};




export const getTransaction = async (transaction_id: number) => {
  const response = await api.get(REST_API_BASE_URL + "/" + transaction_id)
  return response.data as TransactionModel;
}

export const deleteTransaction = async (transaction_id: number) => {
  const response = await api.delete(REST_API_BASE_URL + "/" + transaction_id)
  return response.data as TransactionModel;
}