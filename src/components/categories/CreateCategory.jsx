import { useState, useEffect, useCallback } from "react";
import { createCategory, getAllCategories } from "../../services/categoryService";
import CategoryForm from "./CategoryForm"; 
import CategoryList from "./CategoryList"; 

const CreateCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  
  const loadCategories = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (err) {
      setError("Failed to load existing categories. Error - " + err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreateCategory = async (categoryData, clearForm) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await createCategory(categoryData);
      setSuccessMessage("Category created successfully!");
      clearForm(); // Clear the form state in the child component
      loadCategories(); // Refresh the list
    } catch (err) {
      console.error("Creation error:", err.response?.data || err.message);
      setError("Failed to create category. Please check the name.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Category</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <CategoryForm onSubmit={handleCreateCategory} isSubmitting={isSubmitting} />

      {/* CATEGORY LIST SECTION */}
      <div className="mt-4">
        <h4>Existing Categories</h4>
        {listLoading ? (
          <p>Loading categories...</p>
        ) : (
          <CategoryList categories={categories} /> 
        )}
      </div>
    </div>
  );
};

export default CreateCategoryPage;