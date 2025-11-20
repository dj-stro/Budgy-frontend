import React, { createContext, useState, useContext, useEffect } from "react";
import { getCategories, addCategory } from "../services/sqliteService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const dbCategories = await getCategories();
      setCategories(dbCategories);
    };
    loadCategories();
  }, []);

  const createCategory = async (category) => {
    const newCategory = await addCategory(category);
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <CategoryContext.Provider value={{ categories, createCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
