import api from '../api/axios';

const REST_API_BASE_URL = '/api/categories';

export const getAllCategories = async () => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

export const createCategory = async (category) => {
    const response = await api.post(REST_API_BASE_URL, category);
  return response.data;
};
