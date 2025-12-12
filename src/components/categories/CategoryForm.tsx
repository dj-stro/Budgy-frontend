import React, {useState, type ChangeEvent } from "react";
import type { CategoryFormData, CategoryFormProps, CategoryTypeValue } from "../../types/models.js";

const initialFormData: CategoryFormData = {
  name: "",
  type: "EXPENSE",
};

type InputElement = HTMLInputElement | HTMLSelectElement;

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<InputElement>): void => {
    const target = e.currentTarget;
    const { name, value } = target;
    
    setFormData((prevData) => {
      if (name === 'type') {
        return {
          ...prevData,
          type: value as CategoryTypeValue,
        };
      } 
      if (name === 'name') {
        return {
          ...prevData,
          name: value,
        };
      }
      
      // Fallback for any other unexpected input (safe return)
      return prevData;
    });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Category name is required.");
      return;
    }
    // Pass the data up to the parent component
    onSubmit(formData, () => setFormData(initialFormData)); // Pass a callback to clear the form
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Type</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
            <option value="ASSET">Asset</option>
            <option value="LIABILITY">Liability</option>
            <option value="EQUITY">Equity</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-success mt-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Category"}
      </button>
    </>
  );
};

export default CategoryForm;
