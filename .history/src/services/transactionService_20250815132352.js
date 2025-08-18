import api from '../api/axios';

const REST_API_BASE_URL = '/api/transactions';

export const getAllTransactions = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

// export const createTransaction = async (transaction) => {
//   const response = await api.post(REST_API_BASE_URL, transaction);
//   return response.data;
// };

export const createTransaction = async (txn) => {
  const response = await api.post("/api/transactions", {
    ...txn,
    accountFrom: txn.accountFrom ? { id: txn.accountFrom } : null,
    accountTo: txn.accountTo ? { id: txn.accountTo } : null,
    category: { id: txn.categoryId },
    user: { id: txn.userId },
  });
  return response.data;
};



export const getTransaction = async (transaction_id) => {
    const response = await api.get(REST_API_BASE_URL + "/" + transaction_id)
    return response.data;
}

export const deleteTransaction = async (transaction_id) => {
    const response = await api.delete(REST_API_BASE_URL + "/" + transaction_id)
    return response.data;
}