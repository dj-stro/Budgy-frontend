import api from '../api/axios';

const REST_API_BASE_URL = '/api/transactions';

// Get all transactions
export const getAllTransactions = async () => {
  const response = await api.get(REST_API_BASE_URL);
  console.log(response.data);
  return response.data;
};

// Get transactions for a single user
export const getAllUserTransactions = async (userId) => {
  const response = await api.get(`${REST_API_BASE_URL}/user/${userId}`);
  console.log(response.data);
  return response.data;
};

// Get transactions for multiple users
// export const getTransactionsByUserIds = async (userIds = []) => {
//   if (!userIds.length) return [];

//   try {
//     // Axios automatically serializes arrays correctly for Spring Boot
//     const response = await api.get(`${REST_API_BASE_URL}/users`, {
//       params: { userIds },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     throw error;
//   }
// };

// Get transactions for multiple users
export const getTransactionsByUserIds = async (userIds = []) => {
  if (!userIds.length) return [];

  try {
    // Axios automatically serializes arrays as userIds=1&userIds=2
    const response = await api.get('/api/transactions/users', {
      params: { userIds }, 
      paramsSerializer: params => {
        // Ensure Axios uses Spring-friendly format
        return Object.keys(params)
          .map(key => 
            params[key].map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
          )
          .join('&');
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};



export const createTransaction = async (txn) => {
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