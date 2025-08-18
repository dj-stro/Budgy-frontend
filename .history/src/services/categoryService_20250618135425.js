import api from '../api/axios';

const REST_API_BASE_URL = '/api/categories';

export const getAllCategories = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};
