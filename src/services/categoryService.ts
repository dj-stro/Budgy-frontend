import api from "../api/axios.js";
import type { CategoryFormData, CategoryType } from "../types/models.js";

const REST_API_BASE_URL = "/api/categories";

export const getAllCategories = async (): Promise<CategoryType[]> => {
  const response = await api.get(REST_API_BASE_URL);
  return response.data;
};

export const createCategory = async (category: CategoryFormData): Promise<CategoryFormData> => {
  const response = await fetch(REST_API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category) 
  });
  const newCategory = await response.json();
  return newCategory as CategoryType;
};
